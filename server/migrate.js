const fs = require('fs')
const mongoose = require('mongoose')
const csv = require('csv-parser')
require('dotenv').config()

const DB_HOST = process.env.DB_HOST
const DB_PORT = process.env.DB_PORT
const DB_NAME = process.env.DB_NAME
const COUNTRIES_COLLECTION = process.env.COUNTRIES_COLLECTION
const STATES_COLLECTION = process.env.STATES_COLLECTION
const CITIES_COLLECTION = process.env.CITIES_COLLECTION

const uri = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`

async function runMigrations() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    console.log('Connected to the database')

    const db = mongoose.connection

    const collections = [
      {
        collectionName: COUNTRIES_COLLECTION,
        filePath: './db/mongoose_db.countries.csv'
      },
      {
        collectionName: STATES_COLLECTION,
        filePath: './db/mongoose_db.states.csv'
      },
      {
        collectionName: CITIES_COLLECTION,
        filePath: './db/mongoose_db.cities.csv'
      }
    ]

    // Array to store import promises
    const importPromises = []

    for (const collection of collections) {
      const { collectionName, filePath } = collection

      const importPromise = new Promise((resolve, reject) => {
        const documents = []

        fs.createReadStream(filePath)
          .pipe(csv())
          .on('data', (data) => documents.push(data))
          .on('end', async () => {
            try {
              // Clear the collection before import
              await db.collection(collectionName).deleteMany({})

              // Insert documents into the collection
              await db.collection(collectionName).insertMany(documents)

              console.log(
                `Documents imported successfully into collection ${collectionName}`
              )
              resolve()
            } catch (error) {
              console.error(
                `Error importing documents into collection ${collectionName}:`,
                error
              )
              reject(error)
            }
          })
      })

      importPromises.push(importPromise)
    }

    // Wait for all import promises to resolve
    await Promise.all(importPromises)

    // Get list of collections
    const collectionNames = await db.db
      .command({ listCollections: 1 })
      .then((result) =>
        result.cursor.firstBatch.map((collection) => collection.name)
      )
      .catch((error) => {
        console.error('Error retrieving collections:', error)
        process.exit(1)
      })

    console.log('Collections in the database:')
    collectionNames.forEach((collectionName) => {
      console.log(collectionName)
    })

    // Close the database connection
    await mongoose.disconnect()
    console.log('Database connection closed.')
  } catch (error) {
    console.error('Database connection error:', error)
    process.exit(1)
  }
}

runMigrations()

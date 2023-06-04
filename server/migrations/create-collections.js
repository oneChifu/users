import * as dotenv from 'dotenv'
import * as mongoose from 'mongoose'
import * as fs from 'fs'

dotenv.config()

const dbHost = process.env.DB_HOST
const dbPort = process.env.DB_PORT
const dbName = process.env.DB_NAME
const countriesCollection = process.env.COUNTRIES_COLLECTION
const statesCollection = process.env.STATES_COLLECTION
const citiesCollection = process.env.CITIES_COLLECTION

// Import collections
export async function up() {
  await mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`)

  const countriesData = JSON.parse(
    fs.readFileSync('../db/mongoose_db.countries.json', 'utf8')
  )
  await mongoose.connection
    .collection(countriesCollection)
    .insertMany(countriesData)

  const statesData = JSON.parse(
    fs.readFileSync('../db/mongoose_db.states.json', 'utf8')
  )
  await mongoose.connection.collection(statesCollection).insertMany(statesData)

  const citiesData = JSON.parse(
    fs.readFileSync('../db/mongoose_db.cities.json', 'utf8')
  )
  await mongoose.connection.collection(citiesCollection).insertMany(citiesData)

  await mongoose.connection.close()
}

// Delete collections
export async function down() {
  await mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`)

  await mongoose.connection.collection(countriesCollection).deleteMany({})
  await mongoose.connection.collection(statesCollection).deleteMany({})
  await mongoose.connection.collection(citiesCollection).deleteMany({})

  await mongoose.connection.close()
}

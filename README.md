# USERS

## Simple Web App.

### Frontend

`Vue.js 2` + `Vuetify` + `Vee-Validate` + `Axios`

### Backend

`Nest.js` + `Mongoose` + `MongoDB`


## Requirements

Before getting started with the project, make sure you have the following components installed on your computer:

- Docker: [Instructions for installing Docker](https://www.docker.com/products/docker)
- Docker Compose: [Instructions for installing Docker Compose](https://docs.docker.com/compose/)

#

## Using Docker

If you have Docker and Docker Compose installed, you can use Docker to build and run the project. Follow these steps:

1. Open a terminal and navigate to the root folder of the project.
2. Run the command `docker-compose up -d` to run the project in daemon mode.
3. Open your browser and go to `http://localhost:8080` to see your frontend project.

#

## Directory Structure

- `/frontend` - folder containing the frontend project.
- `/server` - folder containing the server project.

#

## Installation and Setup

1. Download or clone the repository to your local machine.
2. Navigate to the `frontend` folder and run the following commands:


### Install dependencies
```
yarn install
```


### Run the frontend in development mode
```
yarn serve
```

3. Open a new terminal window and navigate to the `server` folder. Run the following commands:


### Install dependencies
```
yarn install
```

### Run the server in development mode
```
yarn start:dev
```
4. Open your browser and go to `http://localhost:8080` to see your frontend project.

#

## License

This project is licensed under the MIT License.


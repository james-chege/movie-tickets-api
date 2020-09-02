An app that allows users to make bookings for a movie.

#### Key components

The key files and directories to look at are:
1. `middleware/`
2. `routes/`
2. `controllers/`
3. `utils/`

#### Middleware

When a request is received the aim is to invoke a controller function to process it. Before the controller function is
hit we have middleware to perform checks.

#### Routes

The routes directory is made up of routers named after the system entity they represent. All the routers are registered
to the application in `index.js`


#### Utils

The `utils/` directory defines functions that are used throughout the app to simplify code and separate concerns. 

## Description
Using the Movie API: https://www.omdbapi.com/, users can search the API for movies and select the ones they are interested in.
- The user should be able to save their booking details as follows. 
>booking details: tickets, owner, movie data(image of the movie, summary, name, year)

### Installing packages

Ensure that you're on the root directory of this repository and run the following command.

```bash
$ yarn install
```

# Setup

1. Create a postgres database with name of your choice.
```bash c
createdb symbionix_movies -U postgres 
```

2. Copy .env.example to .env and edit the environment variables to match your computer's postgres credentials and the databases that you created.

3. Migrate the development database schema:
   ```bash
   yarn migrate
   ```
   To undo this step run:
   ```bash
   yarn migrate:undo
   ```
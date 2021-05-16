# Image Repository
This is an API for an image repository built with Node.js and Express. This was started as part of the Shopify Backend Developer Intern Challenge, but may have other features added in the future.

## Current Features
* Add images
  * Add one/bulk images
  * Public or private permissions
  * Secure uploading and storage of images

## API Endpoints (with Postman)
POST /auth/register
* User registration with email and password
```javascript
// add in body of request as JSON
{
    "firstName": "Billy",
    "lastName": "Bob",
    "email": "billybob@gmail.com",
    "password": "password123"
}
```

POST /auth/login
* Login
```javascript
// add in body of request as JSON
{
    "email": "billybob@gmail.com",
    "password": "password123"
}
```

GET /auth/protected-route
* Check if user is authenticated

POST /images
* Upload image(s) to server and then to S3
* Add in body of request as form-data

KEY | VALUE
----|------
images | `uploaded file`
permission | public `or private`

GET /images/:key
* Retrieve image with key if user has permission

GET /auth/logout
* Logout of current session

## Setup
1. Fork and clone this repository
2. Install dependencies with `npm install`
3. Create a local PostgreSQL database
4. Create a .env file using .env.example as a template
5. Setup database with `psql -d your_database_name -f "./db/schema/create.sql"`
6. Start server in development mode with `npm start`
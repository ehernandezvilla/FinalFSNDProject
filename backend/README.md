# FSND Final Project - ehernandezvilla

This project is associated with the final part of the full stack nanodegree on Udacity. 

# Flask App Documentation

This Flask app provides routes for managing domains, phishing domains, and articles. It includes various endpoints for creating, retrieving, updating, and deleting data related to domains, phishing domains, and articles.

## Getting Started

These instructions will help you set up and run the Flask app on your local machine for development and testing purposes.

### Prerequisites

- Python 3.x
- Pip package manager
- Create and fill a .env with the following variables

## Variables for .env file

PASSWORD: your postgres db passwd
DB_USER: your posgres db user
DB_NAME: your postgres db table name
DB_TEST_NAME: your postgres db table test name (for testing)
AUTH0_DOMAIN: auth0 domain
API_AUDIENCE: auth0 audience
AUTH_TOKEN: auth token

The user name for the db should be 'postgres' in case you need to change it please modify it in app.py path route.


### Installation

1. Clone the repository:


2. Change into the project directory:


3. Install the required dependencies:


### Configuration

Before running the app, make sure to set the following environment variables:

- `DATABASE_URL`: The URL of the database (e.g., PostgreSQL, MySQL) where the app will store data.

### Running the App

To run the app, execute the following command: python3 -m flask run 

By default, the app will be accessible at `http://localhost:5000/`.

## Routes

### Home Route

- `GET /`

  Retrieves the home page of the FSND home project.

### Domains Routes

- `GET /domains`

  Retrieves a paginated list of domains.

- `GET /domains/<id>`

  Retrieves a specific domain by its ID.

- `POST /domains`

  Creates a new domain.

- `PATCH /domains/<id>`

  Updates a specific domain by its ID.

- `DELETE /domains/<id>`

  Deletes a specific domain by its ID.

### Phishing Routes

- `GET /phishing`

  Retrieves a paginated list of phishing domains.

- `GET /phishing/<id>`

  Retrieves a specific phishing domain by its ID.

- `GET /phishing/count`

  Retrieves the total count of phishing domains.

- `POST /phishing/search`

  Searches for phishing domains based on a search term.

- `POST /phishing`

  Creates a new phishing domain.

- `PATCH /phishing/<id>`

  Updates a specific phishing domain by its ID.

- `DELETE /phishing/<id>`

  Deletes a specific phishing domain by its ID.

### Articles Routes

- `GET /articles`

  Retrieves a list of articles.

- `GET /articles/<id>`

  Retrieves a specific article by its ID.

- `POST /articles`

  Creates a new article.

- `PATCH /articles/<id>`

  Updates a specific article by its ID.

- `DELETE /articles/<id>`

  Deletes a specific article by its ID.

## Authentication and Authorization

Some routes require authentication and authorization. The following permissions are available:

- `get:domains`: Read access to domains.
- `post:domains`: Create access to domains.
- `patch:domains`: Update access to domains.
- `delete:domains`: Delete access to domains.
- `get:phishing`: Read access to phishingdomains.
- `post:phishing`: Create access to phishing domains.
- `patch:phishing`: Update access to phishing domains.
- `delete:phishing`: Delete access to phishing domains.
- `get:articles`: Read access to articles.
- `post:articles`: Create access to articles.
- `patch:articles`: Update access to articles.
- `delete:articles`: Delete access to articles.

To access routes that require authentication and authorization, include a valid JWT (JSON Web Token) in the `Authorization` header of the request.

## Error Handling

The app handles various error scenarios and returns appropriate error responses with corresponding status codes and error messages.

- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 405: Method Not Allowed
- 422: Unprocessable Entity
- 500: Internal Server Error


# Testing 

For testing the proyect uses unittest. You can find all the info in the test_app file. 

## License

This project is licensed under the [MIT License](LICENSE).
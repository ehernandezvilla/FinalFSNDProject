# Flask project: Flask & Node/React APP with Auth0

This repository contains a Flask server that serves as the backend API and a React front-end for the web application.

## Prerequisites

- Python >3.7
- Node.js
- Please check other requirements in each folder (backend and frontend)

## Project Structure

- `backend/` - Contains the Flask server code and API endpoints.
- `frontend/` - Contains the React front-end code.
- `README.md` - This file.
## Usage

- The Flask server serves the API endpoints that the React front-end interacts with, the address to access it is: https://fsnd-backend-deployment.onrender.com/
- The React front-end can be accessed in the browser at: https://main--phenomenal-stroopwafel-2ae3d2.netlify.app/

## Users

For the authentication the users are (just for testing limited permissions):

name: user
email: user@test.cl
passwd: 11#i9Hpk2b
permissions:
get:articles
get:domains
get:phishing

--

## IMPORTANT

Please check the README.md files in backend and frontend to understand more about the requirements, endpoints and config of every part of the proyect. The frontend is an 'extra' to understand how to connect the backend to a webapp proyect via react and auth0 for the auth structure. 

## Contributing

Contributions are welcome! If you find any issues or have suggestions, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

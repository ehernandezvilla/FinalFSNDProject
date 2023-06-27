# FSND Final Project - Antiscam

This project is associated with the final part of the full stack nanodegree on Udacity

## Installation

Make sure you have Python and the necessary dependencies installed.

1. Clone the repository: git clone https://github.com/your_username/your_repository.git
2. Navigate to the project directory: cd your_repository
3. Install the dependencies: pip install -r requirements.txt

## Usage

1. Run the application: python app.py

2. Access the application in your web browser at the following address:

## Endpoints

The following are the available endpoints in the application:

### Get all domains

- Method: GET
- Route: `/domains`
- Description: Returns a list of all domains available in the database.
- Query Parameters: None
- Successful Response:
- Code: 200 OK
- Content: JSON with the list of domains and their formats.

### Get a specific domain

- Method: GET
- Route: `/domains/<int:id>`
- Description: Returns the information of a specific domain.
- Query Parameters: `id` (integer) - Domain identifier.
- Successful Response:
- Code: 200 OK
- Content: JSON with the domain information and its format.

### Get all phishing

- Method: GET
- Route: `/phishing`
- Description: Returns a list of all phishing records available in the database.
- Query Parameters: None
- Successful Response:
- Code: 200 OK
- Content: JSON with the list of phishing records and their formats.

### Get all articles

- Method: GET
- Route: `/articles`
- Description: Returns a list of all articles available in the database.
- Query Parameters: None
- Successful Response:
- Code: 200 OK
- Content: JSON with the list of articles and their formats.

## License

Specify the license under which the project is distributed. For example:

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

If you want to contact me you can do it at ehernandezvilla@gmail.com
import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from bottle import route
from flask import jsonify

# Function that create the app and return it
def create_app(test_config=None):
    # Create and configure the app 
    app = Flask(__name__)
    CORS(app)


    @app.route('/')
    def index():
        return 'Hello World!'
    
    return app # Return the already created app 

app = create_app    

if __name__ == '__main__':
    app.run(debug=True)

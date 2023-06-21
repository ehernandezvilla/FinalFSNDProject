import os
from decouple import config # Used for enviroment variables
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from bottle import route
from flask import jsonify
from models import db, setup_db, Domains 


database_name = config('DB_NAME')
database_path = "postgresql://{}:{}@{}/{}".format('postgres', config('PASSWORD'), 'localhost:5432', database_name)


# Function that create the app and return it
def create_app(test_config=None):
    # Create and configure the app 
    app = Flask(__name__)
    app.app_context().push()
     
    app.config["SQLALCHEMY_DATABASE_URI"] = database_path
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    
    migrate = Migrate(app, db, render_as_batch=False)
    CORS(app)  
    db.init_app(app)

    # Create the routes 
    @app.route('/')
    def index():
        return 'Hello World!'
    
    return app # Return the already created app 

app = create_app    

if __name__ == '__main__':
    app.run(debug=True)

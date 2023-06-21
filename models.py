from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, DateTime
from decouple import config # Used for enviroment variables
import datetime
from sqlalchemy import Column, Integer, String, DateTime, TIMESTAMP, text
from sqlalchemy.sql import text, func 
from sqlalchemy.schema import FetchedValue


db = SQLAlchemy()

database_name = config('DB_NAME')
database_path = "postgresql://{}:{}@{}/{}".format('postgres', config('PASSWORD'), 'localhost:5432', database_name)

## Setup DB(app) bind the flask app with SQLAlchemy

def setup_db(app, database_path=database_path):
    app.config["SQLALCHEMY_DATABASE_URI"] = database_path
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.app = app
    db.drop_all()
    db.create_all()

class Domains(db.Model):
    __tablename__ = 'domains'

    id = db.Column(db.Integer, primary_key=True)
    domain = db.Column(db.String, nullable=False, unique=True) # Domain name has to be unique
    description = db.Column(db.String, nullable=False)
    is_verified = db.Column(db.Boolean, nullable=False)
    is_active = db.Column(db.Boolean, nullable=False)
    create_date = db.Column(db.DateTime, default=datetime.datetime.utcnow(), nullable=False)

    def __init__(self, domain, description, is_verified, is_active, create_date):
        self.domain = domain
        self.description = description
        self.is_verified = is_verified
        self.is_active = is_active
        self.last_updated = create_date
    
    def format(self):
        return {
            'id': self.id,
            'domain': self.domain,
            'description': self.description,
            'is_verified': self.is_verified,
            'is_active': self.is_active,
            'last_updated': self.create_date
        }
    
    def insert(self):
        db.session.add(self)
        db.session.commit() 
    
    def update(self):
        db.session.commit()
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()
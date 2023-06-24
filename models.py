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
        self.create_date = create_date
    
    def format(self):
        return {
            'id': self.id,
            'domain': self.domain,
            'description': self.description,
            'is_verified': self.is_verified,
            'is_active': self.is_active,
            'create_date': self.create_date
        }
    
    def insert(self):
        db.session.add(self)
        db.session.commit() 
    
    def update(self):
        db.session.commit()
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()


class Phishing(db.Model):
    __tablename__ = 'pishing'

    id = db.Column(db.Integer, primary_key=True)
    domain_id = db.Column(db.Integer, db.ForeignKey('domains.id'), nullable=False)
    ip = db.Column(db.String, nullable=False)
    phishing_url = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    is_dangerous = db.Column(db.Boolean, nullable=False)
    submited_by = db.Column(db.String, nullable=False)
    create_date = db.Column(db.DateTime, default=datetime.datetime.utcnow(), nullable=False)
    
    def __init__(self, domain_id, ip, phishing_url, description, is_dangerous, submited_by, create_date):
        self.domain_id = domain_id
        self.ip = ip
        self.phishing_url = phishing_url
        self.description = description
        self.is_dangerous = is_dangerous
        self.submited_by = submited_by
        self.create_date = create_date
    
    def format(self):
        return {
            'id': self.id,
            'domain_id': self.domain_id,
            'ip': self.ip,
            'phishing_url': self.phishing_url,
            'description': self.description,
            'is_dangerous': self.is_dangerous,
            'submited_by': self.submited_by,
            'create_date': self.create_date
        }
    
    def insert(self):
        db.session.add(self)
        db.session.commit()
    
    def update(self):
        db.session.commit()
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()

class Articles(db.Model):
    __tablename__ = 'articles'

    id = db.Column(db.Integer, primary_key=True)
    domain_id = db.Column(db.Integer, db.ForeignKey('domains.id'), nullable=False)
    title = db.Column(db.String, nullable=False)
    url = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    submited_by = db.Column(db.String, nullable=False)
    create_date = db.Column(db.DateTime, default=datetime.datetime.utcnow(), nullable=False)
    
    def __init__(self, domain_id, title, url, description, submited_by, create_date):
        self.domain_id = domain_id
        self.title = title
        self.url = url
        self.description = description
        self.submited_by = submited_by
        self.create_date = create_date

    def format(self):
        return {
            'id': self.id,
            'domain_id': self.domain_id,
            'title': self.title,
            'url': self.url,
            'description': self.description,
            'submited_by': self.submited_by,
            'create_date': self.create_date
        }

    def insert(self):
       db.session.add(self)
       db.session.commit()
    
    def update(self):
        db.session.commit()
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()
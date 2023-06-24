import os
from decouple import config # Used for enviroment variables
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from models import db, setup_db, Domains, Phishing, Articles
from flask import request
from datetime import datetime



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
        return 'FSND Project - AntiScam' 
        
    # Domain routes 
    @app.route('/domains')
    def get_domains():
        domains = Domains.query.all()
        return jsonify([domain.format() for domain in domains])
    
    @app.route('/domains/<int:id>')
    def get_domain(id):
        domain = Domains.query.get(id)
        return jsonify(domain.format())
    
    @app.route('/domains', methods=['POST'])
    def add_domain():
        data = request.get_json()

        domain = Domains(
            domain = data['domain'],
            description = data['description'],
            is_active = data['is_active'],
            is_verified = data['is_verified'],
            create_date = datetime.strptime(data['create_date'], '%d-%m-%Y') # Adjusted for day-month-year format
        )
        db.session.add(domain)
        db.session.commit()
        
        return jsonify({
        'message': 'New domain added',
        'domain': {
            'id': domain.id,
            'domain': domain.domain,
            'description': domain.description,
            'is_active': domain.is_active,
            'is_verified': domain.is_verified,
            'create_date': domain.create_date.strftime('%Y-%m-%d %H:%M:%S') # Return date as string in this format
        }
    }), 201
    
    # Phishing routes

    @app.route('/phishing')
    def get_phishing():
        phishing = Phishing.query.all()
        return jsonify([phishing.format() for phishing in phishing])


    # Articles routes
    @app.route('/articles')
    def get_articles():
        articles = Articles.query.all()
        return jsonify([article.format() for article in articles])




# Return the already created app 
    return app 

# app = create_app    

# if __name__ == '__main__':
#     app.run(debug=True)

import os
from datetime import datetime
import unittest
import json
from app import db 
from app import create_app
from decouple import config
from models import setup_db, Domains, Phishing, Articles

class DomainsTestCase(unittest.TestCase):
    """This class represents the domains test case"""

    def setUp(self):
        """Define test variables and initialize app."""
        self.app = create_app()
        self.client = self.app.test_client
        self.headers = {
            'Content-Type': 'application/json', 
            'Authorization': f'Bearer {config("AUTH_TOKEN")}'
        }
        self.database_name = config('DB_TEST_NAME')
        self.database_path = "postgresql://{}:{}@{}/{}".format('postgres', config('PASSWORD'), 'localhost:5432', self.database_name)
        setup_db(self.app, self.database_path)
        self.db = db


    # sample domain for testing

        self.new_domain = {
            'domain': 'falabellas.com',
            'description': 'Test domain falabella',
            'is_active': True,
            'is_verified': True,
            'create_date': '09-07-2023'
        }

    # sample phishing for testing

        self.phishing = {
        "description": "Test phishing domain",
        "domain_id": 1,
        "ip": "192.1.1.1",
        "is_dangerous": False,
        "phishing_url": "www.testsites.cl",
        "submited_by": "eduhb",
        "create_date": "09-10-2023"
    }
        
    # sample article for testing

        self.article_data = { # Este es un ejemplo de datos para usar en las pruebas
            'title': 'Test Article',
            'description': 'This is a test article',
            'url': 'https://testarticle.com',
            'submited_by': 'Tester',
            'domain_id': 1,
            'create_date': '07-07-2023'
        }
    

    def tearDown(self):
        """Executed after reach test"""

        pass 


    # Domains route testing

    ## GET /domains route testing ##

    def test_get_domains(self):
        res = self.client().get('/domains')
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertTrue(data['domains'])
        self.assertTrue(data['total_domains'])


## GET /domains/<id> route testing # 
## Expected behaviour: It should fail due to lack of autorization header  

    def test_get_domain_by_id(self):
        res = self.client().get('/domains/1')
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 401)
        self.assertEqual(data['success'], False)
        self.assertEqual(data['message'], 'Unauthorized')



## POST /domains route testing 
## Expected behaviour: It should fail due to lack of autorization header

    def test_create_domain(self):
        res = self.client().post('/domains', json=self.new_domain)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 401)
        self.assertEqual(data['success'], False)


## PATCH /domains/<id> route testing
## Expected behaviour: It should fail due to lack of autorization header

    def test_update_domain(self):
        res = self.client().patch('/domains/1', json=self.new_domain)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 401)
        self.assertEqual(data['success'], False)

## DELETE /domains/<id> route testing
## Expected behaviour: It should fail due to lack of autorization header

    def test_delete_domain(self):
        res = self.client().delete('/domains/1')
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 401)
        self.assertEqual(data['success'], False)


# Phishing route testing

## GET /phishing route testing #
## Expected behaviour: It should success and return all phishing entries.

    def test_get_phishing(self):
        res = self.client().get('/phishing')
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertTrue(data['phishings'])
        self.assertTrue(data['total_phishings'])

## GET /phishing/<id> route testing #
## Expected behaviour: It should fail due to lack of autorization header

    def test_get_phishing_by_id_unauthorized(self):
        """Test API cannot get a single phishing by using it's id without valid token."""
        res = self.client().get('/phishing/3') # id 3 is a phishing entry
        self.assertEqual(res.status_code, 401)

## Get /phishing/count route testing #
## Expected behaviour: It should fail due to lack of autorization header

    def test_phishing_count_unauthorized(self):
        """Test API cannot count all phishing entries without valid token."""
        res = self.client().get('/phishing/count')
        self.assertEqual(res.status_code, 401)

## Get /phishing/<id> route testing #
## Expected behaviour: It should success and return a single phishing by using it's id.

    def test_get_phishing_by_id(self):
        """Test API can get a single phishing by using it's id."""
        res = self.client().get('/phishing/3', headers=self.headers)
        self.assertEqual(res.status_code, 200)

## Get /phishing/count route testing #
## Expected behaviour: It should success and return the total number of phishing entries.

    def test_phishing_count(self):
        """Test API can count all phishing entries."""
        res = self.client().get('/phishing/count', headers=self.headers)
        self.assertEqual(res.status_code, 200)

## Get /phishing/<id> route testing #
## Expected behaviour: It should success and return a single phishing by using a search_tearm

    def test_phishing_search(self):
        """Test API can search phishing."""
        print("Running test_phishing_search")
        res = self.client().post('/phishing/search', json={'search_term': 'test'}, headers=self.headers)
        self.assertEqual(res.status_code, 200)

## Post /phishing route testing #
## Expected behaviour: It should success and post a new phishing entry.

    def test_add_phishing(self):
        """Test API can create a phishing (POST request)"""
        res = self.client().post('/phishing', json=self.phishing, headers=self.headers)
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 201)


## Patch /phishing/<id> route testing #

    def test_update_phishing(self):
        """Test API can update an existing phishing (PATCH request)."""
        res = self.client().patch('/phishing/16', json=self.phishing, headers=self.headers) # The phishing id register should exist 
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['phishing']['description'], self.phishing['description'])
        self.assertEqual(data['phishing']['phishing_url'], self.phishing['phishing_url'])


## Delete /phishing/<id> route testing #

    def test_delete_phishing(self):
        """Test API can delete an existing phishing (DELETE request).""" 
        res = self.client().delete('/phishing/15', headers=self.headers) # The phishing id register should exist
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['message'], 'Phishing domain deleted')


# Articles route testing 

## GET /articles route testing 

    def test_get_articles(self):
        res = self.client().get('/articles')
        self.assertEqual(res.status_code, 200)

## GET /articles/<id> route testing 

    def test_get_article_by_id(self):
        """Test API can get a single phishing by using it's id."""
        res = self.client().get('/articles/2', headers=self.headers)
        self.assertEqual(res.status_code, 200)

## POST /articles route testing 

    def test_post_article(self):
        res = self.client().post('/articles', json=self.article_data, headers=self.headers)
        self.assertEqual(res.status_code, 201)


## PATCH /articles/<id> route testing 

    def test_update_article(self):
        article = Articles(title=self.article_data['title'], 
                        description=self.article_data['description'], 
                        url=self.article_data['url'], 
                        submited_by=self.article_data['submited_by'], 
                        domain_id=self.article_data['domain_id'], 
                        create_date=datetime.strptime(self.article_data['create_date'], '%d-%m-%Y'))
    
        db.session.add(article)
        db.session.commit()
    
        res = self.client().patch(f'/articles/{article.id}', 
                                json={'title': 'Updated Test Article',
                                        'description': 'Updated Description',
                                        'url': 'https://updatedurl.com',
                                        'submited_by': 'Updated Tester',
                                        'domain_id': 2,
                                        'create_date': '09-10-2023'},
                                headers=self.headers)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['article']['title'], 'Updated Test Article')
        self.assertEqual(data['article']['description'], 'Updated Description')
        self.assertEqual(data['article']['url'], 'https://updatedurl.com')
        self.assertEqual(data['article']['submited_by'], 'Updated Tester')
        self.assertEqual(data['article']['domain_id'], 2)
        self.assertEqual(data['article']['create_date'], '2023-10-09 00:00:00')

## Delete /articles/<id> route testing 

    def test_delete_article(self):
        article = Articles(title=self.article_data['title'], 
                        description=self.article_data['description'], 
                        url=self.article_data['url'], 
                        submited_by=self.article_data['submited_by'], 
                        domain_id=self.article_data['domain_id'], 
                        create_date=datetime.strptime(self.article_data['create_date'], '%d-%m-%Y'))
    
        db.session.add(article)
        db.session.commit()

        res = self.client().delete(f'/articles/{article.id}', headers=self.headers)
        data = json.loads(res.data)

        article = Articles.query.get(article.id)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['message'], 'Article deleted')
        self.assertEqual(article, None)



# Make the tests conveniently executable
if __name__ == "__main__":
    unittest.main(verbosity=2)



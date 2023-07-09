import os
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
        self.database_name = config('DB_TEST_NAME')
        self.database_path = "postgresql://{}:{}@{}/{}".format('postgres', config('PASSWORD'), 'localhost:5432', self.database_name)
        setup_db(self.app, self.database_path)
        self.db = db


    # sample domain for testing

        self.new_domain = {
            'domain': 'falabella.com',
            'description': 'Test domain falabella',
            'is_active': True,
            'is_verified': True,
            'create_date': '09-07-2023'
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
        self.assertEqual(data['success'], "False")
        self.assertEqual(data['message'], 'Unauthorized')



## POST /domains route testing 
## Expected behaviour: It should fail due to lack of autorization header

    def test_create_domain(self):
        res = self.client().post('/domains', json=self.new_domain)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 401)
        self.assertEqual(data['success'], False)



# Make the tests conveniently executable
if __name__ == "__main__":
    unittest.main()



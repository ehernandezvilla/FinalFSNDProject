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

    def tearDown(self):
        """Executed after reach test"""

        pass 

    def test_get_domains(self):
        res = self.client().get('/domains')
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertTrue(data['domains'])
        self.assertTrue(data['total_domains'])

# Make the tests conveniently executable
if __name__ == "__main__":
    unittest.main()
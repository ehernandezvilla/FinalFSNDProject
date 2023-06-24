import json
from decouple import config # Used for enviroment variables in replace of pyenv
from flask import request, __request_ctx_stack, abort
from functools import wraps
from jose import jwt
from urllib.request import urlopen

# Auth0 Config

AUTH0_DOMAIN = config('AUTH0_DOMAIN')
ALGORITHMS = ['RS256']
API_AUDIENCE = config('API_AUDIENCE')

# AutError Exception

class AuthError(Exception):
    def __init__(self, error, status_code):
        self.error = error
        self.status_code = status_code
    


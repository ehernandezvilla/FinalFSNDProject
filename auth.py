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
    

# Auth Header

def get_token_auth_header():
    # Obtains the Access Token from the Authorization Header

    auth = request.headers.get('Authorization', None) # Get the header
    
    if not auth:  # 
        raise AuthError({
            'code': 'authorization_header_missing',
            'description': 'Authorization header is expected.'
            }, 401)
    
    parts = auth.split() # Split the header into parts
    
    if parts[0].lower() != 'bearer':
        raise AuthError({
            'code': 'invalid_header',
            'description': 'Authorization header must start with "Bearer".'
            }, 401)
    
    elif len(parts) == 1:
        raise AuthError({
            'code': 'invalid_header',
            'description': 'Token not found.'
            }, 401)
    
    elif len(parts) > 2:
        raise AuthError({
            'code': 'invalid_header',
            'description': 'Authorization header must be bearer token.'
            }, 401)
    
    token = parts[1]
    return token

def check_permissions(permission, payload): # Check permissions
    if 'permissions' not in payload:
        abort(400)
    if permission not in payload['permissions']:
        abort(403)
    return True
    

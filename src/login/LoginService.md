Login with Email/Password

POST to /login

Example Payload
{
    "email": "danny@test.com",
    "password": "Password1"
}

Success will return a JWT token
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY2NzliMjA2LTI0MzctNDQwMS05MDViLWM5NjhlYjM4MTU5YiIsImZpcnN0TmFtZSI6Ik1pY2hhZWwiLCJsYXN0TmFtZSI6IkZpbGJpbiIsImVtYWlsIjoibWljaGFlbC5maWxiaW5AbWUuY29tIiwiaWF0IjoxNDYyMDQ5MTExLCJleHAiOjE0OTM1ODUxMTEsImlzcyI6InVybjpjZ2k6YXV0aGVudGljYXRpb24iLCJzdWIiOiJ1cm46Y2dpOnVzZXIifQ.QKJWo3i8aTqQTsWbBq0nNe0qfuckdJjByXg658syzYI"
}

Failure will return response of
{
  "authenticated": false
}

Login with OAuth
There are new environment variables needed when starting application
"OAUTH_PASSWORD": "cookie_encryption_password_secure"
"FACEBOOK_APP_ID": "Look in drop box for test keys"
"FACEBOOK_SECRET": "Look in drop box for test keys"
"GOOGLE_APP_ID": "Look in drop box for test keys"
"GOOGLE_SECRET": "Look in drop box for test keys"

Send a GET request to /login/facebook or /login/google
This should redirect to respective site. If the login is successful then it will redirect back to server
and the server will respond with JWT token. If not it will return 
{
  "authenticated": false
}

The service will signup the user if it is not in the database otherwise it will retrieve the user from the database 
and sign the token.
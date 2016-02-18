# User Service

# Registering A New User

### Request:

    HTTP POST: /users
    Request Payload: {   
      "firstName": "Lisa",   
      "lastName": "Simpson",   
      "email": "lisa.simpson@hotmail.com",   
      "password": "krabapple",   
      "passwordConfirmation": "krabapple"
    }

### Response:

    201 CREATED
    Response Payload: {
      token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmaXJzdE5hbWUiOiJMaXNhIiwibGFzdE5hbWUiOiJTaW1wc29uIiwiZW1haWwiOiJsaXNhLnNpbXBzb25AaG90bWFpbC5jb20iLCJwYXNzd29yZENvbmZpcm1hdGlvbiI6ImtyYWJhcHBsZSIsInBhc3N3b3JkIjoia3JhYmFwcGxlIiwidXVpZCI6ImFlZmM1NTgwLWFjN2EtNDJkZC1iMmFlLTQzYWJmNjEzNjIwMiIsInBhc3N3b3JkU2FsdCI6IiQyYSQxMCRSd3RRdklIekVjZ0xSMXBPUU5na2FlIiwicGFzc3dvcmRIYXNoIjoiJDJhJDEwJFJ3dFF2SUh6RWNnTFIxcE9RTmdrYWVoM2gxeFkxdnI4RGR6YTI0eUtzQUhRVnRhdVhEdERtIiwiaWQiOjEzfQ.PIIDHKFCnY6xr6cZisHVHf3iM0ZKg1eSEgpmS4mboSc"
    }

# Service Errors

The following validations are enforced by the server:

1. A user's email must be unique
2. A user's password must have at least one character
3. A user's email address must be properly formatted
4. A Password and it's confirmation must match.

If any of the following conditions are not meet, the service will respond with an HTTP 422 Unprocessable Entity and an error message like this in the response body:

```json
  {
    "originator":"127.0.0.1",
    "uri":"POST /users",
    "request":{},
    "sourceError":{
      "message":"lisa.simpson.com is not a valid email address"
      },
      "statusCode":422,
      "name":"UnprocessableEntityError",
      "message":"The request was formatted correctly but cannot be processed in its current form."
    }
```

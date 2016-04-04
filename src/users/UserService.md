# User Service

# Registering A New User

### Request:

    HTTP POST: /users
    Request Payload: {
  "firstName": "Michael",
  "lastName": "Filbin",
  "email": "michael.filbin@me.com",
  "password": "Password",
  "passwordConfirmation": "Password",
  "nationalityId": "6f9cf1f7-2f78-4f42-bef4-2fe75e12f51f",
  "gender": "Male",
  "dateOfBirth": "1979/09/12",
  "addresses": [ //=> Optional
    {
      "street": "2003 S. Someplace",
      "city": "Summerville",
      "state": "MA",
      "postalCode": "802991"
    }
  ],
  "telephones": [// => Optional
    {
      "countryCode": "001",
      "areaCode": "303",
      "number": "5555555",
      "extension": ""
    }
  ]
}

### Response:

    201 CREATED
    Response Payload: {
      token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmaXJzdE5hbWUiOiJMaXNhIiwibGFzdE5hbWUiOiJTaW1wc29uIiwiZW1haWwiOiJsaXNhLnNpbXBzb25AaG90bWFpbC5jb20iLCJwYXNzd29yZENvbmZpcm1hdGlvbiI6ImtyYWJhcHBsZSIsInBhc3N3b3JkIjoia3JhYmFwcGxlIiwidXVpZCI6ImFlZmM1NTgwLWFjN2EtNDJkZC1iMmFlLTQzYWJmNjEzNjIwMiIsInBhc3N3b3JkU2FsdCI6IiQyYSQxMCRSd3RRdklIekVjZ0xSMXBPUU5na2FlIiwicGFzc3dvcmRIYXNoIjoiJDJhJDEwJFJ3dFF2SUh6RWNnTFIxcE9RTmdrYWVoM2gxeFkxdnI4RGR6YTI0eUtzQUhRVnRhdVhEdERtIiwiaWQiOjEzfQ.PIIDHKFCnY6xr6cZisHVHf3iM0ZKg1eSEgpmS4mboSc"
    }


# Updating An Existing User

### Request:

    HTTP PUT: /users/b017c790-7812-4078-a9c1-1aad149d4d6a
    Request Payload: {
      "gender": "Male",
    }

### Response:

    201 CREATED
    Response Payload: {
      "id":"b017c790-7812-4078-a9c1-1aad149d4d6a",
      "email":"michael.filbin@gmail.com","relations":{}
    }

# Fetching A Collection of Users

### Request:

    HTTP GET: /users
    Request Payload: {
      "gender": "Male",
    }

### Response:

    201 CREATED
    Response Payload: [
    {
      "id": "b017c790-7812-4078-a9c1-1aad149d4d6a",
      "firstName": "Michael",
      "lastName": "Filbin",
      "dateOfBirth": "1979-09-12T06:00:00.000Z",
      "gender": "Male",
      "email": "michael.filbin@gmail.com",
      "relations": {
        "nationality": {},
        "addresses": [
          {
            "id": "8022fc6b-e7eb-4894-9b52-72afcda4cf62",
            "street": "2003 S. Someplace",
            "city": "Summerville",
            "state": "MA",
            "postalCode": "802991"
          }
        ],
        "telephones": [
          {
            "id": "d27a8a31-1f37-4a31-a0e8-721511c44d3b",
            "countryCode": "001",
            "areaCode": "303",
            "number": "5555555"
          }
        ]
      },
      "createdAt": "2016-04-03T21:45:43.157Z",
      "updatedAt": "2016-04-03T21:45:43.157Z"
    }
  ]

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

# User Service

## Creating A New Choice Resource

### Request:

    HTTP POST: /choices
    Request Payload: {
      "text": String
    }

### Response:

    201 CREATED
    Response Payload: {
      "id": UUID,
      "text": String,
      "version": String, // (MD5 Hash)
      "refs": {
        "self": URI,
        "choices": URI
      }
      "createdAt": Date,
      "updatedAt": Date
  }

## Editing and Existing Choice

### Request

    HTTP PUT /choices/{choice_id}
    Request Payload {
      text: String
    }

### Response:

*No content is returned in the response body as the client as the most up-to-date representation of the resource*

    204 NO CONTENT
    Response Payload: EMPTY

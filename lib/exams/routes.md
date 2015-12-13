# Routing for the Exams Service

## Addressability, Caching, and References

This web service utilizes resource references in its representations. Rather that providing a resource with all of its associations nested in the response, we provide a `refs` attribute. This attribute contains URIs to the associations and the client can fetch those additional resources as needed.

This approach provides the following benefits:

  1. Lighter weight payloads
  2. Easier caching - By providing the URIs to the resources, we can leverage caching techniques which will reduce service response types.
  3. client discovery - By providing the references in the response payloads, the client is free from having to store template URIs in order to acquire resources. Instead, the client can make HTTP option call against the resource reference URIs to learn about possible operations.

  For example, given the following scenario:

  GET http://localhost:8000/v1/examinations/7c417eee-e8e8-46be-bfc7-0cd14754105a

  ```javascript
  {
    "id": "7c417eee-e8e8-46be-bfc7-0cd14754105a",
    "title": "Introduction to Astronomy",
    "instructions": "To begin this examination, ...",
    "version": "79250ced4d4e16e94d9957b51f175eac",
    "refs": {
      "self": "/examinations/7c417eee-e8e8-46be-bfc7-0cd14754105a",
      "questions": "examinations/7c417eee-e8e8-46be-bfc7-0cd14754105a/questions"
    },
    "createdAt": "Tue, 03 Nov 2015 14:49:04 GMT",
    "updatedAt": "Tue, 03 Nov 2015 14:49:04 GMT"
  }
  ```

  We can make HTTP option requests to either of the `self` or `questions` URIs to learn what requests we can make to them.

  OPTION http://localhost:8000/v1/examiantions/7c417eee-e8e8-46be-bfc7-0cd14754105a/questions

  ```
  204 NO CONTENT
  Allow: HEAD,GET,POST,OPTIONS
  ```

  From the `Allow` header, we know we can make HTTP GET requests to fetch the collection of questions associated with the exam, HTTP POST requests to create new questions associated with the exam, all without having to reference documentation or to interpolate a template URI string.

  See [RFC 7231 HTTP Method Definitions](https://tools.ietf.org/html/rfc7231#section-4.3)  to learn how to use HTTP methods semantically with REST web services.


## Request Semantics

### Resource Versioning

The current version of this API is **v1**, however we are not currently enforcing versioning via the URI - **This will change in the near future**. <del>You can access versions of this service by including the version parameter in the service URI.</del>

    http://:hostname/:version/examinations/* // NOT IMPLEMENTED YET

### Headers

The following is a list or proposed, mandatory headers. If any of the required headers are not present, the server will respond with an `HTTP 400 BAD REQUEST` status.

    1. HOST - The domain name and port (if non-standard) for the server from which the client was served.
    2. ORIGIN - Initiates a request for cross-origin resource sharing (asks server for an Access-Control-Allow-Origin response header)

The following list contains, proposed, optional set of headers.

    1. ACCEPTS - Specifies the content type of the response payload. Will default to JSON if not specified.
    2. CONTENT-TYPE - Specifies the content type of the request payload. Will be parsed as JSON if not specified.

The following list contains headers that are being evaluated for future support by the service:

    1. CACHE-CONTROL - Informs the server how to handle caching of the resource.
    2. X-AUTHENTICATION - Will contain the JWT bearer token for authenticated requests

### Resource Representations

For HTTP PUT and HTTP POST requests, only a subset of the resource data must be sent. As a general rule, for these types of requests, the following resource properties can be safely omitted:

1. `id` - This will be generated on HTTP POST requests and will be specified in the URI for HTTP PUT requests.
2. `createdAt` - This will be generated on HTTP POST requests and will never be modified.
3. `updatedAt` - This will resource will be updated server-side. If included in the payload, it will be ignored.
4. 'refs' - The references for the resource are specified by the server.

## Response Semantics

### Headers

The following contains a list of response headers that are currently supported by this service:

    1. CONTENT-TYPE
    2. CONTENT-LENGTH
    3. ACCESS-CONTROL-ALLLOW-ORIGIN - Required to support Cross-Origin Resource Sharing.
    4. LAST-MODIFIED - Date/time of when the resource was last updated.
    5. LOCATION - The URI of the resource. Used with redirection.

The following contains a list of response headers that are currently under evaluation for future support

    1. WWW-AUTHENTICATE - Necessary for token-based authentication.
    2. X-AUTHENTICATION - Necessary for token-based authentication.
    2. TRANSFER-ENCODING - Specifies the character set of the request payload. Necessary for i18n.
    3. ETAG - Caching mechanism.
    4. CONTENT-LANGUAGE - Locale of the response. Necessary for browser parsing.

### Status Codes

Currently supported response status codes:

    HTTP 201 CREATED - Successfully created the resource
    HTTP 204 NO CONTENT - Resource exists at that URI, returns only the headers
    HTTP 400 BAD REQUEST - The request was malformed (e.g. missing headers or improperly encoded) and should not be reattempted.
    HTTP 422 UNPROCESSABLE ENTITY - There was a problem with the Payload of your request
    HTTP 404 NOT FOUND - The URI does not address a valid server resource

Proposed status codes for future implementation:

    HTTP 202 ACCEPTED - The request was received by the server, but has not yet been processed or is processed in the background. The `LOCATION` header will contain the URI for the resource after the pending operation completes. The client can make HTTP HEAD requests to this URI to determine its status.
    HTTP 206 PARTIAL CONTENT - This status code will be used when the service supports HTTP PATCH requests with partial payloads. The response body should contain only the data the client does not already have.
    HTTP 401 UNAUTHORIZED - The request was made on behalf of a user principle that cannot be authenticated.
    HTTP 403 FORBIDDEN - The user principle for which the request was made was authenticated, but lacks sufficient permissions to access the resource.
    HTTP 410 GONE - The status would be returned when the client attempts a request to a previously valid URI however the resource is no longer at that address. Typically a 302 status code with a `Location` header would be returned, but his status would stand for situations where the forwarding location could not be determined.

## Resources:

The Examination web service is responsible for four, core resources: **examinations**, **questions**, **choices**, and **examination outcomes**.

### Examinations (NOT FULLY IMPLEMENTED)

```javascript
{
  "id": UUID,
  "title": String,
  "instructions": String,
  "version": String, // (cryptographic hash)
  "refs": {
    "self": URI,
    "questions": URI
  }
  "createdAt": Date,
  "updatedAt": Date
}
```


### Questions
```javascript
{
  "id": UUID,
  "type:" String,
  "test": String,
  "instructions": String,
  "version": String, //  (cryptographic hash)
  "refs": {
    "exam": URI,
    "choices": URI,
    "correctChoice": URI
  },
  "choices": Array,
  "createdAt": Date,
  "updatedAt": Date
}
```


### Choices

```javascript
{
  "id": UUID,
  "text": String,
  "refs": {
    "question": URI
  }
  "createdAt": Date,
  "updatedAt": Date
}
```

### Exam Outcomes (NOT IMPLEMENTED)

```javascript
{
  "id": UUID,
  "score": Number, // Integer value (represented as score/100)
  "refs": {
    "user": URI,
    "exam": URI,
  },
  "createdAt": Date,
  "updatedAt": Date
}
```

## Examination URIs (NOT IMPLEMENTED)

**NOTE: URI Versioning is not currently implemented**

## Question URIs

**NOTE: URI Versioning is not currently implemented**

### Adding a Question to the Pool of Available Exam Questions

    METHOD: HTTP POST
    URI: http://:host/:version/questions

### Updating a Question to An Examination

    METHOD: HTTP PUT
    URI: http://:host/:version/questions/:uuid

### Fetching a Specific Question (NOT IMPLEMENTED)

    METHOD: HTTP GET
    URI: http://:host/:version/questions/:uuid

### Deleting a Specific Question (NOT IMPLEMENTED)

    METHOD: HTTP GET
    URI: http://:host/:version/questions/:uuid

## Examination Outcomes (NOT IMPLEMENTED)

**NOTE: URI Versioning is not currently implemented**

This resource is currently being conceptualized. Check back for updated documentation.

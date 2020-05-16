# ecommerce-cms

Creating ecommerce-cms

* RESTful endpoint for E-commerce-Cms CRUD operation
* JSON formatted response

## RESTful endpoints
### POST /register

> user Register

_Request Header_
```
not needed

```

_Request Body_
```
{
  name : <posted-name>,
  email : <posted-email>,
  password : <posted-password>,
  role : <'admin' by default>
}
```

_Response (201)_
```
[
    {
        "access_token": "<When you register you automatically login and get access_token>"
    }
]

```

_Response (400 - Bad Request)_
```
{
  "errorCode" = 'VALIDATION_ERROR'
  "message": "<returned error message>"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error message>"
}
```

### POST /login

> user Login

_Request Header_
```
not needed

```

_Request Body_
```
{
  email : <posted-email>,
  password : <posted-password>
}
```

_Response (200)_
```
[
    {
    "access_token": <This access token generated automatically when you Log-in>
    }
]

```

_Response (400 - Bad Request)_
```
{
  "errorCode" = 'INVALID_EMAIL_OR_PASSWORD'
  "message": "<returned error message>"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error message>"
}
```

### GET /product

> Get all Product

_Request Header_
```
{
    "access_token": <This access token generated automatically when you Log-in>
}

```

_Request Body_
```
not needed
```

_Response (200)_
```
[
    {
        "id": 1 <automatically created by database>,
        "name": "Quiet" <Just an example>,
        "image_url": "http://QuietBySusanCain.jpg" <Fake image Url>,
        "price": 60000 <posted price of Product>,
        "stock": 9 <posted stock of Product>,
        "createdAt": "2020-05-13T23:01:56.602Z",
        "updatedAt": "2020-05-13T23:01:56.602Z"
    },
    {
        "id": 17 <automatically created by database>,
        "name": "Sophie's World" <Just an example>,
        "image_url": "http://sophiesworld.jpg" <Fake image Url>,
        "price": 2356 <posted price of Product>,
        "stock": 1425451 <posted stock of Product>,
        "createdAt": "2020-05-15T13:14:23.442Z",
        "updatedAt": "2020-05-15T16:19:22.981Z"
    },
    {
        "id": 18 <automatically created by database>,
        "name": "The Psychology Book: Big Ideas Simply Explained" <Just an example>,
        "image_url": "http://ThePsychologyBookBigIdeasSimplyExplained.jpg" <Fake image Url>,
        "price": 35346 <posted price of Product>,
        "stock": 75675 <posted stock of Product>,
        "createdAt": "2020-05-15T14:59:14.634Z",
        "updatedAt": "2020-05-15T16:19:35.676Z"
    }
]

```

_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error message>"
}
```

### GET /product /:id

> Find Product by id

_Request Header_
```
{
    "access_token": <This access token generated automatically when you Log-in/Register>
}

```

_Request Body_
```
not needed
```

_Request Params_
```
{ id: ':id' }
```

_Response (200 - Ok)_
```
[
    {
        "id": 1 <automatically created by database>,
        "name": "Quiet" <Just an example>,
        "image_url": "http://QuietBySusanCain.jpg" <Fake image Url>,
        "price": 60000 <posted price of Product>,
        "stock": 9 <posted stock of Product>,
        "createdAt": "2020-05-13T23:01:56.602Z",
        "updatedAt": "2020-05-13T23:01:56.602Z"
    },
]

```

_Response (404 - Not Found)_
```
{
    "errorCode": "DATA_NOT_FOUND",
    "message": "Product not found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error message>"
}
```
### POST /product

> Post new product

_Request Header_
```
{
    "access_token": <This access token generated automatically when you Log-in>
}

```

_Request Body_
```
{
  "name": "<posted name of Product>",
  "image_url": "<posted image of Product>"
  "price": "<posted price of Product>",
  "stock": "<posted stock of Product>"
}
```

__Request userData__
```
{
    "role" : <role after access_token decoded by authentication>,
}
```

_Response (201 - Created)_
```
{
    "id": 21 <automatically created by database>,
    "name": "The Highly Sensitive Person: How to Thrive When the World Overwhelms You" <Just an example>,
    "image_url": "http://HspByElaineNAron.jpg" <Fake image Url>,
    "price": 50000 <posted price of Product>,
    "stock": 4 <posted stock of Product>,
    "updatedAt": "2020-05-16T02:02:02.946Z",
    "createdAt": "2020-05-16T02:02:02.946Z"
}
```

_Response (400 - Bad Request)_
```
{
    "errorCode": "VALIDATION_ERROR",
    "message": "<returned error message>"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error message>"
}
```

### PUT /product/:id

> Update product by Id

_Request Header_
```
{
    "access_token": <This access token generated automatically when you Log-in/Register>
}

```

_Request Body_
```
{
  "name": "<posted name of Product>",
  "image_url": "<posted image of Product>"
  "price": "<posted price of Product>",
  "stock": "<posted stock of Product>"
}
```

_Request Params_
```
{ id: ':id' }
```

_Response (200 - Ok)_
```
{
    "name": "Product Succesfully Updated"
}
```

_Response (400 - Bad Request)_
```
{
    "errorCode": "VALIDATION_ERROR",
    "message": "<returned error message>"
}
```

_Response (404 - Not Found)_
```
{
    "errorCode": "DATA_NOT_FOUND",
    "message": "Product not found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error message>"
}
```

### DELETE /product/:id

> Delete product by id

_Request Header_
```
{
    "access_token": <This access token generated automatically when you Log-in>
}

```

_Request Body_
```
not needed
```

_Request Params_
```
{ id: ':id' }
```


_Response (200 - Ok)_
```
{
    "message": "Product successfully deleted"
}
```

_Response (404 - Not Found)_
```
{
    "message": "Product not found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error message>"
}
```


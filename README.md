# **An.dy URL Shortener**

[![GitHub issues](https://img.shields.io/github/release/afrobayofranco/StaticAPI.svg?style=plastic)](https://github.com/afrobayofranco/StaticAPI/releases)

Create a basic RESTful API in Node for a simplified URL shortener application

## Features
An.dy URL Shortener allows its users to shorten a URL to a very simple and useful shortened url. Once the shortURL is saved, users can use it to redirect to the original URL.

## Installation
To install An.dy URL Shortener clone the repository to your computer. You can do that either by clicking on the "clone or download" green button on the top right of An.dy repository, or by command line on you terminal using:

~~~~
git clone https://github.com/afrobayofranco/StaticAPI.git
~~~~

Once you have cloned the repository, get into the file itself and install the shortener by command line:

~~~~
cd StaticAPI
npm install
~~~~

#### Install Postman
There are different ways to work with the API, but I recommend to install the **Chrome** extension [Postman](https://www.getpostman.com/docs/introduction).

### Install MySQL

Install MySQL from the Terminal with [HomeBrew](http://brew.sh).

~~~~
brew install mysql
~~~~

Then start MySQL server.

~~~~
mysql.server start //Start server
~~~~

Create a database following MySQL documentation to [create db](http://dev.mysql.com/doc/refman/5.7/en/create-database.html)

#### Create an .env file
At root level create an .env file with the following variables:

~~~
DB_NAME={database_name}
DB_USER={Your_user_name}
DB_PASS={Your_password}
PORT=3000
~~~

## Run the API
### Start you server
On the Terminal start the Server with:

~~~~
node src/server.js
~~~~

If you already have installed Nodemon use:

~~~~
nodemon scr/server.js
~~~~

### HTTP Methods
#### POST to create new short Url
From Postman choose **POST** and in the URL line put:
~~~~
/api/v1/urls
~~~~
Choose the **Raw** option on the body and pass a json in the following form:
~~~~
{
  "url": "YOUR_URL",
  "customUrl": "YOUR_CUSTOM_URL"
}
~~~~

CustomUrl is optional if you prefer an specific shortened Url.

##### Response
In json format as follows:
~~~~
{
  "id": 39,
  "original_url": "www.colinas.com",
  "shortened_url": "an.dy/7161278"
}
~~~~

#### GET all Urls
From Postman choose **GET** and in the URL line put:
~~~~
/api/v1/urls
~~~~

##### Response
In json format as follows:
~~~~
[
  {
    "id": 1,
    "original_url": "www.yahoo.com",
    "shortened_url": "an.dy/prueba",
    "createdAt": "2017-01-07T03:18:50.000Z",
    "updatedAt": "2017-01-07T03:18:50.000Z"
  },
  {
    "id": 3,
    "original_url": "www.yahoo.com",
    "shortened_url": "an.dy/3571805",
    "createdAt": "2017-01-07T03:19:15.000Z",
    "updatedAt": "2017-01-07T03:19:15.000Z"
  },
  {
    "id": 4,
    "original_url": "www.yahoo.com",
    "shortened_url": "an.dy/6448874",
    "createdAt": "2017-01-07T03:19:36.000Z",
    "updatedAt": "2017-01-07T03:19:36.000Z"
  }
]
~~~~

#### GET Url by ID
From Postman choose **GET** and in the URL line put:
~~~~
/api/v1/urls/:id
~~~~

Where **:id** is the id number to look for.

##### Response
In json format as follows:
~~~~
{
  "id": 9,
  "original_url": "www.google.com",
  "shortened_url": "an.dy/7872010"
}
~~~~

#### UPDATE Url by Id
From Postman choose **POST** and in the URL line put:
~~~~
/api/v1/urls/:id
~~~~

Where **:id** is the id number to look for.

Choose the **Raw** option on the body and pass a json in the following form:
~~~~
{
  "url": "YOUR_URL",
  "customUrl": "YOUR_CUSTOM_URL"
}
~~~~

CustomUrl is optional if you prefer an specific shortened Url.

##### Response
In json format as follows:
~~~~
{
  "id": 43,
  "original_url": "www.github.com",
  "shortened_url": "an.dy/gHub"
}
~~~~

#### DELETE Url by Id
From Postman choose **DELETE** and in the URL line put:
~~~~
/api/v1/urls/:id
~~~~

Where **:id** is the id number to look for.

##### Response
In json format as follows if delete was successful:
~~~~
{
  "message": "Item has been deleted."
}
~~~~
In json format as follows if item does not exists, or has been deleted already.
~~~~
{
  "message": "That ID is not registered in our database."
}
~~~~


---

## DEBUG Features
A debug feature was added to facilitate determining errors on endpoints, models, and data connections.

Debug mode can be activated by command line while starting the server and setting the environmental variable:
~~~~
DEBUB=true
~~~~


### Use
With any of the HTTP methods a debug message will appear in the following form:
~~~~
Fri, 13 Jan 2017 01:38:24 GMT:
   [an.dy_url_shortener] GET ALL Model working
Fri, 13 Jan 2017 01:38:24 GMT:
   [an.dy_url_shortener] GET ALL working on /v1/urls
 ~~~~

### Setting your own debug messages
Put the following line were you want to get a debug message:
~~~~
debugTool.debug('YOUR_MESSAGE', '{type}');
~~~~

 #### Error Types

 ***success*** will turn debug message to green color.
 ***error*** will turn debug message to red color.
 You can live the argument empty and debug message will be yellow color.

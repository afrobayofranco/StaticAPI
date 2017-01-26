![an.dy url shortener](src/routes/public/images/andy_url_shortener.png "an.dy url shortener")

# An.dy URL Shortener [![GitHub issues](https://img.shields.io/github/release/afrobayofranco/StaticAPI.svg)](https://github.com/afrobayofranco/StaticAPI/releases) [![codeship](https://codeship.com/projects/a8205c20-c25e-0134-5696-22c030d3a647/status?branch=hrelease)](https://app.codeship.com/projects/197433)

Create a basic RESTful API in Node for a simplified URL shortener application

[Features](#features)  
[Installation](#installation)  
[Run the API](#running)  
[Debugging](#debugging)  
[Testing](#testing)  
[Coding Style](#codingstyle)  
[Workflow](#workflow)  
[Deployment](#deployment)  

## Features<a name="features">
An.dy URL Shortener allows its users to shorten a URL to a very simple and useful shortened url. Once the shortURL is saved, users can use it to redirect to the original URL.

## Installation<a name="installation">
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

## Run the API<a name="running">
### Start you server
On the Terminal start the Server with:

~~~~
node src/server.js
~~~~

If you already have installed Nodemon use:

~~~~
nodemon src/server.js
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

#### GO to a shortened url

To got to a shortened URL use the endpoint:
~~~~
/go/:shortUrl
~~~~

The **shortUrl** parameter is the path without the **an.dy/ part**.

For example, if you created the short url:

{
  "id": 43,
  "original_url": "www.github.com",
  "shortened_url": "an.dy/gHub"
}

In order to use the /go endpoint to go to ***www.github.com*** you should use:
~~~~
/go/gHub
~~~~

---

## DEBUG Features<a name="debugging">
A debug feature was added to facilitate determining errors on endpoints, models, and data connections.

Debug mode can be activated by command line while starting the server and setting the environmental variable:
~~~~
DEBUG=true
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
***warn*** will turn debug message to yellow color.

---

## Testing<a name="testing">
Unit testing is provided with mocha, chai, and supertest npm modules.

There are tests for every method in every model, and a dynamic test for every route.

In order to run the tests use:
~~~~
npm test
~~~~
Or if you have mocha install globally (with the -g option), you could also use:
~~~~
mocha
~~~~
You can also use debug mode with the Unit Test as so:
~~~~
DEBUG=true npm test
~~~~

A complete successful test should look like this:

~~~~
Models_API
    ✓ Should CREATE record in db
    ✓ Should GET ALL from db
    ✓ Should GET by ID from db
    ✓ Should UPDATE record by ID in db
    ✓ Should GET original URL by shortened_url (GO)
    ✓ Should DELETE record by ID in db

  Routes
an.dy is running on 3000
    ✓ API Status: /status
    ✓ Create a new record: /api/v1/urls
    ✓ Get all records: /api/v1/urls
    ✓ Get record by Id: /api/v1/urls/:id
    ✓ Update record by Id: /api/v1/urls/:id
    ✓ Delete record by Id: /api/v1/urls/:id
    ✓ Go to url by short Id: /go/:shortId
~~~~
---

## Coding Style<a name="codingstyle">
The coding style for this API follows the [airbnb](https://github.com/airbnb/javascript) style guide. Linter was used to process the code and ensure it complies with the style guide.

---

## Workflow<a name="workflow">
1. Create a new feature branch
~~~~
git checkout -b <feature_branch_name>
~~~~

2. Work, commit and push changes on the feature branch
~~~~
git status
git add -A
git commit -m 'your_message'
git push origin <feature_branch_name>
git status
~~~~
Run the app and test to be sure everything is running correctly.

3. Merge feature brach to master
~~~~
git checkout master
git status
git merge <feature_branch_name>
git push origin master
git status
~~~~
Run the app and test to be sure everything is running correctly.
This is the last chance to check that everything is running to expects,
**be completely sure everything is working before deployment!**

## Deployment<a name="deployment">

  * Deploy to HEROKU
  ~~~~
  git checkout hrelease
  git status
  git merge master
  git push origin hrelease
  git status
  ~~~~
  A new release has being sent to Heroku pipeline, if it passes codeship test, it will go to staging.

  * Deploy to DIGITAL OCEAN
  ~~~~
  git checkout master
  git status
  git push ProductionServer master
  ~~~~

## Version Bumper
This API counts with an automated version bumper, it will bump the part of the version indeicated by 1.
To use it, on you command line do:
~~~~
gulp bump { --major | --minor | --patch }
~~~~

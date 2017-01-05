# **An.dy URL Shortener**
Create a basic RESTful API in Node for a simplified URL shortener application

## Features
An.dy URL Shortener allows its users to shorten a URL to a very simple and useful shortened url.

## Installation
To install An.dy URL Shortener clone the repository to your computer. You can do that either by clicking on the "clone or download" green button on the top right of my repository, or by command line on you terminal using:

~~~~
git clone https://github.com/afrobayofranco/StaticAPI.git
~~~~

Once you have cloned the repository install the shortener by command line:

~~~~
npm install
~~~~

#### Install Postman
There are different ways to work with the API, but I recommend to install [Postman](https://www.getpostman.com/docs/introduction) which is a **Chrome** extension.

## Run the API
### Start you server
On the command line from the Terminal start the Server with:

~~~~
node scr/server.js
~~~~

If you already have installed Nodemon use:

~~~~
nodemon scr/server.js
~~~~

#### Using the POST method
From Postman choose **POST** and in the URL line put:
~~~~
http://localhost:3000/api/v1/url  
~~~~
In the body select the **x-www-form-urlencoded** option and then for the **Key** use **URL**. The **Value** will be the URL to be shortened.

#### Using the GET method
From your browser in the address line put:
~~~~
http://localhost:3000/api/v1/YOUR_URL
~~~~

## Response
Response comes in Json format as follows:
~~~~
{
  "original_url": "www.YOUR_URL.com",
  "shortened_url": "an.dy/####"
}
~~~~

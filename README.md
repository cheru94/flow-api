# FLOW API

A RESTful API to see weather information

---
## Requirements

For development, you will need Node.js and npm, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH an also `npm`

- #### Node installation 

  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).
  
- #### Node installation on Ubuntu

You can install nodejs and npm easily with apt install, just run the following commands.

    $ sudo apt install nodejs
    $ sudo apt install npm

If the installation was successful, you should be able to run the following command.

    $ node --v
    v12.14.1

    $ npm --v
    6.13.4

---

## Install

    $ git clone https://github.com/cheru94/flow-api
    $ cd flow-api
    $ npm install

## Running the project

    $ npm run dev
    
    
    
## Endpoints 


  ## /v1  
  
  - Returns a message

  ## /v1/location

  - Returns the data of the city location from ip-api


  ## /v1/current[/city]

  - city is an optional parameter. Returns the city data or the actual location from ip-api and the actual weather

  ## /v1/forecast[/city]
  
  - city is an optional parameter. Returns the city data or the actual location from ip-api and the forecast weather up to 5 days 

  ---

## Test project 

You will need two terminals

    $ npm run dev
    $ npm run test
    

    
    

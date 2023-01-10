# a***Sense AG UI
This repository provides a React/TypeScript based front-end for the gas station management application.
# Demo
**This UI is running on http://5.75.248.246**
# Flows
**Seeing gas station locations on map:**

 - When opening the application, a GET request will be sent to the back-end and all gas stations are rendered on the OSM based map as blue markers
 - When hovering over the marker, you should see gas station name and pricing for the fuel types that are currently marked as active

**Adding a gas station to the map:**
 1. Click the "Add station" button on the bottom-left
 2. Click on a location on the map
 3. A reverse geocode request will be sent to a third-party API and after this is resolved, you will see a modal on your screen
 4. City, street, house number and coordinates are prefilled based the clicked location and the result of the reverse geocode search. You can change those parameters, as reverse geocoding is not always accurate
 5. You have to fill out station name and can fill out pricing details (assumed to be in CHF) and availability (checkboxes behind the price inputs) of different fuel pump types at this location
 6. Click "Save". A POST request with the new station data will be sent to the back-end. All station locations are then requested again and every station marker will be re-rendered

**Modifying an existing location:**

 - Click on the marker of the station you wish to modify
 - A station modification model will open where you can change every parameter of the station. Note that if you change coordinates, the new city, street and house number will not be automatically determined but will have to be updated manually
 - Click "Save". A PUT request with the modified station data will be sent to the back-end. All station locations are then requested again and every station marker will be re-rendered

**Deleting an existing location:**

 - Click on the marker of the station you wish to delete
 - A station modification model will open
 - Click "Delete". A DELETE request with the modified station data will be sent to the back-end. All station locations are then requested again and every station marker will be re-rendered

# Local setup instructions
Requirements:
 - Node.js >=**16.0.0**
 - asense-api running on *http://localhost:3080*

#### Set up the UI
This UI has not been dockerized. To set it up, clone this repository and install the dependencies:

    $ cd asense-ui
    $ npm install
To start the application, run:

    $ npm start
*UI will be accessible from port :3080*

# Todo

 - Unit test coverage
 - E2E test coverage
 - Docker and Docker-Compose stack setup
 - UX improvements - loader when reverse geocoding coordinates, automatically fetching address data when modifying the coordinates of the station, better instructions the the user etc.
 - Error handling
 - Address accessibility & screen-reader compatibility issues

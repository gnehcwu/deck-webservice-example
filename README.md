# A web service example that returns shuffled decks of playing cards.
[![Build Status](https://travis-ci.org/gnehcc/deck-webservice-example.svg?branch=master)](https://travis-ci.org/gnehcc/deck-webservice-example)

### How to Start
- clone the repository
- `$ npm install` all the dependencies
- `$ npm start`
- use curl or tools like postman for testing locally.

### Test
Go to your command line, change directory to the repo, and run `$ npm test` in command line.

### Supported routes
- POST /api/deck/new
- PUT /api/deck/:id/shuffle
- PUT /api/deck/:id/deal
- GET /api/deck/:id
- PUT /api/deck/:id/cut/:position

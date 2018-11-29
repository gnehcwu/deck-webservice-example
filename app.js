const restify = require('restify');
const errs = require('restify-errors');
const Deck = require('./model/deck');

// for storing decks in memory only.
let deckPool = {};

const server = restify.createServer();

// universal handler for valid deck checking
const handleNotFound = (req, res, next) => {
  const id = req.params.id;

  if (id) {
    const deck = deckPool[id]

    if (deck !== undefined) {
      res.deck = deck;
      return next();
    } else {
      return next(new errs.NotFoundError(`Deck: ${id} not found!`));
    }
  } else {
    return next();
  }
};

// use the universal handler
server.use(handleNotFound);

/*
    Routes:
    POST /api/deck/new
    PUT /api/deck/:id/shuffle
    PUT /api/deck/:id/deal
    GET /api/deck/:id
    PUT /api/deck/:id/cut/:position
*/
server.post('/api/deck/new', (req, res, next) => {
  const deck = new Deck();
  deckPool[deck.id] = deck;

  res.send(201, deck);
  return next();
});

server.put('/api/deck/:id/shuffle', (req, res, next) => {
  const deck = res.deck;
  delete res.deck;

  deck.shuffle();
  res.send(200, deck);
  return next();
});

server.put('/api/deck/:id/deal', (req, res, next) => {
  const deck = res.deck;
  delete res.deck;
  card = deck.deal();

  res.send(200, {
    card: card,
    remaining: deck.cards.length,
    dealt: deck.dealtCards.length,
    deck: `/api/deck/${deck.id}`
  });
  return next();
});

server.put('/api/deck/:id/cut/:position', (req, res, next) => {
  const deck = res.deck;
  delete res.deck;

  deck.cut(req.params.position);
  res.send(200, deck);
  return next();
});

server.get('/api/deck/:id', (req, res, next) => {
  const deck = res.deck;
  delete res.deck;

  res.send(200, deck);
  return next();
});

// General error handling
server.on('restifyError', function (req, res, err, cb) {
  return cb(new errs.InternalServerError('an internal server error occurred, please try later!'));
});

// start the server when running unit tests
if (!module.parent) {
  server.listen(process.env.PORT || 8080, function () {
    console.log(`server listening at ${server.address().port}`);
  });
}

module.exports = server;

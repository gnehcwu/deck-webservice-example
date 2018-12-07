const chai = require('chai');
const expect = chai.expect;
let request = require('supertest');
const app = require('../app');

describe('App', () => {
  let client;
  beforeEach(() => {
    client = request(app);
  });

  it('should create a new deck on /api/deck/new POST', done => {
    client
      .post('/api/deck/new')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          const result = res.body;
          expect(result.id).to.not.undefined;
          expect(result.cards.length).to.equal(52);
          expect(result.dealt_cards.length).to.equal(0);

          const cardSet = new Set(result.cards);
          // has 52 different cards
          expect(cardSet.size).to.equal(52);
          done();
        }
      });
  });

  it('should deal a card on /api/deck/:id/deal POST', done => {
    client
      .post('/api/deck/new')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        const deckId = res.body.id;
        client
          .post(`/api/deck/${deckId}/deal`)
          .expect(200)
          .end((err, res) => {
            const result = res.body;
            expect(result.card).to.not.undefined;
            done();
          });
      });
  });

  it('should shuffle a deck on /api/deck/:id/shuffle POST', done => {
    let originCards;
    client
      .post('/api/deck/new')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        const deckId = res.body.id;
        originCards = res.body.cards;
        client
          .post(`/api/deck/${deckId}/shuffle`)
          .expect(200)
          .end((err, res) => {
            const result = res.body;

            // shuffled deck's cards have same content but different order
            expect(result.cards.length).to.equal(52);
            expect(result.cards).to.not.eql(originCards);
            let newCards = result.cards.slice().sort();
            originCards.sort();
            expect(newCards).to.eql(originCards);

            done();
          });
      });
  });

  it('should cut a deck on /api/deck/:id/cut/:position POST', done => {
    let firstCard, secondCard;
    client
      .post('/api/deck/new')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        const body = res.body;
        const deckId = body.id;
        firstCard = body.cards[0];
        secondCard = body.cards[1];
        client
          .post(`/api/deck/${deckId}/cut/1`)
          .expect(200)
          .end((err, res) => {
            const result = res.body;
            const cards = result.cards;
            const cardNumber = cards.length;

            expect(cardNumber).to.equal(52);
            expect(cards[0]).to.equal(secondCard);
            expect(cards[cardNumber - 1]).to.equal(firstCard);
            done();
          });
      });
  });

  it('should support multiple decks concurrently', done => {
    let decks = [];
    client.post('/api/deck/new')
      .expect(201)
      .end((err, res) => {
        decks.push(res.body.id);

        // create another deck
        client.post('/api/deck/new')
          .expect(201)
          .end((err, res) => {
            decks.push(res.body.id);

            expect(decks.length).to.equal(2);
            expect(decks[0]).to.not.undefined;
            expect(decks[1]).to.not.undefined;
            // deck should be different
            expect(decks[0]).to.not.equal(decks[1]);

            // get deck on /api/deck/:id GET
            for (let id of decks) {
              client.get(`/api/deck/${id}`)
                .expect(200)
                .end((err, res) => {
                  const result = res.body;
                  const cards = result.cards;
                  expect(result.id).to.equal(id);
                  expect(cards.length).to.equal(52);

                  // call done after all decks have been retrieved
                  if (id === decks[1]) {
                    done();
                  }
                });
            }
          });
      });
  });
});

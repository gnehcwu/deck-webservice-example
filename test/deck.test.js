const chai = require('chai');
const expect = chai.expect;
const Deck = require('../model/deck');

describe('Deck', () => {
  let deck;
  beforeEach(() => {
    deck = new Deck();
  });

  it('should create deck with 52 cards', () => {
    expect(deck.id).to.not.undefined;
    expect(deck.cards.length).to.equal(52);
    expect(deck.dealtCards.length).to.equal(0);
  });

  it('should be able to shuffle deck cards', () => {
    const {
      cards
    } = deck;
    let firstCard = cards[0];
    let lastCard = cards[cards.length - 1];
    let cardSet = new Set(cards);

    // assert deck has 52 different cards
    expect(cardSet.size).to.equal(52);

    deck.shuffle();
    expect(cards[0]).to.not.equal(firstCard);
    expect(cards[cards.length - 1]).to.not.equal(lastCard);
    cardSet = new Set(deck.cards);
    expect(cardSet.size).to.equal(52);
  });

  it('should be able to deal a card', () => {
    deck.deal();

    const {
      cards,
      dealtCards
    } = deck;
    expect(cards.length).to.equal(51);
    expect(dealtCards.length).to.equal(1);
  });

  it('should be able to reset deck', () => {
    let id = deck.id;

    deck.shuffle();
    deck.deal();
    expect(deck.cards.length).to.equal(51);

    deck.reset();
    expect(deck.cards.length).to.equal(52);
    expect(deck.id).to.equal(id);
  });

  it('should be able to cut a deck', () => {
    const {
      cards
    } = deck;
    let firstCard = cards[0];
    let secondCard = cards[1]

    deck.cut(1);
    expect(deck.cards[deck.cards.length - 1]).to.equal(firstCard);
    expect(deck.cards[0]).to.equal(secondCard);
  });
})

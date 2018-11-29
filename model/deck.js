const shortid = require('shortid');

class Deck {
  constructor() {
    this.id = shortid.generate();
    this.cards = [];
    this.dealtCards = [];
    this.reset();
    this.shuffle();
  }

  reset() {
    this.cards = [];

    const suites = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
    const values = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];

    for (let suit of suites) {
      for (let value of values) {
        this.cards.push(`${suit}-${value}`);
      }
    }
  }

  // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
  shuffle() {
    const {
      cards
    } = this;
    let leftIndex, rightIndex = cards.length;

    while (rightIndex) {
      rightIndex -= 1;
      leftIndex = Math.floor(Math.random() * rightIndex);
      [cards[rightIndex], cards[leftIndex]] = [cards[leftIndex], cards[rightIndex]];
    }

    return this;
  }

  deal() {
    let dealtCard = this.cards.pop();
    this.dealtCards.push(dealtCard);
    return dealtCard;
  }

  cut(position) {
    let {
      cards
    } = this;
    let topPortion = cards.splice(0, position);
    this.cards = cards.concat(topPortion);

    return this;
  }

  // lazy way to do a response normalization, normally should be done in post-processing/output adapter globally
  toJSON() {
    return {
      id: this.id,
      cards: this.cards,
      dealt_cards: this.dealtCards,
      remaining: this.cards.length,
      dealt: this.dealtCards.length,
      url: `/api/deck/${this.id}`,
    };
  }
}

module.exports = Deck;

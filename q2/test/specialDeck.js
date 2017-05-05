function f(v, s) {
  return {
    value: v,
    suit: s
  }
}
const StraightFlush = [
  f(1, 1),
  f(3, 1),
  f(2, 1),
  f(5, 1),
  f(4, 1),
]

const FourKind = [
  f(3, 1),
  f(3, 2),
  f(3, 4),
  f(5, 1),
  f(3, 3),
]

const FullHouse = [
  f(4, 1),
  f(4, 2),
  f(4, 4),
  f(10, 1),
  f(10, 3),
]

const Flush = [
  f(5, 2),
  f(4, 2),
  f(6, 2),
  f(12, 2),
  f(10, 2),
]

const Straight = [
  f(9, 2),
  f(8, 4),
  f(6, 2),
  f(7, 3),
  f(10, 1),
]

const Unmatch = [
  f(9, 2),
  f(8, 3),
  f(10, 2),
  f(7, 3),
  f(10, 1),
]

const EmptyDeck = []

class DeckFactory {
  constructor() {
    this.resetPool()
  }
  createRandomDeck() {
    let deck = []
    const DECKNUM = 5
    for (let i = 1; i <= DECKNUM; i++) {
      deck.push(this.cardPool.splice(Math.floor(Math.random() * this.cardPool.length) - 1, 1)[0])
    }
    return deck
  }
  resetPool() {
    const SUITNUM = 4, CARDNUM = 13
    this.cardPool = []
    for (let i = 1; i <= SUITNUM; i++) {
      for (let j = 1; j <= CARDNUM; j++) {
        this.cardPool.push({
          value: j,
          suit: i
        })
      }
    }
  }
}

module.exports = {
  StraightFlush,
  FourKind,
  FullHouse,
  Flush,
  EmptyDeck,
  Straight,
  Unmatch,
  DeckFactory,
}

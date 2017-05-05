var chai = require('chai'),
    assert = chai.assert

var DeckCompare = require('./../index'),
    DeckConfig = require('./specialDeck')

describe('DeckCompare', () => {
  const DC = new DeckCompare()
  describe('constructor', () => {
    it('should return Object', (done) => {
      assert.typeOf(DC, 'object')
      done()
    })
    it('All should return Function ', (done) => {
      assert.typeOf(DC.analysis, 'function')
      assert.typeOf(DC.compare, 'function')
      done()
    })
  })
  describe('#analysis()', () => {
    it('StraightFlush', (done) => {
      assert.equal(DC.analysis(DeckConfig.StraightFlush), 'StraightFlush')
      done()
    })
    it('FourKind', (done) => {
      assert.equal(DC.analysis(DeckConfig.FourKind), 'FourKind')
      done()
    })
    it('FullHouse', (done) => {
      assert.equal(DC.analysis(DeckConfig.FullHouse), 'FullHouse')
      done()
    })
    it('Flush', (done) => {
      assert.equal(DC.analysis(DeckConfig.Flush), 'Flush')
      done()
    })
    it('Straight', (done) => {
      assert.equal(DC.analysis(DeckConfig.Straight), 'Straight')
      done()
    })
    it('Unmatch', (done) => {
      assert.equal(DC.analysis(DeckConfig.Unmatch), 'Unmatch')
      done()
    })
    it('EmptyDeck', (done) => {
      try {
        assert.typeOf(DC.analysis(DeckConfig.EmptyDeck), 'error')
      } catch (e) {
        done()
      }
    })
  })
  describe('#compare()', () => {
    it('StraightFlush > FourKind', (done) => {
      assert.equal(DC.compare(DeckConfig.StraightFlush, DeckConfig.FourKind), 1)
      assert.equal(DC.compare(DeckConfig.FourKind, DeckConfig.StraightFlush), 2)
      assert.equal(DC.compare(DeckConfig.StraightFlush, DeckConfig.StraightFlush), 3)
      done()
    })
    it('FourKind > FullHouse', (done) => {
      assert.equal(DC.compare(DeckConfig.FourKind, DeckConfig.FullHouse), 1)
      assert.equal(DC.compare(DeckConfig.FullHouse, DeckConfig.FourKind), 2)
      assert.equal(DC.compare(DeckConfig.FourKind, DeckConfig.FourKind), 3)
      done()
    })
    it('FullHouse > Flush', (done) => {
      assert.equal(DC.compare(DeckConfig.FullHouse, DeckConfig.Flush), 1)
      assert.equal(DC.compare(DeckConfig.Flush, DeckConfig.FullHouse), 2)
      assert.equal(DC.compare(DeckConfig.FullHouse, DeckConfig.FullHouse), 3)
      done()
    })
    it('RandomDeck Test', (done) => {
      const DeckFactory = new DeckConfig.DeckFactory()
      const deck1 = DeckFactory.createRandomDeck(),
            deck2 = DeckFactory.createRandomDeck()
      console.log(deck1)
      console.log(deck2)
      console.log(DC.compare(deck1, deck2))
      assert.notEqual(DC.compare(DeckConfig.StraightFlush, deck1), 2)
      done()
    })
  })
})

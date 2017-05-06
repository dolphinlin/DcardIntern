var chai = require('chai'),
    assert = chai.assert
var calmax = require('./../index')

const mockVisitor = require('./mockVisitor')


describe('Visitor maximum', () => {
  describe('#calMax()', () => {
    it('should turn 4 => 10 - 20', (done) => {
      assert.equal(calmax(mockVisitor.v1, 10, 20), 4)
      done()
    });
    it('should turn 3 => 1 - 5', (done) => {
      assert.equal(calmax(mockVisitor.v1, 1, 5), 3)
      done()
    });
    it('should turn 3 => 40 - 41', (done) => {
      assert.equal(calmax(mockVisitor.v1, 40, 41), 3)
      done()
    });
    it('should turn 2 => 50 - 60', (done) => {
      assert.equal(calmax(mockVisitor.v1, 50, 60), 2)
      done()
    });
    it('should turn 1 => 1 - 1', (done) => {
      assert.equal(calmax(mockVisitor.v1, 1, 1), 1)
      done()
    });
    it('should turn 1 => 5 - 10', (done) => {
      assert.equal(calmax(mockVisitor.v3, 5, 10), 1)
      done()
    });
    it('random test 15 - 20', (done) => {
      const randomData = mockVisitor.createRandom(30)
      console.log(randomData);
      console.log(`maximum => ${calmax(randomData, 15, 20)}`)
      done()
    });
  });
});

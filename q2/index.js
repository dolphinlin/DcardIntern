class Handler {
  constructor() {
    this.value = 0
  }
  setNext(next) {
    next._setValue(this.value + 1)
    this.next = next
    return this.next
  }
  doNext(params) {
    if (this.next) {
      return this.next.handle(params)
    } else {
      return `deck unprocess`
    }
  }
  handle(params) {
    if (params.length !== 5) {
      throw new Error('deck length error!')
    }
    params.sort((a, b) => a.value - b.value) //sort deck
    return this.doNext(params)
  }
  _setValue(v) {
    this.value = v
  }
}

class StraightFlushHandler extends Handler {
  handle(params) {

    const sameSuit = params.every((card, index, array) => {
      return card.suit === array[index - 1 < 0 ? 0 : index - 1].suit
    })
    if (sameSuit) {
      const sequence = params.every((card, index, array) => {
        if (index === 4) return true

        return card.value === array[index + 1].value - 1
      })
      if (sequence) {
        const sum = params.reduce((p, c) => p + c.value, 0)
        return `${this.value + sum * 0.01} - StraightFlush`
      } else {
        return this.doNext(params)
      }
    } else {
      return this.doNext(params)
    }
  }
}

class FourKindHandler extends Handler {
  handle(params) {
    //first handle sorted

    const tmp1 = params.slice(0, 4).every((card, index, array) => {
      return card.value === array[index - 1 < 0 ? 0 : index - 1].value
    })
    const tmp2 = params.slice(1).every((card, index, array) => {
      return card.value === array[index - 1 < 0 ? 0 : index - 1].value
    })

    if (tmp1 || tmp2) {
      return `${this.value} - FourKind`
    } else {
      return this.doNext(params)
    }
  }
}

class FullHouseHandler extends Handler {
  handle(params) {
    //first handle sorted

    const tmp1 = params.slice(0, 3).every((card, index, array) => {
      return card.value === array[index - 1 < 0 ? 0 : index - 1].value
    }) && params[3].value === params[4].value

    const tmp2 = params.slice(2).every((card, index, array) => {
      return card.value === array[index - 1 < 0 ? 0 : index - 1].value
    }) && params[0].value === params[1].value

    if (tmp1 || tmp2) {
      return `${this.value} - FullHouse`
    } else {
      return this.doNext(params)
    }
  }
}

class FlushHandler extends Handler {
  handle(params) {
    const sameSuit = params.every((card, index, array) => {
      return card.suit === array[index - 1 < 0 ? 0 : index - 1].suit
    })

    if (sameSuit) {
      return `${this.value} - Flush`
    } else {
      return this.doNext(params)
    }
  }
}

class StraightHandler extends Handler {
  handle(params) {
    //first handle sorted

    const sequence = params.every((card, index, array) => {
      if (index === 4) return true

      return card.value === array[index + 1].value - 1
    })

    if (sequence) {
      return `${this.value + params[4].value * 0.01} - Straight`
    } else {
      return this.doNext(params)
    }
  }
}

class UnmatchHandler extends Handler {
  handle(params) {
    const max = params.reduce((a, b) => {
        return Math.max(a, b.value);
    }, 0)
    return `${this.value + max * 0.01} - Unmatch`
  }
}


/*
** params (deck1, deck2) return 1|2|3
** 1 = deck1 is bigger, 3 = equal
card interface ->
card = {
  value: 1, // 1~13 (A-K),
  suit: 1 // 1~4 (4 suit)
}
deck = card[4] //5 card
*/
class DeckCompare {
  constructor() {
    this.handler = new Handler()
    const h1 = new StraightFlushHandler(),
        h2 = new FourKindHandler(),
        h3 = new FullHouseHandler(),
        h4 = new FlushHandler(),
        h5 = new StraightHandler(),
        h = new UnmatchHandler()
        // u can change the handler sequence, and also add new handler

    this.handler.setNext(h1).setNext(h2).setNext(h3).setNext(h4).setNext(h5).setNext(h)
  }
  analysis(d) {
    return this.handler.handle(d).split(' - ')[1]
  }
  compare(d1, d2) {

    const d1value = this.handler.handle(d1),
          d2value = this.handler.handle(d2)

    // console.log(`Deck 1 ->${d1value}\n`, d1)
    // console.log(`Deck 2 ->${d2value}\n`, d2)

    const d1valueNum = +d1value.split(' - ')[0],
          d2valueNum = +d2value.split(' - ')[0]
    if (d1valueNum !== 0 && d2valueNum !== 0) {
      if (Math.floor(d1valueNum) < Math.floor(d2valueNum)) {
        return 1
      } else if (Math.floor(d1valueNum) === Math.floor(d2valueNum)) {
        if ((d1valueNum % 1) === (d2valueNum % 1)) return 3
        return (d1valueNum % 1) > (d2valueNum % 1) ? 1 : 2
      } else {
        return 2
      }
    } else {
      throw new Error('deck unprocess')
    }
  }
}

module.exports = DeckCompare

const visitor = {
  arrival: 1494041889023,
  departure: 1494041890023,
}

function f(a, d) {
  return {
    arrival: a,
    departure: d
  }
}

function createRandom(n) {
  let tmpArr = []
  for (let i = 0; i < n; i++) {
    const endTime = Math.floor(Math.random() * 50)
    tmpArr.push(f(Math.floor(Math.random() * endTime), endTime))
  }

  return tmpArr
}

const v1 = [
  f(1, 50),
  f(3, 10),
  f(40, 45),
  f(10, 30),
  f(5, 35),
  f(15,50)
]

const v2 = [
  f(1, 10),
  f(5, 9),
  f(2, 4),
  f(3, 7),
]

const v3 = [
  { arrival: 2, departure: 7 },
  { arrival: 19, departure: 38 },
  { arrival: 13, departure: 16 },
  { arrival: 15, departure: 32 },
  { arrival: 14, departure: 16 }
]


module.exports = {
  v1,
  v2,
  v3,
  createRandom,
}

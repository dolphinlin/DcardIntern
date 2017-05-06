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
  { arrival: 0, departure: 2 },
  { arrival: 14, departure: 30 },
  { arrival: 18, departure: 32 },
  { arrival: 9, departure: 29 },
  { arrival: 17, departure: 25 }
]


module.exports = {
  v1,
  v2,
  v3,
  createRandom,
}

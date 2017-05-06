const visitors = require('./test/mockVisitor')

function calMax(vs, startTime, endTime) {
  const p = vs.filter(v => {
    return (v.arrival >= startTime && v.arrival <= endTime) || (v.arrival <= startTime && v.departure >= endTime) || v.departure === startTime
  })
  // console.log(p);
  p.sort((a, b) => {
    return a.arrival - b.arrival
  })

  let lastStartTime = 0,
      max = 0,
      maxTime = 0
  for (let i = 0; i < p.length; i++ ) {
    const tmpTime = (p[i].arrival > startTime ? startTime : p[i].arrival)
    if (lastStartTime === tmpTime) continue
    for (let time = tmpTime; time <= p[i].departure; time++ ) {
      let tmpMax = p.filter(v => v.arrival <= time && v.departure >= time).length
      if (tmpMax > max) {
        max = tmpMax
        maxTime = time
      }
    }
    lastStartTime = tmpTime
  }
  console.log(`Max in => ${maxTime}`)
  return max
}

module.exports = calMax;

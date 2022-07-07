const kucoin = require('./kucoin')

// kucoin
kucoin.firstCoinFetch()
let counter = 0

// every 0.5 secs
setInterval(() => {
  kucoin.fetchForComparison()
  console.log(`Fetching.. iteration ${counter++}`)
}, 500)

console.log('Starting...')

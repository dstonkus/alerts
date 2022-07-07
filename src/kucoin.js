const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { exit } = require('process');
const gecko = require('./coingecko');
require('./telegram')();

// get ticker and full name from object
const getCoinName = (data) => {
  const firstIndex = data.items[0].title.indexOf('(');
  const secondIndex = data.items[0].title.indexOf(')');
  const ticker = data.items[0].title.slice(firstIndex + 1, secondIndex).trim();
  const fullName = data.items[0].title.slice(0, firstIndex).trim();
  const publishedAt = data.items[0].publish_at;
  const url = data.items[0].path;

  let nameForApi;
  //name for api
  if (fullName.includes(' ')) {
    nameForApi = fullName.replaceAll(' ', '-').toLowerCase();
  } else nameForApi = fullName.toLowerCase;

  return { ticker, fullName, publishedAt, url, nameForApi };
};

// coin name placeholder
let ticker;

// newest coin at the moment
const coinUrl =
  'https://www.kucoin.com/_api/cms/articles?page=1&pageSize=1&category=listing&lang=en_US';

const firstCoinFetch = async () => {
  const res = await fetch(coinUrl);
  const data = await res.json();

  if (data.items !== undefined) {
    const coinData = getCoinName(data);
    const { fullName, publishedAt } = coinData;
    ticker = coinData.ticker;

    console.log(
      `Newest KuCoin Coin: ${fullName} (${ticker}). Published at: ${publishedAt}`
    );
  }
};

const fetchForComparison = async () => {
  const res = await fetch(coinUrl);
  const data = await res.json();

  if (data.items !== undefined) {
    const coinData = getCoinName(data);
    const { fullName, publishedAt, url, nameForApi } = coinData;
    const newTicker = coinData.ticker;

    if (newTicker !== ticker) {
      // telegram group id
      const groupId = '-624069130';

      // const res = await sendMessageToGroup(
      //   groupId,
      //   `${fullName} (${newTicker}) just got listed on KuCoin! Published at: ${publishedAt}.
      // Link: https://kucoin.com/news/${url}`
      // );

      // getting available network list , contract addresses
      const getTokenInfo = await gecko.tokenInformation(nameForApi);

      console.log(getTokenInfo);
      // if (res !== undefined)
      exit();
    }
  }
};

module.exports = {
  firstCoinFetch,
  fetchForComparison,
};

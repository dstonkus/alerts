const importDynamic = new Function('modulePath', 'return import(modulePath)');
const fetch = async (...args: unknown[]) => {
  const module = await importDynamic('node-fetch');
  return module.default(...args);
};

const tokenInformation = async (ticker: string) => {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${ticker}?tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`
  );

  if (res !== undefined) {
    const { platforms } = await res.json();

    const contractList = Object.entries(platforms).map((el) => {
      return { name: el[0], address: el[1] };
    });

    return contractList;
  }
};

module.exports = {
  tokenInformation,
};

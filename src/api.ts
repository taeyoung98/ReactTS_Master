const BASE_URL = "https://api.coinpaprika.com/v1"

export async function fetchCoins() { // default X
  return await (await fetch(`${BASE_URL}/coins`)).json();
}

export async function fetchCoinInfo(coinId:string) {
  return await (await fetch(`${BASE_URL}/coins/${coinId}`)).json()
}
export async function fetchCoinPrice(coinId:string) {
  return await (await fetch(`${BASE_URL}/tickers/${coinId}`)).json()
}

export async function fetchCoinHistory(coinId:string) {
  const endDate = Math.floor(Date.now() / 1000) // today in seconds
  const startDate = endDate - 60*60*23 // yesterday in seconds

  return await (await fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`)).json()
  // return await (await fetch(`${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`)).json()  
}
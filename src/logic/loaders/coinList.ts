import coinCapController from "logic/storage/CoinCapController";

export async function coinTableLoader() {
  const coinList = await coinCapController.getCoinList();
  return coinList;
}

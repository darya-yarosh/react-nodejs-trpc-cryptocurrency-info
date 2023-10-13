import coinCapController from "logic/storage/CoinCapController";

export async function coinListLoader() {
  const coinList = await coinCapController.getCoinList();
  return coinList;
}

import coinCapController from "logic/storage/CoinCapController";

export async function coinLoader({ params }: any) {
  const coin = await coinCapController.getCoinById(params.id);
  return coin;
}
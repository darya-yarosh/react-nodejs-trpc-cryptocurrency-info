import { useEffect, useState } from 'react';

import Coin from 'models/Coin';

import 'App.scss';
import CoinListPage from 'components/pages/CoinListPage/CoinListPage';
import coinCapController from 'logic/storage/CoinCapController';

function App() {
  const [coinList, setCoinList] = useState<Coin[]>([]);

  async function loadStorage() {
    const loadedData = await coinCapController.getCoinList();

    if (loadedData === undefined) {
      window.alert("Error");
    } else {
      setCoinList(loadedData);
    }
  }

  useEffect(() => {
    loadStorage();
  }, [])

  return (
    <div className="app">
      <div className="app__wrapper">
        <header className="header"></header>
        <CoinListPage coinList={coinList} />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}

export default App;

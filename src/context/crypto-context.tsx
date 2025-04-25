import { createContext, useEffect, useState } from "react";
import { ICoin, ICoinPortfolio } from "../data.interface";
import { fakeFetchCrypto, fetchPortfolio } from "../api";

  const CryptoContext = createContext({
  assets:[] as ICoinPortfolio[],
  crypto: [] as ICoin[],
  loading: false,
 })

 export function CryptoContextProvider({children}) {
const [ loading, setLoading ] = useState<boolean>(false);
  const [crypto, setCrypto] = useState<ICoin[]>([]);
  const [assets, setAssets] = useState<ICoinPortfolio[]>([]);


function mapAssets(portfolio, result) {
  return portfolio.map((p) => {
    const coin = result?.find((c) => c.id === p.id);
    if (!coin) {
      throw new Error(`Coin ${p.id} not found in crypto data`);
    }
    return {
      grow: p.price < coin.price,
      growPercent: percentDifference(p.price, coin.price),
      totalAmount: p.amount * coin.price,
      totalProfit: p.amount * coin.price - p.amount * p.price,
      name: coin.name,
      ...p,
    }

  } )
}


  function percentDifference(a:number,b:number):number {
    return +(100 * Math.abs((a - b) / ((a + b) / 2))).toFixed(2)
  }


  useEffect(() => {
    async function preload() {
     setLoading(true)
     const { result } = await fakeFetchCrypto();
     const portfolio = await fetchPortfolio();
     setCrypto(result)
     setAssets(mapAssets(portfolio, result))
     setLoading(false)
    }
    preload()
   },[])

  function addAsset(newAsset) {
    setAssets((prev) => mapAssets(
      [...prev,
        newAsset
      ], crypto)
    )
  }

return (
    <CryptoContext.Provider value={{loading, crypto, assets, addAsset}}>{children}</CryptoContext.Provider>

)

    
 }

 export default CryptoContext
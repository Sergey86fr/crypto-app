import { ICoinPortfolio, ICryptoData } from "./data.interface"
import { cryptoPortfolio, dataCoin } from "./localData"




// const options = {
//     method: 'GET',
//     headers: {
//       accept: 'application/json',
//       'X-API-KEY': process.env.API_KEY,
//     }
//   };
  
//   fetch('https://openapiv1.coinstats.app/coins', options)
//     .then(res => res.json())
//     .then(res => console.log(res))
//     .catch(err => console.error(err));


// const options = {
//     method: 'GET',
//     headers: {
//       accept: 'application/json',
//       'X-API-KEY': process.env.API_KEY
//     }
//   };
  
//   fetch('https://openapiv1.coinstats.app/portfolio/coins', options)
//     .then(res => res.json())
//     .then(res => console.log(res))
//     .catch(err => console.error(err));


export function fakeFetchCrypto():Promise<ICryptoData> {
    return new Promise((resolve) => {
        setTimeout(()=> {resolve(dataCoin)},2000)
    })
}

export  function fetchPortfolio():Promise<ICoinPortfolio[]> {
    return new Promise((resolve) => {
        setTimeout(() => {resolve(cryptoPortfolio)},2000)
    })
}
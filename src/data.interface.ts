export interface ICryptoData {
    result: ICoin[]
    meta: Meta
  }
  
  export interface ICoin {
    id: string
    icon: string
    name: string
    symbol: string
    rank: number
    price: number
    priceBtc: number
    volume: number
    marketCap: number
    availableSupply: number
    totalSupply: number
    fullyDilutedValuation: number
    priceChange1h: number
    priceChange1d: number
    priceChange1w: number
    redditUrl: string
    twitterUrl: string
    explorers: string[]
    websiteUrl?: string
    contractAddress?: string
    decimals?: number
  }
  
  export interface Meta {
    page: number
    limit: number
    itemCount: number
    pageCount: number
    hasPreviousPage: boolean
    hasNextPage: boolean
  }
  

  export interface ICoinPortfolio {
    id: string;
    name?:string;
    amount: number;
    price: number;
    date: Date;
    grow?: boolean;
    growPercent?: number;
    totalAmount?: number;
    totalProfit?: number;
  }
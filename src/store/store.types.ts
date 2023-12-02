export interface IExchange {
  ccy: string;
  base_ccy: string;
  buy: string;
  sale: string;
}

export interface ApiStoreState {
  exchangeRate: IExchange[];
  currencyData: IExchange[];
 
}

export interface ApiStoreActions {
   addExchangeRate:(data:IExchange[])=>void;
   
}
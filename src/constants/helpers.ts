import { IExchange } from '../store/store.types';

export const isNumber = (value: any) => {
  return typeof value === 'number';
};

export const formatNumber = (value: number, signes: number) => {
  return value.toFixed(signes);
};

export const localStorageService = (data: IExchange[]) => {
  localStorage.setItem('exchange', JSON.stringify(data));
};

const storedData = localStorage.getItem('exchange');
export const localData = storedData ? JSON.parse(storedData) : null;

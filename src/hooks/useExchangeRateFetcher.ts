import { useEffect, useState } from 'react';
import useSWR from 'swr';
import useApiStore from '../store/store';
import { mockedData } from '../constants/mockedData';
import { localStorageService } from '../constants/helpers';

const useExchangeRateFetcher = () => {
  const { addExchangeRate } = useApiStore();
  const [counter, setCounter] = useState(() => {
    const storedCounter = localStorage.getItem('counter');
    return storedCounter ? JSON.parse(storedCounter) : '0';
  });

  useEffect(() => {
    localStorage.setItem('counter', JSON.stringify(Number(counter) + 1));
    if (Number(counter) > 5) {
      localStorage.setItem('counter', '0');
    }
  }, [counter]);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error } = useSWR(
    'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=4',
    fetcher
  );

  useEffect(() => {
    if (data) {
      addExchangeRate(data);
      localStorageService(data);
    } else if (error) {
      addExchangeRate(mockedData);
      localStorageService(mockedData);
    }
  }, [data, error, addExchangeRate]);

  return {
    isLoading: !data && !error,
  };
};

export default useExchangeRateFetcher;

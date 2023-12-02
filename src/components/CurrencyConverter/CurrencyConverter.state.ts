import { useState, useEffect } from 'react';
import { formatNumber } from '../../constants/helpers';
import React from 'react';
import useApiStore from '../../store/store';

const useCurrencyConverter = () => {
  const { exchangeRate } = useApiStore();
  const [amount1, setAmount1] = useState<number>(1);
  const [amount2, setAmount2] = useState<number>(1);
  const [currency1, setCurrency1] = useState<string>(exchangeRate[0]?.ccy || '');
  const [currency2, setCurrency2] = useState<string>(exchangeRate[2]?.ccy || '');

  const handleChangeClick = () => {
    const tempCurrency = currency1;
    setCurrency1(currency2);
    setCurrency2(tempCurrency);

    const findCurrencyValue1 = Number(exchangeRate.find((cur) => cur.ccy === currency1)?.buy) || 0;
    const findCurrencyValue2 = Number(exchangeRate.find((cur) => cur.ccy === currency2)?.sale) || 0;

    const newAmount1 = Number(formatNumber(((amount2 * findCurrencyValue2) / findCurrencyValue1), 2));
    const newAmount2 = Number(formatNumber(((amount1 * findCurrencyValue1) / findCurrencyValue2), 2));

    setAmount1(newAmount1);
    setAmount2(newAmount2);
  };

  useEffect(() => {
    if (exchangeRate && exchangeRate.length > 0) {
      handleCurrencyChange(currency1, true);
    }
  }, [exchangeRate, currency1]);

  const findCurrency1 = Number(formatNumber(Number(
    exchangeRate.find((cur) => cur.ccy === currency1)?.buy
  ) || 0, 2));
  const findCurrency2 = Number(formatNumber(Number(
    exchangeRate.find((cur) => cur.ccy === currency2)?.sale
  ) || 0, 2));

  const handleAmountChange = (newAmount: number, convertedAmount: number, isAmount1: boolean) => {
    if (isAmount1) {
      setAmount1(Number(formatNumber((newAmount),2)));
      setAmount2(Number(formatNumber((convertedAmount),2)));
    } else {
      setAmount1(Number(formatNumber((convertedAmount),2)));
      setAmount2(Number(formatNumber((newAmount),2)));
    }
  };

  const handleCurrencyChange = (newCurrency: string, isAmount1: boolean) => {
    const newAmount = isAmount1 ? amount1 : amount2;
    const findCurrencyValue = Number(exchangeRate.find((cur) => cur.ccy === newCurrency)?.buy) || 0;
    const oppositeCurrencyValue = isAmount1 ? findCurrency2 : findCurrency1;

    const newConvertedAmount = (newAmount * findCurrencyValue) / oppositeCurrencyValue;

    if (isAmount1) {
      setAmount1(Number(formatNumber((newAmount),2)));
      setAmount2(Number(formatNumber((newConvertedAmount),2)));
      setCurrency1(newCurrency);
    } else {
      setAmount2(Number(formatNumber((newAmount),2)));
      setAmount1(Number(formatNumber((newConvertedAmount),2)));
      setCurrency2(newCurrency);
    }
  };


  return {
    exchangeRate,
    amount1,
    amount2,
    currency1,
    currency2,
    handleChangeClick,
    handleAmountChange,
    handleCurrencyChange,
  };
};

export default useCurrencyConverter;

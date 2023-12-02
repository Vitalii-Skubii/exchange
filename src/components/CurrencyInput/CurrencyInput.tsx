import React from 'react';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { IExchange } from '../../store/store.types';
import { formatNumber } from '../../constants/helpers';

interface CurrencyInputProps {
  onAmountChange: (amount: number, convertedAmount: number) => void;
  onCurrencyChange: (currency: string, convertedAmount: number) => void;
  currencies: IExchange[];
  amount: number;
  currency: string;
  label: string;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  onAmountChange,
  onCurrencyChange,
  currencies,
  amount,
  currency,
  label,
}) => {
  const findCurrency =
    Number(currencies.find((cur) => cur.ccy === currency)?.buy) || 0;

  const handleAmountChange = (newAmount: number) => {
    const convertedAmount = Number(
      formatNumber(newAmount * (findCurrency / 1), 2)
    ); 
    onAmountChange(newAmount, convertedAmount);
  };

  const handleCurrencyChange = (newCurrency: string) => {
    const convertedAmount = Number(
      formatNumber(amount * (findCurrency / 1), 2)
    ); 
    onCurrencyChange(newCurrency, convertedAmount);
  };

  return (
    <>
      <FormControl >
        <InputLabel htmlFor="amount">{label}</InputLabel>
        <Input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => handleAmountChange(Number(e.target.value))}
          placeholder="Amount"
          sx={{ marginRight: '10px' }}
        />
      </FormControl>

      <FormControl >
        <Select
          id="currency"
          value={currency}
          onChange={(e) => handleCurrencyChange(e.target.value as string)}
          displayEmpty
        >
          {currencies.map((rate) => (
            <MenuItem key={rate.ccy} value={rate.ccy}>
              {rate.ccy}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default CurrencyInput;

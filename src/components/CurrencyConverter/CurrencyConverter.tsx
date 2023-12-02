import React from 'react';
import CurrencyInput from '../CurrencyInput/CurrencyInput'; 
import IconButton from '@mui/material/IconButton';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import useCurrencyConverter from './CurrencyConverter.state';

const CurrencyConverter: React.FC = () => {
  
  const {
    exchangeRate,
    amount1,
    amount2,
    currency1,
    currency2,
    handleChangeClick,
    handleAmountChange,
    handleCurrencyChange,
  } = useCurrencyConverter();

  return (
    <div
      style={{
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '5px',
        justifyContent: 'space-between',
        alignItems:'center',
        
      }}
    >
      <CurrencyInput
        onAmountChange={(newAmount, convertedAmount) => handleAmountChange(newAmount, convertedAmount, true)}
        onCurrencyChange={(newCurrency) => handleCurrencyChange(newCurrency, true)}
        currencies={exchangeRate}
        amount={amount1}
        currency={currency1}
        label='Change'
      />

      <IconButton
        onClick={handleChangeClick}
        sx={{
        
          borderRadius: '2px',
          width: '50px',
          height: '40px',
          margin:'0 20px'
        }}
      >
        <SyncAltIcon sx={{ fontSize: 30 }} />
      </IconButton>

      <CurrencyInput
        onAmountChange={(newAmount, convertedAmount) => handleAmountChange(newAmount, convertedAmount, false)}
        onCurrencyChange={(newCurrency) => handleCurrencyChange(newCurrency, false)}
        currencies={exchangeRate}
        amount={amount2}
        currency={currency2}
        label='Get'
      />
    </div>
  );
};

export default CurrencyConverter;

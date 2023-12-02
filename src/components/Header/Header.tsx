import React from 'react';
import { IconButton, Typography } from '@mui/material';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <div
      className={styles.header}
      style={{
        borderBottom: '1px solid #ccc',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className={styles.logoWrapper}>
        <div className={styles.logoCircle}>
          <IconButton>
            <CurrencyExchangeIcon sx={{ fontSize: '40px', color: '#329110' }} />
          </IconButton>
        </div>
      </div>
      <Typography variant="h4" sx={{ color: '#329110', marginLeft: '10px' }}>
        Currency Exchange
      </Typography>
    </div>
  );
};

export default Header;

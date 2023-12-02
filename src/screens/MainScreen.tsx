import React from 'react';
import useApiStore from '../store/store';
import { Button, Container, Typography } from '@mui/material';
import CurrencyConverter from '../components/CurrencyConverter/CurrencyConverter';
import { CustomLoader } from '../components/Loader/Loader';
import CurrencyRates from '../components/CurrencyRates/CurrencyRates';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import useExchangeRateFetcher from '../hooks/useExchangeRateFetcher';
import styles from './MainScreen.module.css';

const MainScreen: React.FC = () => {
  const { currencyData } = useApiStore();

  const { isLoading } = useExchangeRateFetcher();
  const counter = localStorage.getItem('counter');
  const handleReload = () => {
    localStorage.setItem('counter', '0');
    window.location.reload();
  };

  return (
    <div className={styles.wrapper}>
      <Header />

      {Number(counter) !== 5 ? (
        <div>
          {!isLoading ? (
            currencyData && (
              <Container
                component="main"
                sx={{
                  flex: 1,
                  padding: '20px',
                  overflowY: 'auto',
                }}
              >
                <CurrencyRates />

                <CurrencyConverter />
              </Container>
            )
          ) : (
            <CustomLoader />
          )}
        </div>
      ) : (
        <div
          className={styles.error}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            overflowY: 'auto',
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: '10px' }}>
            Error occurred, couldn't fetch data. Try once more
          </Typography>
          <Button variant="contained" color="primary" onClick={handleReload}>
            Reload
          </Button>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default MainScreen;

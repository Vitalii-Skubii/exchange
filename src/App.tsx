import React from 'react';
import MainScreen from './screens/MainScreen';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
       <CssBaseline />
      <MainScreen/>
    </ThemeProvider>
  
   
    
  );
}

export default App;

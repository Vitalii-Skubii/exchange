import React from 'react';
import { Box, Grid, IconButton, Input, Paper, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import useCurrencyRates from './CurrencyRates.state';

const CurrencyRates: React.FC = () => {
  const {
    currencyData,
    localValue,
    handleEditClick,
    handleCheckClick,
    handleCancelClick,
    editingCell,
    setEditingCell,
    editedData,
    setEditedData,
    approvingCell,
    doneDisabled,
    setDoneDisabled,
  } = useCurrencyRates();

   return (
    <Paper
      elevation={3}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        marginTop: '20px',
        backgroundColor: 'transparent',
      }}
    >
      <Grid container spacing={1} sx={{ marginBottom: '10px' }}>
        <Grid
          item
          xs={4}
          sx={{ textAlign: 'center', borderBottom: '1px solid #ccc' }}
        >
          <Typography variant="subtitle1">Currency</Typography>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{ textAlign: 'center', borderBottom: '1px solid #ccc' }}
        >
          <Typography variant="subtitle1">Buy</Typography>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{ textAlign: 'center', borderBottom: '1px solid #ccc' }}
        >
          <Typography variant="subtitle1">Sell</Typography>
        </Grid>
      </Grid>
      {currencyData.map((rate, index) => (
        <Grid
          key={index}
          container
          spacing={1}
          sx={{
            marginBottom: '5px',
            justifyContent: 'space-between',
            width: '100%',
            height: '60px',
          }}
        >
          <Grid
            item
            xs={4}
            sx={{
              borderBottom: '1px solid #ccc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {rate.ccy}
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              borderBottom: '1px solid #ccc',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseEnter={() => setEditingCell(rate.ccy + 'buy')}
            onMouseLeave={() => setEditingCell(null)}
          >
            {editedData[index] && approvingCell === rate.ccy + 'buy' ? (
              <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <Input
                  type="number"
                  value={editedData[index]?.buy || ''}
                  onChange={(e) => {
                    const changedValue = e.target.value;
                    const newEditedData = [...editedData];
                    newEditedData[index] = {
                      ...rate,
                      buy: changedValue,
                    };
                    setEditedData(newEditedData);
                    if (
                      (localValue && Number(changedValue) < 0.9 * localValue) ||
                      (localValue && Number(changedValue) > 1.1 * localValue)
                    ) {
                      setDoneDisabled(true);
                    } else {
                      setDoneDisabled(false);
                    }
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: '-17px',
                    right: '-17px',
                  }}
                >
                  <IconButton
                    onClick={handleCheckClick}
                    sx={{
                      background: '#f7efef',
                      borderRadius: '2px',
                      width: '15px',
                      height: '15px',
                      marginRight: '2px',
                    }}
                    disabled={doneDisabled}
                  >
                    <DoneIcon sx={{ fontSize: 15, color: '#3b6fc4' }} />
                  </IconButton>
                  <IconButton
                    onClick={handleCancelClick}
                    sx={{
                      background: '#f7efef',
                      borderRadius: '2px',
                      width: '15px',
                      height: '15px',
                    }}
                  >
                    <CloseIcon sx={{ fontSize: 15, color: '#c43b3b' }} />
                  </IconButton>
                </Box>
              </Box>
            ) : (
              <Box sx={{ position: 'relative', display: 'inline-block' }}>
                {rate.buy}
                {editingCell === rate.ccy + 'buy' && (
                  <IconButton
                    className="edit-icon"
                    sx={{
                      position: 'absolute',
                      top: '-17px',
                      right: '-20px',
                    }}
                    onClick={() => handleEditClick(rate.ccy + 'buy')}
                  >
                    <EditIcon sx={{ fontSize: 15 }} />
                  </IconButton>
                )}
              </Box>
            )}
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              position: 'relative',
              borderBottom: '1px solid #ccc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseEnter={() => setEditingCell(rate.ccy + 'sale')}
            onMouseLeave={() => setEditingCell(null)}
          >
            {editedData[index] && approvingCell === rate.ccy + 'sale' ? (
              <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <Input
                  type="number"
                  value={editedData[index]?.sale || ''}
                  onChange={(e) => {
                    const newEditedData = [...editedData];
                    newEditedData[index] = {
                      ...rate,
                      sale: e.target.value,
                    };
                    setEditedData(newEditedData);
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: '-17px',
                    right: '-17px',
                  }}
                >
                  <IconButton
                    onClick={handleCheckClick}
                    sx={{
                      background: '#f7efef',
                      borderRadius: '2px',
                      width: '15px',
                      height: '15px',
                      marginRight: '2px',
                    }}
                  >
                    <DoneIcon sx={{ fontSize: 15, color: '#3b6fc4' }} />
                  </IconButton>
                  <IconButton
                    onClick={handleCancelClick}
                    sx={{
                      background: '#f7efef',
                      borderRadius: '2px',
                      width: '15px',
                      height: '15px',
                    }}
                  >
                    <CloseIcon sx={{ fontSize: 15, color: '#c43b3b' }} />
                  </IconButton>
                </Box>
              </Box>
            ) : (
              <Box sx={{ position: 'relative', display: 'inline-block' }}>
                {rate.sale}
                {editingCell === rate.ccy + 'sale' && (
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: '-17px',
                      right: '-20px',
                    }}
                    onClick={() => handleEditClick(rate.ccy + 'sale')}
                  >
                    <EditIcon sx={{ fontSize: 15 }} />
                  </IconButton>
                )}
              </Box>
            )}
          </Grid>
        </Grid>
      ))}
    </Paper>
  );
};

export default CurrencyRates;

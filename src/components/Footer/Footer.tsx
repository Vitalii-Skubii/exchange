import React from 'react';
import { Typography } from '@mui/material';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      <Typography variant="body1">2023. All rights reserved</Typography>
    </div>
  );
};

export default Footer;

'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	typography: {
		fontFamily: ['var(--font-geist-sans)', 'var(--font-geist-mono)'].join(','),
	},
});

export default theme;

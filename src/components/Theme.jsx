import { createTheme } from '@mui/material/styles'

export const lightTheme = createTheme({
   palette: {
      mode: 'light',
      primary: { main: '#1976d2' },
      background: { default: '#ffffff', paper: '#f9f9f9', toolbar: '#054c94' },
   },
})

export const darkTheme = createTheme({
   palette: {
      mode: 'dark',
      primary: { main: '#e51b36' },
      background: { default: '#121212', paper: '#424242', toolbar: '#b70c00' },
   },
})

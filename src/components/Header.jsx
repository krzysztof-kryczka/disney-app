import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import { useThemeContext } from '../hooks/useThemeContext'

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
   width: 62,
   height: 34,
   padding: 7,
   '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
         color: '#fff',
         transform: 'translateX(22px)',
         '& .MuiSwitch-thumb:before': {
            content: '""',
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundImage: `url('https://img.icons8.com/ios-filled/50/000000/moon-symbol.png')`,
            backgroundSize: 'cover',
         },
         '& + .MuiSwitch-track': {
            opacity: 1,
            backgroundColor: '#8796A5',
         },
      },
   },
   '& .MuiSwitch-thumb': {
      backgroundColor: '#FFC107',
      width: 32,
      height: 32,
      '&:before': {
         content: '""',
         position: 'absolute',
         width: '100%',
         height: '100%',
         left: 0,
         top: 0,
         backgroundImage: `url('https://img.icons8.com/ios-filled/50/000000/sun.png')`,
         backgroundSize: 'cover',
      },
   },
   '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: '#8796A5',
      borderRadius: 20 / 2,
   },
}))

export const Header = ({ darkMode, setDarkMode }) => {
   const { theme, toggleTheme } = useThemeContext()

   return (
      <AppBar position="static" style={{ backgroundColor: theme.palette.background.toolbar }}>
         <Toolbar>
            <Typography variant="h1" style={{ flexGrow: 1, fontFamily: 'Walt Disney Script', padding: '20px' }}>
               Disney App
            </Typography>
            <Box>
               <MaterialUISwitch checked={darkMode} onChange={toggleTheme} />
            </Box>
         </Toolbar>
      </AppBar>
   )
}

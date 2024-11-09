import React, { createContext, useContext, useState } from 'react'
const ThemeContext = createContext()

export const useThemeContext = () => useContext(ThemeContext)

const lightTheme = {
   mode: 'light',
   palette: {
      primary: { main: '#1976d2', text: '#000' },
      background: { default: '#fff', paper: '#f9f9f9', toolbar: '#054c94' },
   },
}

const darkTheme = {
   mode: 'dark',
   palette: {
      primary: { main: '#e51b36', text: '#fff' },
      background: { default: '#0b0c0c', paper: '#202324', toolbar: '#b70c00' },
   },
}

export const ThemeProvider = ({ children }) => {
   const [isDarkMode, setIsDarkMode] = useState(false)
   const theme = isDarkMode ? darkTheme : lightTheme
   const toggleTheme = () => {
      setIsDarkMode(prevMode => !prevMode)
   }
   return <ThemeContext.Provider value={{ theme, toggleTheme }}> {children} </ThemeContext.Provider>
}

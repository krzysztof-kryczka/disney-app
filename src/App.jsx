import { useState } from 'react'
import { useGetData } from './hooks/useGetData'
import { ErrorMessage } from './components/ErrorMessage'
import { Loader } from './components/Loader'
import { ImageGallery } from './components/ImageGallery'
import { Header } from './components/Header'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import CssBaseline from '@mui/material/CssBaseline'
import './App.css'
import { darkTheme, lightTheme } from './components/Theme'
import { Select } from './components/Select'
import { Pagination } from './components/Pagination'

export const API_BASE_URL = 'https://api.disneyapi.dev'

export const App = () => {
   const [page, setPage] = useState(1)
   const [limit, setLimit] = useState(50)
   const { data: images, isLoading, error } = useGetData(API_BASE_URL, '/character', page, limit)
   const [darkMode, setDarkMode] = useState(false)

   const theme = darkMode ? darkTheme : lightTheme

   const handlePageChange = (e, value) => {
      setPage(value)
   }

   const handleLimitChange = e => {
      setLimit(e.target.value)
      setPage(1)
   }

   return (
      <MuiThemeProvider theme={theme}>
         <StyledThemeProvider theme={theme}>
            <CssBaseline />
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />
            {isLoading && <Loader>Loading...</Loader>}
            {error && <ErrorMessage>{error.message}</ErrorMessage>}
            {images && <ImageGallery images={images.data} />}
            <Select limit={limit} handleLimitChange={handleLimitChange} />
            {images && <Pagination count={images.info.totalPages} page={page} onChange={handlePageChange} />}
         </StyledThemeProvider>
      </MuiThemeProvider>
   )
}

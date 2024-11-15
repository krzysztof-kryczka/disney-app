import { useGetData } from './hooks/useGetData'
import { ErrorMessage } from './components/ErrorMessage'
import { Loader } from './components/Loader'
import { ImageGallery } from './components/ImageGallery'
import { Header } from './components/Header'
import CssBaseline from '@mui/material/CssBaseline'
import { Select } from './components/Select'
import { Pagination } from './components/Pagination'
import { useThemeContext } from './hooks/useThemeContext'
import { GlobalStyle } from './components/GlobalStyle'

export const API_BASE_URL = 'https://api.disneyapi.dev'

export const App = () => {
   const { data: images, isLoading, error, page, setPage, limit, setLimit } = useGetData(API_BASE_URL, '/character')
   const { theme } = useThemeContext()

   const handlePageChange = (_, value) => {
      setPage(value)
   }

   const handleLimitChange = e => {
      setLimit(e.target.value)
      setPage(1)
   }

   return (
      <>
         <CssBaseline />
         <GlobalStyle theme={theme} />
         <Header />
         {isLoading && <Loader />}
         {error && <ErrorMessage>{error.message}</ErrorMessage>}
         {!isLoading && images && (
            <>
               <ImageGallery images={images.data} />
               <Select limit={limit} handleLimitChange={handleLimitChange} />
               <Pagination count={images.info.totalPages} page={page} onChange={handlePageChange} />
            </>
         )}
      </>
   )
}

import { useState } from 'react'
import { useGetData } from './hooks/useGetData'
import { ErrorMessage } from './components/ErrorMessage'
import { Loader } from './components/Loader'
import { ImageGallery } from './components/ImageGallery'
import { Pagination, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import { makeStyles } from '@mui/styles'

import './App.css'

export const API_BASE_URL = 'https://api.disneyapi.dev'

const useStyles = makeStyles({
   pagination: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '20px',
      '& .MuiPaginationItem-root': {
         color: '#e51b36',
         fontWeight: 'bold',
         fontSize: '25px',
         '&:hover': { color: '#fff', backgroundColor: '#e51b36' },
      },
      '& .Mui-selected': { color: '#e51b36', border: '2px solid #e51b36;' },
   },
   select: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '20px',
      marginBottom: '20px',
      width: '200px',
      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#e51b36' },
   },
})

export const App = () => {
   const [page, setPage] = useState(1)
   const [limit, setLimit] = useState(50)

   const { data: images, isLoading, error } = useGetData(API_BASE_URL, '/character', page, limit)

   const classes = useStyles()

   const handlePageChange = (e, value) => {
      setPage(value)
   }

   const handleLimitChange = e => {
      setLimit(e.target.value)
      setPage(1)
   }

   return (
      <>
         {isLoading && <Loader>Loading...</Loader>}
         {error && <ErrorMessage>{error.message}</ErrorMessage>}
         {images && <ImageGallery images={images.data} />}
         <FormControl className={classes.select}>
            <InputLabel id="page-size-label">Liczba elementów na stronie</InputLabel>
            <Select labelId="page-size-label" id="page-size-select" value={limit} onChange={handleLimitChange}>
               <MenuItem value={10}>10</MenuItem>
               <MenuItem value={20}>20</MenuItem>
               <MenuItem value={50}>50</MenuItem>
               <MenuItem value={100}>100</MenuItem>
            </Select>
         </FormControl>
         {images && (
            <Pagination
               className={classes.pagination}
               count={images.info.totalPages}
               page={page}
               onChange={handlePageChange}
            />
         )}
      </>
   )
}

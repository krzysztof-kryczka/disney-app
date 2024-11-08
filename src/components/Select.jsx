import React from 'react'
import { Select as MuiSelect, MenuItem, FormControl, InputLabel } from '@mui/material'
import styled from 'styled-components'

const StyledFormControl = styled(FormControl)`
   display: flex;
   justify-content: center;
   margin-top: 2rem;
   margin-bottom: 2rem;
   width: 200px;
   & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: ${props => props.theme.palette.primary.main};
   }
`

export const Select = ({ limit, handleLimitChange }) => {
   return (
      <StyledFormControl>
         <InputLabel id="page-size-label">Liczba elementów na stronie</InputLabel>
         <MuiSelect labelId="page-size-label" id="page-size-select" value={limit} onChange={handleLimitChange}>
            <MenuItem value={10}>10</MenuItem> <MenuItem value={20}>20</MenuItem> <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
         </MuiSelect>
      </StyledFormControl>
   )
}

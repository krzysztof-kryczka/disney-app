import React from 'react'
import { Select as MuiSelect, MenuItem, FormControl, InputLabel } from '@mui/material'
import styled from 'styled-components'
import { useThemeContext } from '../hooks/useThemeContext'

const CenteredContainer = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
`

const StyledFormControl = styled(FormControl)`
   display: flex;
   justify-content: center;
   margin-top: 2rem;
   margin-bottom: 2rem;
   width: 200px;
   text-align: center;
   background-color: ${props => props.theme.palette.background.paper};
   color: ${props => props.theme.palette.primary.main};
   border: 1px solid ${props => props.theme.palette.primary.main};
   border-radius: 8px;
   box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
   & .MuiOutlinedInput-root {
      padding: 0.5rem;
      border-radius: 4px;
      &.Mui-focused .MuiOutlinedInput-notchedOutline {
         border-color: ${props => props.theme.palette.primary.main};
      }
   }
   & .MuiInputLabel-root {
      color: ${props => props.theme.palette.primary.main};
      &.Mui-focused {
         color: ${props => props.theme.palette.primary.main};
      }
   }
   & .MuiSelect-icon {
      color: ${props => props.theme.palette.primary.main};
   }
   & .MuiInputBase-root {
      color: ${props => props.theme.palette.primary.main};
      font-weight: bold;
      background-color: ${props => props.theme.palette.background.paper};
   }
   & .MuiMenuItem-root {
      color: ${props => props.theme.palette.primary.main};
      &:hover {
         background-color: ${props => props.theme.palette.primary.light};
      }
   }
`

export const Select = ({ limit, handleLimitChange }) => {
   const { theme } = useThemeContext()
   return (
      <CenteredContainer>
         <StyledFormControl theme={theme}>
            <InputLabel id="page-size-label">Liczba elementów na stronie</InputLabel>
            <MuiSelect labelId="page-size-label" id="page-size-select" value={limit} onChange={handleLimitChange}>
               <MenuItem value={10}>10</MenuItem> <MenuItem value={20}>20</MenuItem> <MenuItem value={50}>50</MenuItem>
               <MenuItem value={100}>100</MenuItem>
            </MuiSelect>
         </StyledFormControl>
      </CenteredContainer>
   )
}

import React from 'react'
import styled from 'styled-components'
import { Pagination as MuiPagination } from '@mui/material'
import { useThemeContext } from '../hooks/useThemeContext'

const StyledPagination = styled(MuiPagination)`
   display: flex;
   justify-content: center;
   margin-top: 2rem;
   & .MuiPaginationItem-root {
      color: ${props => props.theme.palette.primary.main};
      font-weight: bold;
      font-size: 1.5rem;
      &:hover {
         color: #fff;
         background-color: ${props => props.theme.palette.primary.main};
      }
   }
   & .Mui-selected {
      color: ${props => props.theme.palette.primary.main};
      border: 0.125rem solid ${props => props.theme.palette.primary.main};
   }
`

export const Pagination = ({ count, page, onChange }) => {
   const { theme } = useThemeContext()
   return <StyledPagination count={count} page={page} onChange={onChange} theme={theme} />
}

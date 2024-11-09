import React from 'react'
import styled, { keyframes } from 'styled-components'
import { useThemeContext } from '../hooks/useThemeContext'

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const StyledLoaderContainer = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   height: 100vh;
`

const StyledLoader = styled.div`
   border: 16px solid #f3f3f3;
   border-top: 16px solid ${props => props.theme.palette.primary.main};
   border-radius: 50%;
   width: 120px;
   height: 120px;
   animation: ${spin} 2s linear infinite;
`

export const Loader = () => {
   const { theme } = useThemeContext()
   return (
      <StyledLoaderContainer>
         <StyledLoader theme={theme} />
      </StyledLoaderContainer>
   )
}

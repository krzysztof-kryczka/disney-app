import styled, { keyframes } from 'styled-components'

const l6 = keyframes` 100% { inset: 0; } `

export const StyledLoader = styled.span`
   width: 120px;
   height: 22px;
   border-radius: 20px;
   color: #514b82;
   border: 2px solid;
   position: relative;

   &::before {
      content: '';
      position: absolute;
      margin: 2px;
      inset: 0 100% 0 0;
      border-radius: inherit;
      background: currentColor;
      animation: ${l6} 2s infinite;
   }
`

export const Loader = ({ children }) => {
   return <StyledLoader>{children}</StyledLoader>
}

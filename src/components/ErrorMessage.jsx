import styled from 'styled-components'

const StyledError = styled.span`
   position: fixed;
   top: 12px;
   background-color: #8a1e13;
   color: #f0ff00;
   padding: 12px 24px;
   border-radius: 8px;
   border: solid 2px #fffffe;
`

export const ErrorMessage = ({ children }) => {
   return (
      <StyledError>
         <strong>Error: </strong>
         {children}
      </StyledError>
   )
}

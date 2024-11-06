
import styled from 'styled-components'

const StyledHeader = styled.h3`
   margin: 10px 0;
   color: #e51b36;
   text-align: center;
`

export const CharacterDetails = ({ title, items }) =>
   items.length > 0 && (
      <>
         <StyledHeader>{title}</StyledHeader>
         <ul>
            {items.map((item, index) => (
               <li key={index}>{item}</li>
            ))}
         </ul>
      </>
   )

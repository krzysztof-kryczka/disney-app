import styled from 'styled-components'

const StyledHeader = styled.h3`
   margin: 10px 0;
   color: ${props => props.theme.palette.primary.main};
   text-align: center;
   font-family: 'Walt Disney Script', sans-serif;
   font-size: 48px;
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

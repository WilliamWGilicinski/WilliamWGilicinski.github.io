import { Box } from "@mui/material";
import BottomBar from "./BottomBar";
import TopAppBar from "./TopAppBar";
import CharacterSheet from './characters.png';
import styled, { keyframes } from 'styled-components';


const animation = keyframes`
  100% { background-position: -544px; }
`;
export const King = styled.div`
  scale: 5;
  height: 23px;
  width: 32px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: url(${CharacterSheet}) left center;
  animation: ${animation} 2s steps(17) infinite;
  image-rendering: pixelated;
  pointer-events: none
`;

export default King;
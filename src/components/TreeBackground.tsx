import { Box } from "@mui/material";
import BottomBar from "./BottomBar";
import TopAppBar from "./TopAppBar";
import TreeSprites from './TreeSprites.png';
import styled, { keyframes } from 'styled-components';


const animation = keyframes`
  100% { background-position: -10080px; }
`;
export const TreeBackground = styled.div`
  scale: 3;
  height: 270px;
  width: 480px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-100%, -100%);
  background: url(${TreeSprites}) left center;
  animation: ${animation} 3s steps(21) infinite;
  image-rendering: pixelated;
`;

export default TreeBackground;
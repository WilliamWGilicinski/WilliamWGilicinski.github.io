import {styled} from "@mui/material";

export const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 800,
  margin: 'auto',
  display: 'flex',
  minHeight: '80vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(0, 0)
}));
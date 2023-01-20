import { ComponentsOverrides, Theme } from '@mui/material';

const listItemIconOverrides: ComponentsOverrides<Theme>['MuiListItemIcon'] = {
  root: {
    minWidth: 40
  }
};

const listItemIconComponentConfig = {
  styleOverrides: listItemIconOverrides
};

export default listItemIconComponentConfig;

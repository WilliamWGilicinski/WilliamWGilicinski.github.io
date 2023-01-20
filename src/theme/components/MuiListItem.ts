import { ComponentsOverrides, Theme } from '@mui/material';

const muiListItemOverrides: ComponentsOverrides<Theme>['MuiListItem'] = {
  root: ({ theme }) => ({
    '&.Mui-selected': {
      color: theme.palette.primary.main,
      '& svg': {
        color: theme.palette.primary.main
      }
    }
  })
};

const listItemComponentConfig = {
  styleOverrides: muiListItemOverrides
};

export default listItemComponentConfig;

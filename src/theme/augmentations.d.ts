import '@mui/material/styles/createPalette';
import '@mui/material';
import '@mui/material/styles/createMixins';

/* Palette */
interface GradientsPaletteOptions {
  primary: string;
  info: string;
  success: string;
  warning: string;
  error: string;
}
declare module '@mui/material/styles/createPalette' {
  interface TypeBackground {
    neutral: string;
  }
  interface SimplePaletteColorOptions {
    lighter: string;
    darker: string;
  }
  interface PaletteColor {
    lighter: string;
    darker: string;
  }
  interface Palette {
    gradients: GradientsPaletteOptions;
  }
  interface PaletteOptions {
    gradients?: GradientsPaletteOptions;
  }
}

declare module '@mui/material' {
  interface Color {
    0: string;
    500_8: string;
    500_12: string;
    500_16: string;
    500_24: string;
    500_32: string;
    500_48: string;
    500_56: string;
    500_80: string;
  }
}

/* mixins */
declare module '@mui/material/styles/createMixins' {
  interface Mixins {
    navigationWidth: number;
  }
}

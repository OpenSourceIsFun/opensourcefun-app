import { ReactNode } from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      '*': {
        fontFamily: 'Poppins',
      },
      body: {
        color: '#ebebeb',
        backgroundColor: '#090909',
      },
    },
  },
  colors: {
    primary: {
      basic: '#303030',
      basicTransparent: '#303030a3',
      hover: '#FFF',
      text: '#FFF',
      textHover: '#D6FB5E',
      grey: '#F6F5F5',
    },
    secondary: {
      basic: '#fff',
      text: '#303030',
      textLight: '#A5A5A5',
      textHover: '#D6FB5E',
      backgroundHover: 'rgba(0, 150, 239, 0.08)',
    },
    accent: { green: '#D6FB5E', blue: '#0096EF' },
    footer: {
      dark: '#8E8E8E',
      light: '#E9E9E9',
      background: '#303030',
    },
    menu: {
      text: '#5B5B5B',
    },
    warning: '#FFCC15',
    background: {
      light: '#090909',
      dark: '#303030',
      gray: '#EBEBEB',
    },
    error: '#FF554A',
    success: '#25C26E',
    kycIcons: '#3E9685',
    border: '#E9E9E9',
    borderDark: '#303030',
    red: {
      500: '#FF554A',
    },
  },
});

interface ThemeProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProps) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export default ThemeProvider;

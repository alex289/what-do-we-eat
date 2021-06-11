import type { AppProps } from 'next/app';

import useDarkMode from 'use-dark-mode';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Box from '@material-ui/core/Box';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

export default function App({ Component, pageProps }: AppProps) {
  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });
  const lightTheme = createMuiTheme({
    palette: {
      type: 'light',
    },
  });
  const { value: isDark, toggle: toggleDarkMode } = useDarkMode(true);
  const themeConfig = isDark ? darkTheme : lightTheme;
  return (
    <div>
      <ThemeProvider theme={themeConfig}>
        <CssBaseline></CssBaseline>
        <AppBar position="static">
          <Toolbar>
            <Box display="flex" flexGrow={1}>
              <Typography variant="h6">What do we eat?</Typography>
            </Box>
            <FormControlLabel
              control={<Switch onClick={toggleDarkMode} />}
              labelPlacement="start"
              checked={isDark}
              label="Light/Dark Mode"
            />
          </Toolbar>
        </AppBar>
        <Component {...pageProps} />
      </ThemeProvider>
      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 3px;
          height: 2px;
        }
        ::-webkit-scrollbar-button {
          width: 0;
          height: 0;
        }
        ::-webkit-scrollbar-thumb {
          background: #fff;
          border: 0 none #fff;
          border-radius: 50px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #afafaf;
        }
        ::-webkit-scrollbar-thumb:active {
          background: #707070;
        }
        ::-webkit-scrollbar-track {
          background: #666;
          border: 0 none #fff;
          border-radius: 50px;
        }
        ::-webkit-scrollbar-track:hover {
          background: #666;
        }
        ::-webkit-scrollbar-track:active {
          background: #333;
        }
        ::-webkit-scrollbar-corner {
          background: 0 0;
        }
      `}</style>
    </div>
  );
}

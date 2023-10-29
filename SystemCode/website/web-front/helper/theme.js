import { Card } from "@mui/material";
import { purple, red, yellow } from "@mui/material/colors";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// declare module "@mui/material/styles" {
//   interface Theme {
//     status: {
//       danger: React.CSSProperties["color"];
//     };
//   }

//   interface Palette {
//     neutral: Palette["primary"];
//   }
//   interface PaletteOptions {
//     neutral: PaletteOptions["primary"];
//   }

//   interface PaletteColor {
//     darker?: string;
//   }
//   interface SimplePaletteColorOptions {
//     darker?: string;
//   }
//   interface ThemeOptions {
//     status: {
//       danger: React.CSSProperties["color"];
//     };
//   }
// }

const theme = createTheme({
  palette: {
    primary: {
      main: "#F19F4D",
      light: "#fdf7f2",
      contrastText: "#fff",
    },
    secondary: {
      main: "#ffffff",
    },
    neutral: {
      main: "#f2f2f2",
      dark: "#999999",
      contrastText: "#000000",
    },
    info: yellow,
    alert: red,
  },
  typography: {
    h3: {
      fontSize: "3rem",
      "@media (max-width:500px)": {
        fontSize: "2rem ! important",
      },
    },
    h4: {
      fontSize: "2.5rem",
      "@media (max-width:500px)": {
        fontSize: "1.7rem ! important",
      },
    },
  },
});

// theme.typography.h3 = {
//   fontSize: '3rem',
//   // '@media (min-width:600px)': {
//   //   fontSize: '1.8rem',
//   // },
//   // '@media (min-width:300px)': {
//   //   fontSize: '1.5rem',
//   // },
//   [theme.breakpoints.up('md')]: {
//     fontSize: '3rem',
//   },
//   [theme.breakpoints.up('sm')]: {
//     fontSize: '2.8rem',
//   },
//   [theme.breakpoints.up('xs')]: {
//     fontSize: '2.3rem',
//   },
// };

export default theme;

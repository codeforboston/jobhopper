export { default as base } from './base';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    colors: {
      primaryHighlight: React.CSSProperties['color'];
    };
  }
  interface ThemeOptions {
    colors: {
      primaryHighlight: React.CSSProperties['color'];
    };
  }
}

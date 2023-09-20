import Typography from 'typography';
import doelger from 'typography-theme-doelger';

doelger.baseFontSize = '17px';
doelger.baseLineHeight = '28px';

doelger.overrideThemeStyles = () => {
  return {
    a: {
      boxShadow: `none`,
      color: '#a09097',
      backgroundImage: 'none',
      textShadow: 'none'
    },
    'a:hover': {
      color: '#333333'
    }
  };
};

const typography = new Typography(doelger);

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles();
}

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;

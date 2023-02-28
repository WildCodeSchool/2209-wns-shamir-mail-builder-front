interface Color {
  lighter: string;
  light: string;
  main: string;
  dark: string;
  darker: string;
  contrastText: string;
}

interface Gradients {
  [key: string]: string;
}

interface ChartColors {
  violet: string[];
  blue: string[];
  gold: string[];
  yellow: string[];
  red: string[];
}

const GREY: Record<number, string> = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
};

const PRIMARY: Color = {
  lighter: '#c39d63',
  light: '#c39d63',
  main: '#c39d63',
  dark: '#ebb644',
  darker: '#c39d63',
  contrastText: '#e1e1e1',
};
const SECONDARY: Color = {
  lighter: '#fff8f0',
  light: '#f2d0b3',
  main: '#cb6834',
  dark: '#803314',
  darker: '#330f05',
  contrastText: '#d98b5b',
};
const INFO: Color = {
  lighter: '#C8FACD',
  light: '#5BE584',
  main: '#724E3B',
  dark: '#ebb644',
  darker: '#005249',
  contrastText: '#fff',
};

const SUCCESS: Color = {
  lighter: '#f9fff0',
  light: '#e3ffbf',
  main: '#abf067',
  dark: '#69bd2a',
  darker: '#32700d',
  contrastText: '#1e4a08',
};

const WARNING: Color = {
  lighter: '#fff9a3',
  light: '#ffe852',
  main: '#f7c600',
  dark: '#ab7d00',
  darker: '#5e3f00',
  contrastText: GREY[800],
};
const ERROR: Color = {
  lighter: '#ffa7a6',
  light: '#eb4d55',
  main: '#d0021b',
  dark: '#B72136',
  darker: '#850018',
  contrastText: '#ffe7e6',
};

function createGradient(color1: string, color2: string): string {
  return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

const GRADIENTS: Gradients = {
  primary: createGradient(PRIMARY.light, PRIMARY.main),
  info: createGradient(INFO.light, INFO.main),
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.main),
};

const CHART_COLORS: ChartColors = {
  violet: ['#826AF9', '#9E86FF', '#D0AEFF', '#F7D2FF'],
  blue: ['#2D99FF', '#83CFFF', '#A5F3FF', '#CCFAFF'],
  gold: ['#ffb74d', '#ffb74d', '#ffb74d', '#ffb74d'], // green
  yellow: ['#FFE700', '#FFEF5A', '#FFF7AE', '#FFF3D6'],
  red: ['#FF6C40', '#FF8F6D', '#FFBD98', '#FFF2D4'],
};

const palette: any = {
  common: { black: '#000', white: '#fff' },
  primary: { ...PRIMARY },
  secondary: { ...SECONDARY },
  info: { ...INFO },
  success: { ...SUCCESS },
  warning: { ...WARNING },
  error: { ...ERROR },
  grey: GREY,
  gradients: GRADIENTS,
  chart: CHART_COLORS,
  divider: GREY[500_24],
  text: { primary: GREY[800], secondary: GREY[600], disabled: GREY[500] },
  background: { paper: '#fff', default: '#fff', neutral: GREY[200], purple: '#F9E5EB' },
  action: {
    active: GREY[600],
    hover: GREY[500_8],
    selected: GREY[500_16],
    disabled: GREY[500_80],
    disabledBackground: GREY[500_24],
    focus: GREY[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};
export default palette;

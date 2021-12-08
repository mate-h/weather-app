const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    // enabled: true,
    content: [
      './src/**/*.hmtl',
      './src/**/*.js',
      './src/**/*.jsx',
      './src/**/*.ts',
      './src/**/*.tsx',
    ],
  },
  theme: {
    fontFamily: {
      sans: ['Inter', ...defaultTheme.fontFamily.sans],
    },
    opacity: {
      '06': '0.06',
      12: '0.12',
      24: '0.24',
      38: '0.38',
      54: '0.54',
      72: '0.72',
      87: '0.87',
      100: '1',
    },
    extend: {
      height: {
        14: '3.5rem',
      },
      inset: {
        14: '3.5rem',
      },
      textColor: {
        primary: '#007aff',
      },
      backgroundColor: {
        primary: '#007aff',
        inherit: 'inherit',
      },
      // Material Design type scale
      fontSize: {
        '7xl': '6rem', // 96pt
        '6xl': '3.75rem', // 60pt
        '5xl': '3rem', // 48pt
        '4xl': '2.125rem', // 34pt
        '2xs': '0.625rem', // 10pt
      },
      screens: {
        dark: { raw: '(prefers-color-scheme: dark)' },
      },
    },
  },
  variants: {},
  plugins: [],
};

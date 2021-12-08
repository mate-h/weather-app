module.exports = {
  extends: '@snowpack/app-scripts-preact',
  mount: {
    src: '/',
  },
  alias: {
    react: 'preact/compat',
    'react-dom': 'preact/compat',
  },
  plugins: ['@snowpack/plugin-postcss'],
};

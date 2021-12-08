const { parsed } = require('dotenv-safe').config();

export default {
  /**
   * Function that mutates the original webpack config.
   * Supports asynchronous changes when a promise is returned (or it's an async function).
   *
   * @param {object} config - original webpack config.
   * @param {object} env - options passed to the CLI.
   * @param {WebpackConfigHelpers} helpers - object with useful helpers for working with the webpack config.
   * @param {object} options - this is mainly relevant for plugins (will always be empty in the config), default to an empty object
   **/
  webpack(config, env, helpers, options) {
    const purgecss = require('@fullhuman/postcss-purgecss')({
      // Specify the paths to all of the template files in your project
      content: ['./src/**/*.js'],

      // Include any special characters you're using in this regular expression
      defaultExtractor: (content) => content.match(options.regex) || [],
    });

    const postCssLoaders = helpers.getLoadersByName(config, 'postcss-loader');
    postCssLoaders.forEach(({ loader }) => {
      const plugins = loader.options.plugins;

      // Add tailwind css at the top.
      plugins.unshift(require('tailwindcss'));

      // Add PurgeCSS only in production.
      // if (env.production) {
      //   plugins.push(purgecss);
      // }
    });

    const { plugin } = helpers.getPluginsByName(config, 'DefinePlugin')[0];
    Object.assign(
      plugin.definitions,
      Object.keys(parsed).reduce(
        (env, key) => ({
          ...env,
          [`process.env.${key}`]: JSON.stringify(parsed[key]),
        }),
        {},
      ),
    );
  },
};

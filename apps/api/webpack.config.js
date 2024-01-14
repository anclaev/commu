const { composePlugins, withNx } = require('@nx/webpack');

// Nx plugins for webpack.
module.exports = composePlugins(
  withNx({
    target: 'node',
  }),
  (config) => {
    const definePlugin = config.plugins.find((x) => x.constructor.name === 'DefinePlugin');

    if (definePlugin) {
      definePlugin.definitions['process.env'] = {
        ...(definePlugin.definitions['process.env'] || {}),
        NX_PKG_VERSION: JSON.stringify(process.env.npm_package_version),
      };
    }
    return config;
  }
);

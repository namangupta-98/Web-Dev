require('dotenv').config({ path: `./` })
const webpack = require('webpack')

module.exports = {
    future: {
        webpack5: true
    },
    webpack: function (config, options) {
        config.experiments = {};
        config.plugins.push(
            new webpack.EnvironmentPlugin(process.env)
        )
        return config;
    },
};
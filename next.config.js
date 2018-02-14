// next-sass
// const withSass = require('@zeit/next-sass')
// module.exports = withSass()

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { ANALYZE } = process.env

module.exports = {
    exportPathMap: function() {
        return {
            '/': { page: '/' }
        }
    },
    webpack: function (config, { isServer }) {
        if (ANALYZE) {
          config.plugins.push(new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            analyzerPort: isServer ? 8888 : 8889,
            openAnalyzer: true
          }))
        }
    
        return config
    }
}
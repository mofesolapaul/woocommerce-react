// next-sass
// const withSass = require('@zeit/next-sass')
// module.exports = withSass()

module.exports = {
    exportPathMap: function() {
        return {
            '/': { page: '/' }
        }
    }
}
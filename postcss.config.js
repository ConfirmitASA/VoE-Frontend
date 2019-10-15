module.exports = {
    plugins: {
        'postcss-import': {},
        'postcss-custom-properties': {
            preserve: false
        },
        'postcss-preset-env': {
            browsers: 'last 2 versions',
            stage: 0,
        }
    }
};
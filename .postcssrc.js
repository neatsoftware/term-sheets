module.exports = {
  modules: true,
  plugins: {
    autoprefixer: true,
    'postcss-modules': {
      generateScopedName: process.env.NODE_ENV === 'production' ? '[hash:base64:3]' : '[local]__[hash:base64:3]'
    }
  }
}

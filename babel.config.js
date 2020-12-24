module.exports = function(api) {
  api.cache(true)
  return {
    presets: ['@babel/env'],  
    plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-proposal-optional-chaining'],
  };
};

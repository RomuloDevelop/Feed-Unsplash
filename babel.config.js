module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          // This needs to be mirrored in tsconfig.json
          components: './src/components',
          config: './src/config',
          containers: './src/containers',
          hooks: './src/hooks',
          services: './src/services',
          navigation: './src/navigation',
          store: './src/store',
          assets: './assets',
        },
      },
    ],
  ],
};

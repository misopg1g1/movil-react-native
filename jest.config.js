// Importa dotenv al principio del archivo
require('dotenv').config({
  path: '.env.development',
});

module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    '!node_modules/',
    'node_modules/react-native-reanimated/lib/commonjs/reanimated2/.*',
  ],
  setupFiles: ['./jest.setup.js'],
};

// Importa dotenv al principio del archivo
require('dotenv').config({
  path: '.env.development',
});

module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: ['!node_modules/'],
  setupFiles: ['./jest.setup.js'],
};

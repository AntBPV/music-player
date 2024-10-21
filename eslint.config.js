// eslint.config.js
/** @type {import('eslint').Linter.Config} */
module.exports = {
  ignores: [
    '**/node_modules/**',
    '**/.expo/**',
    '**/.next/**',
    '**/__generated__/**',
    '**/build/**',
    '/react-native-lab/react-native/**',
    '/docs/react-native-website/**',
    '**/android/**',
    '**/assets/**',
    '**/bin/**',
    '**/fastlane/**',
    '**/ios/**',
    '**/kotlin/providers/**',
    '**/vendored/**',
    '/docs/public/static/**'
  ],
  rules: {
    // Tus reglas de ESLint pueden ir aquí si las tienes
  },
};

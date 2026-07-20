module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'react-hooks', 'jsx-a11y', 'import'],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'],
      },
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx'] }],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'function-declaration',
        unnamedComponents: 'arrow-function',
      },
    ],
    'import/prefer-default-export': 'off',
    'no-console': 'error',
    'jsx-a11y/label-has-associated-control': 'error',
    // No PropTypes/TypeScript in this stack (Zod validates form data, not
    // component props), so the propTypes-driven react/* rules don't apply.
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    // React Hook Form's register()/Controller field props are spread onto
    // inputs throughout common/ and the step components; this is the
    // standard RHF integration pattern, not a code smell.
    'react/jsx-props-no-spreading': 'off',
  },
  ignorePatterns: ['dist', 'node_modules'],
  overrides: [
    {
      // Build-tool config files import ESM-only packages (vite, tailwindcss, ...)
      // that expose only a package.json "exports" map with no "main" field.
      // eslint-plugin-import's resolver predates "exports" support, so these
      // otherwise-valid imports read as unresolved. Not applicable to app source.
      files: ['*.config.js'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'import/no-unresolved': 'off',
      },
    },
    {
      files: ['cypress/**/*.js'],
      env: {
        mocha: true,
      },
      globals: {
        cy: 'readonly',
        Cypress: 'readonly',
      },
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};

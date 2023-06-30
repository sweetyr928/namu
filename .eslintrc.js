module.exports = {
  env: {
    browser: true,
    es2021: true
  },

  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
        requireConfigFile: false,
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    babelOptions: {
      presets: ['@babel/preset-react']
    }
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-unused-vars': 'off'
  },
  parser: '@babel/eslint-parser',
  settings: {
    'import/resolver': {
      node: {
        paths: ['src']
      }
    }
  }
};

module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-tailwindcss'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
          'layer',
          'theme',
          'custom-variant',
          'import',
        ],
      },
    ],
    'no-descending-specificity': null,
    'custom-property-pattern': null,
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: ['theme', 'screen'],
      },
    ],
    'selector-class-pattern': null,
  },
};

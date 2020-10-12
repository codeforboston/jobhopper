module.exports = {
  '**/*.{js,jsx,ts,tsx,json,css,scss,md}': files =>
    `prettier --write ${files.join(' ')}`,
  '**/*.{js,jsx,ts,tsx}': files => `eslint --fix ${files.join(' ')}`,
  'src/**/*.{js,jsx,ts,tsx}': () => 'npm run check-types',
};

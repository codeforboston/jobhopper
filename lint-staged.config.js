module.exports = {
  'frontend/**/*.{js,jsx,ts,tsx,json,css,scss,md}': () => [
    'yarn fix',
    'yarn lint',
  ],
};

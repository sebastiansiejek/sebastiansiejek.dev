const path = require('path')

const buildEslintCommand = (filenames) =>
  `eslint --fix --no-warn-ignored --max-warnings 0 ${filenames.map(toRelativePath).join(' ')}`

const buildPrettierCommand = (filenames) =>
  `prettier --write ${filenames.map(toRelativePath).join(' ')}`

const toRelativePath = (filename) =>
  JSON.stringify(path.relative(process.cwd(), filename))

module.exports = {
  '*.{js,jsx,ts,tsx}': [() => 'pnpm run check-types', buildEslintCommand],
  '*.{js,jsx,ts,tsx,css,md,json}': [buildPrettierCommand],
}

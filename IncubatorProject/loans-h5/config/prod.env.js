'use strict'
let params = ''
if (process.argv.length > 2) {
  params = process.argv[2].slice(10)
}
let Redirect = ''
switch (params) {
  case 'valuation': 
    Redirect = '"/valuation"'
    break;

  case 'loansh5': 
    Redirect = '"/loansh5"'
    break;
  
  default:
    break;
}

module.exports = {
  NODE_ENV: '"production"',
  REDIRECT: Redirect
}

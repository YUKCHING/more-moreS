'use strict'
let params = ''
if (process.argv.length > 2) {
  params = process.argv[2].slice(10)
}
let Redirect = ''
let IsApplet = false
switch (params) {
  case 'valuation': 
    Redirect = '"/valuation"'
    break;

  case 'loansh5': 
    Redirect = '"/loansh5"'
    IsApplet = true
    break;

  case 'home': 
    Redirect = '"/home"'
    break;
  
  default:
    break;
}

module.exports = {
  NODE_ENV: '"production"',
  REDIRECT: Redirect,
  ISAPPLET: IsApplet
}

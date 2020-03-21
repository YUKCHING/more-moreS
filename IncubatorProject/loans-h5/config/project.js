function getCodeEnv () {
  const args = process.argv
  var res
  for (var i = 0; i < args.length; i++) {
    if (args[i].indexOf('--PROJECT=') !== -1) {
      res = args[i].split('=')[1] || ''
      break
    }
  }
  return res || 'production'
}

const PROJECT = `${getCodeEnv()}`

/**
 * loansh5 - 车贷
 * valuation - 快速估值
 * home - 首页
 */

const { AssetsPath, assetsPublicPath } = (() => {
  const def = {
    AssetsPath: '',
    assetsPublicPath: ''
  }

  switch (PROJECT) {
    case 'loansh5':
      def.AssetsPath = '/loansh5'
      def.assetsPublicPath = '/loansh5/'
      break;
    case 'valuation':
      def.AssetsPath = '/valuation'
      def.assetsPublicPath = '/valuation/'
      break;

    case 'home':
      def.AssetsPath = '/home'
      def.assetsPublicPath = '/home/'
      break;
  
    default:
      break;
  }

  return def
})()

module.exports = {
  PROJECT, AssetsPath
}
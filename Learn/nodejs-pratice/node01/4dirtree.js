const fs = require('fs')

function readDir (path) {
  fs.readdir(path, (err, data) => {
    if (err) {
      console.log('readdir Error', err)
    } else {
      data.forEach(ele => {
        fs.stat(path + ele , (err, stats) => {
          console.log('-' + ele)
          if (!stats.isFile()) {
            readDir(path + ele + '/')
          }
        })
      })
    }
  })
}

readDir('../')

// fs.stat('./', (err, stats) => {
//   if (err) {
//     console.log(err)
//   } else {
//     // console.log(stats)
//     console.log(stats.isFile())
//   }
// })
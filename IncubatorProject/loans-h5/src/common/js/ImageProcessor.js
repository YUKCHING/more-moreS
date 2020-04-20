var imgProcessor = {
  uploadImage: (file, name, quality) => {
    return new Promise((resolve, reject) => {
      var reday = new FileReader()
      var imgFile = file.file

      reday.readAsDataURL(imgFile)
      reday.onload = () => {
        var re = reday.result
        canvasDataURL(re, {
          quality: 0.2
        }, name, quality).then(res => {
          resolve(res)
        })
      }
    })
  },
  uploadOrigin: (file, name) => {
    return new Promise((resolve, reject) => {
      var fileBlob = blobToFile(file, name)
      var formdata = new FormData()
      formdata.append(name, fileBlob)
      resolve(formdata)
    })
  }
}

function canvasDataURL (path, obj, name, qua) {
  return new Promise((resolve, reject) => {
    var img = new Image()
    img.src = path
    img.onload = function () {
      var that = this
      var w = that.width
      var h = that.height
      var scale = w / h
      w = obj.width || w
      h = obj.height || (w / scale)
      var quality = qua
      var canvas = document.createElement('canvas')
      var ctx = canvas.getContext('2d')
      var anw = document.createAttribute('width')
      anw.nodeValue = w
      var anh = document.createAttribute('height')
      anh.nodeValue = h
      canvas.setAttributeNode(anw)
      canvas.setAttributeNode(anh)
      ctx.drawImage(that, 0, 0, w, h)
      if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
        quality = obj.quality
      }
      var base64 = canvas.toDataURL('image/jpeg', quality)
      var urlFile = converBase64UrlToBlob(base64)
      let picName = name
      var file = blobToFile(urlFile, picName)

      var formdata = new FormData()
      formdata.append(picName, file)
      resolve(formdata)
    }
  })
}

function converBase64UrlToBlob (urlData) {
  var arr = urlData.split(',')
  var mime = arr[0].match(/:(.*?);/)[1]
  var bstr = atob(arr[1])
  var n = bstr.length
  var u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  return new Blob([u8arr], {type: mime})
}

function blobToFile (theBlob, fileName) {
  return new File([theBlob], fileName, {
    type: theBlob.type,
    lastModified: Date.now()
  })
}

export default imgProcessor

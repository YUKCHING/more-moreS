export function debounce (func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = () => {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}
// 深拷贝  简洁版：JSON.parse(JSON.stringify(source))
export function deepClone (source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  for (const keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {}
        targetObj[keys] = deepClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    }
  }
  return targetObj
}

// 时间格式化
export function timeFormat (t, s = 'YYYY-MM-DD hh:mm:ss') {
  // t new Date()
  // s YYYY-MM-DD hh:mm:ss
  t = new Date(t) || new Date()
  const re = /YYYY|YY|MM|M|DD|D|hh|h|mm|m|ss|s/g
  return s.replace(re, ($1) => {
    switch ($1) {
      case 'YYYY': return t.getFullYear()
      case 'YY': return ('' + t.getFullYear()).slice(-2)
      case 'MM': return ('0' + (t.getMonth() + 1)).slice(-2)
      case 'M': return t.getMonth() + 1
      case 'DD': return ('0' + t.getDate()).slice(-2)
      case 'D': return t.getDate()
      case 'hh': return ('0' + t.getHours()).slice(-2)
      case 'h': return t.getHours()
      case 'mm': return ('0' + t.getMinutes()).slice(-2)
      case 'm': return t.getMinutes()
      case 'ss': return ('0' + t.getSeconds()).slice(-2)
      case 's': return t.getSeconds()
    }
    return $1
  })
}

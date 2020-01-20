export function getStorageByKey (key) {
  return localStorage.getItem(key)
}

export function setStorageByKey (key, value) {
  localStorage.setItem(key, value)
}

export function removeStorageByKey (keys) {
  if (keys.length !== 0) {
    keys.forEach(ele => {
      localStorage.removeItem(ele)
    })
  }
}

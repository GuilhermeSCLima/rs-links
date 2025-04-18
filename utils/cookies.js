/**
 * 
 * @param {string} key cookie key
 * @returns string | void
 */
function GetCookie(key) {
  const name = key + '='
  const cookies = document.cookie.split(';')
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i]
    while (cookie.charAt(0) == ' ') cookie = cookie.substring(1, cookie.length)
    if (cookie.indexOf(name) == 0) return cookie.substring(name.length, cookie.length)
  }
  return
}

/**
 * 
 * @param {string} key cookie key
 * @param {string} data data to be stored
 * @param {number} seconds time to expire
 */
function SetCookie(key, data, seconds) {
  let expires = ''
  if (seconds) {
    const date = new Date()
    date.setTime(date.getTime() + seconds * 1000)
    expires = '; expires=' + date.toUTCString()
  }
  document.cookie = key + '=' + data + expires + '; path=/'
}
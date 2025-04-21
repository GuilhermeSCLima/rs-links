/**
 * Lê um cookie armazenado
 * @param {string} key - nome da chave do cookie
 * @returns {string|undefined}
 */
function GetCookie(key) {
  const nameEQ = key + "=";
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length);
    }
  }
}

/**
 * Define um cookie com tempo de expiração
 * @param {string} key - nome da chave
 * @param {string} data - valor do cookie
 * @param {number} seconds - tempo de vida em segundos
 */
function SetCookie(key, data, seconds) {
  let expires = "";
  if (seconds) {
    const date = new Date();
    date.setTime(date.getTime() + seconds * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = `${key}=${data}${expires}; path=/`;
}

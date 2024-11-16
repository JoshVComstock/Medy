const cookieName = "pesquisasToken";

export const setAuthCookie = (token: string) => {
  localStorage.setItem(cookieName, token); /* = `${cookieName}=${JSON.stringify(
    token
  )}; path=/; samesite=strict`; */
};

export const getAuthCookie = (): string | null => {
  const cookietoken = localStorage.getItem(cookieName);
  /*   const cookie = getC(cookieName);
   */ if (!cookietoken) return null;
  return cookietoken;
};

export const deleteAuthCookie = () => {
  localStorage.removeItem(cookieName);
  /*   document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
   */
};

/* function getC(cname: string) {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
} */

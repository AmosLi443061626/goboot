import { reloadAuthorized } from './Authorized'; // use localStorage to store the authority info, which might be sent from server in actual project.

export function getAuthority(str) {
  const authorityString =
    typeof str === 'undefined' && localStorage ? localStorage.getItem('goboot') : str; // authorityString could be admin, "admin", ["admin"]

  // preview.pro.ant.design only do not use in your production.
  // preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

  // if (!authority && ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
  //   return ['admin'];
  // }
  return authorityString;
}
export function setAuthority(authority) {
  const proAuthority = authority;
  localStorage.setItem('goboot', proAuthority); // auto reload
  reloadAuthorized();
}

export function setBtnAuthority(authority) {
  sessionStorage.setItem('btns', JSON.stringify(authority)); // auto reload
}

export function getBtnAuthority(flag) {
  const authorityString = sessionStorage.getItem('btns');
  try {
    const authorityAry = JSON.parse(authorityString)
    var b = false;
    authorityAry.map(item => {
      if (item.authurl === flag) {
        b = true;
      }
    })
    return b
  }
  catch{
    return false;
  }
}

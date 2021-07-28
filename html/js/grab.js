export const grab = (el) => typeof el === 'string'
    ? document.getElementById(el)
    : el;

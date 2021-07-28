export const grab = (el: string | Element) =>
	typeof el === 'string'
		? document.getElementById(el)
		: el;
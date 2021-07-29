import { grab } from './grab.js';
const book = grab('book');

const ce = (tag: string, children: (Element | string)[] = []) => {
	const el = document.createElement(tag);
	el.append(...children);
	return el;
}
class Index {
	constructor() { }
	async init() {
		const orig = await (await fetch('earnest.html')).text();
		if (!book)
			return;
		book.innerHTML = orig;
		const names = new Set();
		[...book.children].forEach((chapter: Element) => {
			const table = ce('table');
			let title, subtitle;
			[...chapter.children].forEach(el => {
				const text = el.innerHTML;
				console.log('tn', el.tagName);
				switch (el.tagName) {
					case 'H2':
						title = el;
						break;
					case 'H3':
						subtitle = el;
						break;
					case 'P':
						if (text.match(/[A-Z]+\.<br>/)) {
							const [name, speech] = text.split(/<br>/);
							names.add(name);
							const action = ce('td');
							const nameTd = ce('td');
							nameTd.innerHTML = name.replace(' ', '&nbsp;');
							action.innerHTML = speech.replace(/(\[.+?])/gs, '<span class="action">$1</span>');
							table.append(
								ce('tr', [
									nameTd,
									action
								])
							)
						} else if (text.match(/^\[.+\]$/)) {
							table.append(
								ce('tr', [
									ce('td'),
									ce('td', [text])
								])
							)
						} else
							console.log('bad child!', text)
						chapter.removeChild(el);
				}
			});
			chapter.append(table);
		})
		console.log(names);
	}
}

const index = new Index();
index.init();
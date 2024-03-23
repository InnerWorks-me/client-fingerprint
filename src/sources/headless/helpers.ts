import { GHOST } from './constants'

// Detect Browser
function getEngine() {
	const x = [].constructor
	try {
		(-1).toFixed(-1)
	} catch (err) {
		return (err as Error).message.length + (x+'').split(x.name).join('').length
	}
}

const ENGINE_IDENTIFIER = getEngine()
const IS_BLINK = ENGINE_IDENTIFIER == 80
const IS_GECKO = ENGINE_IDENTIFIER == 58
const IS_WEBKIT = ENGINE_IDENTIFIER == 77

const instanceId = (
	String.fromCharCode(Math.random() * 26 + 97) +
	Math.random().toString(36).slice(-7)
)
interface Phantom {
	iframeWindow: Window
	div?: HTMLDivElement | undefined
}
function getPhantomIframe(): Phantom {
	try {
		const numberOfIframes = self.length
		const frag = new DocumentFragment()
		const div = document.createElement('div')
		const id = getRandomValues()
		div.setAttribute('id', id)
		frag.appendChild(div)
		div.innerHTML = `<div style="${GHOST}"><iframe></iframe></div>`
		document.body.appendChild(frag)
		const iframeWindow = self[numberOfIframes]
		const phantomWindow = getBehemothIframe(iframeWindow)
		return { iframeWindow: phantomWindow || self, div }
	} catch (error) {
		return { iframeWindow: self }
	}
}

function getRandomValues() {
	return (
		String.fromCharCode(Math.random() * 26 + 97) +
		Math.random().toString(36).slice(-7)
	)
}

function getBehemothIframe(win: Window): Window | null {
	try {
		if (!IS_BLINK) return win

		const div = win.document.createElement('div');
		div.setAttribute('id', getRandomValues());
		div.setAttribute('style', GHOST);
		div.innerHTML = `<div><iframe></iframe></div>`;
		win.document.body.appendChild(div);
		const iframe = Array.from(div.childNodes[0].childNodes)[0] as HTMLIFrameElement;

		if (!iframe) return null;

		const { contentWindow } = iframe || {};
		if (!contentWindow) return null;

		const div2 = contentWindow.document.createElement('div');
		div2.innerHTML = `<div><iframe></iframe></div>`;
		contentWindow.document.body.appendChild(div2);
		const iframe2 = Array.from(div2.childNodes[0].childNodes)[0] as HTMLIFrameElement;
		return iframe2.contentWindow
	} catch (error) {
		return win
	}
}


const { iframeWindow: PHANTOM_DARKNESS, div: PARENT_PHANTOM } = getPhantomIframe() || {}

export { getEngine, ENGINE_IDENTIFIER, IS_BLINK, IS_GECKO, IS_WEBKIT, instanceId, PHANTOM_DARKNESS, PARENT_PHANTOM}
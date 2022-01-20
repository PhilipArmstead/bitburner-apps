export async function main(ns) {

	// Immediate app-specific code
	const previewTheme = ({ detail }) => {
		try {
			ns.ui.setTheme(JSON.parse(detail))
		} catch (e) {
			console.log(e)
		}
	}

	const { apply: themeToApply, 'apply-id': themeIdToApply } = ns.flags([['apply', ""], ['apply-id', ""]])
	if (themeToApply) {
		return previewTheme({ detail: themeToApply })
	}


	// Boilerplate
	const doc = globalThis['document']
	const id = 'theme-browser-app'
	globalThis[`${id}-version`] = '0.0.49'

	let vueLoaded
	const vueLoad = new Promise((resolve) => (vueLoaded = resolve))

	if (!doc.getElementById('vue-js-lib')) {
		const script = doc.createElement('script')
		script.id = 'vue-js-lib'
		script.src = 'https://cdn.jsdelivr.net/npm/vue@3.2.26/dist/vue.runtime.global.prod.js'
		script.onload = vueLoaded
		doc.head.insertAdjacentElement('beforeend', script)
	} else {
		vueLoaded()
	}


	// Extract current theme as CSS varibles for apps
	let stylesheet = doc.getElementById('theme-variables')
	if (!stylesheet) {
		stylesheet = doc.createElement('style')
		stylesheet.id = 'theme-variables'
		doc.head.insertAdjacentElement('beforeend', stylesheet)
	}

	stylesheet.innerHTML = `:root {
		--font-family: ${getComputedStyle(doc.querySelector('p'))['font-family']};
${Object.entries(ns.ui.getTheme()).map(([key, value]) => `--${key}: ${value};`).join('\n')}
	}`


	// Add app's CSS and mount point
	doc.getElementById(id)?.remove()
	doc.body.insertAdjacentHTML('beforeend', `<section id="${id}"></section>`)

	doc.getElementById(`${id}-css`)?.remove()
	doc.head.insertAdjacentHTML('beforeend', `<style id="${id}-css">${bundledCss}</style>`)

	const updateApp = async ({ detail: { element, path }}) => {
		await ns.wget(path, ns.getScriptName())
		element.dispatchEvent(new CustomEvent('app:updated'))
	}

	doc.body.addEventListener('app:update:theme-browser-app', updateApp)

	// Unset some stuff on app death
	ns.atExit(() => {
		doc.getElementById(id)?.remove()
		doc.getElementById(`${id}-css`)?.remove()
		doc.body.removeEventListener('app:update:theme-browser-app', updateApp)


		try {
			doc.body.removeEventListener('theme:preview', previewTheme)
			doc.body.removeEventListener('theme:cancel-preview', resetTheme)

		} catch (e) {
			console.log(e)
		}

	})

	await vueLoad


	// App-specific setup
	const currentTheme = ns.ui.getTheme()
	const resetTheme = () => ns.ui.setTheme(currentTheme)

	globalThis[`${id}-theme-id`] = themeIdToApply

	doc.body.addEventListener('theme:preview', previewTheme)
	doc.body.addEventListener('theme:cancel-preview', resetTheme)


	// Let's go
	mount()


	while (doc.getElementById(id)) {
		await ns.asleep(2000)
	}

	})
} 


















// App CSS
const bundledCss = ".app-container[data-v-9289dcfa]{bottom:0;left:0;pointer-events:none;position:fixed;top:0;width:100%;z-index:1510}.app-container.app--can-resize .app[data-v-9289dcfa]{resize:both}.app-container.app--is-minimised .app[data-v-9289dcfa]{height:auto!important;min-height:0;min-width:0;resize:none}.app-container.app--is-minimised .app .app__content[data-v-9289dcfa]{display:none}.app-container *[data-v-9289dcfa]{box-sizing:border-box}.app-container .app[data-v-9289dcfa]{align-items:flex-start;border:1px solid #4E4E4E6B;display:inline-flex;flex-direction:column;left:0;height:500px;overflow:hidden;pointer-events:auto;position:absolute;resize:none;top:0;transform:translate(-50%,-52%);width:300px}.app-container .app__toolbar[data-v-9289dcfa]{background:#111;color:#fff;display:flex;padding:4px 3px 4px 8px;user-select:none;width:100%}.app-container .app__title[data-v-9289dcfa]{align-self:center;flex:0 1 100%;font-family:var(--font-family, monospace);font-size:13px;font-weight:700;line-height:1;margin:0 20px 0 0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.app-container .app__cta-group[data-v-9289dcfa]{align-items:center;display:flex;flex:0 1 100%;justify-content:flex-end;margin-left:auto}.app-container .app__cta-group>*[data-v-9289dcfa]{background-position:50% 50%;background-size:14px auto;flex:0 1 auto}.app-container .app__cta-group .icon[data-v-9289dcfa]{width:16px}.app-container .app__cta-group .icon--restore[data-v-9289dcfa]{color:#d6cec8}.app-container .app__cta-group .icon--update[data-v-9289dcfa]{color:#6bd700}.app-container .app__cta-group .btn[data-v-9289dcfa]{background:none;border:none;color:#a9a9a9;cursor:pointer;display:flex}.app-container .app__icon[data-v-9289dcfa]{align-self:center;max-height:16px;margin-right:6px;object-fit:contain;width:16px}.app-container .app__menu[data-v-9289dcfa]{width:100%;background:#d4d0c8;color:#333;padding-left:5px;padding-bottom:2px}.app-container .app__menu span[data-v-9289dcfa]{border:1px inset transparent;cursor:pointer;font-size:15px;margin-right:12px;padding:0 1px}.app-container .app__menu span[data-v-9289dcfa]:hover{border:1px inset #BDBDBD}.app-container .app__content[data-v-9289dcfa]{flex:0 1 100%;overflow:auto;scrollbar-color:var(--primary, #272727) var(--primarydark, #B7B7B7);scrollbar-width:thin;width:100%}.app-container .app__content[data-v-9289dcfa]::-webkit-scrollbar{display:block;width:10px}.app-container .app__content[data-v-9289dcfa]::-webkit-scrollbar-track{background-color:var(--primarydark, #B7B7B7)}.app-container .app__content[data-v-9289dcfa]::-webkit-scrollbar-thumb{background-color:var(--primary, #272727)}.app-container .app .btn[data-v-9289dcfa]{background:none;box-shadow:none}.modal[data-v-01a1e9db]{background:#FFF;border:1px solid #0003;border-radius:6px;display:flex;flex-wrap:wrap;left:50%;padding:24px;position:absolute;top:50%;transform:translate(-50%,-50%);width:40vw}.modal__title[data-v-01a1e9db]{color:#212529;font-size:20px;font-weight:500;line-height:1.5;margin:0}.modal__message[data-v-01a1e9db]{line-height:1.4}.modal__ctas[data-v-01a1e9db],.modal__message[data-v-01a1e9db]{flex:1 0 100%;margin:16px 0 0}.modal__ctas[data-v-01a1e9db]{display:flex;justify-content:flex-end}.modal .cta[data-v-01a1e9db]{border:1px solid transparent;border-radius:4px;cursor:pointer;display:inline-block;font-weight:400;font-size:16px;line-height:1.5;margin-left:12px;padding:6px 12px;text-align:center;transition:.15s ease-in-out;transition-property:color,background-color,border-color,box-shadow;vertical-align:middle}.modal .cta[data-v-01a1e9db]:hover{text-decoration:none}.modal .cta--cancel[data-v-01a1e9db]{background-color:#6c757d;border-color:#6c757d;color:#fff}.modal .cta--cancel[data-v-01a1e9db]:hover{background-color:#5a6268;border-color:#545b62;color:#fff}.modal .cta--cancel[data-v-01a1e9db]:active{background-color:#545b62;border-color:#4e555b;color:#fff}.modal .cta--confirm[data-v-01a1e9db]{background-color:#28a745;border-color:#28a745;color:#fff}.modal .cta--confirm[data-v-01a1e9db]:hover{background-color:#218838;border-color:#1e7e34;color:#fff}.modal .cta--confirm[data-v-01a1e9db]:active{background-color:#1e7e34;border-color:#1c7430;color:#fff}.app-wrapper[data-v-4cc735b8],.update-modal[data-v-4cc735b8],button[data-v-4cc735b8]{font-family:Fira Sans,Trebuchet MS,Ubuntu,Helvetica,Arial,sans-serif}.update-modal[data-v-4cc735b8]{background:rgba(51,51,51,.7);height:100%;left:0;position:fixed;top:0;width:100%;z-index:1512}.theme-list[data-v-ffed919c]{display:flex;flex-wrap:wrap;list-style:none;margin:0;padding:0}.theme-list .theme[data-v-ffed919c]{box-sizing:border-box;display:flex;flex:0 0 33%;flex-direction:column;margin:0;padding:16px}.theme-list .theme__name[data-v-ffed919c],.theme-list .theme__author[data-v-ffed919c]{text-align:center}.theme-list .theme__name[data-v-ffed919c]{color:#80f20d;font-size:18px;font-weight:500;margin:14px 0 0}.theme-list .theme__author[data-v-ffed919c]{color:#ccced0;font-size:14px;margin:8px 0 0}.theme-list .theme__preview[data-v-ffed919c]{aspect-ratio:1.5;cursor:pointer;display:block;height:auto;pointer-events:auto;transition:transform .2s cubic-bezier(.4,0,.2,1);width:100%}.theme-list .theme__preview[data-v-ffed919c]:hover{transform:scale(1.1)}[data-v-a1fe45be] .app-container .app{left:50%;height:90vh;max-width:1166px;top:50%;transform:translate(-50%,-52%);width:90vw}.theme-browser[data-v-a1fe45be]{align-content:flex-start;align-items:baseline;background:#171A22;box-sizing:border-box;color:#fff;display:flex;flex-wrap:wrap;height:inherit;justify-content:space-between;min-height:100%;padding:24px 32px}.title[data-v-a1fe45be],.pagination-details[data-v-a1fe45be]{flex:0 1 auto;margin:0}.title[data-v-a1fe45be]{margin-right:20px}.pagination-details[data-v-a1fe45be]{color:#cecece;margin-left:20px}.themes[data-v-a1fe45be]{flex:1 0 100%;margin-top:16px}.loader[data-v-a1fe45be]{align-self:center;background:no-repeat 55% 50%/100px auto url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxMDAgMTAwJz4KCTxnIGZpbGw9JyM5MDAnPgoJCTxjaXJjbGUgY3g9JzYwJyBjeT0nNTAnIHI9JzQnPgoJCQk8YW5pbWF0ZQoJCQkJYXR0cmlidXRlTmFtZT0nY3gnCgkJCQlyZXBlYXRDb3VudD0naW5kZWZpbml0ZScKCQkJCWR1cj0nMXMnCgkJCQl2YWx1ZXM9Jzk1OzM1JwoJCQkJa2V5VGltZXM9JzA7MScKCQkJCWJlZ2luPSctMC42N3MnCgkJCS8+CgkJCTxhbmltYXRlCgkJCQlhdHRyaWJ1dGVOYW1lPSdmaWxsLW9wYWNpdHknCgkJCQlyZXBlYXRDb3VudD0naW5kZWZpbml0ZScKCQkJCWR1cj0nMXMnCgkJCQl2YWx1ZXM9JzA7MTsxJwoJCQkJa2V5VGltZXM9JzA7MC4yOzEnCgkJCQliZWdpbj0nLTAuNjdzJwoJCQkvPgoJCTwvY2lyY2xlPgoJCTxjaXJjbGUgY3g9JzYwJyBjeT0nNTAnIHI9JzQnPgoJCQk8YW5pbWF0ZQoJCQkJYXR0cmlidXRlTmFtZT0nY3gnCgkJCQlyZXBlYXRDb3VudD0naW5kZWZpbml0ZScKCQkJCWR1cj0nMXMnCgkJCQl2YWx1ZXM9Jzk1OzM1JwoJCQkJa2V5VGltZXM9JzA7MScKCQkJCWJlZ2luPSctMC4zM3MnCgkJCS8+CgkJCTxhbmltYXRlCgkJCQlhdHRyaWJ1dGVOYW1lPSdmaWxsLW9wYWNpdHknCgkJCQlyZXBlYXRDb3VudD0naW5kZWZpbml0ZScKCQkJCWR1cj0nMXMnCgkJCQl2YWx1ZXM9JzA7MTsxJwoJCQkJa2V5VGltZXM9JzA7MC4yOzEnCgkJCQliZWdpbj0nLTAuMzNzJwoJCQkvPgoJCTwvY2lyY2xlPgoJCTxjaXJjbGUgY3g9JzYwJyBjeT0nNTAnIHI9JzQnPgoJCQk8YW5pbWF0ZQoJCQkJYXR0cmlidXRlTmFtZT0nY3gnCgkJCQlyZXBlYXRDb3VudD0naW5kZWZpbml0ZScKCQkJCWR1cj0nMXMnCgkJCQl2YWx1ZXM9Jzk1OzM1JwoJCQkJa2V5VGltZXM9JzA7MScKCQkJCWJlZ2luPScwcycKCQkJLz4KCQkJPGFuaW1hdGUKCQkJCWF0dHJpYnV0ZU5hbWU9J2ZpbGwtb3BhY2l0eScKCQkJCXJlcGVhdENvdW50PSdpbmRlZmluaXRlJwoJCQkJZHVyPScxcycKCQkJCXZhbHVlcz0nMDsxOzEnCgkJCQlrZXlUaW1lcz0nMDswLjI7MScKCQkJCWJlZ2luPScwcycKCQkJLz4KCQk8L2NpcmNsZT4KCTwvZz4KCTxnIGZpbGw9JyM4MGYyMGQnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKC0xNSAwKSc+CgkJPHBhdGggZD0nTTUwIDUwTDIwIDUwQTMwIDMwIDAgMCAwIDgwIDUwWic+CgkJCTxhbmltYXRlVHJhbnNmb3JtCgkJCQlhdHRyaWJ1dGVOYW1lPSd0cmFuc2Zvcm0nCgkJCQl0eXBlPSdyb3RhdGUnCgkJCQlyZXBlYXRDb3VudD0naW5kZWZpbml0ZScKCQkJCWR1cj0nMXMnCgkJCQl2YWx1ZXM9JzAgNTAgNTA7NDUgNTAgNTA7MCA1MCA1MCcKCQkJCWtleVRpbWVzPScwOzAuNTsxJwoJCQkvPgoJCTwvcGF0aD4KCQk8cGF0aCBkPSdNNTAgNTBMMjAgNTBBMzAgMzAgMCAwIDEgODAgNTBaJz4KCQkJPGFuaW1hdGVUcmFuc2Zvcm0KCQkJCWF0dHJpYnV0ZU5hbWU9J3RyYW5zZm9ybScKCQkJCXR5cGU9J3JvdGF0ZScKCQkJCXJlcGVhdENvdW50PSdpbmRlZmluaXRlJwoJCQkJZHVyPScxcycKCQkJCXZhbHVlcz0nMCA1MCA1MDstNDUgNTAgNTA7MCA1MCA1MCcKCQkJCWtleVRpbWVzPScwOzAuNTsxJwoJCQkvPgoJCTwvcGF0aD4KCTwvZz4KPC9zdmc+Cg==);flex:1 0 100%;height:200px;margin:auto 0 40%;width:200px}.preview__ctas[data-v-a1fe45be]{bottom:0;display:flex;height:150px;justify-content:space-between;position:fixed;right:30px;width:150px}.preview__ctas:not(.preview__ctas--visible) .preview__cta[data-v-a1fe45be]{pointer-events:none}.preview__ctas:not(.preview__ctas--visible) .preview__cta--cancel[data-v-a1fe45be]{transform:translate(190px,160px)}.preview__ctas:not(.preview__ctas--visible) .preview__cta--confirm[data-v-a1fe45be]{transform:translate(110px,160px)}.preview__ctas .preview__cta[data-v-a1fe45be]{align-items:center;background:no-repeat 50% 50%/30px auto;border:none;border-radius:50%;cursor:pointer;display:flex;flex:0 1 44%;height:66px;justify-content:center;padding:0;position:relative;transition:transform .25s cubic-bezier(.4,0,.2,1)}.preview__ctas .preview__cta--cancel[data-v-a1fe45be]{background-color:#e33030d4;background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCA0Ny4wOTUgNDcuMDk1Jz4KCTxwYXRoCgkJZmlsbD0nI0ZGRicKCQlkPSdtNDUuMzYzIDM2LjIzNC0xMy4xNTgtMTMuMTYgMTIuMjEtMTIuMjFhNS45MDYgNS45MDYgMCAwIDAgMC04LjM1OCA1LjkwOCA1LjkwOCAwIDAgMC04LjM1NiAwbC0xMi4yMTIgMTIuMjEtMTIuODA5LTEyLjgxYTUuOTEgNS45MSAwIDEgMC04LjM1OCA4LjM1OGwxMi44MSAxMi44MUwxLjczMiAzNi44MzFhNS45MSA1LjkxIDAgMSAwIDguMzU2IDguMzU5bDEzLjc1OS0xMy43NTggMTMuMTYgMTMuMTZhNS45MDggNS45MDggMCAwIDAgOC4zNTYgMCA1LjkwNyA1LjkwNyAwIDAgMCAwLTguMzU4eicKCS8+Cjwvc3ZnPgo=);transform:translateY(40px)}.preview__ctas .preview__cta--confirm[data-v-a1fe45be]{background-color:#72d000d4;background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxMjIuODc3IDEwMS4wNTInPgoJPHBhdGgKCQlmaWxsPSd3aGl0ZScKCQlkPSdNNC40MyA2My42M0ExNC4zODMgMTQuMzgzIDAgMCAxIC4wMDMgNTMuNTJhMTQuMzkzIDE0LjM5MyAwIDAgMSA0LjAxNS0xMC4yODEgMTQuMzcyIDE0LjM3MiAwIDAgMSAxMC4xMDYtNC40MjUgMTQuMzczIDE0LjM3MyAwIDAgMSAxMC4yODMgNC4wMTJsMjQuNzg3IDIzLjg1MUw5OC41NDMgMy45ODlsMS43NjggMS4zNDktMS43Ny0xLjM1NWEyLjI3IDIuMjcgMCAwIDEgLjQ3OS0uNDY2QTE0LjM4MyAxNC4zODMgMCAwIDEgMTA5LjI0My4wMjJWLjAxOGwuMTc2LjAxNmMzLjYyMy4yNCA3LjE2MiAxLjg1IDkuNzc1IDQuNzY2YTE0LjM4MyAxNC4zODMgMCAwIDEgMy42NjIgMTAuNDEyaC4wMDRsLS4wMTYuMTc2YTE0LjM2MiAxNC4zNjIgMCAwIDEtNC42MDkgOS42MzJMNTkuMDExIDk3LjExbC4wMDQuMDA0YTIuMTU3IDIuMTU3IDAgMCAxLS4zNzIuMzY4IDE0LjM5MiAxNC4zOTIgMCAwIDEtOS43NTcgMy41NjkgMTQuMzgxIDE0LjM4MSAwIDAgMS05Ljc0MS00LjAxNkw0LjQzIDYzLjYzeicKCS8+Cjwvc3ZnPgo=)}.sr-only[data-v-a1fe45be]{clip:rect(1px,1px,1px,1px);clip-path:inset(50%);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}@keyframes slide-up-left-a1fe45be{0%{transform:translate(150px,150px)}to{transform:translate(0)}}\n"

// Don't worry about it.
function mount() {
	const winnerdow = globalThis
	const rockument = globalThis['document'];
	var Ke=Object.defineProperty,Qe=Object.defineProperties;var Xe=Object.getOwnPropertyDescriptors;var z=Object.getOwnPropertySymbols;var Ye=Object.prototype.hasOwnProperty,Ze=Object.prototype.propertyIsEnumerable;var F=(e,d,p)=>d in e?Ke(e,d,{enumerable:!0,configurable:!0,writable:!0,value:p}):e[d]=p,$=(e,d)=>{for(var p in d||(d={}))Ye.call(d,p)&&F(e,p,d[p]);if(z)for(var p of z(d))Ze.call(d,p)&&F(e,p,d[p]);return e},D=(e,d)=>Qe(e,Xe(d));(function(e){"use strict";function d(n){rockument.querySelector(`#${n} .app-container`).dispatchEvent(new CustomEvent("app:close"))}function p(n,t){rockument.body.dispatchEvent(new CustomEvent(n,{detail:t}))}const O=async(n,t)=>{const a=await fetch(t).then(o=>o.text());return H(a,n)?a:null},H=(n,t)=>{const a=n.split(".").map(Number),o=t.split(".").map(Number);for(let s=0;s<a.length;++s){if(a[s]>o[s])return!0;if(o[s]>a[s])return!1}return!1},L={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 18 18"},R=[e.createElementVNode("g",{stroke:"currentColor","stroke-width":"1.5"},[e.createElementVNode("path",{d:"m3 3 12 12M15 3 3 15"})],-1)];function T(n,t){return e.openBlock(),e.createElementBlock("svg",L,R)}var j={render:T};const W={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 18 18"},G=[e.createElementVNode("path",{d:"M3 13h12v2H3z",fill:"currentColor"},null,-1)];function q(n,t){return e.openBlock(),e.createElementBlock("svg",W,G)}var J={render:q};const K={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 18 18"},Q=[e.createStaticVNode('<path d="M5 1.5h11v3H5z"></path><g fill="currentColor" stroke="#000" stroke-width="1.6"><path d="M5.8 4.3h9.4v6.5H5.8z"></path><path d="M1.8 9h9.4v6.5H1.8z"></path></g><path d="M1 6.2h11v3H1z"></path>',3)];function X(n,t){return e.openBlock(),e.createElementBlock("svg",K,Q)}var Y={render:X};const Z={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 417 417"},ee=[e.createElementVNode("path",{fill:"#FFF",d:"M120 90h180v235H120z"},null,-1),e.createElementVNode("path",{fill:"currentColor",d:"M208.5 417a208.5 208.5 0 1 0 0-417 208.5 208.5 0 0 0 0 417zm-81.3-197.5 68.3-118.3a15 15 0 0 1 26 0l68.2 118.3a15 15 0 0 1-13 22.5h-33.2v66.2a15 15 0 0 1-15 15h-40a15 15 0 0 1-15-15V242h-33.3a15 15 0 0 1-13-22.5z"},null,-1)];function te(n,t){return e.openBlock(),e.createElementBlock("svg",Z,ee)}var oe={render:te},st="",B=(n,t)=>{const a=n.__vccOpts||n;for(const[o,s]of t)a[o]=s;return a};const ne={name:"AppContainer",components:{IconClose:j,IconMinimise:J,IconRestore:Y,IconUpdate:oe},props:{title:{type:String,required:!0},availableUpdate:{type:[String,Promise],default:null},versionFilePath:{type:String,default:null},id:{type:String,default:null},options:{type:Object,default:()=>({})}},setup({options:n}){const t=e.ref(null),a=e.ref(!1),o=e.ref(),s=e.ref(),r=e.ref(),i=e.ref(),c=e.ref(),l=e.ref(),g=e.ref();let m={},k={};const w=e.ref(!1),E=Object.assign({canDrag:!0,canMinimise:!0,canResize:!0},n),h=()=>{const _=t.value.offsetWidth,u=t.value.offsetHeight;i.value=winnerdow.innerWidth,c.value=winnerdow.innerHeight,l.value=i.value/2-_/2,g.value=c.value/2-u/2};e.onMounted(()=>{E.canResize?new ResizeObserver(([{borderBoxSize:[{inlineSize:_,blockSize:u}]}])=>{a.value&&!w.value&&(o.value=_,s.value=u),a.value=!0}).observe(t.value):a.value=!0,E.canDrag&&h()});const b=({x:_,y:u,button:y})=>{if(!E.canDrag)return;const f=rockument.body;y||(m={x:_,y:u},o.value=t.value.offsetWidth,s.value=t.value.offsetHeight,k={x:l.value,y:g.value},i.value=winnerdow.innerWidth,c.value=winnerdow.innerHeight,f.addEventListener("mousemove",U),f.addEventListener("mouseup",v),f.addEventListener("mouseleave",v))},v=()=>{const _=rockument.body;_.removeEventListener("mousemove",U),_.removeEventListener("mouseup",v),_.removeEventListener("mouseleave",v)};e.onUnmounted(v);const U=({x:_,y:u})=>{let y=k.x+(_-m.x),f=k.y+(u-m.y);const I=y<0,qe=y+o.value>i.value;(I||qe)&&(I?y=0:y=i.value-o.value,k.x=y,m.x=Math.max(Math.min(_,i.value-5),5));const P=f<0,Je=f+s.value>c.value;(P||Je)&&(P?f=0:f=c.value-s.value,k.y=f,m.y=Math.max(Math.min(u,c.value),5)),l.value=y,g.value=f};return{isMinimised:w,left:l,process:t,processHeight:s,processWidth:o,top:g,windowOptions:E,beginGrabbing:b,setPosition:h,toggleMinimise:()=>{w.value||(r.value=s.value),w.value=!w.value,w.value||(s.value=r.value)}}}},ae={class:"app__title"},se={class:"app__cta-group"},ie=["title"],le={class:"app__content"};function re(n,t,a,o,s,r){const i=e.resolveComponent("icon-update"),c=e.resolveComponent("icon-minimise"),l=e.resolveComponent("icon-restore"),g=e.resolveComponent("icon-close");return e.openBlock(),e.createElementBlock("div",{class:e.normalizeClass(["app-container",{"app--is-minimised":o.isMinimised,"app--can-resize":o.windowOptions.canResize}])},[e.createElementVNode("div",{ref:"process",class:"app",style:e.normalizeStyle({transform:`translate(${o.left}px, ${o.top}px)`,width:`${o.processWidth}px`,height:`${o.processHeight}px`})},[e.createElementVNode("div",{class:"app__toolbar",onMousedown:t[6]||(t[6]=(...m)=>o.beginGrabbing&&o.beginGrabbing(...m))},[e.createElementVNode("h1",ae,e.toDisplayString(a.title),1),e.createElementVNode("div",se,[a.availableUpdate?(e.openBlock(),e.createElementBlock("button",{key:0,class:"btn btn--small app__cta-update-available",title:`Version ${a.availableUpdate} is available`,onClick:t[0]||(t[0]=m=>n.$emit("app:click:update")),onMousedown:t[1]||(t[1]=e.withModifiers(()=>{},["stop"]))},[e.createVNode(i,{class:"icon icon--update"})],40,ie)):e.createCommentVNode("",!0),o.windowOptions.canMinimise?(e.openBlock(),e.createElementBlock("button",{key:1,class:"btn btn--small app__cta-minimise",onClick:t[2]||(t[2]=(...m)=>o.toggleMinimise&&o.toggleMinimise(...m)),onMousedown:t[3]||(t[3]=e.withModifiers(()=>{},["stop"]))},[e.withDirectives(e.createVNode(c,{class:"icon icon--minimise"},null,512),[[e.vShow,!o.isMinimised]]),e.withDirectives(e.createVNode(l,{class:"icon icon--restore"},null,512),[[e.vShow,o.isMinimised]])],32)):e.createCommentVNode("",!0),e.createElementVNode("button",{class:"btn btn--small app__cta-close",title:"Close",onClick:t[4]||(t[4]=m=>n.$emit("app:close")),onMousedown:t[5]||(t[5]=e.withModifiers(()=>{},["stop"]))},[e.createVNode(g,{class:"icon icon--close"})],32)])],32),e.createElementVNode("div",le,[e.renderSlot(n.$slots,"default",{},void 0,!0)])],4)],2)}var ce=B(ne,[["render",re],["__scopeId","data-v-9289dcfa"]]),it="";const de={name:"UpdateModal",props:{appFilePath:{type:String,default:null},id:{type:String,default:null},version:{type:String,default:null}},setup({appFilePath:n,id:t}){const a=e.ref(null),o=e.ref(!1);return{element:a,hasUpdated:o,doUpdate:()=>p(`app:update:${t}`,{element:a.value,path:n}),updateComplete:()=>o.value=!0}}},S=n=>(e.pushScopeId("data-v-01a1e9db"),n=n(),e.popScopeId(),n),pe={class:"modal__title"},me={class:"modal__ctas"},_e=S(()=>e.createElementVNode("h1",{class:"modal__title"}," App successfully updated ",-1)),he=S(()=>e.createElementVNode("p",{class:"modal__message"}," Restart the app in your own time to get the latest version. ",-1)),fe={class:"modal__ctas"};function we(n,t,a,o,s,r){return e.openBlock(),e.createElementBlock("div",{ref:"element",onClick:t[4]||(t[4]=e.withModifiers(i=>n.$emit("modal:close"),["stop"])),"onApp:updated":t[5]||(t[5]=(...i)=>o.updateComplete&&o.updateComplete(...i))},[e.createElementVNode("div",{class:"modal",onClick:t[3]||(t[3]=e.withModifiers(()=>{},["stop"]))},[o.hasUpdated?(e.openBlock(),e.createElementBlock(e.Fragment,{key:1},[_e,he,e.createElementVNode("div",fe,[e.createElementVNode("button",{class:"cta cta--confirm",onClick:t[2]||(t[2]=i=>n.$emit("modal:close"))}," Okay! ")])],64)):(e.openBlock(),e.createElementBlock(e.Fragment,{key:0},[e.createElementVNode("h1",pe," Do you want to update to v"+e.toDisplayString(a.version)+"? ",1),e.createElementVNode("div",me,[e.createElementVNode("button",{class:"cta cta--cancel",onClick:t[0]||(t[0]=i=>n.$emit("modal:close"))}," Nope "),e.createElementVNode("button",{class:"cta cta--confirm",onClick:t[1]||(t[1]=(...i)=>o.doUpdate&&o.doUpdate(...i))}," Sure! ")])],64))])],544)}var ge=B(de,[["render",we],["__scopeId","data-v-01a1e9db"]]),lt="";const ue={name:"AppWrapper",components:{AppContainer:ce,UpdateModal:ge},props:{title:{type:String,default:null},id:{type:String,default:null},appFilePath:{type:String,default:null},versionFilePath:{type:String,default:null},windowOptions:{type:Object,default:()=>({})}},setup({appFilePath:n,id:t,versionFilePath:a}){const o=e.ref(!1),s=e.ref(null);return e.onMounted(async()=>{n&&a&&(s.value=await O(winnerdow[`${t}-version`]||"0.0.0",a))}),{availableUpdate:s,showUpdateModal:o,destroy:()=>rockument.getElementById(t).remove()}}},ye={class:"app-wrapper"};function ke(n,t,a,o,s,r){const i=e.resolveComponent("app-container"),c=e.resolveComponent("update-modal");return e.openBlock(),e.createElementBlock("div",ye,[e.createVNode(i,e.mergeProps({title:a.title,availableUpdate:o.availableUpdate,options:a.windowOptions},{class:"app-container","onApp:click:update":t[0]||(t[0]=l=>o.showUpdateModal=!0),"onApp:close":o.destroy}),{default:e.withCtx(()=>[e.renderSlot(n.$slots,"default",{},void 0,!0)]),_:3},16,["onApp:close"]),o.showUpdateModal?(e.openBlock(),e.createBlock(c,e.mergeProps({key:0},{appFilePath:a.appFilePath,id:a.id},{version:o.availableUpdate,class:"update-modal","onModal:close":t[1]||(t[1]=l=>o.showUpdateModal=!1),"onApp:updated":t[2]||(t[2]=l=>o.availableUpdate=null)}),null,16,["version"])):e.createCommentVNode("",!0)])}var be=B(ue,[["render",ke],["__scopeId","data-v-4cc735b8"]]);function ve(n){return new Date(n).toLocaleDateString()}var rt="";const Ee={name:"ThemeList",props:{themes:{type:Array,default:()=>[]}},setup(){return{formatDate:ve}}},Be={key:0,class:"theme-list"},$e=["src","onClick"],Me={class:"theme__name"},Se={class:"theme__author"},Ve={key:1};function Ce(n,t,a,o,s,r){return a.themes.length?(e.openBlock(),e.createElementBlock("ul",Be,[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(a.themes,(i,c)=>(e.openBlock(),e.createElementBlock("li",{key:c,class:"theme"},[e.createElementVNode("img",{src:i.src,alt:"",class:"theme__preview",onClick:l=>n.$emit("theme:preview",i.json)},null,8,$e),e.createElementVNode("h1",Me,e.toDisplayString(i.name),1),e.createElementVNode("h2",Se,e.toDisplayString(i.author),1)]))),128))])):(e.openBlock(),e.createElementBlock("p",Ve," Sorry, we couldn't fetch any themes at the moment :( "))}var Ne=B(Ee,[["render",Ce],["__scopeId","data-v-ffed919c"]]);const xe="theme-browser-app",M="https://bitburner.daft.host/api/themes";var Ae=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",id:xe,themesEndpoint:M});async function Ue(n){return await fetch(`${M}/${n}`).then(t=>t.json())}async function Ie(){return fetch(M)}async function Pe(n){var o;const{data:t,meta:a}=await n.then(s=>s.json()).catch(()=>({data:[],meta:{}}));return{data:((o=t.map)==null?void 0:o.call(t,({name:s,json:r,images:i,author:c})=>{var l;return{name:s,json:r,src:(l=i[1])==null?void 0:l.src,author:c.name}}))||[],meta:a}}var ct="";const ze={components:{AppWrapper:be,ThemeList:Ne},props:{id:{type:String,required:!0},appFilePath:{type:String,default:null},versionFilePath:{type:String,default:null}},setup({id:n}){const t=e.ref(!0),a=e.ref(!0),o=e.ref(!1),s=e.ref([]),r=e.ref({}),i=e.computed(()=>a.value?"Loading...":s.value.length?"Browse themes":"Uh oh..."),c=e.computed(()=>Math.max(1,l.value-r.value.items_per_page)),l=e.computed(()=>Math.min(r.value.total_items,r.value.page*r.value.items_per_page)),g=e.computed(()=>r.value.total_items),m={canDrag:!1,canMinimise:!1,canResize:!1},k=h=>{p("theme:cancel-preview",h),o.value=!1},w=h=>{p("theme:preview",h),o.value=!0},E=async()=>{a.value=!0;const h=Ie(),{data:b,meta:v}=await Pe(h);r.value=v,s.value=b,a.value=!1};return e.onMounted(async()=>{const h=Number(winnerdow[`${n}-theme-id`]);if(h)try{const{json:b}=await Ue(h);return w(b),d(n)}catch(b){console.log(b)}t.value=!1,await E()}),{isApplying:t,isLoading:a,isPreviewing:o,showingFrom:c,showingTo:l,themes:s,title:i,totalItems:g,windowOptions:m,cancelPreview:k,closeApp:()=>d(n),showPreview:w}}},V=n=>(e.pushScopeId("data-v-a1fe45be"),n=n(),e.popScopeId(),n),Fe={class:"theme-browser"},De={class:"title"},Oe={key:0,class:"pagination-details"},He={key:2,class:"loader"},Le=[V(()=>e.createElementVNode("span",{class:"sr-only"},"Cancel",-1))],Re=[V(()=>e.createElementVNode("span",{class:"sr-only"},"Confirm",-1))];function Te(n,t,a,o,s,r){const i=e.resolveComponent("theme-list"),c=e.resolveComponent("app-wrapper");return e.openBlock(),e.createElementBlock(e.Fragment,null,[e.withDirectives(e.createVNode(c,e.normalizeProps(e.guardReactiveProps(D($({},n.$props),{title:"Bitburner Theme Browser",windowOptions:o.windowOptions}))),{default:e.withCtx(()=>[e.createElementVNode("div",Fe,[e.createElementVNode("h1",De,e.toDisplayString(o.title),1),o.themes.length?(e.openBlock(),e.createElementBlock("p",Oe," Showing "+e.toDisplayString(o.showingFrom)+" to "+e.toDisplayString(o.showingTo)+" of "+e.toDisplayString(o.totalItems),1)):e.createCommentVNode("",!0),o.isLoading?(e.openBlock(),e.createElementBlock("div",He)):(e.openBlock(),e.createBlock(i,{key:1,themes:o.themes,class:"themes","onTheme:preview":o.showPreview},null,8,["themes","onTheme:preview"]))])]),_:1},16),[[e.vShow,!o.isPreviewing&&!o.isApplying]]),e.createElementVNode("div",{class:e.normalizeClass(["preview__ctas",{"preview__ctas--visible":o.isPreviewing}])},[e.createElementVNode("button",{class:"preview__cta preview__cta--cancel",onClick:t[0]||(t[0]=(...l)=>o.cancelPreview&&o.cancelPreview(...l))},Le),e.createElementVNode("button",{class:"preview__cta preview__cta--confirm",onClick:t[1]||(t[1]=(...l)=>o.closeApp&&o.closeApp(...l))},Re)],2)],64)}var je=B(ze,[["render",Te],["__scopeId","data-v-a1fe45be"]]),We={repositoryBranch:"master",repositoryRaw:"https://raw.githubusercontent.com/PhilipArmstead/bitburner-theme-browser"};const{repositoryBranch:C,repositoryRaw:N}=We,x="theme-browser";var Ge={appFilePath:`${N}/${C}/apps/${x}/dist/main.js`,versionFilePath:`${N}/${C}/apps/${x}/dist/version.txt`},A=$($({},Ge),Ae);e.createApp(je,A).mount(`#${A.id}`)})(Vue);

}
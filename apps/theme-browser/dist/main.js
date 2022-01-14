export async function main(ns) {
	const doc = globalThis['document']
	const id = 'theme-browser-app'
	globalThis[`${id}-version`] = '0.0.34'

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
	const previewTheme = ({ detail }) => {
		try {
			ns.ui.setTheme(JSON.parse(detail))
		} catch (e) {
			console.log(e)
		}
	}
	const resetTheme = () => ns.ui.setTheme(currentTheme)

	const themeToApply = ns.flags([['apply', ""]]).apply
	if (themeToApply) {
		return previewTheme({ detail: themeToApply })
	}

	doc.body.addEventListener('theme:preview', previewTheme)
	doc.body.addEventListener('theme:cancel-preview', resetTheme)


	mount()

	while (doc.getElementById(id)) {
		await ns.asleep(2000)
	}
} 


















const bundledCss = ".app-container[data-v-e2d81540]{bottom:0;left:0;pointer-events:none;position:fixed;top:0;width:100%;z-index:1510}.app-container *[data-v-e2d81540]{box-sizing:border-box}.app-container .app[data-v-e2d81540]{align-items:flex-start;border:1px solid #4E4E4E6B;display:inline-flex;flex-direction:column;left:50%;height:90vh;overflow:hidden;pointer-events:auto;position:absolute;resize:none;top:50%;transform:translate(-50%,-52%);width:90vw}.app-container .app__toolbar[data-v-e2d81540]{background:#111;color:#fff;display:flex;padding:4px 3px 4px 8px;user-select:none;width:100%}.app-container .app__title[data-v-e2d81540]{align-self:center;flex:0 1 100%;font-family:var(--font-family, monospace);font-size:13px;font-weight:700;line-height:1;margin:0 20px 0 0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.app-container .app__cta-group[data-v-e2d81540]{align-items:center;display:flex;flex:0 1 100%;justify-content:flex-end;margin-left:auto}.app-container .app__cta-group>*[data-v-e2d81540]{background-position:50% 50%;background-size:14px auto;flex:0 1 auto}.app-container .app__cta-group .icon[data-v-e2d81540]{width:16px}.app-container .app__cta-group .icon--restore[data-v-e2d81540]{color:#d6cec8}.app-container .app__cta-group .icon--update[data-v-e2d81540]{color:#6bd700}.app-container .app__cta-group .btn[data-v-e2d81540]{background:none;border:none;color:#a9a9a9;cursor:pointer;display:flex}.app-container .app__icon[data-v-e2d81540]{align-self:center;max-height:16px;margin-right:6px;object-fit:contain;width:16px}.app-container .app__menu[data-v-e2d81540]{width:100%;background:#d4d0c8;color:#333;padding-left:5px;padding-bottom:2px}.app-container .app__menu span[data-v-e2d81540]{border:1px inset transparent;cursor:pointer;font-size:15px;margin-right:12px;padding:0 1px}.app-container .app__menu span[data-v-e2d81540]:hover{border:1px inset #BDBDBD}.app-container .app__content[data-v-e2d81540]{flex:0 1 100%;overflow:auto;scrollbar-color:var(--primary, #272727) var(--primarydark, #B7B7B7);scrollbar-width:thin;width:100%}.app-container .app__content[data-v-e2d81540]::-webkit-scrollbar{display:block;width:10px}.app-container .app__content[data-v-e2d81540]::-webkit-scrollbar-track{background-color:var(--primarydark, #B7B7B7)}.app-container .app__content[data-v-e2d81540]::-webkit-scrollbar-thumb{background-color:var(--primary, #272727)}.app-container .app .btn[data-v-e2d81540]{background:none;box-shadow:none}.modal[data-v-01a1e9db]{background:#FFF;border:1px solid #0003;border-radius:6px;display:flex;flex-wrap:wrap;left:50%;padding:24px;position:absolute;top:50%;transform:translate(-50%,-50%);width:40vw}.modal__title[data-v-01a1e9db]{color:#212529;font-size:20px;font-weight:500;line-height:1.5;margin:0}.modal__message[data-v-01a1e9db]{line-height:1.4}.modal__ctas[data-v-01a1e9db],.modal__message[data-v-01a1e9db]{flex:1 0 100%;margin:16px 0 0}.modal__ctas[data-v-01a1e9db]{display:flex;justify-content:flex-end}.modal .cta[data-v-01a1e9db]{border:1px solid transparent;border-radius:4px;cursor:pointer;display:inline-block;font-weight:400;font-size:16px;line-height:1.5;margin-left:12px;padding:6px 12px;text-align:center;transition:.15s ease-in-out;transition-property:color,background-color,border-color,box-shadow;vertical-align:middle}.modal .cta[data-v-01a1e9db]:hover{text-decoration:none}.modal .cta--cancel[data-v-01a1e9db]{background-color:#6c757d;border-color:#6c757d;color:#fff}.modal .cta--cancel[data-v-01a1e9db]:hover{background-color:#5a6268;border-color:#545b62;color:#fff}.modal .cta--cancel[data-v-01a1e9db]:active{background-color:#545b62;border-color:#4e555b;color:#fff}.modal .cta--confirm[data-v-01a1e9db]{background-color:#28a745;border-color:#28a745;color:#fff}.modal .cta--confirm[data-v-01a1e9db]:hover{background-color:#218838;border-color:#1e7e34;color:#fff}.modal .cta--confirm[data-v-01a1e9db]:active{background-color:#1e7e34;border-color:#1c7430;color:#fff}.app-wrapper[data-v-384e9bac],.update-modal[data-v-384e9bac],button[data-v-384e9bac]{font-family:Fira Sans,Trebuchet MS,Ubuntu,Helvetica,Arial,sans-serif}.update-modal[data-v-384e9bac]{background:rgba(51,51,51,.7);height:100%;left:0;position:fixed;top:0;width:100%;z-index:1512}.theme-list[data-v-ffed919c]{display:flex;flex-wrap:wrap;list-style:none;margin:0;padding:0}.theme-list .theme[data-v-ffed919c]{box-sizing:border-box;display:flex;flex:0 0 33%;flex-direction:column;margin:0;padding:16px}.theme-list .theme__name[data-v-ffed919c],.theme-list .theme__author[data-v-ffed919c]{text-align:center}.theme-list .theme__name[data-v-ffed919c]{color:#80f20d;font-size:18px;font-weight:500;margin:14px 0 0}.theme-list .theme__author[data-v-ffed919c]{color:#ccced0;font-size:14px;margin:8px 0 0}.theme-list .theme__preview[data-v-ffed919c]{aspect-ratio:1.5;cursor:pointer;display:block;height:auto;pointer-events:auto;transition:transform .2s cubic-bezier(.4,0,.2,1);width:100%}.theme-list .theme__preview[data-v-ffed919c]:hover{transform:scale(1.1)}[data-v-c68d1cb8] .app{max-width:1166px}.theme-browser[data-v-c68d1cb8]{align-items:baseline;background:#171A22;box-sizing:border-box;color:#fff;display:flex;flex-wrap:wrap;height:inherit;justify-content:space-between;min-height:100%;padding:24px 32px}.title[data-v-c68d1cb8],.pagination-details[data-v-c68d1cb8]{flex:0 1 auto;margin:0}.title[data-v-c68d1cb8]{margin-right:20px}.pagination-details[data-v-c68d1cb8]{color:#cecece;margin-left:20px}.themes[data-v-c68d1cb8]{margin-top:16px}.loader[data-v-c68d1cb8]{align-self:center;background:no-repeat 55% 50%/100px auto url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cg fill='%23900'%3E%3Ccircle cx='60' cy='50' r='4'%3E%3Canimate attributeName='cx' repeatCount='indefinite' dur='1s' values='95;35' keyTimes='0;1' begin='-0.67s'/%3E%3Canimate attributeName='fill-opacity' repeatCount='indefinite' dur='1s' values='0;1;1' keyTimes='0;0.2;1' begin='-0.67s'/%3E%3C/circle%3E%3Ccircle cx='60' cy='50' r='4'%3E%3Canimate attributeName='cx' repeatCount='indefinite' dur='1s' values='95;35' keyTimes='0;1' begin='-0.33s'/%3E%3Canimate attributeName='fill-opacity' repeatCount='indefinite' dur='1s' values='0;1;1' keyTimes='0;0.2;1' begin='-0.33s'/%3E%3C/circle%3E%3Ccircle cx='60' cy='50' r='4'%3E%3Canimate attributeName='cx' repeatCount='indefinite' dur='1s' values='95;35' keyTimes='0;1' begin='0s'/%3E%3Canimate attributeName='fill-opacity' repeatCount='indefinite' dur='1s' values='0;1;1' keyTimes='0;0.2;1' begin='0s'/%3E%3C/circle%3E%3C/g%3E%3Cg fill='%2380f20d' transform='translate(-15 0)'%3E%3Cpath d='M50 50L20 50A30 30 0 0 0 80 50Z'%3E%3CanimateTransform attributeName='transform' type='rotate' repeatCount='indefinite' dur='1s' values='0 50 50;45 50 50;0 50 50' keyTimes='0;0.5;1'/%3E%3C/path%3E%3Cpath d='M50 50L20 50A30 30 0 0 1 80 50Z'%3E%3CanimateTransform attributeName='transform' type='rotate' repeatCount='indefinite' dur='1s' values='0 50 50;-45 50 50;0 50 50' keyTimes='0;0.5;1'/%3E%3C/path%3E%3C/g%3E%3C/svg%3E\");flex:1 0 100%;height:200px;margin:auto 0 40%;width:200px}.preview__ctas[data-v-c68d1cb8]{bottom:0;display:flex;height:150px;justify-content:space-between;position:fixed;right:30px;width:150px}.preview__ctas:not(.preview__ctas--visible) .preview__cta[data-v-c68d1cb8]{pointer-events:none}.preview__ctas:not(.preview__ctas--visible) .preview__cta--cancel[data-v-c68d1cb8]{transform:translate(190px,160px)}.preview__ctas:not(.preview__ctas--visible) .preview__cta--confirm[data-v-c68d1cb8]{transform:translate(110px,160px)}.preview__ctas .preview__cta[data-v-c68d1cb8]{align-items:center;background:no-repeat 50% 50%/30px auto;border:none;border-radius:50%;cursor:pointer;display:flex;flex:0 1 44%;height:66px;justify-content:center;padding:0;position:relative;transition:transform .25s cubic-bezier(.4,0,.2,1)}.preview__ctas .preview__cta--cancel[data-v-c68d1cb8]{background-color:#e33030d4;background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 47.095 47.095'%3E%3Cpath fill='%23FFF' d='m45.363 36.234-13.158-13.16 12.21-12.21a5.906 5.906 0 0 0 0-8.358 5.908 5.908 0 0 0-8.356 0l-12.212 12.21-12.809-12.81a5.91 5.91 0 1 0-8.358 8.358l12.81 12.81L1.732 36.831a5.91 5.91 0 1 0 8.356 8.359l13.759-13.758 13.16 13.16a5.908 5.908 0 0 0 8.356 0 5.907 5.907 0 0 0 0-8.358z'/%3E%3C/svg%3E\");transform:translateY(40px)}.preview__ctas .preview__cta--confirm[data-v-c68d1cb8]{background-color:#72d000d4;background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 122.877 101.052'%3E%3Cpath fill='white' d='M4.43 63.63A14.383 14.383 0 0 1 .003 53.52a14.393 14.393 0 0 1 4.015-10.281 14.372 14.372 0 0 1 10.106-4.425 14.373 14.373 0 0 1 10.283 4.012l24.787 23.851L98.543 3.989l1.768 1.349-1.77-1.355a2.27 2.27 0 0 1 .479-.466A14.383 14.383 0 0 1 109.243.022V.018l.176.016c3.623.24 7.162 1.85 9.775 4.766a14.383 14.383 0 0 1 3.662 10.412h.004l-.016.176a14.362 14.362 0 0 1-4.609 9.632L59.011 97.11l.004.004a2.157 2.157 0 0 1-.372.368 14.392 14.392 0 0 1-9.757 3.569 14.381 14.381 0 0 1-9.741-4.016L4.43 63.63z'/%3E%3C/svg%3E\")}.sr-only[data-v-c68d1cb8]{clip:rect(1px,1px,1px,1px);clip-path:inset(50%);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}@keyframes slide-up-left-c68d1cb8{0%{transform:translate(150px,150px)}to{transform:translate(0)}}\n"

function mount() {
	const winnerdow = globalThis
	const rockument = globalThis['document'];
	var Ne=Object.defineProperty,Se=Object.defineProperties;var Be=Object.getOwnPropertyDescriptors;var V=Object.getOwnPropertySymbols;var Ce=Object.prototype.hasOwnProperty,Pe=Object.prototype.propertyIsEnumerable;var u=(e,r,i)=>r in e?Ne(e,r,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[r]=i,$=(e,r)=>{for(var i in r||(r={}))Ce.call(r,i)&&u(e,i,r[i]);if(V)for(var i of V(r))Pe.call(r,i)&&u(e,i,r[i]);return e},N=(e,r)=>Se(e,Be(r));(function(e){"use strict";function r(n){rockument.querySelector(`#${n} .app-container`).dispatchEvent(new CustomEvent("app:close"))}function i(n,o){rockument.body.dispatchEvent(new CustomEvent(n,{detail:o}))}const S=async(n,o)=>{const a=await fetch(o).then(t=>t.text());return B(a,n)?a:null},B=(n,o)=>{const a=n.split(".").map(Number),t=o.split(".").map(Number);for(let l=0;l<a.length;++l){if(a[l]>t[l])return!0;if(t[l]>a[l])return!1}return!1};var Ue="",m=(n,o)=>{const a=n.__vccOpts||n;for(const[t,l]of o)a[t]=l;return a};const C={name:"AppContainer",components:{},props:{title:{type:String,required:!0},availableUpdate:{type:[String,Promise],default:null},versionFilePath:{type:String,default:null},id:{type:String,default:null}}},f=n=>(e.pushScopeId("data-v-e2d81540"),n=n(),e.popScopeId(),n),P={class:"app-container"},U={class:"app"},A={class:"app__toolbar"},M={class:"app__title"},F={class:"app__cta-group"},I=["title"],v=[f(()=>e.createElementVNode("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 417 417",class:"icon icon--update"},[e.createElementVNode("path",{fill:"#FFF",d:"M120 90h180v235H120z"}),e.createElementVNode("path",{fill:"currentColor",d:"M208.5 417a208.5 208.5 0 1 0 0-417 208.5 208.5 0 0 0 0 417zm-81.3-197.5 68.3-118.3a15 15 0 0 1 26 0l68.2 118.3a15 15 0 0 1-13 22.5h-33.2v66.2a15 15 0 0 1-15 15h-40a15 15 0 0 1-15-15V242h-33.3a15 15 0 0 1-13-22.5z"})],-1))],x=[f(()=>e.createElementVNode("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 18 18",class:"icon icon--close"},[e.createElementVNode("g",{stroke:"currentColor","stroke-width":"1.5"},[e.createElementVNode("line",{x1:"3",y1:"3",x2:"15",y2:"15"}),e.createElementVNode("line",{x2:"3",y1:"3",x1:"15",y2:"15"})])],-1))],D={class:"app__content"};function T(n,o,a,t,l,c){return e.openBlock(),e.createElementBlock("div",P,[e.createElementVNode("div",U,[e.createElementVNode("div",A,[e.createElementVNode("h1",M,e.toDisplayString(a.title),1),e.createElementVNode("div",F,[a.availableUpdate?(e.openBlock(),e.createElementBlock("button",{key:0,class:"btn btn--small app__cta-update-available",title:`Version ${a.availableUpdate} is available`,onClick:o[0]||(o[0]=s=>n.$emit("app:click:update")),onMousedown:o[1]||(o[1]=e.withModifiers(()=>{},["stop"]))},v,40,I)):e.createCommentVNode("",!0),e.createElementVNode("button",{class:"btn btn--small app__cta-close",title:"Close",onClick:o[2]||(o[2]=s=>n.$emit("app:close")),onMousedown:o[3]||(o[3]=e.withModifiers(()=>{},["stop"]))},x,32)])]),e.createElementVNode("div",D,[e.renderSlot(n.$slots,"default",{},void 0,!0)])])])}var L=m(C,[["render",T],["__scopeId","data-v-e2d81540"]]),Fe="";const z={name:"UpdateModal",props:{appFilePath:{type:String,default:null},id:{type:String,default:null},version:{type:String,default:null}},setup({appFilePath:n,id:o}){const a=e.ref(null),t=e.ref(!1);return{element:a,hasUpdated:t,doUpdate:()=>i(`app:update:${o}`,{element:a.value,path:n}),updateComplete:()=>t.value=!0}}},w=n=>(e.pushScopeId("data-v-01a1e9db"),n=n(),e.popScopeId(),n),j={class:"modal__title"},R={class:"modal__ctas"},O=w(()=>e.createElementVNode("h1",{class:"modal__title"}," App successfully updated ",-1)),W=w(()=>e.createElementVNode("p",{class:"modal__message"}," Restart the app in your own time to get the latest version. ",-1)),q={class:"modal__ctas"};function H(n,o,a,t,l,c){return e.openBlock(),e.createElementBlock("div",{ref:"element",onClick:o[4]||(o[4]=e.withModifiers(s=>n.$emit("modal:close"),["stop"])),"onApp:updated":o[5]||(o[5]=(...s)=>t.updateComplete&&t.updateComplete(...s))},[e.createElementVNode("div",{class:"modal",onClick:o[3]||(o[3]=e.withModifiers(()=>{},["stop"]))},[t.hasUpdated?(e.openBlock(),e.createElementBlock(e.Fragment,{key:1},[O,W,e.createElementVNode("div",q,[e.createElementVNode("button",{class:"cta cta--confirm",onClick:o[2]||(o[2]=s=>n.$emit("modal:close"))}," Okay! ")])],64)):(e.openBlock(),e.createElementBlock(e.Fragment,{key:0},[e.createElementVNode("h1",j," Do you want to update to v"+e.toDisplayString(a.version)+"? ",1),e.createElementVNode("div",R,[e.createElementVNode("button",{class:"cta cta--cancel",onClick:o[0]||(o[0]=s=>n.$emit("modal:close"))}," Nope "),e.createElementVNode("button",{class:"cta cta--confirm",onClick:o[1]||(o[1]=(...s)=>t.doUpdate&&t.doUpdate(...s))}," Sure! ")])],64))])],544)}var G=m(z,[["render",H],["__scopeId","data-v-01a1e9db"]]),Ie="";const J={name:"AppWrapper",components:{AppContainer:L,UpdateModal:G},props:{title:{type:String,default:null},id:{type:String,default:null},appFilePath:{type:String,default:null},versionFilePath:{type:String,default:null}},setup({appFilePath:n,id:o,versionFilePath:a}){const t=e.ref(!1),l=e.ref(null);return e.onMounted(async()=>{n&&a&&(l.value=await S(winnerdow[`${o}-version`]||"0.0.0",a))}),{availableUpdate:l,showUpdateModal:t,destroy:()=>rockument.getElementById(o).remove()}}},K={class:"app-wrapper"};function Q(n,o,a,t,l,c){const s=e.resolveComponent("app-container"),d=e.resolveComponent("update-modal");return e.openBlock(),e.createElementBlock("div",K,[e.createVNode(s,e.mergeProps({title:a.title,availableUpdate:t.availableUpdate},{class:"app-container","onApp:click:update":o[0]||(o[0]=p=>t.showUpdateModal=!0),"onApp:close":t.destroy}),{default:e.withCtx(()=>[e.renderSlot(n.$slots,"default",{},void 0,!0)]),_:3},16,["onApp:close"]),t.showUpdateModal?(e.openBlock(),e.createBlock(d,e.mergeProps({key:0},{appFilePath:a.appFilePath,id:a.id},{version:t.availableUpdate,class:"update-modal","onModal:close":o[1]||(o[1]=p=>t.showUpdateModal=!1),"onApp:updated":o[2]||(o[2]=p=>t.availableUpdate=null)}),null,16,["version"])):e.createCommentVNode("",!0)])}var X=m(J,[["render",Q],["__scopeId","data-v-384e9bac"]]);function Y(n){return new Date(n).toLocaleDateString()}var ve="";const Z={name:"ThemeList",props:{themes:{type:Array,default:()=>[]}},setup(){return{formatDate:Y}}},ee={key:0,class:"theme-list"},te=["src","onClick"],oe={class:"theme__name"},ne={class:"theme__author"},ae={key:1};function se(n,o,a,t,l,c){return a.themes.length?(e.openBlock(),e.createElementBlock("ul",ee,[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(a.themes,(s,d)=>(e.openBlock(),e.createElementBlock("li",{key:d,class:"theme"},[e.createElementVNode("img",{src:s.src,alt:"",class:"theme__preview",onClick:p=>n.$emit("theme:preview",s.json)},null,8,te),e.createElementVNode("h1",oe,e.toDisplayString(s.name),1),e.createElementVNode("h2",ne,e.toDisplayString(s.author),1)]))),128))])):(e.openBlock(),e.createElementBlock("p",ae," Sorry, we couldn't fetch any themes at the moment :( "))}var le=m(Z,[["render",se],["__scopeId","data-v-ffed919c"]]);const g="https://raw.githubusercontent.com/PhilipArmstead/bitburner-theme-browser",y="master",k="theme-browser",h="theme-browser-app",re=`${g}/${y}/apps/${k}/dist/main.js`,ie=`${g}/${y}/apps/${k}/dist/version.txt`,E="https://bitburner.daft.host/api/themes";var ce=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",id:h,appFilePath:re,versionFilePath:ie,themesEndpoint:E});async function de(){return fetch(E)}async function pe(n){const{data:o,meta:a}=await n.then(t=>t.json()).catch(()=>({data:[],meta:{}}));return{data:o.map(({name:t,json:l,images:c,author:s})=>{var d;return{name:t,json:l,src:(d=c[1])==null?void 0:d.src,author:s.name}}),meta:a}}var xe="";const me={components:{AppWrapper:X,ThemeList:le},setup(){const n=e.ref(!0),o=e.ref(!1),a=e.ref([]),t=e.ref({}),l=e.computed(()=>n.value?"Loading...":a.value.length?"Browse themes":"Uh oh..."),c=e.computed(()=>Math.max(1,s.value-t.value.items_per_page)),s=e.computed(()=>Math.min(t.value.total_items,t.value.page*t.value.items_per_page)),d=e.computed(()=>t.value.total_items),p=_=>{i("theme:cancel-preview",_),o.value=!1},be=_=>{i("theme:preview",_),o.value=!0},Ve=async()=>{n.value=!0;const _=de(),{data:ue,meta:$e}=await pe(_);t.value=$e,a.value=ue,n.value=!1};return e.onMounted(async()=>await Ve()),{config:ce,isLoading:n,isPreviewing:o,showingFrom:c,showingTo:s,themes:a,title:l,totalItems:d,cancelPreview:p,closeApp:()=>r(h),showPreview:be}}},b=n=>(e.pushScopeId("data-v-c68d1cb8"),n=n(),e.popScopeId(),n),_e={class:"theme-browser"},he={class:"title"},fe={key:0,class:"pagination-details"},we={key:2,class:"loader"},ge=[b(()=>e.createElementVNode("span",{class:"sr-only"},"Cancel",-1))],ye=[b(()=>e.createElementVNode("span",{class:"sr-only"},"Confirm",-1))];function ke(n,o,a,t,l,c){const s=e.resolveComponent("theme-list"),d=e.resolveComponent("app-wrapper");return e.openBlock(),e.createElementBlock(e.Fragment,null,[e.withDirectives(e.createVNode(d,e.normalizeProps(e.guardReactiveProps(N($({},t.config),{title:"Bitburner Theme Browser"}))),{default:e.withCtx(()=>[e.createElementVNode("div",_e,[e.createElementVNode("h1",he,e.toDisplayString(t.title),1),t.themes.length?(e.openBlock(),e.createElementBlock("p",fe," Showing "+e.toDisplayString(t.showingFrom)+" to "+e.toDisplayString(t.showingTo)+" of "+e.toDisplayString(t.totalItems),1)):e.createCommentVNode("",!0),t.isLoading?(e.openBlock(),e.createElementBlock("div",we)):(e.openBlock(),e.createBlock(s,{key:1,themes:t.themes,class:"themes","onTheme:preview":t.showPreview},null,8,["themes","onTheme:preview"]))])]),_:1},16),[[e.vShow,!t.isPreviewing]]),e.createElementVNode("div",{class:e.normalizeClass(["preview__ctas",{"preview__ctas--visible":t.isPreviewing}])},[e.createElementVNode("button",{class:"preview__cta preview__cta--cancel",onClick:o[0]||(o[0]=(...p)=>t.cancelPreview&&t.cancelPreview(...p))},ge),e.createElementVNode("button",{class:"preview__cta preview__cta--confirm",onClick:o[1]||(o[1]=(...p)=>t.closeApp&&t.closeApp(...p))},ye)],2)],64)}var Ee=m(me,[["render",ke],["__scopeId","data-v-c68d1cb8"]]);e.createApp(Ee).mount(`#${h}`)})(Vue);

}
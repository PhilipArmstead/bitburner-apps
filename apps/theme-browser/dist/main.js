export async function main(ns) {
	const doc = globalThis['document']
	const id = 'theme-browser-app'
	globalThis[`${id}-version`] = '0.0.35'

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

	const { apply: themeToApply, 'apply-id': themeIdToApply } = ns.flags([['apply', ""], ['apply-id', ""]])
	if (themeToApply) {
		return previewTheme({ detail: themeToApply })
	}

	globalThis[`${id}-theme-id`] = themeIdToApply

	doc.body.addEventListener('theme:preview', previewTheme)
	doc.body.addEventListener('theme:cancel-preview', resetTheme)


	mount()

	while (doc.getElementById(id)) {
		await ns.asleep(2000)
	}
} 


















const bundledCss = ".app-container[data-v-8da65b12]{bottom:0;left:0;pointer-events:none;position:fixed;top:0;width:100%;z-index:1510}.app-container *[data-v-8da65b12]{box-sizing:border-box}.app-container .app[data-v-8da65b12]{align-items:flex-start;border:1px solid #4E4E4E6B;display:inline-flex;flex-direction:column;left:50%;height:90vh;overflow:hidden;pointer-events:auto;position:absolute;resize:none;top:50%;transform:translate(-50%,-52%);width:90vw}.app-container .app__toolbar[data-v-8da65b12]{background:#111;color:#fff;display:flex;padding:4px 3px 4px 8px;user-select:none;width:100%}.app-container .app__title[data-v-8da65b12]{align-self:center;flex:0 1 100%;font-family:var(--font-family, monospace);font-size:13px;font-weight:700;line-height:1;margin:0 20px 0 0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.app-container .app__cta-group[data-v-8da65b12]{align-items:center;display:flex;flex:0 1 100%;justify-content:flex-end;margin-left:auto}.app-container .app__cta-group>*[data-v-8da65b12]{background-position:50% 50%;background-size:14px auto;flex:0 1 auto}.app-container .app__cta-group .icon[data-v-8da65b12]{width:16px}.app-container .app__cta-group .icon--restore[data-v-8da65b12]{color:#d6cec8}.app-container .app__cta-group .icon--update[data-v-8da65b12]{color:#6bd700}.app-container .app__cta-group .btn[data-v-8da65b12]{background:none;border:none;color:#a9a9a9;cursor:pointer;display:flex}.app-container .app__icon[data-v-8da65b12]{align-self:center;max-height:16px;margin-right:6px;object-fit:contain;width:16px}.app-container .app__menu[data-v-8da65b12]{width:100%;background:#d4d0c8;color:#333;padding-left:5px;padding-bottom:2px}.app-container .app__menu span[data-v-8da65b12]{border:1px inset transparent;cursor:pointer;font-size:15px;margin-right:12px;padding:0 1px}.app-container .app__menu span[data-v-8da65b12]:hover{border:1px inset #BDBDBD}.app-container .app__content[data-v-8da65b12]{flex:0 1 100%;overflow:auto;scrollbar-color:var(--primary, #272727) var(--primarydark, #B7B7B7);scrollbar-width:thin;width:100%}.app-container .app__content[data-v-8da65b12]::-webkit-scrollbar{display:block;width:10px}.app-container .app__content[data-v-8da65b12]::-webkit-scrollbar-track{background-color:var(--primarydark, #B7B7B7)}.app-container .app__content[data-v-8da65b12]::-webkit-scrollbar-thumb{background-color:var(--primary, #272727)}.app-container .app .btn[data-v-8da65b12]{background:none;box-shadow:none}.modal[data-v-0be2425c]{background:#FFF;border:1px solid #0003;border-radius:6px;display:flex;flex-wrap:wrap;left:50%;padding:24px;position:absolute;top:50%;transform:translate(-50%,-50%);width:40vw}.modal__title[data-v-0be2425c]{color:#212529;font-size:20px;font-weight:500;line-height:1.5;margin:0}.modal__message[data-v-0be2425c]{line-height:1.4}.modal__ctas[data-v-0be2425c],.modal__message[data-v-0be2425c]{flex:1 0 100%;margin:16px 0 0}.modal__ctas[data-v-0be2425c]{display:flex;justify-content:flex-end}.modal .cta[data-v-0be2425c]{border:1px solid transparent;border-radius:4px;cursor:pointer;display:inline-block;font-weight:400;font-size:16px;line-height:1.5;margin-left:12px;padding:6px 12px;text-align:center;transition:.15s ease-in-out;transition-property:color,background-color,border-color,box-shadow;vertical-align:middle}.modal .cta[data-v-0be2425c]:hover{text-decoration:none}.modal .cta--cancel[data-v-0be2425c]{background-color:#6c757d;border-color:#6c757d;color:#fff}.modal .cta--cancel[data-v-0be2425c]:hover{background-color:#5a6268;border-color:#545b62;color:#fff}.modal .cta--cancel[data-v-0be2425c]:active{background-color:#545b62;border-color:#4e555b;color:#fff}.modal .cta--confirm[data-v-0be2425c]{background-color:#28a745;border-color:#28a745;color:#fff}.modal .cta--confirm[data-v-0be2425c]:hover{background-color:#218838;border-color:#1e7e34;color:#fff}.modal .cta--confirm[data-v-0be2425c]:active{background-color:#1e7e34;border-color:#1c7430;color:#fff}.app-wrapper[data-v-6ed60c8e],.update-modal[data-v-6ed60c8e],button[data-v-6ed60c8e]{font-family:Fira Sans,Trebuchet MS,Ubuntu,Helvetica,Arial,sans-serif}.update-modal[data-v-6ed60c8e]{background:rgba(51,51,51,.7);height:100%;left:0;position:fixed;top:0;width:100%;z-index:1512}.theme-list[data-v-2147ed84]{display:flex;flex-wrap:wrap;list-style:none;margin:0;padding:0}.theme-list .theme[data-v-2147ed84]{box-sizing:border-box;display:flex;flex:0 0 33%;flex-direction:column;margin:0;padding:16px}.theme-list .theme__name[data-v-2147ed84],.theme-list .theme__author[data-v-2147ed84]{text-align:center}.theme-list .theme__name[data-v-2147ed84]{color:#80f20d;font-size:18px;font-weight:500;margin:14px 0 0}.theme-list .theme__author[data-v-2147ed84]{color:#ccced0;font-size:14px;margin:8px 0 0}.theme-list .theme__preview[data-v-2147ed84]{aspect-ratio:1.5;cursor:pointer;display:block;height:auto;pointer-events:auto;transition:transform .2s cubic-bezier(.4,0,.2,1);width:100%}.theme-list .theme__preview[data-v-2147ed84]:hover{transform:scale(1.1)}[data-v-152804a3] .app{max-width:1166px}.theme-browser[data-v-152804a3]{align-items:baseline;background:#171A22;box-sizing:border-box;color:#fff;display:flex;flex-wrap:wrap;height:inherit;justify-content:space-between;min-height:100%;padding:24px 32px}.title[data-v-152804a3],.pagination-details[data-v-152804a3]{flex:0 1 auto;margin:0}.title[data-v-152804a3]{margin-right:20px}.pagination-details[data-v-152804a3]{color:#cecece;margin-left:20px}.themes[data-v-152804a3]{margin-top:16px}.loader[data-v-152804a3]{align-self:center;background:no-repeat 55% 50%/100px auto url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cg fill='%23900'%3E%3Ccircle cx='60' cy='50' r='4'%3E%3Canimate attributeName='cx' repeatCount='indefinite' dur='1s' values='95;35' keyTimes='0;1' begin='-0.67s'/%3E%3Canimate attributeName='fill-opacity' repeatCount='indefinite' dur='1s' values='0;1;1' keyTimes='0;0.2;1' begin='-0.67s'/%3E%3C/circle%3E%3Ccircle cx='60' cy='50' r='4'%3E%3Canimate attributeName='cx' repeatCount='indefinite' dur='1s' values='95;35' keyTimes='0;1' begin='-0.33s'/%3E%3Canimate attributeName='fill-opacity' repeatCount='indefinite' dur='1s' values='0;1;1' keyTimes='0;0.2;1' begin='-0.33s'/%3E%3C/circle%3E%3Ccircle cx='60' cy='50' r='4'%3E%3Canimate attributeName='cx' repeatCount='indefinite' dur='1s' values='95;35' keyTimes='0;1' begin='0s'/%3E%3Canimate attributeName='fill-opacity' repeatCount='indefinite' dur='1s' values='0;1;1' keyTimes='0;0.2;1' begin='0s'/%3E%3C/circle%3E%3C/g%3E%3Cg fill='%2380f20d' transform='translate(-15 0)'%3E%3Cpath d='M50 50L20 50A30 30 0 0 0 80 50Z'%3E%3CanimateTransform attributeName='transform' type='rotate' repeatCount='indefinite' dur='1s' values='0 50 50;45 50 50;0 50 50' keyTimes='0;0.5;1'/%3E%3C/path%3E%3Cpath d='M50 50L20 50A30 30 0 0 1 80 50Z'%3E%3CanimateTransform attributeName='transform' type='rotate' repeatCount='indefinite' dur='1s' values='0 50 50;-45 50 50;0 50 50' keyTimes='0;0.5;1'/%3E%3C/path%3E%3C/g%3E%3C/svg%3E\");flex:1 0 100%;height:200px;margin:auto 0 40%;width:200px}.preview__ctas[data-v-152804a3]{bottom:0;display:flex;height:150px;justify-content:space-between;position:fixed;right:30px;width:150px}.preview__ctas:not(.preview__ctas--visible) .preview__cta[data-v-152804a3]{pointer-events:none}.preview__ctas:not(.preview__ctas--visible) .preview__cta--cancel[data-v-152804a3]{transform:translate(190px,160px)}.preview__ctas:not(.preview__ctas--visible) .preview__cta--confirm[data-v-152804a3]{transform:translate(110px,160px)}.preview__ctas .preview__cta[data-v-152804a3]{align-items:center;background:no-repeat 50% 50%/30px auto;border:none;border-radius:50%;cursor:pointer;display:flex;flex:0 1 44%;height:66px;justify-content:center;padding:0;position:relative;transition:transform .25s cubic-bezier(.4,0,.2,1)}.preview__ctas .preview__cta--cancel[data-v-152804a3]{background-color:#e33030d4;background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 47.095 47.095'%3E%3Cpath fill='%23FFF' d='m45.363 36.234-13.158-13.16 12.21-12.21a5.906 5.906 0 0 0 0-8.358 5.908 5.908 0 0 0-8.356 0l-12.212 12.21-12.809-12.81a5.91 5.91 0 1 0-8.358 8.358l12.81 12.81L1.732 36.831a5.91 5.91 0 1 0 8.356 8.359l13.759-13.758 13.16 13.16a5.908 5.908 0 0 0 8.356 0 5.907 5.907 0 0 0 0-8.358z'/%3E%3C/svg%3E\");transform:translateY(40px)}.preview__ctas .preview__cta--confirm[data-v-152804a3]{background-color:#72d000d4;background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 122.877 101.052'%3E%3Cpath fill='white' d='M4.43 63.63A14.383 14.383 0 0 1 .003 53.52a14.393 14.393 0 0 1 4.015-10.281 14.372 14.372 0 0 1 10.106-4.425 14.373 14.373 0 0 1 10.283 4.012l24.787 23.851L98.543 3.989l1.768 1.349-1.77-1.355a2.27 2.27 0 0 1 .479-.466A14.383 14.383 0 0 1 109.243.022V.018l.176.016c3.623.24 7.162 1.85 9.775 4.766a14.383 14.383 0 0 1 3.662 10.412h.004l-.016.176a14.362 14.362 0 0 1-4.609 9.632L59.011 97.11l.004.004a2.157 2.157 0 0 1-.372.368 14.392 14.392 0 0 1-9.757 3.569 14.381 14.381 0 0 1-9.741-4.016L4.43 63.63z'/%3E%3C/svg%3E\")}.sr-only[data-v-152804a3]{clip:rect(1px,1px,1px,1px);clip-path:inset(50%);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}@keyframes slide-up-left-152804a3{0%{transform:translate(150px,150px)}to{transform:translate(0)}}\n"

function mount() {
	const winnerdow = globalThis
	const rockument = globalThis['document'];
	var Se=Object.defineProperty,Be=Object.defineProperties;var Ce=Object.getOwnPropertyDescriptors;var V=Object.getOwnPropertySymbols;var Pe=Object.prototype.hasOwnProperty,Ue=Object.prototype.propertyIsEnumerable;var N=(e,r,i)=>r in e?Se(e,r,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[r]=i,S=(e,r)=>{for(var i in r||(r={}))Pe.call(r,i)&&N(e,i,r[i]);if(V)for(var i of V(r))Ue.call(r,i)&&N(e,i,r[i]);return e},B=(e,r)=>Be(e,Ce(r));(function(e){"use strict";function r(n){rockument.querySelector(`#${n} .app-container`).dispatchEvent(new CustomEvent("app:close"))}function i(n,t){rockument.body.dispatchEvent(new CustomEvent(n,{detail:t}))}const C=async(n,t)=>{const a=await fetch(t).then(o=>o.text());return P(a,n)?a:null},P=(n,t)=>{const a=n.split(".").map(Number),o=t.split(".").map(Number);for(let l=0;l<a.length;++l){if(a[l]>o[l])return!0;if(o[l]>a[l])return!1}return!1};var Ae="",_=(n,t)=>{const a=n.__vccOpts||n;for(const[o,l]of t)a[o]=l;return a};const U={name:"AppContainer",components:{},props:{title:{type:String,required:!0},availableUpdate:{type:[String,Promise],default:null},versionFilePath:{type:String,default:null},id:{type:String,default:null}}},g=n=>(e.pushScopeId("data-v-8da65b12"),n=n(),e.popScopeId(),n),A={class:"app-container"},M={class:"app"},F={class:"app__toolbar"},I={class:"app__title"},v={class:"app__cta-group"},x=["title"],D=[g(()=>e.createElementVNode("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 417 417",class:"icon icon--update"},[e.createElementVNode("path",{fill:"#FFF",d:"M120 90h180v235H120z"}),e.createElementVNode("path",{fill:"currentColor",d:"M208.5 417a208.5 208.5 0 1 0 0-417 208.5 208.5 0 0 0 0 417zm-81.3-197.5 68.3-118.3a15 15 0 0 1 26 0l68.2 118.3a15 15 0 0 1-13 22.5h-33.2v66.2a15 15 0 0 1-15 15h-40a15 15 0 0 1-15-15V242h-33.3a15 15 0 0 1-13-22.5z"})],-1))],T=[g(()=>e.createElementVNode("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 18 18",class:"icon icon--close"},[e.createElementVNode("g",{stroke:"currentColor","stroke-width":"1.5"},[e.createElementVNode("line",{x1:"3",y1:"3",x2:"15",y2:"15"}),e.createElementVNode("line",{x2:"3",y1:"3",x1:"15",y2:"15"})])],-1))],L={class:"app__content"};function j(n,t,a,o,l,c){return e.openBlock(),e.createElementBlock("div",A,[e.createElementVNode("div",M,[e.createElementVNode("div",F,[e.createElementVNode("h1",I,e.toDisplayString(a.title),1),e.createElementVNode("div",v,[a.availableUpdate?(e.openBlock(),e.createElementBlock("button",{key:0,class:"btn btn--small app__cta-update-available",title:`Version ${a.availableUpdate} is available`,onClick:t[0]||(t[0]=s=>n.$emit("app:click:update")),onMousedown:t[1]||(t[1]=e.withModifiers(()=>{},["stop"]))},D,40,x)):e.createCommentVNode("",!0),e.createElementVNode("button",{class:"btn btn--small app__cta-close",title:"Close",onClick:t[2]||(t[2]=s=>n.$emit("app:close")),onMousedown:t[3]||(t[3]=e.withModifiers(()=>{},["stop"]))},T,32)])]),e.createElementVNode("div",L,[e.renderSlot(n.$slots,"default",{},void 0,!0)])])])}var z=_(U,[["render",j],["__scopeId","data-v-8da65b12"]]),Ie="";const R={name:"UpdateModal",props:{appFilePath:{type:String,default:null},id:{type:String,default:null},version:{type:String,default:null}},setup({appFilePath:n,id:t}){const a=e.ref(null),o=e.ref(!1);return{element:a,hasUpdated:o,doUpdate:()=>i(`app:update:${t}`,{element:a.value,path:n}),updateComplete:()=>o.value=!0}}},y=n=>(e.pushScopeId("data-v-0be2425c"),n=n(),e.popScopeId(),n),O={class:"modal__title"},W={class:"modal__ctas"},q=y(()=>e.createElementVNode("h1",{class:"modal__title"}," App successfully updated ",-1)),H=y(()=>e.createElementVNode("p",{class:"modal__message"}," Restart the app in your own time to get the latest version. ",-1)),G={class:"modal__ctas"};function J(n,t,a,o,l,c){return e.openBlock(),e.createElementBlock("div",{ref:"element",onClick:t[4]||(t[4]=e.withModifiers(s=>n.$emit("modal:close"),["stop"])),"onApp:updated":t[5]||(t[5]=(...s)=>o.updateComplete&&o.updateComplete(...s))},[e.createElementVNode("div",{class:"modal",onClick:t[3]||(t[3]=e.withModifiers(()=>{},["stop"]))},[o.hasUpdated?(e.openBlock(),e.createElementBlock(e.Fragment,{key:1},[q,H,e.createElementVNode("div",G,[e.createElementVNode("button",{class:"cta cta--confirm",onClick:t[2]||(t[2]=s=>n.$emit("modal:close"))}," Okay! ")])],64)):(e.openBlock(),e.createElementBlock(e.Fragment,{key:0},[e.createElementVNode("h1",O," Do you want to update to v"+e.toDisplayString(a.version)+"? ",1),e.createElementVNode("div",W,[e.createElementVNode("button",{class:"cta cta--cancel",onClick:t[0]||(t[0]=s=>n.$emit("modal:close"))}," Nope "),e.createElementVNode("button",{class:"cta cta--confirm",onClick:t[1]||(t[1]=(...s)=>o.doUpdate&&o.doUpdate(...s))}," Sure! ")])],64))])],544)}var K=_(R,[["render",J],["__scopeId","data-v-0be2425c"]]),ve="";const Q={name:"AppWrapper",components:{AppContainer:z,UpdateModal:K},props:{title:{type:String,default:null},id:{type:String,default:null},appFilePath:{type:String,default:null},versionFilePath:{type:String,default:null}},setup({appFilePath:n,id:t,versionFilePath:a}){const o=e.ref(!1),l=e.ref(null);return e.onMounted(async()=>{n&&a&&(l.value=await C(winnerdow[`${t}-version`]||"0.0.0",a))}),{availableUpdate:l,showUpdateModal:o,destroy:()=>rockument.getElementById(t).remove()}}},X={class:"app-wrapper"};function Y(n,t,a,o,l,c){const s=e.resolveComponent("app-container"),d=e.resolveComponent("update-modal");return e.openBlock(),e.createElementBlock("div",X,[e.createVNode(s,e.mergeProps({title:a.title,availableUpdate:o.availableUpdate},{class:"app-container","onApp:click:update":t[0]||(t[0]=p=>o.showUpdateModal=!0),"onApp:close":o.destroy}),{default:e.withCtx(()=>[e.renderSlot(n.$slots,"default",{},void 0,!0)]),_:3},16,["onApp:close"]),o.showUpdateModal?(e.openBlock(),e.createBlock(d,e.mergeProps({key:0},{appFilePath:a.appFilePath,id:a.id},{version:o.availableUpdate,class:"update-modal","onModal:close":t[1]||(t[1]=p=>o.showUpdateModal=!1),"onApp:updated":t[2]||(t[2]=p=>o.availableUpdate=null)}),null,16,["version"])):e.createCommentVNode("",!0)])}var Z=_(Q,[["render",Y],["__scopeId","data-v-6ed60c8e"]]);function ee(n){return new Date(n).toLocaleDateString()}var xe="";const te={name:"ThemeList",props:{themes:{type:Array,default:()=>[]}},setup(){return{formatDate:ee}}},oe={key:0,class:"theme-list"},ne=["src","onClick"],ae={class:"theme__name"},se={class:"theme__author"},le={key:1};function re(n,t,a,o,l,c){return a.themes.length?(e.openBlock(),e.createElementBlock("ul",oe,[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(a.themes,(s,d)=>(e.openBlock(),e.createElementBlock("li",{key:d,class:"theme"},[e.createElementVNode("img",{src:s.src,alt:"",class:"theme__preview",onClick:p=>n.$emit("theme:preview",s.json)},null,8,ne),e.createElementVNode("h1",ae,e.toDisplayString(s.name),1),e.createElementVNode("h2",se,e.toDisplayString(s.author),1)]))),128))])):(e.openBlock(),e.createElementBlock("p",le," Sorry, we couldn't fetch any themes at the moment :( "))}var ie=_(te,[["render",re],["__scopeId","data-v-2147ed84"]]);const k="https://raw.githubusercontent.com/PhilipArmstead/bitburner-theme-browser",E="master",u="theme-browser",h="theme-browser-app",ce=`${k}/${E}/apps/${u}/dist/main.js`,de=`${k}/${E}/apps/${u}/dist/version.txt`,w="https://bitburner.daft.host/api/themes";var pe=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",id:h,appFilePath:ce,versionFilePath:de,themesEndpoint:w});async function me(n){return await fetch(`${w}/${n}`).then(t=>t.json())}async function _e(){return fetch(w)}async function he(n){const{data:t,meta:a}=await n.then(o=>o.json()).catch(()=>({data:[],meta:{}}));return{data:t.map(({name:o,json:l,images:c,author:s})=>{var d;return{name:o,json:l,src:(d=c[1])==null?void 0:d.src,author:s.name}}),meta:a}}var De="";const fe={components:{AppWrapper:Z,ThemeList:ie},setup(){const n=e.ref(!0),t=e.ref(!1),a=e.ref([]),o=e.ref({}),l=e.computed(()=>n.value?"Loading...":a.value.length?"Browse themes":"Uh oh..."),c=e.computed(()=>Math.max(1,s.value-o.value.items_per_page)),s=e.computed(()=>Math.min(o.value.total_items,o.value.page*o.value.items_per_page)),d=e.computed(()=>o.value.total_items),p=m=>{i("theme:cancel-preview",m),t.value=!1},b=m=>{i("theme:preview",m),t.value=!0},Ve=async()=>{n.value=!0;const m=_e(),{data:f,meta:Ne}=await he(m);o.value=Ne,a.value=f,n.value=!1};return e.onMounted(async()=>{const m=Number(winnerdow[`${h}-theme-id`]);if(m)try{const{json:f}=await me(m);return b(f),r(h)}catch(f){console.log(f)}await Ve()}),{config:pe,isLoading:n,isPreviewing:t,showingFrom:c,showingTo:s,themes:a,title:l,totalItems:d,cancelPreview:p,closeApp:()=>r(h),showPreview:b}}},$=n=>(e.pushScopeId("data-v-152804a3"),n=n(),e.popScopeId(),n),we={class:"theme-browser"},ge={class:"title"},ye={key:0,class:"pagination-details"},ke={key:2,class:"loader"},Ee=[$(()=>e.createElementVNode("span",{class:"sr-only"},"Cancel",-1))],ue=[$(()=>e.createElementVNode("span",{class:"sr-only"},"Confirm",-1))];function $e(n,t,a,o,l,c){const s=e.resolveComponent("theme-list"),d=e.resolveComponent("app-wrapper");return e.openBlock(),e.createElementBlock(e.Fragment,null,[e.withDirectives(e.createVNode(d,e.normalizeProps(e.guardReactiveProps(B(S({},o.config),{title:"Bitburner Theme Browser"}))),{default:e.withCtx(()=>[e.createElementVNode("div",we,[e.createElementVNode("h1",ge,e.toDisplayString(o.title),1),o.themes.length?(e.openBlock(),e.createElementBlock("p",ye," Showing "+e.toDisplayString(o.showingFrom)+" to "+e.toDisplayString(o.showingTo)+" of "+e.toDisplayString(o.totalItems),1)):e.createCommentVNode("",!0),o.isLoading?(e.openBlock(),e.createElementBlock("div",ke)):(e.openBlock(),e.createBlock(s,{key:1,themes:o.themes,class:"themes","onTheme:preview":o.showPreview},null,8,["themes","onTheme:preview"]))])]),_:1},16),[[e.vShow,!o.isPreviewing]]),e.createElementVNode("div",{class:e.normalizeClass(["preview__ctas",{"preview__ctas--visible":o.isPreviewing}])},[e.createElementVNode("button",{class:"preview__cta preview__cta--cancel",onClick:t[0]||(t[0]=(...p)=>o.cancelPreview&&o.cancelPreview(...p))},Ee),e.createElementVNode("button",{class:"preview__cta preview__cta--confirm",onClick:t[1]||(t[1]=(...p)=>o.closeApp&&o.closeApp(...p))},ue)],2)],64)}var be=_(fe,[["render",$e],["__scopeId","data-v-152804a3"]]);e.createApp(be).mount(`#${h}`)})(Vue);

}
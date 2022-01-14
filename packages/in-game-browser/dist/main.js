export async function main(ns) {
	const doc = globalThis['document']
	const id = 'theme-browser-app'
	globalThis[`${id}-version`] = '0.0.33'

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


















const bundledCss = ".app-container[data-v-d1578bc0]{bottom:0;left:0;pointer-events:none;position:fixed;top:0;width:100%;z-index:1510}.app-container *[data-v-d1578bc0]{box-sizing:border-box}.app-container .app[data-v-d1578bc0]{align-items:flex-start;border:1px solid #4E4E4E6B;display:inline-flex;flex-direction:column;left:50%;height:90vh;overflow:hidden;pointer-events:auto;position:absolute;resize:none;top:50%;transform:translate(-50%,-52%);width:90vw}.app-container .app__toolbar[data-v-d1578bc0]{background:#111;color:#fff;display:flex;padding:4px 3px 4px 8px;user-select:none;width:100%}.app-container .app__title[data-v-d1578bc0]{align-self:center;flex:0 1 100%;font-family:var(--font-family, monospace);font-size:13px;font-weight:700;line-height:1;margin:0 20px 0 0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.app-container .app__cta-group[data-v-d1578bc0]{align-items:center;display:flex;flex:0 1 100%;justify-content:flex-end;margin-left:auto}.app-container .app__cta-group>*[data-v-d1578bc0]{background-position:50% 50%;background-size:14px auto;flex:0 1 auto}.app-container .app__cta-group .icon[data-v-d1578bc0]{width:16px}.app-container .app__cta-group .icon--restore[data-v-d1578bc0]{color:#d6cec8}.app-container .app__cta-group .icon--update[data-v-d1578bc0]{color:#6bd700}.app-container .app__cta-group .btn[data-v-d1578bc0]{background:none;border:none;color:#a9a9a9;cursor:pointer;display:flex}.app-container .app__icon[data-v-d1578bc0]{align-self:center;max-height:16px;margin-right:6px;object-fit:contain;width:16px}.app-container .app__menu[data-v-d1578bc0]{width:100%;background:#d4d0c8;color:#333;padding-left:5px;padding-bottom:2px}.app-container .app__menu span[data-v-d1578bc0]{border:1px inset transparent;cursor:pointer;font-size:15px;margin-right:12px;padding:0 1px}.app-container .app__menu span[data-v-d1578bc0]:hover{border:1px inset #BDBDBD}.app-container .app__content[data-v-d1578bc0]{flex:0 1 100%;overflow:auto;scrollbar-color:var(--primary, #272727) var(--primarydark, #B7B7B7);scrollbar-width:thin;width:100%}.app-container .app__content[data-v-d1578bc0]::-webkit-scrollbar{display:block;width:10px}.app-container .app__content[data-v-d1578bc0]::-webkit-scrollbar-track{background-color:var(--primarydark, #B7B7B7)}.app-container .app__content[data-v-d1578bc0]::-webkit-scrollbar-thumb{background-color:var(--primary, #272727)}.app-container .app .btn[data-v-d1578bc0]{background:none;box-shadow:none}.modal[data-v-239fa606]{background:#FFF;border:1px solid #0003;border-radius:6px;display:flex;flex-wrap:wrap;left:50%;padding:24px;position:absolute;top:50%;transform:translate(-50%,-50%);width:40vw}.modal__title[data-v-239fa606]{color:#212529;font-size:20px;font-weight:500;line-height:1.5;margin:0}.modal__message[data-v-239fa606]{line-height:1.4}.modal__ctas[data-v-239fa606],.modal__message[data-v-239fa606]{flex:1 0 100%;margin:16px 0 0}.modal__ctas[data-v-239fa606]{display:flex;justify-content:flex-end}.modal .cta[data-v-239fa606]{border:1px solid transparent;border-radius:4px;cursor:pointer;display:inline-block;font-weight:400;font-size:16px;line-height:1.5;margin-left:12px;padding:6px 12px;text-align:center;transition:.15s ease-in-out;transition-property:color,background-color,border-color,box-shadow;vertical-align:middle}.modal .cta[data-v-239fa606]:hover{text-decoration:none}.modal .cta--cancel[data-v-239fa606]{background-color:#6c757d;border-color:#6c757d;color:#fff}.modal .cta--cancel[data-v-239fa606]:hover{background-color:#5a6268;border-color:#545b62;color:#fff}.modal .cta--cancel[data-v-239fa606]:active{background-color:#545b62;border-color:#4e555b;color:#fff}.modal .cta--confirm[data-v-239fa606]{background-color:#28a745;border-color:#28a745;color:#fff}.modal .cta--confirm[data-v-239fa606]:hover{background-color:#218838;border-color:#1e7e34;color:#fff}.modal .cta--confirm[data-v-239fa606]:active{background-color:#1e7e34;border-color:#1c7430;color:#fff}.app-wrapper[data-v-e5cd95ee],.update-modal[data-v-e5cd95ee],button[data-v-e5cd95ee]{font-family:Fira Sans,Trebuchet MS,Ubuntu,Helvetica,Arial,sans-serif}.update-modal[data-v-e5cd95ee]{background:rgba(51,51,51,.7);height:100%;left:0;position:fixed;top:0;width:100%;z-index:1512}.theme-list[data-v-2147ed84]{display:flex;flex-wrap:wrap;list-style:none;margin:0;padding:0}.theme-list .theme[data-v-2147ed84]{box-sizing:border-box;display:flex;flex:0 0 33%;flex-direction:column;margin:0;padding:16px}.theme-list .theme__name[data-v-2147ed84],.theme-list .theme__author[data-v-2147ed84]{text-align:center}.theme-list .theme__name[data-v-2147ed84]{color:#80f20d;font-size:18px;font-weight:500;margin:14px 0 0}.theme-list .theme__author[data-v-2147ed84]{color:#ccced0;font-size:14px;margin:8px 0 0}.theme-list .theme__preview[data-v-2147ed84]{aspect-ratio:1.5;cursor:pointer;display:block;height:auto;pointer-events:auto;transition:transform .2s cubic-bezier(.4,0,.2,1);width:100%}.theme-list .theme__preview[data-v-2147ed84]:hover{transform:scale(1.1)}[data-v-430e712c] .app{max-width:1166px}.theme-browser[data-v-430e712c]{align-items:baseline;background:#171A22;box-sizing:border-box;color:#fff;display:flex;flex-wrap:wrap;height:inherit;justify-content:space-between;min-height:100%;padding:24px 32px}.title[data-v-430e712c],.pagination-details[data-v-430e712c]{flex:0 1 auto;margin:0}.title[data-v-430e712c]{margin-right:20px}.pagination-details[data-v-430e712c]{color:#cecece;margin-left:20px}.themes[data-v-430e712c]{margin-top:16px}.loader[data-v-430e712c]{align-self:center;background:no-repeat 55% 50%/100px auto url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cg fill='%23900'%3E%3Ccircle cx='60' cy='50' r='4'%3E%3Canimate attributeName='cx' repeatCount='indefinite' dur='1s' values='95;35' keyTimes='0;1' begin='-0.67s'/%3E%3Canimate attributeName='fill-opacity' repeatCount='indefinite' dur='1s' values='0;1;1' keyTimes='0;0.2;1' begin='-0.67s'/%3E%3C/circle%3E%3Ccircle cx='60' cy='50' r='4'%3E%3Canimate attributeName='cx' repeatCount='indefinite' dur='1s' values='95;35' keyTimes='0;1' begin='-0.33s'/%3E%3Canimate attributeName='fill-opacity' repeatCount='indefinite' dur='1s' values='0;1;1' keyTimes='0;0.2;1' begin='-0.33s'/%3E%3C/circle%3E%3Ccircle cx='60' cy='50' r='4'%3E%3Canimate attributeName='cx' repeatCount='indefinite' dur='1s' values='95;35' keyTimes='0;1' begin='0s'/%3E%3Canimate attributeName='fill-opacity' repeatCount='indefinite' dur='1s' values='0;1;1' keyTimes='0;0.2;1' begin='0s'/%3E%3C/circle%3E%3C/g%3E%3Cg fill='%2380f20d' transform='translate(-15 0)'%3E%3Cpath d='M50 50L20 50A30 30 0 0 0 80 50Z'%3E%3CanimateTransform attributeName='transform' type='rotate' repeatCount='indefinite' dur='1s' values='0 50 50;45 50 50;0 50 50' keyTimes='0;0.5;1'/%3E%3C/path%3E%3Cpath d='M50 50L20 50A30 30 0 0 1 80 50Z'%3E%3CanimateTransform attributeName='transform' type='rotate' repeatCount='indefinite' dur='1s' values='0 50 50;-45 50 50;0 50 50' keyTimes='0;0.5;1'/%3E%3C/path%3E%3C/g%3E%3C/svg%3E\");flex:1 0 100%;height:200px;margin:auto 0 40%;width:200px}.preview__ctas[data-v-430e712c]{bottom:0;display:flex;height:150px;justify-content:space-between;position:fixed;right:30px;width:150px}.preview__ctas:not(.preview__ctas--visible) .preview__cta[data-v-430e712c]{pointer-events:none}.preview__ctas:not(.preview__ctas--visible) .preview__cta--cancel[data-v-430e712c]{transform:translate(190px,160px)}.preview__ctas:not(.preview__ctas--visible) .preview__cta--confirm[data-v-430e712c]{transform:translate(110px,160px)}.preview__ctas .preview__cta[data-v-430e712c]{align-items:center;background:no-repeat 50% 50%/30px auto;border:none;border-radius:50%;cursor:pointer;display:flex;flex:0 1 44%;height:66px;justify-content:center;padding:0;position:relative;transition:transform .25s cubic-bezier(.4,0,.2,1)}.preview__ctas .preview__cta--cancel[data-v-430e712c]{background-color:#e33030d4;background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 47.095 47.095'%3E%3Cpath fill='%23FFF' d='m45.363 36.234-13.158-13.16 12.21-12.21a5.906 5.906 0 0 0 0-8.358 5.908 5.908 0 0 0-8.356 0l-12.212 12.21-12.809-12.81a5.91 5.91 0 1 0-8.358 8.358l12.81 12.81L1.732 36.831a5.91 5.91 0 1 0 8.356 8.359l13.759-13.758 13.16 13.16a5.908 5.908 0 0 0 8.356 0 5.907 5.907 0 0 0 0-8.358z'/%3E%3C/svg%3E\");transform:translateY(40px)}.preview__ctas .preview__cta--confirm[data-v-430e712c]{background-color:#72d000d4;background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 122.877 101.052'%3E%3Cpath fill='white' d='M4.43 63.63A14.383 14.383 0 0 1 .003 53.52a14.393 14.393 0 0 1 4.015-10.281 14.372 14.372 0 0 1 10.106-4.425 14.373 14.373 0 0 1 10.283 4.012l24.787 23.851L98.543 3.989l1.768 1.349-1.77-1.355a2.27 2.27 0 0 1 .479-.466A14.383 14.383 0 0 1 109.243.022V.018l.176.016c3.623.24 7.162 1.85 9.775 4.766a14.383 14.383 0 0 1 3.662 10.412h.004l-.016.176a14.362 14.362 0 0 1-4.609 9.632L59.011 97.11l.004.004a2.157 2.157 0 0 1-.372.368 14.392 14.392 0 0 1-9.757 3.569 14.381 14.381 0 0 1-9.741-4.016L4.43 63.63z'/%3E%3C/svg%3E\")}.sr-only[data-v-430e712c]{clip:rect(1px,1px,1px,1px);clip-path:inset(50%);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}@keyframes slide-up-left-430e712c{0%{transform:translate(150px,150px)}to{transform:translate(0)}}\n"

function mount() {
	const winnerdow = globalThis
	const rockument = globalThis['document'];
	(function(e){"use strict";function E(n){rockument.querySelector(`#${n} .app-container`).dispatchEvent(new CustomEvent("app:close"))}function _(n,t){rockument.body.dispatchEvent(new CustomEvent(n,{detail:t}))}const V=async(n,t)=>{const a=await fetch(t).then(o=>o.text());return $(a,n)?a:null},$=(n,t)=>{const a=n.split(".").map(Number),o=t.split(".").map(Number);for(let l=0;l<a.length;++l){if(a[l]>o[l])return!0;if(o[l]>a[l])return!1}return!1};var Ee="",d=(n,t)=>{const a=n.__vccOpts||n;for(const[o,l]of t)a[o]=l;return a};const N={name:"AppContainer",components:{},props:{title:{type:String,required:!0},availableUpdate:{type:[String,Promise],default:null},versionFilePath:{type:String,default:null},id:{type:String,default:null}}},h=n=>(e.pushScopeId("data-v-d1578bc0"),n=n(),e.popScopeId(),n),b={class:"app-container"},B={class:"app"},C={class:"app__toolbar"},u={class:"app__title"},S={class:"app__cta-group"},U=["title"],A=[h(()=>e.createElementVNode("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 417 417",class:"icon icon--update"},[e.createElementVNode("path",{fill:"#FFF",d:"M120 90h180v235H120z"}),e.createElementVNode("path",{fill:"currentColor",d:"M208.5 417a208.5 208.5 0 1 0 0-417 208.5 208.5 0 0 0 0 417zm-81.3-197.5 68.3-118.3a15 15 0 0 1 26 0l68.2 118.3a15 15 0 0 1-13 22.5h-33.2v66.2a15 15 0 0 1-15 15h-40a15 15 0 0 1-15-15V242h-33.3a15 15 0 0 1-13-22.5z"})],-1))],M=[h(()=>e.createElementVNode("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 18 18",class:"icon icon--close"},[e.createElementVNode("g",{stroke:"currentColor","stroke-width":"1.5"},[e.createElementVNode("line",{x1:"3",y1:"3",x2:"15",y2:"15"}),e.createElementVNode("line",{x2:"3",y1:"3",x1:"15",y2:"15"})])],-1))],P={class:"app__content"};function v(n,t,a,o,l,i){return e.openBlock(),e.createElementBlock("div",b,[e.createElementVNode("div",B,[e.createElementVNode("div",C,[e.createElementVNode("h1",u,e.toDisplayString(a.title),1),e.createElementVNode("div",S,[a.availableUpdate?(e.openBlock(),e.createElementBlock("button",{key:0,class:"btn btn--small app__cta-update-available",title:`Version ${a.availableUpdate} is available`,onClick:t[0]||(t[0]=s=>n.$emit("app:click:update")),onMousedown:t[1]||(t[1]=e.withModifiers(()=>{},["stop"]))},A,40,U)):e.createCommentVNode("",!0),e.createElementVNode("button",{class:"btn btn--small app__cta-close",title:"Close",onClick:t[2]||(t[2]=s=>n.$emit("app:close")),onMousedown:t[3]||(t[3]=e.withModifiers(()=>{},["stop"]))},M,32)])]),e.createElementVNode("div",P,[e.renderSlot(n.$slots,"default",{},void 0,!0)])])])}var I=d(N,[["render",v],["__scopeId","data-v-d1578bc0"]]);const w="https://raw.githubusercontent.com/PhilipArmstead/bitburner-theme-browser",f="master",g="in-game-browser",m="theme-browser-app",x=`${w}/${f}/packages/${g}/dist/main.js`,F=`${w}/${f}/packages/${g}/dist/version.txt`,D="https://bitburner.daft.host/api/themes";var Ne="";const T={name:"UpdateModal",props:{version:{type:String,default:null}},setup(){const n=e.ref(null),t=e.ref(!1);return{element:n,hasUpdated:t,doUpdate:()=>_(`app:update:${m}`,{element:n.value,path:x}),updateComplete:()=>t.value=!0}}},y=n=>(e.pushScopeId("data-v-239fa606"),n=n(),e.popScopeId(),n),L={class:"modal__title"},z={class:"modal__ctas"},R=y(()=>e.createElementVNode("h1",{class:"modal__title"}," App successfully updated ",-1)),j=y(()=>e.createElementVNode("p",{class:"modal__message"}," Restart the app in your own time to get the latest version. ",-1)),W={class:"modal__ctas"};function q(n,t,a,o,l,i){return e.openBlock(),e.createElementBlock("div",{ref:"element",onClick:t[4]||(t[4]=e.withModifiers(s=>n.$emit("modal:close"),["stop"])),"onApp:updated":t[5]||(t[5]=(...s)=>o.updateComplete&&o.updateComplete(...s))},[e.createElementVNode("div",{class:"modal",onClick:t[3]||(t[3]=e.withModifiers(()=>{},["stop"]))},[o.hasUpdated?(e.openBlock(),e.createElementBlock(e.Fragment,{key:1},[R,j,e.createElementVNode("div",W,[e.createElementVNode("button",{class:"cta cta--confirm",onClick:t[2]||(t[2]=s=>n.$emit("modal:close"))}," Okay! ")])],64)):(e.openBlock(),e.createElementBlock(e.Fragment,{key:0},[e.createElementVNode("h1",L," Do you want to update to v"+e.toDisplayString(a.version)+"? ",1),e.createElementVNode("div",z,[e.createElementVNode("button",{class:"cta cta--cancel",onClick:t[0]||(t[0]=s=>n.$emit("modal:close"))}," Nope "),e.createElementVNode("button",{class:"cta cta--confirm",onClick:t[1]||(t[1]=(...s)=>o.doUpdate&&o.doUpdate(...s))}," Sure! ")])],64))])],544)}var H=d(T,[["render",q],["__scopeId","data-v-239fa606"]]),be="";const O={name:"AppWrapper",components:{AppContainer:I,UpdateModal:H},props:{title:{type:String,default:null},id:{type:String,default:null},versionFilePath:{type:String,default:null}},setup({id:n,versionFilePath:t}){const a=e.ref(!1),o=e.ref(null);return e.onMounted(async()=>{t&&(o.value=await V(winnerdow[`${n}-version`]||"0.0.0",t))}),{availableUpdate:o,showUpdateModal:a,destroy:()=>rockument.getElementById(n).remove()}}},G={class:"app-wrapper"};function J(n,t,a,o,l,i){const s=e.resolveComponent("app-container"),r=e.resolveComponent("update-modal");return e.openBlock(),e.createElementBlock("div",G,[e.createVNode(s,e.mergeProps({title:a.title,availableUpdate:o.availableUpdate},{class:"app-container","onApp:click:update":t[0]||(t[0]=c=>o.showUpdateModal=!0),"onApp:close":o.destroy}),{default:e.withCtx(()=>[e.renderSlot(n.$slots,"default",{},void 0,!0)]),_:3},16,["onApp:close"]),o.showUpdateModal?(e.openBlock(),e.createBlock(r,{key:0,version:o.availableUpdate,class:"update-modal","onModal:close":t[1]||(t[1]=c=>o.showUpdateModal=!1),"onApp:updated":t[2]||(t[2]=c=>o.availableUpdate=null)},null,8,["version"])):e.createCommentVNode("",!0)])}var K=d(O,[["render",J],["__scopeId","data-v-e5cd95ee"]]);function Q(n){return new Date(n).toLocaleDateString()}var Be="";const X={name:"ThemeList",props:{themes:{type:Array,default:()=>[]}},setup(){return{formatDate:Q}}},Y={key:0,class:"theme-list"},Z=["src","onClick"],ee={class:"theme__name"},te={class:"theme__author"},oe={key:1};function ne(n,t,a,o,l,i){return a.themes.length?(e.openBlock(),e.createElementBlock("ul",Y,[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(a.themes,(s,r)=>(e.openBlock(),e.createElementBlock("li",{key:r,class:"theme"},[e.createElementVNode("img",{src:s.src,alt:"",class:"theme__preview",onClick:c=>n.$emit("theme:preview",s.json)},null,8,Z),e.createElementVNode("h1",ee,e.toDisplayString(s.name),1),e.createElementVNode("h2",te,e.toDisplayString(s.author),1)]))),128))])):(e.openBlock(),e.createElementBlock("p",oe," Sorry, we couldn't fetch any themes at the moment :( "))}var ae=d(X,[["render",ne],["__scopeId","data-v-2147ed84"]]);async function se(){return fetch(D)}async function le(n){const{data:t,meta:a}=await n.then(o=>o.json()).catch(()=>({data:[],meta:{}}));return{data:t.map(({name:o,json:l,images:i,author:s})=>{var r;return{name:o,json:l,src:(r=i[1])==null?void 0:r.src,author:s.name}}),meta:a}}var Ce="";const re={components:{AppWrapper:K,ThemeList:ae},setup(){const n=e.ref(!0),t=e.ref(!1),a=e.ref([]),o=e.ref({}),l=e.computed(()=>n.value?"Loading...":a.value.length?"Browse themes":"Uh oh..."),i=e.computed(()=>Math.max(1,s.value-o.value.items_per_page)),s=e.computed(()=>Math.min(o.value.total_items,o.value.page*o.value.items_per_page)),r=e.computed(()=>o.value.total_items),c=p=>{_("theme:cancel-preview",p),t.value=!1},fe=p=>{_("theme:preview",p),t.value=!0},ge=async()=>{n.value=!0;const p=se(),{data:ye,meta:ke}=await le(p);o.value=ke,a.value=ye,n.value=!1};return e.onMounted(async()=>await ge()),{id:m,isLoading:n,isPreviewing:t,showingFrom:i,showingTo:s,themes:a,title:l,totalItems:r,versionFilePath:F,cancelPreview:c,closeApp:()=>E(m),showPreview:fe}}},k=n=>(e.pushScopeId("data-v-430e712c"),n=n(),e.popScopeId(),n),ce={class:"theme-browser"},ie={class:"title"},de={key:0,class:"pagination-details"},pe={key:2,class:"loader"},me=[k(()=>e.createElementVNode("span",{class:"sr-only"},"Cancel",-1))],_e=[k(()=>e.createElementVNode("span",{class:"sr-only"},"Confirm",-1))];function he(n,t,a,o,l,i){const s=e.resolveComponent("theme-list"),r=e.resolveComponent("app-wrapper");return e.openBlock(),e.createElementBlock(e.Fragment,null,[e.withDirectives(e.createVNode(r,e.normalizeProps(e.guardReactiveProps({id:o.id,title:"Bitburner Theme Browser",versionFilePath:o.versionFilePath})),{default:e.withCtx(()=>[e.createElementVNode("div",ce,[e.createElementVNode("h1",ie,e.toDisplayString(o.title),1),o.themes.length?(e.openBlock(),e.createElementBlock("p",de," Showing "+e.toDisplayString(o.showingFrom)+" to "+e.toDisplayString(o.showingTo)+" of "+e.toDisplayString(o.totalItems),1)):e.createCommentVNode("",!0),o.isLoading?(e.openBlock(),e.createElementBlock("div",pe)):(e.openBlock(),e.createBlock(s,{key:1,themes:o.themes,class:"themes","onTheme:preview":o.showPreview},null,8,["themes","onTheme:preview"]))])]),_:1},16),[[e.vShow,!o.isPreviewing]]),e.createElementVNode("div",{class:e.normalizeClass(["preview__ctas",{"preview__ctas--visible":o.isPreviewing}])},[e.createElementVNode("button",{class:"preview__cta preview__cta--cancel",onClick:t[0]||(t[0]=(...c)=>o.cancelPreview&&o.cancelPreview(...c))},me),e.createElementVNode("button",{class:"preview__cta preview__cta--confirm",onClick:t[1]||(t[1]=(...c)=>o.closeApp&&o.closeApp(...c))},_e)],2)],64)}var we=d(re,[["render",he],["__scopeId","data-v-430e712c"]]);e.createApp(we).mount(`#${m}`)})(Vue);

}
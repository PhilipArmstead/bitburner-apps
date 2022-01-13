export async function main(ns) {
	const doc = globalThis['document']
	const id = 'theme-browser-app'
	globalThis[`${id}-version`] = '0.0.30'

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


















const bundledCss = ".app-container[data-v-8894677a]{bottom:0;left:0;pointer-events:none;position:fixed;top:0;width:100%;z-index:1510}.app-container *[data-v-8894677a]{box-sizing:border-box}.app-container .app[data-v-8894677a]{align-items:flex-start;border:1px solid #4E4E4E6B;display:inline-flex;flex-direction:column;left:50%;height:90vh;overflow:hidden;pointer-events:auto;position:absolute;resize:none;top:50%;transform:translate(-50%,-52%);width:90vw}.app-container .app__toolbar[data-v-8894677a]{background:#111;color:#fff;display:flex;padding:4px 3px 4px 8px;user-select:none;width:100%}.app-container .app__title[data-v-8894677a]{align-self:center;flex:0 1 100%;font-family:var(--font-family, monospace);font-size:13px;font-weight:700;line-height:1;margin:0 20px 0 0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.app-container .app__cta-group[data-v-8894677a]{align-items:center;display:flex;flex:0 1 100%;justify-content:flex-end;margin-left:auto}.app-container .app__cta-group>*[data-v-8894677a]{background-position:50% 50%;background-size:14px auto;flex:0 1 auto}.app-container .app__cta-group .icon[data-v-8894677a]{width:16px}.app-container .app__cta-group .icon--restore[data-v-8894677a]{color:#d6cec8}.app-container .app__cta-group .icon--update[data-v-8894677a]{color:#6bd700}.app-container .app__cta-group .btn[data-v-8894677a]{background:none;border:none;color:#a9a9a9;cursor:pointer;display:flex}.app-container .app__icon[data-v-8894677a]{align-self:center;max-height:16px;margin-right:6px;object-fit:contain;width:16px}.app-container .app__menu[data-v-8894677a]{width:100%;background:#d4d0c8;color:#333;padding-left:5px;padding-bottom:2px}.app-container .app__menu span[data-v-8894677a]{border:1px inset transparent;cursor:pointer;font-size:15px;margin-right:12px;padding:0 1px}.app-container .app__menu span[data-v-8894677a]:hover{border:1px inset #BDBDBD}.app-container .app__content[data-v-8894677a]{flex:0 1 100%;overflow:auto;scrollbar-color:var(--primary, #272727) var(--primarydark, #B7B7B7);scrollbar-width:thin;width:100%}.app-container .app__content[data-v-8894677a]::-webkit-scrollbar{display:block;width:10px}.app-container .app__content[data-v-8894677a]::-webkit-scrollbar-track{background-color:var(--primarydark, #B7B7B7)}.app-container .app__content[data-v-8894677a]::-webkit-scrollbar-thumb{background-color:var(--primary, #272727)}.app-container .app .btn[data-v-8894677a]{background:none;box-shadow:none}.modal[data-v-ac1fcfa2]{background:#FFF;border:1px solid #0003;border-radius:6px;display:flex;flex-wrap:wrap;left:50%;padding:24px;position:absolute;top:50%;transform:translate(-50%,-50%);width:40vw}.modal__title[data-v-ac1fcfa2]{color:#212529;font-size:20px;font-weight:500;line-height:1.5;margin:0}.modal__message[data-v-ac1fcfa2]{line-height:1.4}.modal__ctas[data-v-ac1fcfa2],.modal__message[data-v-ac1fcfa2]{flex:1 0 100%;margin:16px 0 0}.modal__ctas[data-v-ac1fcfa2]{display:flex;justify-content:flex-end}.modal .cta[data-v-ac1fcfa2]{border:1px solid transparent;border-radius:4px;cursor:pointer;display:inline-block;font-weight:400;font-size:16px;line-height:1.5;margin-left:12px;padding:6px 12px;text-align:center;transition:.15s ease-in-out;transition-property:color,background-color,border-color,box-shadow;vertical-align:middle}.modal .cta[data-v-ac1fcfa2]:hover{text-decoration:none}.modal .cta--cancel[data-v-ac1fcfa2]{background-color:#6c757d;border-color:#6c757d;color:#fff}.modal .cta--cancel[data-v-ac1fcfa2]:hover{background-color:#5a6268;border-color:#545b62;color:#fff}.modal .cta--cancel[data-v-ac1fcfa2]:active{background-color:#545b62;border-color:#4e555b;color:#fff}.modal .cta--confirm[data-v-ac1fcfa2]{background-color:#28a745;border-color:#28a745;color:#fff}.modal .cta--confirm[data-v-ac1fcfa2]:hover{background-color:#218838;border-color:#1e7e34;color:#fff}.modal .cta--confirm[data-v-ac1fcfa2]:active{background-color:#1e7e34;border-color:#1c7430;color:#fff}.theme-list[data-v-ffed919c]{display:flex;flex-wrap:wrap;list-style:none;margin:0;padding:0}.theme-list .theme[data-v-ffed919c]{box-sizing:border-box;display:flex;flex:0 0 33%;flex-direction:column;margin:0;padding:16px}.theme-list .theme__name[data-v-ffed919c],.theme-list .theme__author[data-v-ffed919c]{text-align:center}.theme-list .theme__name[data-v-ffed919c]{color:#80f20d;font-size:18px;font-weight:500;margin:14px 0 0}.theme-list .theme__author[data-v-ffed919c]{color:#ccced0;font-size:14px;margin:8px 0 0}.theme-list .theme__preview[data-v-ffed919c]{aspect-ratio:1.5;cursor:pointer;display:block;height:auto;pointer-events:auto;transition:transform .2s cubic-bezier(.4,0,.2,1);width:100%}.theme-list .theme__preview[data-v-ffed919c]:hover{transform:scale(1.1)}.app-container[data-v-8bb6b010],.update-modal[data-v-8bb6b010],button[data-v-8bb6b010]{font-family:Fira Sans,Trebuchet MS,Ubuntu,Helvetica,Arial,sans-serif}[data-v-8bb6b010] .app{max-width:1166px}.theme-browser[data-v-8bb6b010]{align-items:baseline;background:#171A22;box-sizing:border-box;color:#fff;display:flex;flex-wrap:wrap;height:inherit;justify-content:space-between;min-height:100%;padding:24px 32px}.title[data-v-8bb6b010],.pagination-details[data-v-8bb6b010]{flex:0 1 auto;margin:0}.title[data-v-8bb6b010]{margin-right:20px}.pagination-details[data-v-8bb6b010]{color:#cecece;margin-left:20px}.themes[data-v-8bb6b010]{margin-top:16px}.loader[data-v-8bb6b010]{align-self:center;background:no-repeat 55% 50%/100px auto url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cg fill='%23900'%3E%3Ccircle cx='60' cy='50' r='4'%3E%3Canimate attributeName='cx' repeatCount='indefinite' dur='1s' values='95;35' keyTimes='0;1' begin='-0.67s'/%3E%3Canimate attributeName='fill-opacity' repeatCount='indefinite' dur='1s' values='0;1;1' keyTimes='0;0.2;1' begin='-0.67s'/%3E%3C/circle%3E%3Ccircle cx='60' cy='50' r='4'%3E%3Canimate attributeName='cx' repeatCount='indefinite' dur='1s' values='95;35' keyTimes='0;1' begin='-0.33s'/%3E%3Canimate attributeName='fill-opacity' repeatCount='indefinite' dur='1s' values='0;1;1' keyTimes='0;0.2;1' begin='-0.33s'/%3E%3C/circle%3E%3Ccircle cx='60' cy='50' r='4'%3E%3Canimate attributeName='cx' repeatCount='indefinite' dur='1s' values='95;35' keyTimes='0;1' begin='0s'/%3E%3Canimate attributeName='fill-opacity' repeatCount='indefinite' dur='1s' values='0;1;1' keyTimes='0;0.2;1' begin='0s'/%3E%3C/circle%3E%3C/g%3E%3Cg fill='%2380f20d' transform='translate(-15 0)'%3E%3Cpath d='M50 50L20 50A30 30 0 0 0 80 50Z'%3E%3CanimateTransform attributeName='transform' type='rotate' repeatCount='indefinite' dur='1s' values='0 50 50;45 50 50;0 50 50' keyTimes='0;0.5;1'/%3E%3C/path%3E%3Cpath d='M50 50L20 50A30 30 0 0 1 80 50Z'%3E%3CanimateTransform attributeName='transform' type='rotate' repeatCount='indefinite' dur='1s' values='0 50 50;-45 50 50;0 50 50' keyTimes='0;0.5;1'/%3E%3C/path%3E%3C/g%3E%3C/svg%3E\");flex:1 0 100%;height:200px;margin:auto 0 40%;width:200px}.preview__ctas[data-v-8bb6b010]{bottom:0;display:flex;height:150px;justify-content:space-between;position:fixed;right:30px;width:150px}.preview__ctas:not(.preview__ctas--visible) .preview__cta[data-v-8bb6b010]{pointer-events:none}.preview__ctas:not(.preview__ctas--visible) .preview__cta--cancel[data-v-8bb6b010]{transform:translate(190px,160px)}.preview__ctas:not(.preview__ctas--visible) .preview__cta--confirm[data-v-8bb6b010]{transform:translate(110px,160px)}.preview__ctas .preview__cta[data-v-8bb6b010]{align-items:center;background:no-repeat 50% 50%/30px auto;border:none;border-radius:50%;cursor:pointer;display:flex;flex:0 1 44%;height:66px;justify-content:center;padding:0;position:relative;transition:transform .25s cubic-bezier(.4,0,.2,1)}.preview__ctas .preview__cta--cancel[data-v-8bb6b010]{background-color:#e33030d4;background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 47.095 47.095'%3E%3Cpath fill='%23FFF' d='m45.363 36.234-13.158-13.16 12.21-12.21a5.906 5.906 0 0 0 0-8.358 5.908 5.908 0 0 0-8.356 0l-12.212 12.21-12.809-12.81a5.91 5.91 0 1 0-8.358 8.358l12.81 12.81L1.732 36.831a5.91 5.91 0 1 0 8.356 8.359l13.759-13.758 13.16 13.16a5.908 5.908 0 0 0 8.356 0 5.907 5.907 0 0 0 0-8.358z'/%3E%3C/svg%3E\");transform:translateY(40px)}.preview__ctas .preview__cta--confirm[data-v-8bb6b010]{background-color:#72d000d4;background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 122.877 101.052'%3E%3Cpath fill='white' d='M4.43 63.63A14.383 14.383 0 0 1 .003 53.52a14.393 14.393 0 0 1 4.015-10.281 14.372 14.372 0 0 1 10.106-4.425 14.373 14.373 0 0 1 10.283 4.012l24.787 23.851L98.543 3.989l1.768 1.349-1.77-1.355a2.27 2.27 0 0 1 .479-.466A14.383 14.383 0 0 1 109.243.022V.018l.176.016c3.623.24 7.162 1.85 9.775 4.766a14.383 14.383 0 0 1 3.662 10.412h.004l-.016.176a14.362 14.362 0 0 1-4.609 9.632L59.011 97.11l.004.004a2.157 2.157 0 0 1-.372.368 14.392 14.392 0 0 1-9.757 3.569 14.381 14.381 0 0 1-9.741-4.016L4.43 63.63z'/%3E%3C/svg%3E\")}.update-modal[data-v-8bb6b010]{background:rgba(51,51,51,.7);height:100%;left:0;position:fixed;top:0;width:100%;z-index:1512}.sr-only[data-v-8bb6b010]{clip:rect(1px,1px,1px,1px);clip-path:inset(50%);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}@keyframes slide-up-left-8bb6b010{0%{transform:translate(150px,150px)}to{transform:translate(0)}}\n"

function mount() {
	const winnerdow = globalThis
	const rockument = globalThis['document'];
	(function(e){"use strict";const N=async(o,t)=>{const n=await fetch(t).then(a=>a.text());return $(n,o)?n:null},$=(o,t)=>{const n=o.split(".").map(Number),a=t.split(".").map(Number);for(let l=0;l<n.length;++l){if(n[l]>a[l])return!0;if(a[l]>n[l])return!1}return!1};var Ve="",p=(o,t)=>{const n=o.__vccOpts||o;for(const[a,l]of t)n[a]=l;return n};const B={name:"AppContainer",props:{title:{type:String,required:!0},availableUpdate:{type:[String,Promise],default:null}}},f=o=>(e.pushScopeId("data-v-8894677a"),o=o(),e.popScopeId(),o),C={class:"app-container"},S={class:"app"},U={class:"app__toolbar"},M={class:"app__title"},u={class:"app__cta-group"},v=["title"],A=[f(()=>e.createElementVNode("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 417 417",class:"icon icon--update"},[e.createElementVNode("path",{fill:"#FFF",d:"M120 90h180v235H120z"}),e.createElementVNode("path",{fill:"currentColor",d:"M208.5 417a208.5 208.5 0 1 0 0-417 208.5 208.5 0 0 0 0 417zm-81.3-197.5 68.3-118.3a15 15 0 0 1 26 0l68.2 118.3a15 15 0 0 1-13 22.5h-33.2v66.2a15 15 0 0 1-15 15h-40a15 15 0 0 1-15-15V242h-33.3a15 15 0 0 1-13-22.5z"})],-1))],I=[f(()=>e.createElementVNode("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 18 18",class:"icon icon--close"},[e.createElementVNode("g",{stroke:"currentColor","stroke-width":"1.5"},[e.createElementVNode("line",{x1:"3",y1:"3",x2:"15",y2:"15"}),e.createElementVNode("line",{x2:"3",y1:"3",x1:"15",y2:"15"})])],-1))],x={class:"app__content"};function D(o,t,n,a,l,r){return e.openBlock(),e.createElementBlock("div",C,[e.createElementVNode("div",S,[e.createElementVNode("div",U,[e.createElementVNode("h1",M,e.toDisplayString(n.title),1),e.createElementVNode("div",u,[n.availableUpdate?(e.openBlock(),e.createElementBlock("button",{key:0,class:"btn btn--small app__cta-update-available",title:`Version ${n.availableUpdate} is available`,onClick:t[0]||(t[0]=s=>o.$emit("app:click:update")),onMousedown:t[1]||(t[1]=e.withModifiers(()=>{},["stop"]))},A,40,v)):e.createCommentVNode("",!0),e.createElementVNode("button",{class:"btn btn--small app__cta-close",title:"Close",onClick:t[2]||(t[2]=s=>o.$emit("app:close")),onMousedown:t[3]||(t[3]=e.withModifiers(()=>{},["stop"]))},I,32)])]),e.createElementVNode("div",x,[e.renderSlot(o.$slots,"default",{},void 0,!0)])])])}var P=p(B,[["render",D],["__scopeId","data-v-8894677a"]]);function F(o){rockument.getElementById(o).remove()}function h(o,t){rockument.body.dispatchEvent(new CustomEvent(o,{detail:t}))}const g="https://raw.githubusercontent.com/PhilipArmstead/bitburner-theme-browser",k="master",y="in-game-browser",m="theme-browser-app",T=`${g}/${k}/packages/${y}/dist/main.js`,L=`${g}/${k}/packages/${y}/dist/version.txt`;var Be="";const z={name:"UpdateModal",props:{version:{type:String,default:null}},setup(){const o=e.ref(null),t=e.ref(!1);return{element:o,hasUpdated:t,doUpdate:()=>h(`app:update:${m}`,{element:o.value,path:T}),updateComplete:()=>t.value=!0}}},E=o=>(e.pushScopeId("data-v-ac1fcfa2"),o=o(),e.popScopeId(),o),j={class:"modal__title"},H={class:"modal__ctas"},O=E(()=>e.createElementVNode("h1",{class:"modal__title"}," App successfully updated ",-1)),R=E(()=>e.createElementVNode("p",{class:"modal__message"}," Restart the app in your own time to get the latest version. ",-1)),q={class:"modal__ctas"};function G(o,t,n,a,l,r){return e.openBlock(),e.createElementBlock("div",{ref:"element",onClick:t[4]||(t[4]=e.withModifiers(s=>o.$emit("modal:close"),["stop"])),"onApp:updated":t[5]||(t[5]=(...s)=>a.updateComplete&&a.updateComplete(...s))},[e.createElementVNode("div",{class:"modal",onClick:t[3]||(t[3]=e.withModifiers(()=>{},["stop"]))},[a.hasUpdated?(e.openBlock(),e.createElementBlock(e.Fragment,{key:1},[O,R,e.createElementVNode("div",q,[e.createElementVNode("button",{class:"cta cta--confirm",onClick:t[2]||(t[2]=s=>o.$emit("modal:close"))}," Okay! ")])],64)):(e.openBlock(),e.createElementBlock(e.Fragment,{key:0},[e.createElementVNode("h1",j," Do you want to update to v"+e.toDisplayString(n.version)+"? ",1),e.createElementVNode("div",H,[e.createElementVNode("button",{class:"cta cta--cancel",onClick:t[0]||(t[0]=s=>o.$emit("modal:close"))}," Nope "),e.createElementVNode("button",{class:"cta cta--confirm",onClick:t[1]||(t[1]=(...s)=>a.doUpdate&&a.doUpdate(...s))}," Sure! ")])],64))])],544)}var J=p(z,[["render",G],["__scopeId","data-v-ac1fcfa2"]]);function K(o){return new Date(o).toLocaleDateString()}var Ce="";const Q={name:"ThemeList",props:{themes:{type:Array,default:()=>[]}},setup(){return{formatDate:K}}},W={key:0,class:"theme-list"},X=["src","onClick"],Y={class:"theme__name"},Z={class:"theme__author"},ee={key:1};function te(o,t,n,a,l,r){return n.themes.length?(e.openBlock(),e.createElementBlock("ul",W,[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(n.themes,(s,i)=>(e.openBlock(),e.createElementBlock("li",{key:i,class:"theme"},[e.createElementVNode("img",{src:s.src,alt:"",class:"theme__preview",onClick:_=>o.$emit("theme:preview",s.json)},null,8,X),e.createElementVNode("h1",Y,e.toDisplayString(s.name),1),e.createElementVNode("h2",Z,e.toDisplayString(s.author),1)]))),128))])):(e.openBlock(),e.createElementBlock("p",ee," Sorry, we couldn't fetch any themes at the moment :( "))}var oe=p(Q,[["render",te],["__scopeId","data-v-ffed919c"]]);async function ae(){return fetch("https://bitburner.daft.host/api/themes")}const ne="0.0.30";var Se="";const se={components:{AppContainer:P,ThemeList:oe,UpdateModal:J},setup(){const o=e.ref(!0),t=e.ref(!1),n=e.ref(null),a=e.ref(!1),l=e.ref([]),r=e.ref({}),s=()=>F(m),i=e.computed(()=>o.value?"Loading...":l.value.length?"Browse themes":"Uh oh..."),_=e.computed(()=>Math.max(1,c.value-r.value.items_per_page)),c=e.computed(()=>Math.min(r.value.total_items,r.value.page*r.value.items_per_page)),he=e.computed(()=>r.value.total_items),we=d=>{h("theme:cancel-preview",d),t.value=!1},fe=d=>{h("theme:preview",d),t.value=!0},ge=async()=>{o.value=!0;const{data:d,meta:ke}=await ae().then(w=>w.json()).catch(()=>({data:[],meta:{}}));r.value=ke,l.value=d.map(({name:w,json:ye,images:Ee,author:be})=>{var V;return{name:w,json:ye,src:(V=Ee[1])==null?void 0:V.src,author:be.name}}),o.value=!1};return e.onMounted(async()=>{ge(),n.value=await N(winnerdow[`${m}-version`]||ne,L)}),{availableUpdate:n,isLoading:o,isPreviewing:t,showingFrom:_,showingTo:c,showUpdateModal:a,themes:l,title:i,totalItems:he,cancelPreview:we,destroy:s,showPreview:fe}}},b=o=>(e.pushScopeId("data-v-8bb6b010"),o=o(),e.popScopeId(),o),le={class:"theme-browser"},re={class:"title"},ce={key:0,class:"pagination-details"},ie={key:2,class:"loader"},de=[b(()=>e.createElementVNode("span",{class:"sr-only"},"Cancel",-1))],pe=[b(()=>e.createElementVNode("span",{class:"sr-only"},"Confirm",-1))];function me(o,t,n,a,l,r){const s=e.resolveComponent("theme-list"),i=e.resolveComponent("app-container"),_=e.resolveComponent("update-modal");return e.openBlock(),e.createElementBlock(e.Fragment,null,[e.withDirectives(e.createVNode(i,{title:"Bitburner Theme Browser","available-update":a.availableUpdate,class:"app-container","onApp:close":a.destroy,"onApp:click:update":t[0]||(t[0]=c=>a.showUpdateModal=!0)},{default:e.withCtx(()=>[e.createElementVNode("div",le,[e.createElementVNode("h1",re,e.toDisplayString(a.title),1),a.themes.length?(e.openBlock(),e.createElementBlock("p",ce," Showing "+e.toDisplayString(a.showingFrom)+" to "+e.toDisplayString(a.showingTo)+" of "+e.toDisplayString(a.totalItems),1)):e.createCommentVNode("",!0),a.isLoading?(e.openBlock(),e.createElementBlock("div",ie)):(e.openBlock(),e.createBlock(s,{key:1,themes:a.themes,class:"themes","onTheme:preview":a.showPreview},null,8,["themes","onTheme:preview"]))])]),_:1},8,["available-update","onApp:close"]),[[e.vShow,!a.isPreviewing]]),e.createElementVNode("div",{class:e.normalizeClass(["preview__ctas",{"preview__ctas--visible":a.isPreviewing}])},[e.createElementVNode("button",{class:"preview__cta preview__cta--cancel",onClick:t[1]||(t[1]=(...c)=>a.cancelPreview&&a.cancelPreview(...c))},de),e.createElementVNode("button",{class:"preview__cta preview__cta--confirm",onClick:t[2]||(t[2]=(...c)=>a.destroy&&a.destroy(...c))},pe)],2),a.showUpdateModal?(e.openBlock(),e.createBlock(_,{key:0,version:a.availableUpdate,class:"update-modal","onModal:close":t[3]||(t[3]=c=>a.showUpdateModal=!1),"onApp:updated":t[4]||(t[4]=c=>a.availableUpdate=null)},null,8,["version"])):e.createCommentVNode("",!0)],64)}var _e=p(se,[["render",me],["__scopeId","data-v-8bb6b010"]]);e.createApp(_e).mount(`#${m}`)})(Vue);

}
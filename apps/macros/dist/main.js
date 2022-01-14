export async function main(ns) {


	// Boilerplate
	const doc = globalThis['document']
	const id = 'macros-app'
	globalThis[`${id}-version`] = '0.0.1'

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



	// Add app's CSS and mount point
	doc.getElementById(id)?.remove()
	doc.body.insertAdjacentHTML('beforeend', `<section id="${id}"></section>`)

	doc.getElementById(`${id}-css`)?.remove()
	doc.head.insertAdjacentHTML('beforeend', `<style id="${id}-css">${bundledCss}</style>`)

	const updateApp = async ({ detail: { element, path }}) => {
		await ns.wget(path, ns.getScriptName())
		element.dispatchEvent(new CustomEvent('app:updated'))
	}

	doc.body.addEventListener('app:update:macros-app', updateApp)

	// Unset some stuff on app death
	ns.atExit(() => {
		doc.getElementById(id)?.remove()
		doc.getElementById(`${id}-css`)?.remove()
		doc.body.removeEventListener('app:update:macros-app', updateApp)


	await vueLoad


	const directories = ns.getRunningScript().filename.split('/')
	const currentDirectory = directories.length === 1 ? '' : `/${directories.slice(1, directories.length - 1).join('/')}/`
	const configFilename = `${currentDirectory}config.txt`
	let config = {}

	if (ns.fileExists(configFilename)) {
		try {
			config = JSON.parse(ns.read(configFilename)).macros
		} catch (e) {
			return ns.tprint(e.message)
		}
	} else {
		ns.tprint(`No config file was detected (tried ${configFilename})`)
	}

	globalThis[`${id}-macro-list`] = config


	// Let's go
	mount()

	while (doc.getElementById(id)) {
		await ns.asleep(2000)
	}
} 


















// App CSS
const bundledCss = ".app-container[data-v-8da65b12]{bottom:0;left:0;pointer-events:none;position:fixed;top:0;width:100%;z-index:1510}.app-container *[data-v-8da65b12]{box-sizing:border-box}.app-container .app[data-v-8da65b12]{align-items:flex-start;border:1px solid #4E4E4E6B;display:inline-flex;flex-direction:column;left:50%;height:90vh;overflow:hidden;pointer-events:auto;position:absolute;resize:none;top:50%;transform:translate(-50%,-52%);width:90vw}.app-container .app__toolbar[data-v-8da65b12]{background:#111;color:#fff;display:flex;padding:4px 3px 4px 8px;user-select:none;width:100%}.app-container .app__title[data-v-8da65b12]{align-self:center;flex:0 1 100%;font-family:var(--font-family, monospace);font-size:13px;font-weight:700;line-height:1;margin:0 20px 0 0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.app-container .app__cta-group[data-v-8da65b12]{align-items:center;display:flex;flex:0 1 100%;justify-content:flex-end;margin-left:auto}.app-container .app__cta-group>*[data-v-8da65b12]{background-position:50% 50%;background-size:14px auto;flex:0 1 auto}.app-container .app__cta-group .icon[data-v-8da65b12]{width:16px}.app-container .app__cta-group .icon--restore[data-v-8da65b12]{color:#d6cec8}.app-container .app__cta-group .icon--update[data-v-8da65b12]{color:#6bd700}.app-container .app__cta-group .btn[data-v-8da65b12]{background:none;border:none;color:#a9a9a9;cursor:pointer;display:flex}.app-container .app__icon[data-v-8da65b12]{align-self:center;max-height:16px;margin-right:6px;object-fit:contain;width:16px}.app-container .app__menu[data-v-8da65b12]{width:100%;background:#d4d0c8;color:#333;padding-left:5px;padding-bottom:2px}.app-container .app__menu span[data-v-8da65b12]{border:1px inset transparent;cursor:pointer;font-size:15px;margin-right:12px;padding:0 1px}.app-container .app__menu span[data-v-8da65b12]:hover{border:1px inset #BDBDBD}.app-container .app__content[data-v-8da65b12]{flex:0 1 100%;overflow:auto;scrollbar-color:var(--primary, #272727) var(--primarydark, #B7B7B7);scrollbar-width:thin;width:100%}.app-container .app__content[data-v-8da65b12]::-webkit-scrollbar{display:block;width:10px}.app-container .app__content[data-v-8da65b12]::-webkit-scrollbar-track{background-color:var(--primarydark, #B7B7B7)}.app-container .app__content[data-v-8da65b12]::-webkit-scrollbar-thumb{background-color:var(--primary, #272727)}.app-container .app .btn[data-v-8da65b12]{background:none;box-shadow:none}.modal[data-v-0be2425c]{background:#FFF;border:1px solid #0003;border-radius:6px;display:flex;flex-wrap:wrap;left:50%;padding:24px;position:absolute;top:50%;transform:translate(-50%,-50%);width:40vw}.modal__title[data-v-0be2425c]{color:#212529;font-size:20px;font-weight:500;line-height:1.5;margin:0}.modal__message[data-v-0be2425c]{line-height:1.4}.modal__ctas[data-v-0be2425c],.modal__message[data-v-0be2425c]{flex:1 0 100%;margin:16px 0 0}.modal__ctas[data-v-0be2425c]{display:flex;justify-content:flex-end}.modal .cta[data-v-0be2425c]{border:1px solid transparent;border-radius:4px;cursor:pointer;display:inline-block;font-weight:400;font-size:16px;line-height:1.5;margin-left:12px;padding:6px 12px;text-align:center;transition:.15s ease-in-out;transition-property:color,background-color,border-color,box-shadow;vertical-align:middle}.modal .cta[data-v-0be2425c]:hover{text-decoration:none}.modal .cta--cancel[data-v-0be2425c]{background-color:#6c757d;border-color:#6c757d;color:#fff}.modal .cta--cancel[data-v-0be2425c]:hover{background-color:#5a6268;border-color:#545b62;color:#fff}.modal .cta--cancel[data-v-0be2425c]:active{background-color:#545b62;border-color:#4e555b;color:#fff}.modal .cta--confirm[data-v-0be2425c]{background-color:#28a745;border-color:#28a745;color:#fff}.modal .cta--confirm[data-v-0be2425c]:hover{background-color:#218838;border-color:#1e7e34;color:#fff}.modal .cta--confirm[data-v-0be2425c]:active{background-color:#1e7e34;border-color:#1c7430;color:#fff}.app-wrapper[data-v-7d293b5a],.update-modal[data-v-7d293b5a],button[data-v-7d293b5a]{font-family:Fira Sans,Trebuchet MS,Ubuntu,Helvetica,Arial,sans-serif}.update-modal[data-v-7d293b5a]{background:rgba(51,51,51,.7);height:100%;left:0;position:fixed;top:0;width:100%;z-index:1512}[data-v-697311e5] .app-container .app{height:400px;width:250px}.macro-list[data-v-697311e5]{align-content:flex-start;background:rgba(0,0,0,.85);box-sizing:border-box;color:#0f0;display:flex;flex-wrap:wrap;justify-content:flex-start;min-height:100%;padding:6px}.macro[data-v-697311e5]{margin:0 15px 8px 3px}.macro__group[data-v-697311e5]{display:flex;flex:1 0 100%;flex-wrap:wrap}.macro__title[data-v-697311e5]{color:#fff;flex:1 0 100%;font-family:Fira Sans,Trebuchet MS,Ubuntu,Helvetica,Arial,sans-serif;font-size:16px}.macro__cta[data-v-697311e5]{background:none;border:none;border-radius:2px;box-shadow:0 0 0 1px #aaaaaa54;color:#17af17;cursor:pointer;line-height:1;margin:0;padding:6px 8px;transition:box-shadow .2s linear;width:auto}.macro__cta[data-v-697311e5]:hover{box-shadow:0 0 0 1px #aaa}\n"

// Don't worry about it.
function mount() {
	const winnerdow = globalThis
	const rockument = globalThis['document'];
	var re=Object.defineProperty,ie=Object.defineProperties;var pe=Object.getOwnPropertyDescriptors;var b=Object.getOwnPropertySymbols;var de=Object.prototype.hasOwnProperty,ce=Object.prototype.propertyIsEnumerable;var E=(e,s,r)=>s in e?re(e,s,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[s]=r,f=(e,s)=>{for(var r in s||(s={}))de.call(s,r)&&E(e,r,s[r]);if(b)for(var r of b(s))ce.call(s,r)&&E(e,r,s[r]);return e},$=(e,s)=>ie(e,pe(s));(function(e){"use strict";function s(n,t){rockument.body.dispatchEvent(new CustomEvent(n,{detail:t}))}const r=n=>{var a,o;const t=rockument.getElementById("terminal-input");if(!t)(a=winnerdow.appNotifier)==null||a.toast("The terminal must be visible","warn");else if(t.hasAttribute("disabled"))(o=winnerdow.appNotifier)==null||o.toast("The terminal must not be in use","warn");else{t.value=n;const l=Object.keys(t)[1];return t[l].onChange({target:t}),t[l].onKeyDown({keyCode:13,preventDefault:()=>null}),!0}return!1},B=n=>r(n.join("; ")),V=async(n,t)=>{const a=await fetch(t).then(o=>o.text());return C(a,n)?a:null},C=(n,t)=>{const a=n.split(".").map(Number),o=t.split(".").map(Number);for(let l=0;l<a.length;++l){if(a[l]>o[l])return!0;if(o[l]>a[l])return!1}return!1};var me="",c=(n,t)=>{const a=n.__vccOpts||n;for(const[o,l]of t)a[o]=l;return a};const N={name:"AppContainer",components:{},props:{title:{type:String,required:!0},availableUpdate:{type:[String,Promise],default:null},versionFilePath:{type:String,default:null},id:{type:String,default:null}}},u=n=>(e.pushScopeId("data-v-8da65b12"),n=n(),e.popScopeId(),n),S={class:"app-container"},A={class:"app"},U={class:"app__toolbar"},M={class:"app__title"},x={class:"app__cta-group"},P=["title"],F=[u(()=>e.createElementVNode("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 417 417",class:"icon icon--update"},[e.createElementVNode("path",{fill:"#FFF",d:"M120 90h180v235H120z"}),e.createElementVNode("path",{fill:"currentColor",d:"M208.5 417a208.5 208.5 0 1 0 0-417 208.5 208.5 0 0 0 0 417zm-81.3-197.5 68.3-118.3a15 15 0 0 1 26 0l68.2 118.3a15 15 0 0 1-13 22.5h-33.2v66.2a15 15 0 0 1-15 15h-40a15 15 0 0 1-15-15V242h-33.3a15 15 0 0 1-13-22.5z"})],-1))],I=[u(()=>e.createElementVNode("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 18 18",class:"icon icon--close"},[e.createElementVNode("g",{stroke:"currentColor","stroke-width":"1.5"},[e.createElementVNode("line",{x1:"3",y1:"3",x2:"15",y2:"15"}),e.createElementVNode("line",{x2:"3",y1:"3",x1:"15",y2:"15"})])],-1))],j={class:"app__content"};function v(n,t,a,o,l,d){return e.openBlock(),e.createElementBlock("div",S,[e.createElementVNode("div",A,[e.createElementVNode("div",U,[e.createElementVNode("h1",M,e.toDisplayString(a.title),1),e.createElementVNode("div",x,[a.availableUpdate?(e.openBlock(),e.createElementBlock("button",{key:0,class:"btn btn--small app__cta-update-available",title:`Version ${a.availableUpdate} is available`,onClick:t[0]||(t[0]=i=>n.$emit("app:click:update")),onMousedown:t[1]||(t[1]=e.withModifiers(()=>{},["stop"]))},F,40,P)):e.createCommentVNode("",!0),e.createElementVNode("button",{class:"btn btn--small app__cta-close",title:"Close",onClick:t[2]||(t[2]=i=>n.$emit("app:close")),onMousedown:t[3]||(t[3]=e.withModifiers(()=>{},["stop"]))},I,32)])]),e.createElementVNode("div",j,[e.renderSlot(n.$slots,"default",{},void 0,!0)])])])}var T=c(N,[["render",v],["__scopeId","data-v-8da65b12"]]),ue="";const O={name:"UpdateModal",props:{appFilePath:{type:String,default:null},id:{type:String,default:null},version:{type:String,default:null}},setup({appFilePath:n,id:t}){const a=e.ref(null),o=e.ref(!1);return{element:a,hasUpdated:o,doUpdate:()=>s(`app:update:${t}`,{element:a.value,path:n}),updateComplete:()=>o.value=!0}}},h=n=>(e.pushScopeId("data-v-0be2425c"),n=n(),e.popScopeId(),n),D={class:"modal__title"},z={class:"modal__ctas"},H=h(()=>e.createElementVNode("h1",{class:"modal__title"}," App successfully updated ",-1)),L=h(()=>e.createElementVNode("p",{class:"modal__message"}," Restart the app in your own time to get the latest version. ",-1)),R={class:"modal__ctas"};function W(n,t,a,o,l,d){return e.openBlock(),e.createElementBlock("div",{ref:"element",onClick:t[4]||(t[4]=e.withModifiers(i=>n.$emit("modal:close"),["stop"])),"onApp:updated":t[5]||(t[5]=(...i)=>o.updateComplete&&o.updateComplete(...i))},[e.createElementVNode("div",{class:"modal",onClick:t[3]||(t[3]=e.withModifiers(()=>{},["stop"]))},[o.hasUpdated?(e.openBlock(),e.createElementBlock(e.Fragment,{key:1},[H,L,e.createElementVNode("div",R,[e.createElementVNode("button",{class:"cta cta--confirm",onClick:t[2]||(t[2]=i=>n.$emit("modal:close"))}," Okay! ")])],64)):(e.openBlock(),e.createElementBlock(e.Fragment,{key:0},[e.createElementVNode("h1",D," Do you want to update to v"+e.toDisplayString(a.version)+"? ",1),e.createElementVNode("div",z,[e.createElementVNode("button",{class:"cta cta--cancel",onClick:t[0]||(t[0]=i=>n.$emit("modal:close"))}," Nope "),e.createElementVNode("button",{class:"cta cta--confirm",onClick:t[1]||(t[1]=(...i)=>o.doUpdate&&o.doUpdate(...i))}," Sure! ")])],64))])],544)}var q=c(O,[["render",W],["__scopeId","data-v-0be2425c"]]),he="";const K={name:"AppWrapper",components:{AppContainer:T,UpdateModal:q},props:{title:{type:String,default:null},id:{type:String,default:null},appFilePath:{type:String,default:null},versionFilePath:{type:String,default:null}},setup({appFilePath:n,id:t,versionFilePath:a}){const o=e.ref(!1),l=e.ref(null);return e.onMounted(async()=>{n&&a&&(l.value=await V(winnerdow[`${t}-version`]||"0.0.0",a))}),{availableUpdate:l,showUpdateModal:o,destroy:()=>rockument.getElementById(t).remove()}}},Q={class:"app-wrapper"};function G(n,t,a,o,l,d){const i=e.resolveComponent("app-container"),_=e.resolveComponent("update-modal");return e.openBlock(),e.createElementBlock("div",Q,[e.createVNode(i,e.mergeProps({title:a.title,availableUpdate:o.availableUpdate},{class:"app-container","onApp:click:update":t[0]||(t[0]=p=>o.showUpdateModal=!0),"onApp:close":o.destroy}),{default:e.withCtx(()=>[e.renderSlot(n.$slots,"default",{},void 0,!0)]),_:3},16,["onApp:close"]),o.showUpdateModal?(e.openBlock(),e.createBlock(_,e.mergeProps({key:0},{appFilePath:a.appFilePath,id:a.id},{version:o.availableUpdate,class:"update-modal","onModal:close":t[1]||(t[1]=p=>o.showUpdateModal=!1),"onApp:updated":t[2]||(t[2]=p=>o.availableUpdate=null)}),null,16,["version"])):e.createCommentVNode("",!0)])}var J=c(K,[["render",G],["__scopeId","data-v-7d293b5a"]]);const y="https://raw.githubusercontent.com/PhilipArmstead/bitburner-apps",g="master",k="macros",m="macros-app",X=`${y}/${g}/apps/${k}/dist/main.js`,Y=`${y}/${g}/apps/${k}/dist/version.txt`;var Z=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",id:m,appFilePath:X,versionFilePath:Y}),ye="";const ee={components:{AppWrapper:J},setup(){const n=e.ref({});winnerdow[`${m}-macro-list`]={"Root everything":["home","run /util/server/root-everything.js"],"Show servers":["home","run /gui/server-list.js"],"Show processes":["home","run /gui/process-list.js"],Buy:{"Buy hacks":["buy BruteSSH.exe","buy FTPCrack.exe","buy relaySMTP.exe","buy HTTPWorm.exe","buy SQLInject.exe"],"Buy servers":["home","run server-purchase.js --once"]}};const t=()=>{const a=winnerdow[`${m}-macro-list`]||{};n.value=f({uncategorised:Object.fromEntries(Object.entries(a).filter(([,o])=>Array.isArray(o)).map(([o,l])=>[o,l]))},Object.fromEntries(Object.entries(a).filter(([,o])=>!Array.isArray(o)).map(([o,l])=>[o,l])))};return e.onMounted(()=>t()),{config:Z,items:n,inputTerminalCommands:B}}},te={class:"macro-list"},oe={key:0,class:"macro__title"},ne=["onClick"];function ae(n,t,a,o,l,d){const i=e.resolveComponent("app-wrapper");return e.openBlock(),e.createBlock(i,e.normalizeProps(e.guardReactiveProps($(f({},o.config),{title:"Macros"}))),{default:e.withCtx(()=>[e.createElementVNode("div",te,[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(o.items,(_,p)=>(e.openBlock(),e.createElementBlock("div",{key:p,class:"macro__group"},[p!=="uncategorised"?(e.openBlock(),e.createElementBlock("h1",oe,e.toDisplayString(p),1)):e.createCommentVNode("",!0),(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(_,(se,w)=>(e.openBlock(),e.createElementBlock("div",{key:w,class:"macro"},[e.createElementVNode("button",{class:"macro__cta",onClick:ge=>o.inputTerminalCommands(se)},e.toDisplayString(w),9,ne)]))),128))]))),128))])]),_:1},16)}var le=c(ee,[["render",ae],["__scopeId","data-v-697311e5"]]);e.createApp(le).mount(`#${m}`)})(Vue);

}
export async function main(ns) {


	// Boilerplate
	const doc = globalThis['document']
	const id = 'macros-app'
	globalThis[`${id}-version`] = '0.0.4'

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

	doc.body.addEventListener('app:update:macros-app', updateApp)

	// Unset some stuff on app death
	ns.atExit(() => {
		doc.getElementById(id)?.remove()
		doc.getElementById(`${id}-css`)?.remove()
		doc.body.removeEventListener('app:update:macros-app', updateApp)


	})

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
const bundledCss = ".app-container[data-v-5d2455be]{bottom:0;left:0;pointer-events:none;position:fixed;top:0;width:100%;z-index:1510}.app-container.app--can-resize .app[data-v-5d2455be]{resize:both}.app-container.app--is-minimised .app[data-v-5d2455be]{height:auto!important;min-height:0;min-width:0;resize:none}.app-container.app--is-minimised .app .app__content[data-v-5d2455be]{display:none}.app-container *[data-v-5d2455be]{box-sizing:border-box}.app-container .app[data-v-5d2455be]{align-items:flex-start;border:1px solid #4E4E4E6B;display:inline-flex;flex-direction:column;left:0;height:500px;overflow:hidden;pointer-events:auto;position:absolute;resize:none;top:0;transform:translate(-50%,-52%);width:300px}.app-container .app__toolbar[data-v-5d2455be]{background:#111;color:#fff;display:flex;padding:4px 3px 4px 8px;user-select:none;width:100%}.app-container .app__title[data-v-5d2455be]{align-self:center;flex:0 1 100%;font-family:var(--font-family, monospace);font-size:13px;font-weight:700;line-height:1;margin:0 20px 0 0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.app-container .app__cta-group[data-v-5d2455be]{align-items:center;display:flex;flex:0 1 100%;justify-content:flex-end;margin-left:auto}.app-container .app__cta-group>*[data-v-5d2455be]{background-position:50% 50%;background-size:14px auto;flex:0 1 auto}.app-container .app__cta-group .icon[data-v-5d2455be]{width:16px}.app-container .app__cta-group .icon--restore[data-v-5d2455be]{color:#d6cec8}.app-container .app__cta-group .icon--update[data-v-5d2455be]{color:#6bd700}.app-container .app__cta-group .btn[data-v-5d2455be]{background:none;border:none;color:#a9a9a9;cursor:pointer;display:flex}.app-container .app__icon[data-v-5d2455be]{align-self:center;max-height:16px;margin-right:6px;object-fit:contain;width:16px}.app-container .app__menu[data-v-5d2455be]{width:100%;background:#d4d0c8;color:#333;padding-left:5px;padding-bottom:2px}.app-container .app__menu span[data-v-5d2455be]{border:1px inset transparent;cursor:pointer;font-size:15px;margin-right:12px;padding:0 1px}.app-container .app__menu span[data-v-5d2455be]:hover{border:1px inset #BDBDBD}.app-container .app__content[data-v-5d2455be]{flex:0 1 100%;overflow:auto;scrollbar-color:var(--primary, #272727) var(--primarydark, #B7B7B7);scrollbar-width:thin;width:100%}.app-container .app__content[data-v-5d2455be]::-webkit-scrollbar{display:block;width:10px}.app-container .app__content[data-v-5d2455be]::-webkit-scrollbar-track{background-color:var(--primarydark, #B7B7B7)}.app-container .app__content[data-v-5d2455be]::-webkit-scrollbar-thumb{background-color:var(--primary, #272727)}.app-container .app .btn[data-v-5d2455be]{background:none;box-shadow:none}.modal[data-v-0be2425c]{background:#FFF;border:1px solid #0003;border-radius:6px;display:flex;flex-wrap:wrap;left:50%;padding:24px;position:absolute;top:50%;transform:translate(-50%,-50%);width:40vw}.modal__title[data-v-0be2425c]{color:#212529;font-size:20px;font-weight:500;line-height:1.5;margin:0}.modal__message[data-v-0be2425c]{line-height:1.4}.modal__ctas[data-v-0be2425c],.modal__message[data-v-0be2425c]{flex:1 0 100%;margin:16px 0 0}.modal__ctas[data-v-0be2425c]{display:flex;justify-content:flex-end}.modal .cta[data-v-0be2425c]{border:1px solid transparent;border-radius:4px;cursor:pointer;display:inline-block;font-weight:400;font-size:16px;line-height:1.5;margin-left:12px;padding:6px 12px;text-align:center;transition:.15s ease-in-out;transition-property:color,background-color,border-color,box-shadow;vertical-align:middle}.modal .cta[data-v-0be2425c]:hover{text-decoration:none}.modal .cta--cancel[data-v-0be2425c]{background-color:#6c757d;border-color:#6c757d;color:#fff}.modal .cta--cancel[data-v-0be2425c]:hover{background-color:#5a6268;border-color:#545b62;color:#fff}.modal .cta--cancel[data-v-0be2425c]:active{background-color:#545b62;border-color:#4e555b;color:#fff}.modal .cta--confirm[data-v-0be2425c]{background-color:#28a745;border-color:#28a745;color:#fff}.modal .cta--confirm[data-v-0be2425c]:hover{background-color:#218838;border-color:#1e7e34;color:#fff}.modal .cta--confirm[data-v-0be2425c]:active{background-color:#1e7e34;border-color:#1c7430;color:#fff}.app-wrapper[data-v-ac30e006],.update-modal[data-v-ac30e006],button[data-v-ac30e006]{font-family:Fira Sans,Trebuchet MS,Ubuntu,Helvetica,Arial,sans-serif}.update-modal[data-v-ac30e006]{background:rgba(51,51,51,.7);height:100%;left:0;position:fixed;top:0;width:100%;z-index:1512}[data-v-05a99256] .app-container .app{height:400px;width:250px}.macro-list[data-v-05a99256]{align-content:flex-start;background:var(--backgroundprimary, #171A22);box-sizing:border-box;display:flex;flex-wrap:wrap;justify-content:flex-start;min-height:100%;padding:6px}.macro[data-v-05a99256]{margin:0 15px 8px 3px}.macro__group[data-v-05a99256]{display:flex;flex:1 0 100%;flex-wrap:wrap}.macro__title[data-v-05a99256]{color:var(--secondary, #FFF);flex:1 0 100%;font-family:Fira Sans,Trebuchet MS,Ubuntu,Helvetica,Arial,sans-serif;font-size:16px}.macro__cta[data-v-05a99256]{background:none;border:none;border-radius:2px;box-shadow:0 0 0 1px var(--primary-dark, #444);color:var(--primary, #17af17);cursor:pointer;font-family:var(--fontfamily, monospace);line-height:1;margin:0;padding:6px 8px;transition:box-shadow .2s linear;width:auto}.macro__cta[data-v-05a99256]:hover{box-shadow:0 0 0 1px var(--primary-light, #BBB)}\n"

// Don't worry about it.
function mount() {
	const winnerdow = globalThis
	const rockument = globalThis['document'];
	var ve=Object.defineProperty,Be=Object.defineProperties;var Me=Object.getOwnPropertyDescriptors;var F=Object.getOwnPropertySymbols;var Ce=Object.prototype.hasOwnProperty,Ve=Object.prototype.propertyIsEnumerable;var I=(e,l,r)=>l in e?ve(e,l,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[l]=r,M=(e,l)=>{for(var r in l||(l={}))Ce.call(l,r)&&I(e,r,l[r]);if(F)for(var r of F(l))Ve.call(l,r)&&I(e,r,l[r]);return e},O=(e,l)=>Be(e,Me(l));(function(e){"use strict";function l(n,t){rockument.body.dispatchEvent(new CustomEvent(n,{detail:t}))}const r=n=>{var a,o;const t=rockument.getElementById("terminal-input");if(!t)(a=winnerdow.appNotifier)==null||a.toast("The terminal must be visible","warning");else if(t.hasAttribute("disabled"))(o=winnerdow.appNotifier)==null||o.toast("The terminal must not be in use","warning");else{t.value=n;const i=Object.keys(t)[1];return t[i].onChange({target:t}),t[i].onKeyDown({keyCode:13,preventDefault:()=>null}),!0}return!1},P=n=>r(n.join("; ")),z=async(n,t)=>{const a=await fetch(t).then(o=>o.text());return D(a,n)?a:null},D=(n,t)=>{const a=n.split(".").map(Number),o=t.split(".").map(Number);for(let i=0;i<a.length;++i){if(a[i]>o[i])return!0;if(o[i]>a[i])return!1}return!1};var Ne="",k=(n,t)=>{const a=n.__vccOpts||n;for(const[o,i]of t)a[o]=i;return a};const j={name:"AppContainer",props:{title:{type:String,required:!0},availableUpdate:{type:[String,Promise],default:null},versionFilePath:{type:String,default:null},id:{type:String,default:null},options:{type:Object,default:()=>({})}},setup({options:n}){const t=e.ref(null),a=e.ref(!1),o=e.ref(),i=e.ref(),_=e.ref(),s=e.ref(),p=e.ref(),c=e.ref(),w=e.ref();let f={},u={};const b=e.ref(!1),E=Object.assign({canDrag:!0,canMinimise:!0,canResize:!0},n),x=()=>{const d=t.value.offsetWidth,h=t.value.offsetHeight;s.value=winnerdow.innerWidth,p.value=winnerdow.innerHeight,c.value=s.value/2-d/2,w.value=p.value/2-h/2};e.onMounted(()=>{E.canResize?new ResizeObserver(([{borderBoxSize:[{inlineSize:d,blockSize:h}]}])=>{a.value&&!b.value&&(o.value=d,i.value=h),a.value=!0}).observe(t.value):a.value=!0,E.canDrag&&x()});const ye=({x:d,y:h,button:g})=>{if(!E.canDrag)return;const m=rockument.body;g||(f={x:d,y:h},o.value=t.value.offsetWidth,i.value=t.value.offsetHeight,u={x:c.value,y:w.value},s.value=winnerdow.innerWidth,p.value=winnerdow.innerHeight,m.addEventListener("mousemove",$),m.addEventListener("mouseup",y),m.addEventListener("mouseleave",y))},y=()=>{const d=rockument.body;d.removeEventListener("mousemove",$),d.removeEventListener("mouseup",y),d.removeEventListener("mouseleave",y)};e.onUnmounted(y);const $=({x:d,y:h})=>{let g=u.x+(d-f.x),m=u.y+(h-f.y);const A=g<0,ke=g+o.value>s.value;(A||ke)&&(A?g=0:g=s.value-o.value,u.x=g,f.x=Math.max(Math.min(d,s.value-5),5));const U=m<0,Ee=m+i.value>p.value;(U||Ee)&&(U?m=0:m=p.value-i.value,u.y=m,f.y=Math.max(Math.min(h,p.value),5)),c.value=g,w.value=m};return{isMinimised:b,left:c,process:t,processHeight:i,processWidth:o,top:w,windowOptions:E,beginGrabbing:ye,setPosition:x,toggleMinimise:()=>{b.value||(_.value=i.value),b.value=!b.value,b.value||(i.value=_.value)}}}},v=n=>(e.pushScopeId("data-v-5d2455be"),n=n(),e.popScopeId(),n),W={class:"app__title"},H={class:"app__cta-group"},L=["title"],R=[v(()=>e.createElementVNode("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 417 417",class:"icon icon--update"},[e.createElementVNode("path",{fill:"#FFF",d:"M120 90h180v235H120z"}),e.createElementVNode("path",{fill:"currentColor",d:"M208.5 417a208.5 208.5 0 1 0 0-417 208.5 208.5 0 0 0 0 417zm-81.3-197.5 68.3-118.3a15 15 0 0 1 26 0l68.2 118.3a15 15 0 0 1-13 22.5h-33.2v66.2a15 15 0 0 1-15 15h-40a15 15 0 0 1-15-15V242h-33.3a15 15 0 0 1-13-22.5z"})],-1))],T={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 18 18",class:"icon icon--minimise"},G=[v(()=>e.createElementVNode("path",{d:"m3 13h12v2h-12z",fill:"currentColor"},null,-1))],q={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 18 18",class:"icon icon--restore"},K=[e.createStaticVNode('<rect x="5" y="1.5" width="11" height="3" stroke="none" fill="#000" data-v-5d2455be></rect><g fill="currentColor" data-v-5d2455be><rect x="5.8" y="4.3" width="9.4" height="6.5" stroke="#000" stroke-width="1.6" data-v-5d2455be></rect><rect x="1.8" y="9" width="9.4" height="6.5" stroke="#000" stroke-width="1.6" data-v-5d2455be></rect></g><rect x="1" y="6.2" width="11" height="3" stroke="none" fill="#000" data-v-5d2455be></rect>',3)],J=[v(()=>e.createElementVNode("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 18 18",class:"icon icon--close"},[e.createElementVNode("g",{stroke:"currentColor","stroke-width":"1.5"},[e.createElementVNode("line",{x1:"3",y1:"3",x2:"15",y2:"15"}),e.createElementVNode("line",{x2:"3",y1:"3",x1:"15",y2:"15"})])],-1))],Q={class:"app__content"};function X(n,t,a,o,i,_){return e.openBlock(),e.createElementBlock("div",{class:e.normalizeClass(["app-container",{"app--is-minimised":o.isMinimised,"app--can-resize":o.windowOptions.canResize}])},[e.createElementVNode("div",{ref:"process",class:"app",style:e.normalizeStyle({transform:`translate(${o.left}px, ${o.top}px)`,width:`${o.processWidth}px`,height:`${o.processHeight}px`})},[e.createElementVNode("div",{class:"app__toolbar",onMousedown:t[6]||(t[6]=(...s)=>o.beginGrabbing&&o.beginGrabbing(...s))},[e.createElementVNode("h1",W,e.toDisplayString(a.title),1),e.createElementVNode("div",H,[a.availableUpdate?(e.openBlock(),e.createElementBlock("button",{key:0,class:"btn btn--small app__cta-update-available",title:`Version ${a.availableUpdate} is available`,onClick:t[0]||(t[0]=s=>n.$emit("app:click:update")),onMousedown:t[1]||(t[1]=e.withModifiers(()=>{},["stop"]))},R,40,L)):e.createCommentVNode("",!0),n.canMinimise?(e.openBlock(),e.createElementBlock("button",{key:1,class:"btn btn--small app__cta-minimise",onClick:t[2]||(t[2]=(...s)=>o.toggleMinimise&&o.toggleMinimise(...s)),onMousedown:t[3]||(t[3]=e.withModifiers(()=>{},["stop"]))},[e.withDirectives((e.openBlock(),e.createElementBlock("svg",T,G,512)),[[e.vShow,!o.isMinimised]]),e.withDirectives((e.openBlock(),e.createElementBlock("svg",q,K,512)),[[e.vShow,o.isMinimised]])],32)):e.createCommentVNode("",!0),e.createElementVNode("button",{class:"btn btn--small app__cta-close",title:"Close",onClick:t[4]||(t[4]=s=>n.$emit("app:close")),onMousedown:t[5]||(t[5]=e.withModifiers(()=>{},["stop"]))},J,32)])],32),e.createElementVNode("div",Q,[e.renderSlot(n.$slots,"default",{},void 0,!0)])],4)],2)}var Y=k(j,[["render",X],["__scopeId","data-v-5d2455be"]]),Ue="";const Z={name:"UpdateModal",props:{appFilePath:{type:String,default:null},id:{type:String,default:null},version:{type:String,default:null}},setup({appFilePath:n,id:t}){const a=e.ref(null),o=e.ref(!1);return{element:a,hasUpdated:o,doUpdate:()=>l(`app:update:${t}`,{element:a.value,path:n}),updateComplete:()=>o.value=!0}}},C=n=>(e.pushScopeId("data-v-0be2425c"),n=n(),e.popScopeId(),n),ee={class:"modal__title"},te={class:"modal__ctas"},oe=C(()=>e.createElementVNode("h1",{class:"modal__title"}," App successfully updated ",-1)),ne=C(()=>e.createElementVNode("p",{class:"modal__message"}," Restart the app in your own time to get the latest version. ",-1)),ae={class:"modal__ctas"};function ie(n,t,a,o,i,_){return e.openBlock(),e.createElementBlock("div",{ref:"element",onClick:t[4]||(t[4]=e.withModifiers(s=>n.$emit("modal:close"),["stop"])),"onApp:updated":t[5]||(t[5]=(...s)=>o.updateComplete&&o.updateComplete(...s))},[e.createElementVNode("div",{class:"modal",onClick:t[3]||(t[3]=e.withModifiers(()=>{},["stop"]))},[o.hasUpdated?(e.openBlock(),e.createElementBlock(e.Fragment,{key:1},[oe,ne,e.createElementVNode("div",ae,[e.createElementVNode("button",{class:"cta cta--confirm",onClick:t[2]||(t[2]=s=>n.$emit("modal:close"))}," Okay! ")])],64)):(e.openBlock(),e.createElementBlock(e.Fragment,{key:0},[e.createElementVNode("h1",ee," Do you want to update to v"+e.toDisplayString(a.version)+"? ",1),e.createElementVNode("div",te,[e.createElementVNode("button",{class:"cta cta--cancel",onClick:t[0]||(t[0]=s=>n.$emit("modal:close"))}," Nope "),e.createElementVNode("button",{class:"cta cta--confirm",onClick:t[1]||(t[1]=(...s)=>o.doUpdate&&o.doUpdate(...s))}," Sure! ")])],64))])],544)}var se=k(Z,[["render",ie],["__scopeId","data-v-0be2425c"]]),Fe="";const le={name:"AppWrapper",components:{AppContainer:Y,UpdateModal:se},props:{title:{type:String,default:null},id:{type:String,default:null},appFilePath:{type:String,default:null},versionFilePath:{type:String,default:null},windowOptions:{type:Object,default:()=>({})}},setup({appFilePath:n,id:t,versionFilePath:a}){const o=e.ref(!1),i=e.ref(null);return e.onMounted(async()=>{n&&a&&(i.value=await z(winnerdow[`${t}-version`]||"0.0.0",a))}),{availableUpdate:i,showUpdateModal:o,destroy:()=>rockument.getElementById(t).remove()}}},re={class:"app-wrapper"};function de(n,t,a,o,i,_){const s=e.resolveComponent("app-container"),p=e.resolveComponent("update-modal");return e.openBlock(),e.createElementBlock("div",re,[e.createVNode(s,e.mergeProps({title:a.title,availableUpdate:o.availableUpdate,options:a.windowOptions},{class:"app-container","onApp:click:update":t[0]||(t[0]=c=>o.showUpdateModal=!0),"onApp:close":o.destroy}),{default:e.withCtx(()=>[e.renderSlot(n.$slots,"default",{},void 0,!0)]),_:3},16,["onApp:close"]),o.showUpdateModal?(e.openBlock(),e.createBlock(p,e.mergeProps({key:0},{appFilePath:a.appFilePath,id:a.id},{version:o.availableUpdate,class:"update-modal","onModal:close":t[1]||(t[1]=c=>o.showUpdateModal=!1),"onApp:updated":t[2]||(t[2]=c=>o.availableUpdate=null)}),null,16,["version"])):e.createCommentVNode("",!0)])}var ce=k(le,[["render",de],["__scopeId","data-v-ac30e006"]]);const V="https://raw.githubusercontent.com/PhilipArmstead/bitburner-apps",N="master",S="macros",B="macros-app",pe=`${V}/${N}/apps/${S}/dist/main.js`,me=`${V}/${N}/apps/${S}/dist/version.txt`;var _e=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",id:B,appFilePath:pe,versionFilePath:me}),Ie="";const fe={components:{AppWrapper:ce},setup(){const n=e.ref({}),t=()=>{const a=winnerdow[`${B}-macro-list`]||{};n.value=M({uncategorised:Object.fromEntries(Object.entries(a).filter(([,o])=>Array.isArray(o)).map(([o,i])=>[o,i]))},Object.fromEntries(Object.entries(a).filter(([,o])=>!Array.isArray(o)).map(([o,i])=>[o,i])))};return e.onMounted(()=>t()),{config:_e,items:n,inputTerminalCommands:P}}},he={class:"macro-list"},ge={key:0,class:"macro__title"},we=["onClick"];function ue(n,t,a,o,i,_){const s=e.resolveComponent("app-wrapper");return e.openBlock(),e.createBlock(s,e.normalizeProps(e.guardReactiveProps(O(M({},o.config),{title:"Macros"}))),{default:e.withCtx(()=>[e.createElementVNode("div",he,[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(o.items,(p,c)=>(e.openBlock(),e.createElementBlock("div",{key:c,class:"macro__group"},[c!=="uncategorised"?(e.openBlock(),e.createElementBlock("h1",ge,e.toDisplayString(c),1)):e.createCommentVNode("",!0),(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(p,(w,f)=>(e.openBlock(),e.createElementBlock("div",{key:f,class:"macro"},[e.createElementVNode("button",{class:"macro__cta",onClick:u=>o.inputTerminalCommands(w)},e.toDisplayString(f),9,we)]))),128))]))),128))])]),_:1},16)}var be=k(fe,[["render",ue],["__scopeId","data-v-05a99256"]]);e.createApp(be).mount(`#${B}`)})(Vue);

}
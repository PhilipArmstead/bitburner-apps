export async function main(ns) {


	// Boilerplate
	const doc = globalThis['document']
	const id = 'macros-app'
	globalThis[`${id}-version`] = '0.0.6'

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
const bundledCss = ".app-container[data-v-54e5fede]{bottom:0;left:0;pointer-events:none;position:fixed;top:0;width:100%;z-index:1510}.app-container.app--can-resize .app[data-v-54e5fede]{resize:both}.app-container.app--is-minimised .app[data-v-54e5fede]{height:auto!important;min-height:0;min-width:0;resize:none}.app-container.app--is-minimised .app .app__content[data-v-54e5fede]{display:none}.app-container *[data-v-54e5fede]{box-sizing:border-box}.app-container .app[data-v-54e5fede]{align-items:flex-start;border:1px solid #4E4E4E6B;display:inline-flex;flex-direction:column;left:0;height:500px;overflow:hidden;pointer-events:auto;position:absolute;resize:none;top:0;transform:translate(-50%,-52%);width:300px}.app-container .app__toolbar[data-v-54e5fede]{background:#111;color:#fff;display:flex;padding:4px 3px 4px 8px;user-select:none;width:100%}.app-container .app__title[data-v-54e5fede]{align-self:center;flex:0 1 100%;font-family:var(--font-family, monospace);font-size:13px;font-weight:700;line-height:1;margin:0 20px 0 0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.app-container .app__cta-group[data-v-54e5fede]{align-items:center;display:flex;flex:0 1 100%;justify-content:flex-end;margin-left:auto}.app-container .app__cta-group>*[data-v-54e5fede]{background-position:50% 50%;background-size:14px auto;flex:0 1 auto}.app-container .app__cta-group .icon[data-v-54e5fede]{width:16px}.app-container .app__cta-group .icon--restore[data-v-54e5fede]{color:#d6cec8}.app-container .app__cta-group .icon--update[data-v-54e5fede]{color:#6bd700}.app-container .app__cta-group .btn[data-v-54e5fede]{background:none;border:none;color:#a9a9a9;cursor:pointer;display:flex}.app-container .app__icon[data-v-54e5fede]{align-self:center;max-height:16px;margin-right:6px;object-fit:contain;width:16px}.app-container .app__menu[data-v-54e5fede]{width:100%;background:#d4d0c8;color:#333;padding-left:5px;padding-bottom:2px}.app-container .app__menu span[data-v-54e5fede]{border:1px inset transparent;cursor:pointer;font-size:15px;margin-right:12px;padding:0 1px}.app-container .app__menu span[data-v-54e5fede]:hover{border:1px inset #BDBDBD}.app-container .app__content[data-v-54e5fede]{flex:0 1 100%;overflow:auto;scrollbar-color:var(--primary, #272727) var(--primarydark, #B7B7B7);scrollbar-width:thin;width:100%}.app-container .app__content[data-v-54e5fede]::-webkit-scrollbar{display:block;width:10px}.app-container .app__content[data-v-54e5fede]::-webkit-scrollbar-track{background-color:var(--primarydark, #B7B7B7)}.app-container .app__content[data-v-54e5fede]::-webkit-scrollbar-thumb{background-color:var(--primary, #272727)}.app-container .app .btn[data-v-54e5fede]{background:none;box-shadow:none}.modal[data-v-0be2425c]{background:#FFF;border:1px solid #0003;border-radius:6px;display:flex;flex-wrap:wrap;left:50%;padding:24px;position:absolute;top:50%;transform:translate(-50%,-50%);width:40vw}.modal__title[data-v-0be2425c]{color:#212529;font-size:20px;font-weight:500;line-height:1.5;margin:0}.modal__message[data-v-0be2425c]{line-height:1.4}.modal__ctas[data-v-0be2425c],.modal__message[data-v-0be2425c]{flex:1 0 100%;margin:16px 0 0}.modal__ctas[data-v-0be2425c]{display:flex;justify-content:flex-end}.modal .cta[data-v-0be2425c]{border:1px solid transparent;border-radius:4px;cursor:pointer;display:inline-block;font-weight:400;font-size:16px;line-height:1.5;margin-left:12px;padding:6px 12px;text-align:center;transition:.15s ease-in-out;transition-property:color,background-color,border-color,box-shadow;vertical-align:middle}.modal .cta[data-v-0be2425c]:hover{text-decoration:none}.modal .cta--cancel[data-v-0be2425c]{background-color:#6c757d;border-color:#6c757d;color:#fff}.modal .cta--cancel[data-v-0be2425c]:hover{background-color:#5a6268;border-color:#545b62;color:#fff}.modal .cta--cancel[data-v-0be2425c]:active{background-color:#545b62;border-color:#4e555b;color:#fff}.modal .cta--confirm[data-v-0be2425c]{background-color:#28a745;border-color:#28a745;color:#fff}.modal .cta--confirm[data-v-0be2425c]:hover{background-color:#218838;border-color:#1e7e34;color:#fff}.modal .cta--confirm[data-v-0be2425c]:active{background-color:#1e7e34;border-color:#1c7430;color:#fff}.app-wrapper[data-v-ac30e006],.update-modal[data-v-ac30e006],button[data-v-ac30e006]{font-family:Fira Sans,Trebuchet MS,Ubuntu,Helvetica,Arial,sans-serif}.update-modal[data-v-ac30e006]{background:rgba(51,51,51,.7);height:100%;left:0;position:fixed;top:0;width:100%;z-index:1512}[data-v-136ca352] .app-container .app{height:400px;width:250px}.macro-list[data-v-136ca352]{align-content:flex-start;background:var(--backgroundprimary, #171A22);box-sizing:border-box;display:flex;flex-wrap:wrap;justify-content:flex-start;min-height:100%;padding:6px}.macro[data-v-136ca352]{margin:0 15px 8px 3px}.macro__group[data-v-136ca352]{display:flex;flex:1 0 100%;flex-wrap:wrap}.macro__title[data-v-136ca352]{color:var(--secondary, #FFF);flex:1 0 100%;font-family:Fira Sans,Trebuchet MS,Ubuntu,Helvetica,Arial,sans-serif;font-size:16px}.macro__cta[data-v-136ca352]{background:none;border:none;border-radius:2px;box-shadow:0 0 0 1px var(--primary-dark, #444);color:var(--primary, #17af17);cursor:pointer;font-family:var(--fontfamily, monospace);line-height:1;margin:0;padding:6px 8px;transition:box-shadow .2s linear;width:auto}.macro__cta[data-v-136ca352]:hover{box-shadow:0 0 0 1px var(--primary-light, #BBB)}\n"

// Don't worry about it.
function mount() {
	const winnerdow = globalThis
	const rockument = globalThis['document'];
	var Be=Object.defineProperty,Ce=Object.defineProperties;var Me=Object.getOwnPropertyDescriptors;var I=Object.getOwnPropertySymbols;var Se=Object.prototype.hasOwnProperty,Ve=Object.prototype.propertyIsEnumerable;var O=(e,l,r)=>l in e?Be(e,l,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[l]=r,k=(e,l)=>{for(var r in l||(l={}))Se.call(l,r)&&O(e,r,l[r]);if(I)for(var r of I(l))Ve.call(l,r)&&O(e,r,l[r]);return e},P=(e,l)=>Ce(e,Me(l));(function(e){"use strict";function l(n,t){rockument.body.dispatchEvent(new CustomEvent(n,{detail:t}))}const r=n=>{var a,o;const t=rockument.getElementById("terminal-input");if(!t)(a=winnerdow.appNotifier)==null||a.toast("The terminal must be visible","warning");else if(t.hasAttribute("disabled"))(o=winnerdow.appNotifier)==null||o.toast("The terminal must not be in use","warning");else{t.value=n;const i=Object.keys(t)[1];return t[i].onChange({target:t}),t[i].onKeyDown({keyCode:13,preventDefault:()=>null}),!0}return!1},z=n=>r(n.join("; ")),j=async(n,t)=>{const a=await fetch(t).then(o=>o.text());return D(a,n)?a:null},D=(n,t)=>{const a=n.split(".").map(Number),o=t.split(".").map(Number);for(let i=0;i<a.length;++i){if(a[i]>o[i])return!0;if(o[i]>a[i])return!1}return!1};var Ne="",v=(n,t)=>{const a=n.__vccOpts||n;for(const[o,i]of t)a[o]=i;return a};const R={name:"AppContainer",props:{title:{type:String,required:!0},availableUpdate:{type:[String,Promise],default:null},versionFilePath:{type:String,default:null},id:{type:String,default:null},options:{type:Object,default:()=>({})}},setup({options:n}){const t=e.ref(null),a=e.ref(!1),o=e.ref(),i=e.ref(),d=e.ref(),s=e.ref(),m=e.ref(),p=e.ref(),w=e.ref();let f={},u={};const y=e.ref(!1),E=Object.assign({canDrag:!0,canMinimise:!0,canResize:!0},n),x=()=>{const c=t.value.offsetWidth,h=t.value.offsetHeight;s.value=winnerdow.innerWidth,m.value=winnerdow.innerHeight,p.value=s.value/2-c/2,w.value=m.value/2-h/2};e.onMounted(()=>{E.canResize?new ResizeObserver(([{borderBoxSize:[{inlineSize:c,blockSize:h}]}])=>{a.value&&!y.value&&(o.value=c,i.value=h),a.value=!0}).observe(t.value):a.value=!0,E.canDrag&&x()});const ke=({x:c,y:h,button:g})=>{if(!E.canDrag)return;const _=rockument.body;g||(f={x:c,y:h},o.value=t.value.offsetWidth,i.value=t.value.offsetHeight,u={x:p.value,y:w.value},s.value=winnerdow.innerWidth,m.value=winnerdow.innerHeight,_.addEventListener("mousemove",A),_.addEventListener("mouseup",b),_.addEventListener("mouseleave",b))},b=()=>{const c=rockument.body;c.removeEventListener("mousemove",A),c.removeEventListener("mouseup",b),c.removeEventListener("mouseleave",b)};e.onUnmounted(b);const A=({x:c,y:h})=>{let g=u.x+(c-f.x),_=u.y+(h-f.y);const U=g<0,ve=g+o.value>s.value;(U||ve)&&(U?g=0:g=s.value-o.value,u.x=g,f.x=Math.max(Math.min(c,s.value-5),5));const F=_<0,Ee=_+i.value>m.value;(F||Ee)&&(F?_=0:_=m.value-i.value,u.y=_,f.y=Math.max(Math.min(h,m.value),5)),p.value=g,w.value=_};return{isMinimised:y,left:p,process:t,processHeight:i,processWidth:o,top:w,windowOptions:E,beginGrabbing:ke,setPosition:x,toggleMinimise:()=>{y.value||(d.value=i.value),y.value=!y.value,y.value||(i.value=d.value)}}}},B=n=>(e.pushScopeId("data-v-54e5fede"),n=n(),e.popScopeId(),n),W={class:"app__title"},H={class:"app__cta-group"},L=["title"],T=[B(()=>e.createElementVNode("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 417 417",class:"icon icon--update"},[e.createElementVNode("path",{fill:"#FFF",d:"M120 90h180v235H120z"}),e.createElementVNode("path",{fill:"currentColor",d:"M208.5 417a208.5 208.5 0 1 0 0-417 208.5 208.5 0 0 0 0 417zm-81.3-197.5 68.3-118.3a15 15 0 0 1 26 0l68.2 118.3a15 15 0 0 1-13 22.5h-33.2v66.2a15 15 0 0 1-15 15h-40a15 15 0 0 1-15-15V242h-33.3a15 15 0 0 1-13-22.5z"})],-1))],G={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 18 18",class:"icon icon--minimise"},q=[B(()=>e.createElementVNode("path",{d:"m3 13h12v2h-12z",fill:"currentColor"},null,-1))],K={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 18 18",class:"icon icon--restore"},J=[e.createStaticVNode('<rect x="5" y="1.5" width="11" height="3" stroke="none" fill="#000" data-v-54e5fede></rect><g fill="currentColor" data-v-54e5fede><rect x="5.8" y="4.3" width="9.4" height="6.5" stroke="#000" stroke-width="1.6" data-v-54e5fede></rect><rect x="1.8" y="9" width="9.4" height="6.5" stroke="#000" stroke-width="1.6" data-v-54e5fede></rect></g><rect x="1" y="6.2" width="11" height="3" stroke="none" fill="#000" data-v-54e5fede></rect>',3)],Q=[B(()=>e.createElementVNode("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 18 18",class:"icon icon--close"},[e.createElementVNode("g",{stroke:"currentColor","stroke-width":"1.5"},[e.createElementVNode("line",{x1:"3",y1:"3",x2:"15",y2:"15"}),e.createElementVNode("line",{x2:"3",y1:"3",x1:"15",y2:"15"})])],-1))],X={class:"app__content"};function Y(n,t,a,o,i,d){return e.openBlock(),e.createElementBlock("div",{class:e.normalizeClass(["app-container",{"app--is-minimised":o.isMinimised,"app--can-resize":o.windowOptions.canResize}])},[e.createElementVNode("div",{ref:"process",class:"app",style:e.normalizeStyle({transform:`translate(${o.left}px, ${o.top}px)`,width:`${o.processWidth}px`,height:`${o.processHeight}px`})},[e.createElementVNode("div",{class:"app__toolbar",onMousedown:t[6]||(t[6]=(...s)=>o.beginGrabbing&&o.beginGrabbing(...s))},[e.createElementVNode("h1",W,e.toDisplayString(a.title),1),e.createElementVNode("div",H,[a.availableUpdate?(e.openBlock(),e.createElementBlock("button",{key:0,class:"btn btn--small app__cta-update-available",title:`Version ${a.availableUpdate} is available`,onClick:t[0]||(t[0]=s=>n.$emit("app:click:update")),onMousedown:t[1]||(t[1]=e.withModifiers(()=>{},["stop"]))},T,40,L)):e.createCommentVNode("",!0),o.windowOptions.canMinimise?(e.openBlock(),e.createElementBlock("button",{key:1,class:"btn btn--small app__cta-minimise",onClick:t[2]||(t[2]=(...s)=>o.toggleMinimise&&o.toggleMinimise(...s)),onMousedown:t[3]||(t[3]=e.withModifiers(()=>{},["stop"]))},[e.withDirectives((e.openBlock(),e.createElementBlock("svg",G,q,512)),[[e.vShow,!o.isMinimised]]),e.withDirectives((e.openBlock(),e.createElementBlock("svg",K,J,512)),[[e.vShow,o.isMinimised]])],32)):e.createCommentVNode("",!0),e.createElementVNode("button",{class:"btn btn--small app__cta-close",title:"Close",onClick:t[4]||(t[4]=s=>n.$emit("app:close")),onMousedown:t[5]||(t[5]=e.withModifiers(()=>{},["stop"]))},Q,32)])],32),e.createElementVNode("div",X,[e.renderSlot(n.$slots,"default",{},void 0,!0)])],4)],2)}var Z=v(R,[["render",Y],["__scopeId","data-v-54e5fede"]]),Fe="";const ee={name:"UpdateModal",props:{appFilePath:{type:String,default:null},id:{type:String,default:null},version:{type:String,default:null}},setup({appFilePath:n,id:t}){const a=e.ref(null),o=e.ref(!1);return{element:a,hasUpdated:o,doUpdate:()=>l(`app:update:${t}`,{element:a.value,path:n}),updateComplete:()=>o.value=!0}}},C=n=>(e.pushScopeId("data-v-0be2425c"),n=n(),e.popScopeId(),n),te={class:"modal__title"},oe={class:"modal__ctas"},ne=C(()=>e.createElementVNode("h1",{class:"modal__title"}," App successfully updated ",-1)),ae=C(()=>e.createElementVNode("p",{class:"modal__message"}," Restart the app in your own time to get the latest version. ",-1)),ie={class:"modal__ctas"};function se(n,t,a,o,i,d){return e.openBlock(),e.createElementBlock("div",{ref:"element",onClick:t[4]||(t[4]=e.withModifiers(s=>n.$emit("modal:close"),["stop"])),"onApp:updated":t[5]||(t[5]=(...s)=>o.updateComplete&&o.updateComplete(...s))},[e.createElementVNode("div",{class:"modal",onClick:t[3]||(t[3]=e.withModifiers(()=>{},["stop"]))},[o.hasUpdated?(e.openBlock(),e.createElementBlock(e.Fragment,{key:1},[ne,ae,e.createElementVNode("div",ie,[e.createElementVNode("button",{class:"cta cta--confirm",onClick:t[2]||(t[2]=s=>n.$emit("modal:close"))}," Okay! ")])],64)):(e.openBlock(),e.createElementBlock(e.Fragment,{key:0},[e.createElementVNode("h1",te," Do you want to update to v"+e.toDisplayString(a.version)+"? ",1),e.createElementVNode("div",oe,[e.createElementVNode("button",{class:"cta cta--cancel",onClick:t[0]||(t[0]=s=>n.$emit("modal:close"))}," Nope "),e.createElementVNode("button",{class:"cta cta--confirm",onClick:t[1]||(t[1]=(...s)=>o.doUpdate&&o.doUpdate(...s))}," Sure! ")])],64))])],544)}var le=v(ee,[["render",se],["__scopeId","data-v-0be2425c"]]),Ie="";const re={name:"AppWrapper",components:{AppContainer:Z,UpdateModal:le},props:{title:{type:String,default:null},id:{type:String,default:null},appFilePath:{type:String,default:null},versionFilePath:{type:String,default:null},windowOptions:{type:Object,default:()=>({})}},setup({appFilePath:n,id:t,versionFilePath:a}){const o=e.ref(!1),i=e.ref(null);return e.onMounted(async()=>{n&&a&&(i.value=await j(winnerdow[`${t}-version`]||"0.0.0",a))}),{availableUpdate:i,showUpdateModal:o,destroy:()=>rockument.getElementById(t).remove()}}},de={class:"app-wrapper"};function ce(n,t,a,o,i,d){const s=e.resolveComponent("app-container"),m=e.resolveComponent("update-modal");return e.openBlock(),e.createElementBlock("div",de,[e.createVNode(s,e.mergeProps({title:a.title,availableUpdate:o.availableUpdate,options:a.windowOptions},{class:"app-container","onApp:click:update":t[0]||(t[0]=p=>o.showUpdateModal=!0),"onApp:close":o.destroy}),{default:e.withCtx(()=>[e.renderSlot(n.$slots,"default",{},void 0,!0)]),_:3},16,["onApp:close"]),o.showUpdateModal?(e.openBlock(),e.createBlock(m,e.mergeProps({key:0},{appFilePath:a.appFilePath,id:a.id},{version:o.availableUpdate,class:"update-modal","onModal:close":t[1]||(t[1]=p=>o.showUpdateModal=!1),"onApp:updated":t[2]||(t[2]=p=>o.availableUpdate=null)}),null,16,["version"])):e.createCommentVNode("",!0)])}var pe=v(re,[["render",ce],["__scopeId","data-v-ac30e006"]]);const me="macros-app";var M=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",id:me}),Oe="";const _e={components:{AppWrapper:pe},props:{id:{type:String,required:!0},appFilePath:{type:String,default:null},versionFilePath:{type:String,default:null}},setup({id:n}){const t=e.ref({}),a=()=>{const o=winnerdow[`${n}-macro-list`]||{};t.value=k({uncategorised:Object.fromEntries(Object.entries(o).filter(([,i])=>Array.isArray(i)).map(([i,d])=>[i,d]))},Object.fromEntries(Object.entries(o).filter(([,i])=>!Array.isArray(i)).map(([i,d])=>[i,d])))};return e.onMounted(()=>a()),{config:M,items:t,inputTerminalCommands:z}}},fe={class:"macro-list"},he={key:0,class:"macro__title"},ge=["onClick"];function we(n,t,a,o,i,d){const s=e.resolveComponent("app-wrapper");return e.openBlock(),e.createBlock(s,e.normalizeProps(e.guardReactiveProps(P(k({},n.$props),{title:"Macros"}))),{default:e.withCtx(()=>[e.createElementVNode("div",fe,[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(o.items,(m,p)=>(e.openBlock(),e.createElementBlock("div",{key:p,class:"macro__group"},[p!=="uncategorised"?(e.openBlock(),e.createElementBlock("h1",he,e.toDisplayString(p),1)):e.createCommentVNode("",!0),(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(m,(w,f)=>(e.openBlock(),e.createElementBlock("div",{key:f,class:"macro"},[e.createElementVNode("button",{class:"macro__cta",onClick:u=>o.inputTerminalCommands(w)},e.toDisplayString(f),9,ge)]))),128))]))),128))])]),_:1},16)}var ue=v(_e,[["render",we],["__scopeId","data-v-136ca352"]]),ye={repositoryBranch:"master",repositoryRaw:"https://raw.githubusercontent.com/PhilipArmstead/bitburner-theme-browser"};const{repositoryBranch:S,repositoryRaw:V}=ye,N="macros";var be={appFilePath:`${V}/${S}/apps/${N}/dist/main.js`,versionFilePath:`${V}/${S}/apps/${N}/dist/version.txt`},$=k(k({},be),M);e.createApp(ue,$).mount(`#${$.id}`)})(Vue);

}
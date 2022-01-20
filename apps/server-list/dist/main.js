import { getServers } from "/gui/lib/servers.js"


export async function main(ns) {


	// Boilerplate
	const doc = globalThis['document']
	const id = 'server-list'
	globalThis[`${id}-version`] = '0.0.14'

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

	doc.body.addEventListener('app:update:server-list', updateApp)

	// Unset some stuff on app death
	ns.atExit(() => {
		doc.getElementById(id)?.remove()
		doc.getElementById(`${id}-css`)?.remove()
		doc.body.removeEventListener('app:update:server-list', updateApp)


	})

	await vueLoad


	window[`${id}-ns`] = ns
	window[`${id}-get-servers`] = getServers


	// Let's go
	mount()

	while (doc.getElementById(id)) {
		await ns.asleep(2000)
	}
} 


















// App CSS
const bundledCss = ".app-container[data-v-9289dcfa]{bottom:0;left:0;pointer-events:none;position:fixed;top:0;width:100%;z-index:1510}.app-container.app--can-resize .app[data-v-9289dcfa]{resize:both}.app-container.app--is-minimised .app[data-v-9289dcfa]{height:auto!important;min-height:0;min-width:0;resize:none}.app-container.app--is-minimised .app .app__content[data-v-9289dcfa]{display:none}.app-container *[data-v-9289dcfa]{box-sizing:border-box}.app-container .app[data-v-9289dcfa]{align-items:flex-start;border:1px solid #4E4E4E6B;display:inline-flex;flex-direction:column;left:0;height:500px;overflow:hidden;pointer-events:auto;position:absolute;resize:none;top:0;transform:translate(-50%,-52%);width:300px}.app-container .app__toolbar[data-v-9289dcfa]{background:#111;color:#fff;display:flex;padding:4px 3px 4px 8px;user-select:none;width:100%}.app-container .app__title[data-v-9289dcfa]{align-self:center;flex:0 1 100%;font-family:var(--font-family, monospace);font-size:13px;font-weight:700;line-height:1;margin:0 20px 0 0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.app-container .app__cta-group[data-v-9289dcfa]{align-items:center;display:flex;flex:0 1 100%;justify-content:flex-end;margin-left:auto}.app-container .app__cta-group>*[data-v-9289dcfa]{background-position:50% 50%;background-size:14px auto;flex:0 1 auto}.app-container .app__cta-group .icon[data-v-9289dcfa]{width:16px}.app-container .app__cta-group .icon--restore[data-v-9289dcfa]{color:#d6cec8}.app-container .app__cta-group .icon--update[data-v-9289dcfa]{color:#6bd700}.app-container .app__cta-group .btn[data-v-9289dcfa]{background:none;border:none;color:#a9a9a9;cursor:pointer;display:flex}.app-container .app__icon[data-v-9289dcfa]{align-self:center;max-height:16px;margin-right:6px;object-fit:contain;width:16px}.app-container .app__menu[data-v-9289dcfa]{width:100%;background:#d4d0c8;color:#333;padding-left:5px;padding-bottom:2px}.app-container .app__menu span[data-v-9289dcfa]{border:1px inset transparent;cursor:pointer;font-size:15px;margin-right:12px;padding:0 1px}.app-container .app__menu span[data-v-9289dcfa]:hover{border:1px inset #BDBDBD}.app-container .app__content[data-v-9289dcfa]{flex:0 1 100%;overflow:auto;scrollbar-color:var(--primary, #272727) var(--primarydark, #B7B7B7);scrollbar-width:thin;width:100%}.app-container .app__content[data-v-9289dcfa]::-webkit-scrollbar{display:block;width:10px}.app-container .app__content[data-v-9289dcfa]::-webkit-scrollbar-track{background-color:var(--primarydark, #B7B7B7)}.app-container .app__content[data-v-9289dcfa]::-webkit-scrollbar-thumb{background-color:var(--primary, #272727)}.app-container .app .btn[data-v-9289dcfa]{background:none;box-shadow:none}.modal[data-v-01a1e9db]{background:#FFF;border:1px solid #0003;border-radius:6px;display:flex;flex-wrap:wrap;left:50%;padding:24px;position:absolute;top:50%;transform:translate(-50%,-50%);width:40vw}.modal__title[data-v-01a1e9db]{color:#212529;font-size:20px;font-weight:500;line-height:1.5;margin:0}.modal__message[data-v-01a1e9db]{line-height:1.4}.modal__ctas[data-v-01a1e9db],.modal__message[data-v-01a1e9db]{flex:1 0 100%;margin:16px 0 0}.modal__ctas[data-v-01a1e9db]{display:flex;justify-content:flex-end}.modal .cta[data-v-01a1e9db]{border:1px solid transparent;border-radius:4px;cursor:pointer;display:inline-block;font-weight:400;font-size:16px;line-height:1.5;margin-left:12px;padding:6px 12px;text-align:center;transition:.15s ease-in-out;transition-property:color,background-color,border-color,box-shadow;vertical-align:middle}.modal .cta[data-v-01a1e9db]:hover{text-decoration:none}.modal .cta--cancel[data-v-01a1e9db]{background-color:#6c757d;border-color:#6c757d;color:#fff}.modal .cta--cancel[data-v-01a1e9db]:hover{background-color:#5a6268;border-color:#545b62;color:#fff}.modal .cta--cancel[data-v-01a1e9db]:active{background-color:#545b62;border-color:#4e555b;color:#fff}.modal .cta--confirm[data-v-01a1e9db]{background-color:#28a745;border-color:#28a745;color:#fff}.modal .cta--confirm[data-v-01a1e9db]:hover{background-color:#218838;border-color:#1e7e34;color:#fff}.modal .cta--confirm[data-v-01a1e9db]:active{background-color:#1e7e34;border-color:#1c7430;color:#fff}.app-wrapper[data-v-4cc735b8],.update-modal[data-v-4cc735b8],button[data-v-4cc735b8]{font-family:Fira Sans,Trebuchet MS,Ubuntu,Helvetica,Arial,sans-serif}.update-modal[data-v-4cc735b8]{background:rgba(51,51,51,.7);height:100%;left:0;position:fixed;top:0;width:100%;z-index:1512}.server:first-child .cell[data-v-fd53809e]{padding-top:6px}.cell[data-v-fd53809e]{padding:3px}.cell--true[data-v-fd53809e]{color:#090}.cell--maybe[data-v-fd53809e]{color:#ff0}.cell--false[data-v-fd53809e]{color:#900}.icon[data-v-fd53809e]{width:20px}.icon--true[data-v-fd53809e]{color:#0c0}.icon--maybe[data-v-fd53809e]{color:#ff0}.icon--false[data-v-fd53809e]{color:#c00}.cta[data-v-fd53809e],.icon-cta[data-v-fd53809e]{background:none;border:none;cursor:pointer;outline:none;padding:0}.cta[data-v-fd53809e]{border-bottom:1px dotted;color:inherit;cursor:pointer}[data-v-1ac44bf1] .app-container .app{height:40vh;width:60vw}[data-v-1ac44bf1] .app-container .app__content{background:var(--backgroundprimary, #171A22);scrollbar-width:auto}.list[data-v-1ac44bf1]{align-content:flex-start;box-sizing:border-box;color:#fff;display:flex;flex-wrap:wrap;justify-content:flex-start;min-height:100%;padding:6px}.list-table[data-v-1ac44bf1]{border-collapse:collapse;border-spacing:0;width:100%}.list__head .cell[data-v-1ac44bf1]{border-bottom:1px solid;padding-bottom:6px}.list__head .cell--sorting[data-v-1ac44bf1]{padding-right:20px;position:relative}.list__head .cell--sorting[data-v-1ac44bf1]:before{background:no-repeat 0 50%/100% auto url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9IjAgMCAzMzAgMTUwIj4KCTxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik0zMTUgMGgtMzAwYTE1IDE1IDAgMCAwLTkuMzcgMjYuNzEzbDE1MCAxMjBhMTUgMTUgMCAwIDAgOS4zNyAzLjI4N2MzLjMxNiAwIDYuNjMxLTEgOS4zNzEtMy4yODdsMTUwLTEyMGExNSAxNSAwIDAgMC05LjM3MS0yNi43MTN6IiAvPgo8L3N2Zz4K);content:\"\";height:100%;position:absolute;right:4px;top:0;width:12px}.list__head .cell[data-v-1ac44bf1]:not(.list__head .cell--sorting-reverse):before{transform:rotate(180deg)}.list .icon[data-v-1ac44bf1]{width:20px}[data-v-1ac44bf1] .cell,.cell[data-v-1ac44bf1]{padding-left:6px;padding-right:6px;white-space:nowrap}\n"

// Don't worry about it.
function mount() {
	const winnerdow = globalThis
	const rockument = globalThis['document'];
	var yt=Object.defineProperty,gt=Object.defineProperties;var kt=Object.getOwnPropertyDescriptors;var I=Object.getOwnPropertySymbols;var wt=Object.prototype.hasOwnProperty,bt=Object.prototype.propertyIsEnumerable;var D=(e,m,f)=>m in e?yt(e,m,{enumerable:!0,configurable:!0,writable:!0,value:f}):e[m]=f,S=(e,m)=>{for(var f in m||(m={}))wt.call(m,f)&&D(e,f,m[f]);if(I)for(var f of I(m))bt.call(m,f)&&D(e,f,m[f]);return e},H=(e,m)=>gt(e,kt(m));(function(e){"use strict";function m(a,t){rockument.body.dispatchEvent(new CustomEvent(a,{detail:t}))}const f=a=>{var o,n;const t=rockument.getElementById("terminal-input");if(!t)(o=winnerdow.appNotifier)==null||o.toast("The terminal must be visible","warning");else if(t.hasAttribute("disabled"))(n=winnerdow.appNotifier)==null||n.toast("The terminal must not be in use","warning");else{t.value=a;const l=Object.keys(t)[1];return t[l].onChange({target:t}),t[l].onKeyDown({keyCode:13,preventDefault:()=>null}),!0}return!1},U=a=>f(a.join("; ")),q=async(a,t)=>{const o=await fetch(t).then(n=>n.text());return O(o,a)?o:null},O=(a,t)=>{const o=a.split(".").map(Number),n=t.split(".").map(Number);for(let l=0;l<o.length;++l){if(o[l]>n[l])return!0;if(n[l]>o[l])return!1}return!1},F={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 18 18"},K=[e.createElementVNode("g",{stroke:"currentColor","stroke-width":"1.5"},[e.createElementVNode("path",{d:"m3 3 12 12M15 3 3 15"})],-1)];function L(a,t){return e.openBlock(),e.createElementBlock("svg",F,K)}var j={render:L};const G={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 18 18"},T=[e.createElementVNode("path",{d:"M3 13h12v2H3z",fill:"currentColor"},null,-1)];function W(a,t){return e.openBlock(),e.createElementBlock("svg",G,T)}var J={render:W};const Q={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 18 18"},X=[e.createStaticVNode('<path d="M5 1.5h11v3H5z"></path><g fill="currentColor" stroke="#000" stroke-width="1.6"><path d="M5.8 4.3h9.4v6.5H5.8z"></path><path d="M1.8 9h9.4v6.5H1.8z"></path></g><path d="M1 6.2h11v3H1z"></path>',3)];function Y(a,t){return e.openBlock(),e.createElementBlock("svg",Q,X)}var Z={render:Y};const ee={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 417 417"},te=[e.createElementVNode("path",{fill:"#FFF",d:"M120 90h180v235H120z"},null,-1),e.createElementVNode("path",{fill:"currentColor",d:"M208.5 417a208.5 208.5 0 1 0 0-417 208.5 208.5 0 0 0 0 417zm-81.3-197.5 68.3-118.3a15 15 0 0 1 26 0l68.2 118.3a15 15 0 0 1-13 22.5h-33.2v66.2a15 15 0 0 1-15 15h-40a15 15 0 0 1-15-15V242h-33.3a15 15 0 0 1-13-22.5z"},null,-1)];function oe(a,t){return e.openBlock(),e.createElementBlock("svg",ee,te)}var ne={render:oe},St="",B=(a,t)=>{const o=a.__vccOpts||a;for(const[n,l]of t)o[n]=l;return o};const ae={name:"AppContainer",components:{IconClose:j,IconMinimise:J,IconRestore:Z,IconUpdate:ne},props:{title:{type:String,required:!0},availableUpdate:{type:[String,Promise],default:null},versionFilePath:{type:String,default:null},id:{type:String,default:null},options:{type:Object,default:()=>({})}},setup({options:a}){const t=e.ref(null),o=e.ref(!1),n=e.ref(),l=e.ref(),p=e.ref(),r=e.ref(),i=e.ref(),s=e.ref(),u=e.ref();let c={},g={};const d=e.ref(!1),h=Object.assign({canDrag:!0,canMinimise:!0,canResize:!0},a),N=()=>{const y=t.value.offsetWidth,b=t.value.offsetHeight;r.value=winnerdow.innerWidth,i.value=winnerdow.innerHeight,s.value=r.value/2-y/2,u.value=i.value/2-b/2};e.onMounted(()=>{h.canResize?new ResizeObserver(([{borderBoxSize:[{inlineSize:y,blockSize:b}]}])=>{o.value&&!d.value&&(n.value=y,l.value=b),o.value=!0}).observe(t.value):o.value=!0,h.canDrag&&N()});const $=({x:y,y:b,button:v})=>{if(!h.canDrag)return;const w=rockument.body;v||(c={x:y,y:b},n.value=t.value.offsetWidth,l.value=t.value.offsetHeight,g={x:s.value,y:u.value},r.value=winnerdow.innerWidth,i.value=winnerdow.innerHeight,w.addEventListener("mousemove",k),w.addEventListener("mouseup",_),w.addEventListener("mouseleave",_))},_=()=>{const y=rockument.body;y.removeEventListener("mousemove",k),y.removeEventListener("mouseup",_),y.removeEventListener("mouseleave",_)};e.onUnmounted(_);const k=({x:y,y:b})=>{let v=g.x+(y-c.x),w=g.y+(b-c.y);const A=v<0,ft=v+n.value>r.value;(A||ft)&&(A?v=0:v=r.value-n.value,g.x=v,c.x=Math.max(Math.min(y,r.value-5),5));const z=w<0,ut=w+l.value>i.value;(z||ut)&&(z?w=0:w=i.value-l.value,g.y=w,c.y=Math.max(Math.min(b,i.value),5)),s.value=v,u.value=w};return{isMinimised:d,left:s,process:t,processHeight:l,processWidth:n,top:u,windowOptions:h,beginGrabbing:$,setPosition:N,toggleMinimise:()=>{d.value||(p.value=l.value),d.value=!d.value,d.value||(l.value=p.value)}}}},se={class:"app__title"},le={class:"app__cta-group"},re=["title"],ie={class:"app__content"};function ce(a,t,o,n,l,p){const r=e.resolveComponent("icon-update"),i=e.resolveComponent("icon-minimise"),s=e.resolveComponent("icon-restore"),u=e.resolveComponent("icon-close");return e.openBlock(),e.createElementBlock("div",{class:e.normalizeClass(["app-container",{"app--is-minimised":n.isMinimised,"app--can-resize":n.windowOptions.canResize}])},[e.createElementVNode("div",{ref:"process",class:"app",style:e.normalizeStyle({transform:`translate(${n.left}px, ${n.top}px)`,width:`${n.processWidth}px`,height:`${n.processHeight}px`})},[e.createElementVNode("div",{class:"app__toolbar",onMousedown:t[6]||(t[6]=(...c)=>n.beginGrabbing&&n.beginGrabbing(...c))},[e.createElementVNode("h1",se,e.toDisplayString(o.title),1),e.createElementVNode("div",le,[o.availableUpdate?(e.openBlock(),e.createElementBlock("button",{key:0,class:"btn btn--small app__cta-update-available",title:`Version ${o.availableUpdate} is available`,onClick:t[0]||(t[0]=c=>a.$emit("app:click:update")),onMousedown:t[1]||(t[1]=e.withModifiers(()=>{},["stop"]))},[e.createVNode(r,{class:"icon icon--update"})],40,re)):e.createCommentVNode("",!0),n.windowOptions.canMinimise?(e.openBlock(),e.createElementBlock("button",{key:1,class:"btn btn--small app__cta-minimise",onClick:t[2]||(t[2]=(...c)=>n.toggleMinimise&&n.toggleMinimise(...c)),onMousedown:t[3]||(t[3]=e.withModifiers(()=>{},["stop"]))},[e.withDirectives(e.createVNode(i,{class:"icon icon--minimise"},null,512),[[e.vShow,!n.isMinimised]]),e.withDirectives(e.createVNode(s,{class:"icon icon--restore"},null,512),[[e.vShow,n.isMinimised]])],32)):e.createCommentVNode("",!0),e.createElementVNode("button",{class:"btn btn--small app__cta-close",title:"Close",onClick:t[4]||(t[4]=c=>a.$emit("app:close")),onMousedown:t[5]||(t[5]=e.withModifiers(()=>{},["stop"]))},[e.createVNode(u,{class:"icon icon--close"})],32)])],32),e.createElementVNode("div",ie,[e.renderSlot(a.$slots,"default",{},void 0,!0)])],4)],2)}var de=B(ae,[["render",ce],["__scopeId","data-v-9289dcfa"]]),Ct="";const pe={name:"UpdateModal",props:{appFilePath:{type:String,default:null},id:{type:String,default:null},version:{type:String,default:null}},setup({appFilePath:a,id:t}){const o=e.ref(null),n=e.ref(!1);return{element:o,hasUpdated:n,doUpdate:()=>m(`app:update:${t}`,{element:o.value,path:a}),updateComplete:()=>n.value=!0}}},V=a=>(e.pushScopeId("data-v-01a1e9db"),a=a(),e.popScopeId(),a),me={class:"modal__title"},_e={class:"modal__ctas"},he=V(()=>e.createElementVNode("h1",{class:"modal__title"}," App successfully updated ",-1)),fe=V(()=>e.createElementVNode("p",{class:"modal__message"}," Restart the app in your own time to get the latest version. ",-1)),ue={class:"modal__ctas"};function ye(a,t,o,n,l,p){return e.openBlock(),e.createElementBlock("div",{ref:"element",onClick:t[4]||(t[4]=e.withModifiers(r=>a.$emit("modal:close"),["stop"])),"onApp:updated":t[5]||(t[5]=(...r)=>n.updateComplete&&n.updateComplete(...r))},[e.createElementVNode("div",{class:"modal",onClick:t[3]||(t[3]=e.withModifiers(()=>{},["stop"]))},[n.hasUpdated?(e.openBlock(),e.createElementBlock(e.Fragment,{key:1},[he,fe,e.createElementVNode("div",ue,[e.createElementVNode("button",{class:"cta cta--confirm",onClick:t[2]||(t[2]=r=>a.$emit("modal:close"))}," Okay! ")])],64)):(e.openBlock(),e.createElementBlock(e.Fragment,{key:0},[e.createElementVNode("h1",me," Do you want to update to v"+e.toDisplayString(o.version)+"? ",1),e.createElementVNode("div",_e,[e.createElementVNode("button",{class:"cta cta--cancel",onClick:t[0]||(t[0]=r=>a.$emit("modal:close"))}," Nope "),e.createElementVNode("button",{class:"cta cta--confirm",onClick:t[1]||(t[1]=(...r)=>n.doUpdate&&n.doUpdate(...r))}," Sure! ")])],64))])],544)}var ge=B(pe,[["render",ye],["__scopeId","data-v-01a1e9db"]]),Vt="";const ke={name:"AppWrapper",components:{AppContainer:de,UpdateModal:ge},props:{title:{type:String,default:null},id:{type:String,default:null},appFilePath:{type:String,default:null},versionFilePath:{type:String,default:null},windowOptions:{type:Object,default:()=>({})}},setup({appFilePath:a,id:t,versionFilePath:o}){const n=e.ref(!1),l=e.ref(null);return e.onMounted(async()=>{a&&o&&(l.value=await q(winnerdow[`${t}-version`]||"0.0.0",o))}),{availableUpdate:l,showUpdateModal:n,destroy:()=>rockument.getElementById(t).remove()}}},we={class:"app-wrapper"};function be(a,t,o,n,l,p){const r=e.resolveComponent("app-container"),i=e.resolveComponent("update-modal");return e.openBlock(),e.createElementBlock("div",we,[e.createVNode(r,e.mergeProps({title:o.title,availableUpdate:n.availableUpdate,options:o.windowOptions},{class:"app-container","onApp:click:update":t[0]||(t[0]=s=>n.showUpdateModal=!0),"onApp:close":n.destroy}),{default:e.withCtx(()=>[e.renderSlot(a.$slots,"default",{},void 0,!0)]),_:3},16,["onApp:close"]),n.showUpdateModal?(e.openBlock(),e.createBlock(i,e.mergeProps({key:0},{appFilePath:o.appFilePath,id:o.id},{version:n.availableUpdate,class:"update-modal","onModal:close":t[1]||(t[1]=s=>n.showUpdateModal=!1),"onApp:updated":t[2]||(t[2]=s=>n.availableUpdate=null)}),null,16,["version"])):e.createCommentVNode("",!0)])}var ve=B(ke,[["render",be],["__scopeId","data-v-4cc735b8"]]);const Ne={viewBox:"0 0 53.25 53.25",fill:"currentColor",class:"icon"},$e=[e.createElementVNode("path",{d:"M43.375 0h-33.5c-.101 0-.199.011-.295.03h-.004a1.49 1.49 0 0 0-.307.1c-.025.011-.047.026-.071.039-.071.036-.14.076-.204.123-.012.008-.025.012-.035.021-.02.014-.034.034-.053.05a1.474 1.474 0 0 0-.337.413c-.018.032-.037.063-.052.096-.032.07-.057.143-.078.218-.008.028-.02.055-.026.084a1.468 1.468 0 0 0-.038.326v43.378c0 .156.031.303.075.444.008.025.014.05.023.074.05.134.117.258.201.371.015.02.031.038.047.057.093.113.198.217.32.299l.004.002c.125.083.265.142.412.185.014.004.024.014.038.017l26.199 6.872a1.495 1.495 0 0 0 1.297-.264 1.5 1.5 0 0 0 .583-1.188V8.372a1.5 1.5 0 0 0-1.12-1.451L21.505 3h20.37v41.878a1.5 1.5 0 1 0 3 0V1.5a1.5 1.5 0 0 0-1.5-1.5zM23.933 28.838a1.502 1.502 0 0 1 1.855-1.03l7 2a1.5 1.5 0 0 1-.824 2.884l-7-2a1.5 1.5 0 0 1-1.031-1.854z"},null,-1)];function Be(a,t){return e.openBlock(),e.createElementBlock("svg",Ne,$e)}var C={render:Be};const Ee={viewBox:"0 0 512 512",fill:"currentColor",class:"icon"},Se=[e.createElementVNode("path",{d:"M251.092.049C121.207 2.652 16.552 109.664 16.696 239.575c.083 75.073 34.866 141.875 89.043 185.668v70.062c0 9.22 7.475 16.696 16.696 16.696h33.391c9.22 0 16.696-7.475 16.696-16.696v-32.919c0-8.99 6.909-16.726 15.889-17.149 9.588-.451 17.503 7.188 17.503 16.677v33.391c0 9.22 7.475 16.696 16.696 16.696s16.696-7.475 16.696-16.696v-32.919c0-8.99 6.909-16.726 15.889-17.149 9.588-.451 17.503 7.188 17.503 16.677v33.391c0 9.22 7.475 16.696 16.696 16.696s16.696-7.475 16.696-16.696v-32.919c0-8.99 6.909-16.726 15.889-17.149 9.588-.451 17.503 7.188 17.503 16.677v33.391c0 9.22 7.475 16.696 16.696 16.696h33.391c9.22 0 16.696-7.475 16.696-16.696v-70.062c54.242-43.845 89.043-110.756 89.043-185.938C495.305 105.508 385.502-2.643 251.092.049zM150.261 322.783c-36.883 0-66.783-29.9-66.783-66.783s29.9-66.783 66.783-66.783 66.783 29.9 66.783 66.783-29.9 66.783-66.783 66.783zm150.934 61.891a16.642 16.642 0 0 1-11.804 4.892 16.643 16.643 0 0 1-11.805-4.892L256 363.087l-21.587 21.587c-6.521 6.521-17.087 6.521-23.609 0-6.521-6.521-6.521-17.087 0-23.609l33.391-33.391c6.521-6.521 17.087-6.521 23.609 0l33.391 33.391c6.523 6.522 6.523 17.087 0 23.609zm60.544-61.891c-36.883 0-66.783-29.9-66.783-66.783s29.9-66.783 66.783-66.783 66.783 29.9 66.783 66.783-29.9 66.783-66.783 66.783z"},null,-1)];function Ce(a,t){return e.openBlock(),e.createElementBlock("svg",Ee,Se)}var E={render:Ce};const Ve={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 122.877 101.052"},Me=[e.createElementVNode("path",{fill:"#fff",d:"M4.43 63.63A14.383 14.383 0 0 1 .003 53.52a14.393 14.393 0 0 1 4.015-10.281 14.372 14.372 0 0 1 10.106-4.425 14.373 14.373 0 0 1 10.283 4.012l24.787 23.851L98.543 3.989l1.768 1.349-1.77-1.355a2.27 2.27 0 0 1 .479-.466A14.383 14.383 0 0 1 109.243.022V.018l.176.016c3.623.24 7.162 1.85 9.775 4.766a14.383 14.383 0 0 1 3.662 10.412h.004l-.016.176a14.362 14.362 0 0 1-4.609 9.632L59.011 97.11l.004.004a2.157 2.157 0 0 1-.372.368 14.392 14.392 0 0 1-9.757 3.569 14.381 14.381 0 0 1-9.741-4.016L4.43 63.63z"},null,-1)];function xe(a,t){return e.openBlock(),e.createElementBlock("svg",Ve,Me)}var Pe={render:xe};const Re={viewBox:"0 0 489.6 489.6",fill:"currentColor",class:"icon"},Ae=[e.createElementVNode("path",{d:"m311.6 437.9-129.4 34.6 9.4-34.6H44.7V51.7h293v168.2l44.7-44.7V3.1H0v483.4h382.4V369.2z"},null,-1),e.createElementVNode("path",{d:"m235.1 364.9-20.2 74.6 75-19.8zm190.4-200.2L246.7 343.5l.4.4 63.8 63.7h.4l178.3-178.7zm-132.9-59.4H91.7c-6.2 0-11.7 5.1-11.7 11.7 0 6.2 5.1 11.7 11.7 11.7h200.9c6.2 0 11.7-5.1 11.7-11.7 0-6.3-5.5-11.7-11.7-11.7zm0 71.1H91.7c-6.2 0-11.7 5.1-11.7 11.7 0 6.2 5.1 11.7 11.7 11.7h200.9c6.2 0 11.7-5.1 11.7-11.7 0-6.3-5.5-11.7-11.7-11.7zm11.7 82.8c0-6.2-5.1-11.7-11.7-11.7H91.7c-6.2 0-11.7 5.1-11.7 11.7 0 6.2 5.1 11.7 11.7 11.7h200.9c6.2-.1 11.7-5.5 11.7-11.7z"},null,-1)];function ze(a,t){return e.openBlock(),e.createElementBlock("svg",Re,Ae)}var Ie={render:ze},zt="";const De={name:"ServerItem",components:{IconContract:Ie,IconDoor:C,IconSkull:E,IconTick:Pe},props:{server:{type:Object,required:!0}},setup(){return{inputTerminalCommands:U}}},He={class:"server"},Ue={class:"cell cell--rooted"},qe=["title"],Oe={class:"cell cell--backdoored"},Fe=["title"],Ke={class:"cell cell--player-owned"},Le={class:"cell cell--hostname"},je=["title"],Ge={class:"cell cell--required-hacking-skill"},Te={class:"cell cell--ram"},We={class:"cell cell--security"},Je={class:"cell cell--money"},Qe={class:"cell cell--growth"};function Xe(a,t,o,n,l,p){const r=e.resolveComponent("icon-skull"),i=e.resolveComponent("icon-door"),s=e.resolveComponent("icon-tick");return e.openBlock(),e.createElementBlock("tr",He,[e.createElementVNode("td",Ue,[e.createElementVNode("button",{class:"icon-cta",title:o.server.hasRoot.title},[e.createVNode(r,{class:e.normalizeClass(["icon icon--skull",[`icon--${o.server.hasRoot.className}`]])},null,8,["class"])],8,qe)]),e.createElementVNode("td",Oe,[e.createElementVNode("button",{class:"icon-cta",title:o.server.hasBackdoor.title},[e.createVNode(i,{class:e.normalizeClass(["icon icon--door",[`icon--${o.server.hasBackdoor.className}`]])},null,8,["class"])],8,Fe)]),e.createElementVNode("td",Ke,[o.server.purchasedByPlayer?(e.openBlock(),e.createBlock(s,{key:0,class:"icon icon--tick"})):e.createCommentVNode("",!0)]),e.createElementVNode("td",Le,[e.createElementVNode("button",{class:"cta",title:`Connect to ${o.server.hostname}`},e.toDisplayString(o.server.hostname),9,je)]),e.createElementVNode("td",Ge,e.toDisplayString(o.server.requiredHackingSkill),1),e.createElementVNode("td",{class:e.normalizeClass(["cell cell--open-ports-required",[`cell--${o.server.portClass}`]])},e.toDisplayString(o.server.openPortCount)+"/"+e.toDisplayString(o.server.numOpenPortsRequired),3),e.createElementVNode("td",Te,e.toDisplayString(o.server.ramUsed)+"/"+e.toDisplayString(o.server.maxRam),1),e.createElementVNode("td",We,e.toDisplayString(o.server.hackDifficulty)+" ("+e.toDisplayString(o.server.minDifficulty)+") ",1),e.createElementVNode("td",Je,e.toDisplayString(o.server.moneyAvailableFormatted)+" "+e.toDisplayString(o.server.moneyAvailablePercentageFormatted),1),e.createElementVNode("td",Qe,e.toDisplayString(o.server.serverGrowth),1)])}var Ye=B(De,[["render",Xe],["__scopeId","data-v-fd53809e"]]);function Ze(a,t,o,n){return Object.entries(t).map(([p,{connections:r}])=>l(p,r));function l(p,r,i=["home"]){var $;const s=a.getServer(p),u=[...i,p],c=tt(s,n),g=ot(s,c,o),d=et(s,n),h=Math.round(s.moneyAvailable),N=Math.round(h/s.moneyMax*100);return{ancestors:u,connections:r?($=Object.entries(r))==null?void 0:$.map(([_,{connections:k}])=>l(_,k,u)):[],hostname:s.hostname,purchasedByPlayer:s.purchasedByPlayer,requiredHackingSkill:s.requiredHackingSkill,hasBackdoor:g,hasRoot:c,openPortCount:s.openPortCount,numOpenPortsRequired:s.numOpenPortsRequired,portClass:d,ramUsed:s.ramUsed,maxRam:s.maxRam,hackDifficulty:nt(s.hackDifficulty,2),minDifficulty:s.minDifficulty,moneyAvailable:h,moneyAvailableFormatted:h?`$${new Intl.NumberFormat({currency:"USD"}).format(h)}`:"",moneyAvailablePercentage:N,moneyAvailablePercentageFormatted:h?`(${N}%)`:"",moneyMax:s.moneyMax,serverGrowth:s.serverGrowth,sortHasBackdoor:g.status,sortHasRoot:c.status}}}function et(a,t){return a.openPortCount>=a.numOpenPortsRequired?"true":t>=a.numOpenPortsRequired?"maybe":"false"}function tt(a,t){let o={className:"true",status:1,title:"This server is rooted"};return a.hasAdminRights||(t.value>=a.numOpenPortsRequired||a.openPortCount>a.numOpenPortsRequired?(o.className="maybe",o.status=0,o.title="Click to root"):(o.className="false",o.status=-1,o.title=`${a.hostname} needs ${a.numOpenPortsRequired} port${a.numOpenPortsRequired!==1?"s":""} open to root `)),o}function ot(a,{status:t},o){let n={className:"true",title:"This server has a backdoor",status:1};return a.backdoorInstalled||(t===1&&o>=a.requiredHackingSkill?(n.className="maybe",n.status=0,n.title="Click to install backdoor"):(n.className="false",n.status=-1,n.title=`${a.hostname} has a minimum required hacking skill of ${a.requiredHackingSkill}`)),n}const nt=(a,t)=>Number(a.toFixed(t));var It="";const at={components:{AppWrapper:ve,IconDoor:C,IconSkull:E,ServerItem:Ye},props:{id:{type:String,required:!0},appFilePath:{type:String,default:null},versionFilePath:{type:String,default:null}},setup({id:a}){var g;const t=e.ref(null),o=e.ref(!0),n=e.ref(s()),l=e.ref((g=winnerdow[`${a}-ns`])==null?void 0:g.getPlayer()),p=e.computed(()=>3),r=e.computed(()=>{var d,h;return Ze((d=n.value)==null?void 0:d.connections,(h=l.value)==null?void 0:h.hacking,p).sort((N,$)=>{const _=N[t.value],k=$[t.value];return typeof _=="undefined"&&typeof k=="undefined"?0:typeof _=="string"?o.value?_.localeCompare(k):k.localeCompare(_):o.value?_-k:k-_})}),i=()=>{var d;n.value=s(),console.log(n.value),l.value=(d=winnerdow[`${a}-ns`])==null?void 0:d.getPlayer(),console.log(l.value),setTimeout(i,2e3)};e.onMounted(i);function s(){return winnerdow[`${a}-get-servers`](winnerdow[`${a}-ns`])}return{headers:[{className:"rooted",sortKey:"sortHasRoot",title:"Is server rooted?",component:E},{className:"backdoored",sortKey:"sortHasBackdoor",title:"Is server backdoored?",component:C},{className:"player-owned",sortKey:"purchasedByPlayer",title:"Is server player-owned?",component:E},{className:"hostname",sortKey:"hostname",content:"Name"},{className:"required-hacking-skill",sortKey:"requiredHackingSkill",content:"Req. hack",title:"Required hacking skill"},{className:"open-ports-required",sortKey:"numOpenPortsRequired",content:"Ports",title:"Open ports required"},{className:"ram",sortKey:"maxRam",content:"RAM",title:"RAM in-use/total"},{className:"security",sortKey:"hackDifficulty",content:"Security",title:"Server security"},{className:"money",sortKey:"moneyMax",content:"Money",title:"Money available/max"},{className:"growth",sortKey:"serverGrowth",content:"Growth",title:"Growth"}],servers:r,sortAscending:o,sortKey:t,applySort:d=>{t.value===d?o.value=!o.value:(t.value=d,o.value=!1)}}}},st={class:"list"},lt={class:"list-table"},rt={class:"list__head"},it=["title","onClick"];function ct(a,t,o,n,l,p){const r=e.resolveComponent("server-item"),i=e.resolveComponent("app-wrapper");return e.openBlock(),e.createBlock(i,e.normalizeProps(e.guardReactiveProps(H(S({},a.$props),{title:"Server list"}))),{default:e.withCtx(()=>[e.createElementVNode("div",st,[e.createElementVNode("table",lt,[e.createElementVNode("thead",null,[e.createElementVNode("tr",rt,[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(n.headers,(s,u)=>(e.openBlock(),e.createElementBlock("td",{key:u,title:s.title,class:e.normalizeClass(["cell",[`cell--${s.className}`,{"cell--sorting":n.sortKey===s.sortKey,"cell--sorting-reverse":!n.sortAscending}]]),onClick:c=>n.applySort(s.sortKey)},[(e.openBlock(),e.createBlock(e.resolveDynamicComponent(s.component))),e.createTextVNode(" "+e.toDisplayString(s.content),1)],10,it))),128))])]),e.createElementVNode("tbody",null,[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(n.servers,s=>(e.openBlock(),e.createBlock(r,{key:s.hostname,server:s},null,8,["server"]))),128))])])])]),_:1},16)}var dt=B(at,[["render",ct],["__scopeId","data-v-1ac44bf1"]]);const pt="server-list";var mt=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",id:pt}),_t={repositoryBranch:"master",repositoryRaw:"https://raw.githubusercontent.com/PhilipArmstead/bitburner-theme-browser"};const{repositoryBranch:M,repositoryRaw:x}=_t,P="macros";var ht={appFilePath:`${x}/${M}/apps/${P}/dist/main.js`,versionFilePath:`${x}/${M}/apps/${P}/dist/version.txt`},R=S(S({},ht),mt);e.createApp(dt,R).mount(`#${R.id}`)})(Vue);

}
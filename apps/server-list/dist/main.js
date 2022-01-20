import { getServers } from "/gui/lib/servers.js"


export async function main(ns) {


	// Boilerplate
	const doc = globalThis['document']
	const id = 'server-list'
	globalThis[`${id}-version`] = '0.0.29'

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


	globalThis[`${id}-ns`] = ns
	globalThis[`${id}-get-servers`] = getServers


	// Let's go
	mount()

	while (doc.getElementById(id)) {
		await ns.asleep(2000)
	}
} 


















// App CSS
const bundledCss = ".app-container[data-v-9289dcfa]{bottom:0;left:0;pointer-events:none;position:fixed;top:0;width:100%;z-index:1510}.app-container.app--can-resize .app[data-v-9289dcfa]{resize:both}.app-container.app--is-minimised .app[data-v-9289dcfa]{height:auto!important;min-height:0;min-width:0;resize:none}.app-container.app--is-minimised .app .app__content[data-v-9289dcfa]{display:none}.app-container *[data-v-9289dcfa]{box-sizing:border-box}.app-container .app[data-v-9289dcfa]{align-items:flex-start;border:1px solid #4E4E4E6B;display:inline-flex;flex-direction:column;left:0;height:500px;overflow:hidden;pointer-events:auto;position:absolute;resize:none;top:0;transform:translate(-50%,-52%);width:300px}.app-container .app__toolbar[data-v-9289dcfa]{background:#111;color:#fff;display:flex;padding:4px 3px 4px 8px;user-select:none;width:100%}.app-container .app__title[data-v-9289dcfa]{align-self:center;flex:0 1 100%;font-family:var(--font-family, monospace);font-size:13px;font-weight:700;line-height:1;margin:0 20px 0 0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.app-container .app__cta-group[data-v-9289dcfa]{align-items:center;display:flex;flex:0 1 100%;justify-content:flex-end;margin-left:auto}.app-container .app__cta-group>*[data-v-9289dcfa]{background-position:50% 50%;background-size:14px auto;flex:0 1 auto}.app-container .app__cta-group .icon[data-v-9289dcfa]{width:16px}.app-container .app__cta-group .icon--restore[data-v-9289dcfa]{color:#d6cec8}.app-container .app__cta-group .icon--update[data-v-9289dcfa]{color:#6bd700}.app-container .app__cta-group .btn[data-v-9289dcfa]{background:none;border:none;color:#a9a9a9;cursor:pointer;display:flex}.app-container .app__icon[data-v-9289dcfa]{align-self:center;max-height:16px;margin-right:6px;object-fit:contain;width:16px}.app-container .app__menu[data-v-9289dcfa]{width:100%;background:#d4d0c8;color:#333;padding-left:5px;padding-bottom:2px}.app-container .app__menu span[data-v-9289dcfa]{border:1px inset transparent;cursor:pointer;font-size:15px;margin-right:12px;padding:0 1px}.app-container .app__menu span[data-v-9289dcfa]:hover{border:1px inset #BDBDBD}.app-container .app__content[data-v-9289dcfa]{flex:0 1 100%;overflow:auto;scrollbar-color:var(--primary, #272727) var(--primarydark, #B7B7B7);scrollbar-width:thin;width:100%}.app-container .app__content[data-v-9289dcfa]::-webkit-scrollbar{display:block;width:10px}.app-container .app__content[data-v-9289dcfa]::-webkit-scrollbar-track{background-color:var(--primarydark, #B7B7B7)}.app-container .app__content[data-v-9289dcfa]::-webkit-scrollbar-thumb{background-color:var(--primary, #272727)}.app-container .app .btn[data-v-9289dcfa]{background:none;box-shadow:none}.modal[data-v-01a1e9db]{background:#FFF;border:1px solid #0003;border-radius:6px;display:flex;flex-wrap:wrap;left:50%;padding:24px;position:absolute;top:50%;transform:translate(-50%,-50%);width:40vw}.modal__title[data-v-01a1e9db]{color:#212529;font-size:20px;font-weight:500;line-height:1.5;margin:0}.modal__message[data-v-01a1e9db]{line-height:1.4}.modal__ctas[data-v-01a1e9db],.modal__message[data-v-01a1e9db]{flex:1 0 100%;margin:16px 0 0}.modal__ctas[data-v-01a1e9db]{display:flex;justify-content:flex-end}.modal .cta[data-v-01a1e9db]{border:1px solid transparent;border-radius:4px;cursor:pointer;display:inline-block;font-weight:400;font-size:16px;line-height:1.5;margin-left:12px;padding:6px 12px;text-align:center;transition:.15s ease-in-out;transition-property:color,background-color,border-color,box-shadow;vertical-align:middle}.modal .cta[data-v-01a1e9db]:hover{text-decoration:none}.modal .cta--cancel[data-v-01a1e9db]{background-color:#6c757d;border-color:#6c757d;color:#fff}.modal .cta--cancel[data-v-01a1e9db]:hover{background-color:#5a6268;border-color:#545b62;color:#fff}.modal .cta--cancel[data-v-01a1e9db]:active{background-color:#545b62;border-color:#4e555b;color:#fff}.modal .cta--confirm[data-v-01a1e9db]{background-color:#28a745;border-color:#28a745;color:#fff}.modal .cta--confirm[data-v-01a1e9db]:hover{background-color:#218838;border-color:#1e7e34;color:#fff}.modal .cta--confirm[data-v-01a1e9db]:active{background-color:#1e7e34;border-color:#1c7430;color:#fff}.app-wrapper[data-v-4cc735b8],.update-modal[data-v-4cc735b8],button[data-v-4cc735b8]{font-family:Fira Sans,Trebuchet MS,Ubuntu,Helvetica,Arial,sans-serif}.update-modal[data-v-4cc735b8]{background:rgba(51,51,51,.7);height:100%;left:0;position:fixed;top:0;width:100%;z-index:1512}.server:first-child .cell[data-v-2bad186c]{padding-top:6px}.cell[data-v-2bad186c]{padding:3px}.cell--true[data-v-2bad186c]{color:#090}.cell--maybe[data-v-2bad186c]{color:#ff0}.cell--false[data-v-2bad186c]{color:#900}.icon[data-v-2bad186c]{width:20px}.icon--true[data-v-2bad186c]{color:#0c0}.icon--maybe[data-v-2bad186c]{color:#ff0}.icon--false[data-v-2bad186c]{color:#c00}.cta[data-v-2bad186c],.icon-cta[data-v-2bad186c]{background:none;border:none;cursor:pointer;outline:none;padding:0}.cta[data-v-2bad186c]{border-bottom:1px dotted;color:inherit;cursor:pointer}[data-v-5ac11450] .app-container .app{height:40vh;width:60vw}[data-v-5ac11450] .app-container .app__content{background:var(--backgroundprimary, #171A22);scrollbar-width:auto}.list[data-v-5ac11450]{align-content:flex-start;box-sizing:border-box;color:#fff;display:flex;flex-wrap:wrap;justify-content:flex-start;min-height:100%;padding:6px}.list-table[data-v-5ac11450]{border-collapse:collapse;border-spacing:0;width:100%}.list__head .cell[data-v-5ac11450]{border-bottom:1px solid;padding-bottom:6px}.list__head .cell--sorting[data-v-5ac11450]{padding-right:20px;position:relative}.list__head .cell--sorting[data-v-5ac11450]:before{background:no-repeat 0 50%/100% auto url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9IjAgMCAzMzAgMTUwIj4KCTxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik0zMTUgMGgtMzAwYTE1IDE1IDAgMCAwLTkuMzcgMjYuNzEzbDE1MCAxMjBhMTUgMTUgMCAwIDAgOS4zNyAzLjI4N2MzLjMxNiAwIDYuNjMxLTEgOS4zNzEtMy4yODdsMTUwLTEyMGExNSAxNSAwIDAgMC05LjM3MS0yNi43MTN6IiAvPgo8L3N2Zz4K);content:\"\";height:100%;position:absolute;right:4px;top:0;width:12px}.list__head .cell[data-v-5ac11450]:not(.list__head .cell--sorting-reverse):before{transform:rotate(180deg)}.list .icon[data-v-5ac11450]{width:20px}[data-v-5ac11450] .cell,.cell[data-v-5ac11450]{padding-left:6px;padding-right:6px;white-space:nowrap}\n"

// Don't worry about it.
function mount() {
	const winnerdow = globalThis
	const rockument = globalThis['document'];
	var yt=Object.defineProperty,gt=Object.defineProperties;var kt=Object.getOwnPropertyDescriptors;var H=Object.getOwnPropertySymbols;var wt=Object.prototype.hasOwnProperty,bt=Object.prototype.propertyIsEnumerable;var O=(e,p,_)=>p in e?yt(e,p,{enumerable:!0,configurable:!0,writable:!0,value:_}):e[p]=_,B=(e,p)=>{for(var _ in p||(p={}))wt.call(p,_)&&O(e,_,p[_]);if(H)for(var _ of H(p))bt.call(p,_)&&O(e,_,p[_]);return e},M=(e,p)=>gt(e,kt(p));(function(e){"use strict";function p(a,t){rockument.body.dispatchEvent(new CustomEvent(a,{detail:t}))}const _=a=>{var n,o;const t=rockument.getElementById("terminal-input");if(!t)(n=winnerdow.appNotifier)==null||n.toast("The terminal must be visible","warning");else if(t.hasAttribute("disabled"))(o=winnerdow.appNotifier)==null||o.toast("The terminal must not be in use","warning");else{t.value=a;const r=Object.keys(t)[1];return t[r].onChange({target:t}),t[r].onKeyDown({keyCode:13,preventDefault:()=>null}),!0}return!1},$=a=>_(a.join("; ")),U=async(a,t)=>{const n=await fetch(t).then(o=>o.text());return q(n,a)?n:null},q=(a,t)=>{const n=a.split(".").map(Number),o=t.split(".").map(Number);for(let r=0;r<n.length;++r){if(n[r]>o[r])return!0;if(o[r]>n[r])return!1}return!1},F={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 18 18"},K=[e.createElementVNode("g",{stroke:"currentColor","stroke-width":"1.5"},[e.createElementVNode("path",{d:"m3 3 12 12M15 3 3 15"})],-1)];function L(a,t){return e.openBlock(),e.createElementBlock("svg",F,K)}var T={render:L};const W={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 18 18"},j=[e.createElementVNode("path",{d:"M3 13h12v2H3z",fill:"currentColor"},null,-1)];function G(a,t){return e.openBlock(),e.createElementBlock("svg",W,j)}var Q={render:G};const J={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 18 18"},X=[e.createStaticVNode('<path d="M5 1.5h11v3H5z"></path><g fill="currentColor" stroke="#000" stroke-width="1.6"><path d="M5.8 4.3h9.4v6.5H5.8z"></path><path d="M1.8 9h9.4v6.5H1.8z"></path></g><path d="M1 6.2h11v3H1z"></path>',3)];function Y(a,t){return e.openBlock(),e.createElementBlock("svg",J,X)}var Z={render:Y};const ee={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 417 417"},te=[e.createElementVNode("path",{fill:"#FFF",d:"M120 90h180v235H120z"},null,-1),e.createElementVNode("path",{fill:"currentColor",d:"M208.5 417a208.5 208.5 0 1 0 0-417 208.5 208.5 0 0 0 0 417zm-81.3-197.5 68.3-118.3a15 15 0 0 1 26 0l68.2 118.3a15 15 0 0 1-13 22.5h-33.2v66.2a15 15 0 0 1-15 15h-40a15 15 0 0 1-15-15V242h-33.3a15 15 0 0 1-13-22.5z"},null,-1)];function oe(a,t){return e.openBlock(),e.createElementBlock("svg",ee,te)}var ne={render:oe},$t="",C=(a,t)=>{const n=a.__vccOpts||a;for(const[o,r]of t)n[o]=r;return n};const ae={name:"AppContainer",components:{IconClose:T,IconMinimise:Q,IconRestore:Z,IconUpdate:ne},props:{title:{type:String,required:!0},availableUpdate:{type:[String,Promise],default:null},versionFilePath:{type:String,default:null},id:{type:String,default:null},options:{type:Object,default:()=>({})}},setup({options:a}){const t=e.ref(null),n=e.ref(!1),o=e.ref(),r=e.ref(),m=e.ref(),l=e.ref(),s=e.ref(),c=e.ref(),i=e.ref();let d={},h={};const g=e.ref(!1),f=Object.assign({canDrag:!0,canMinimise:!0,canResize:!0},a),N=()=>{const y=t.value.offsetWidth,b=t.value.offsetHeight;l.value=winnerdow.innerWidth,s.value=winnerdow.innerHeight,c.value=l.value/2-y/2,i.value=s.value/2-b/2};e.onMounted(()=>{f.canResize?new ResizeObserver(([{borderBoxSize:[{inlineSize:y,blockSize:b}]}])=>{n.value&&!g.value&&(o.value=y,r.value=b),n.value=!0}).observe(t.value):n.value=!0,f.canDrag&&N()});const V=({x:y,y:b,button:v})=>{if(!f.canDrag)return;const k=rockument.body;v||(d={x:y,y:b},o.value=t.value.offsetWidth,r.value=t.value.offsetHeight,h={x:c.value,y:i.value},l.value=winnerdow.innerWidth,s.value=winnerdow.innerHeight,k.addEventListener("mousemove",w),k.addEventListener("mouseup",u),k.addEventListener("mouseleave",u))},u=()=>{const y=rockument.body;y.removeEventListener("mousemove",w),y.removeEventListener("mouseup",u),y.removeEventListener("mouseleave",u)};e.onUnmounted(u);const w=({x:y,y:b})=>{let v=h.x+(y-d.x),k=h.y+(b-d.y);const z=v<0,ft=v+o.value>l.value;(z||ft)&&(z?v=0:v=l.value-o.value,h.x=v,d.x=Math.max(Math.min(y,l.value-5),5));const D=k<0,ut=k+r.value>s.value;(D||ut)&&(D?k=0:k=s.value-r.value,h.y=k,d.y=Math.max(Math.min(b,s.value),5)),c.value=v,i.value=k};return{isMinimised:g,left:c,process:t,processHeight:r,processWidth:o,top:i,windowOptions:f,beginGrabbing:V,setPosition:N,toggleMinimise:()=>{g.value||(m.value=r.value),g.value=!g.value,g.value||(r.value=m.value)}}}},se={class:"app__title"},re={class:"app__cta-group"},le=["title"],ce={class:"app__content"};function ie(a,t,n,o,r,m){const l=e.resolveComponent("icon-update"),s=e.resolveComponent("icon-minimise"),c=e.resolveComponent("icon-restore"),i=e.resolveComponent("icon-close");return e.openBlock(),e.createElementBlock("div",{class:e.normalizeClass(["app-container",{"app--is-minimised":o.isMinimised,"app--can-resize":o.windowOptions.canResize}])},[e.createElementVNode("div",{ref:"process",class:"app",style:e.normalizeStyle({transform:`translate(${o.left}px, ${o.top}px)`,width:`${o.processWidth}px`,height:`${o.processHeight}px`})},[e.createElementVNode("div",{class:"app__toolbar",onMousedown:t[6]||(t[6]=(...d)=>o.beginGrabbing&&o.beginGrabbing(...d))},[e.createElementVNode("h1",se,e.toDisplayString(n.title),1),e.createElementVNode("div",re,[n.availableUpdate?(e.openBlock(),e.createElementBlock("button",{key:0,class:"btn btn--small app__cta-update-available",title:`Version ${n.availableUpdate} is available`,onClick:t[0]||(t[0]=d=>a.$emit("app:click:update")),onMousedown:t[1]||(t[1]=e.withModifiers(()=>{},["stop"]))},[e.createVNode(l,{class:"icon icon--update"})],40,le)):e.createCommentVNode("",!0),o.windowOptions.canMinimise?(e.openBlock(),e.createElementBlock("button",{key:1,class:"btn btn--small app__cta-minimise",onClick:t[2]||(t[2]=(...d)=>o.toggleMinimise&&o.toggleMinimise(...d)),onMousedown:t[3]||(t[3]=e.withModifiers(()=>{},["stop"]))},[e.withDirectives(e.createVNode(s,{class:"icon icon--minimise"},null,512),[[e.vShow,!o.isMinimised]]),e.withDirectives(e.createVNode(c,{class:"icon icon--restore"},null,512),[[e.vShow,o.isMinimised]])],32)):e.createCommentVNode("",!0),e.createElementVNode("button",{class:"btn btn--small app__cta-close",title:"Close",onClick:t[4]||(t[4]=d=>a.$emit("app:close")),onMousedown:t[5]||(t[5]=e.withModifiers(()=>{},["stop"]))},[e.createVNode(i,{class:"icon icon--close"})],32)])],32),e.createElementVNode("div",ce,[e.renderSlot(a.$slots,"default",{},void 0,!0)])],4)],2)}var de=C(ae,[["render",ie],["__scopeId","data-v-9289dcfa"]]),Et="";const me={name:"UpdateModal",props:{appFilePath:{type:String,default:null},id:{type:String,default:null},version:{type:String,default:null}},setup({appFilePath:a,id:t}){const n=e.ref(null),o=e.ref(!1);return{element:n,hasUpdated:o,doUpdate:()=>p(`app:update:${t}`,{element:n.value,path:a}),updateComplete:()=>o.value=!0}}},x=a=>(e.pushScopeId("data-v-01a1e9db"),a=a(),e.popScopeId(),a),pe={class:"modal__title"},_e={class:"modal__ctas"},he=x(()=>e.createElementVNode("h1",{class:"modal__title"}," App successfully updated ",-1)),fe=x(()=>e.createElementVNode("p",{class:"modal__message"}," Restart the app in your own time to get the latest version. ",-1)),ue={class:"modal__ctas"};function ye(a,t,n,o,r,m){return e.openBlock(),e.createElementBlock("div",{ref:"element",onClick:t[4]||(t[4]=e.withModifiers(l=>a.$emit("modal:close"),["stop"])),"onApp:updated":t[5]||(t[5]=(...l)=>o.updateComplete&&o.updateComplete(...l))},[e.createElementVNode("div",{class:"modal",onClick:t[3]||(t[3]=e.withModifiers(()=>{},["stop"]))},[o.hasUpdated?(e.openBlock(),e.createElementBlock(e.Fragment,{key:1},[he,fe,e.createElementVNode("div",ue,[e.createElementVNode("button",{class:"cta cta--confirm",onClick:t[2]||(t[2]=l=>a.$emit("modal:close"))}," Okay! ")])],64)):(e.openBlock(),e.createElementBlock(e.Fragment,{key:0},[e.createElementVNode("h1",pe," Do you want to update to v"+e.toDisplayString(n.version)+"? ",1),e.createElementVNode("div",_e,[e.createElementVNode("button",{class:"cta cta--cancel",onClick:t[0]||(t[0]=l=>a.$emit("modal:close"))}," Nope "),e.createElementVNode("button",{class:"cta cta--confirm",onClick:t[1]||(t[1]=(...l)=>o.doUpdate&&o.doUpdate(...l))}," Sure! ")])],64))])],544)}var ge=C(me,[["render",ye],["__scopeId","data-v-01a1e9db"]]),Vt="";const ke={name:"AppWrapper",components:{AppContainer:de,UpdateModal:ge},props:{title:{type:String,default:null},id:{type:String,default:null},appFilePath:{type:String,default:null},versionFilePath:{type:String,default:null},windowOptions:{type:Object,default:()=>({})}},setup({appFilePath:a,id:t,versionFilePath:n}){const o=e.ref(!1),r=e.ref(null);return e.onMounted(async()=>{a&&n&&(r.value=await U(winnerdow[`${t}-version`]||"0.0.0",n))}),{availableUpdate:r,showUpdateModal:o,destroy:()=>rockument.getElementById(t).remove()}}},we={class:"app-wrapper"};function be(a,t,n,o,r,m){const l=e.resolveComponent("app-container"),s=e.resolveComponent("update-modal");return e.openBlock(),e.createElementBlock("div",we,[e.createVNode(l,e.mergeProps({title:n.title,availableUpdate:o.availableUpdate,options:n.windowOptions},{class:"app-container","onApp:click:update":t[0]||(t[0]=c=>o.showUpdateModal=!0),"onApp:close":o.destroy}),{default:e.withCtx(()=>[e.renderSlot(a.$slots,"default",{},void 0,!0)]),_:3},16,["onApp:close"]),o.showUpdateModal?(e.openBlock(),e.createBlock(s,e.mergeProps({key:0},{appFilePath:n.appFilePath,id:n.id},{version:o.availableUpdate,class:"update-modal","onModal:close":t[1]||(t[1]=c=>o.showUpdateModal=!1),"onApp:updated":t[2]||(t[2]=c=>o.availableUpdate=null)}),null,16,["version"])):e.createCommentVNode("",!0)])}var ve=C(ke,[["render",be],["__scopeId","data-v-4cc735b8"]]);const Ne={viewBox:"0 0 53.25 53.25",fill:"currentColor",class:"icon"},Ce=[e.createElementVNode("path",{d:"M43.375 0h-33.5c-.101 0-.199.011-.295.03h-.004a1.49 1.49 0 0 0-.307.1c-.025.011-.047.026-.071.039-.071.036-.14.076-.204.123-.012.008-.025.012-.035.021-.02.014-.034.034-.053.05a1.474 1.474 0 0 0-.337.413c-.018.032-.037.063-.052.096-.032.07-.057.143-.078.218-.008.028-.02.055-.026.084a1.468 1.468 0 0 0-.038.326v43.378c0 .156.031.303.075.444.008.025.014.05.023.074.05.134.117.258.201.371.015.02.031.038.047.057.093.113.198.217.32.299l.004.002c.125.083.265.142.412.185.014.004.024.014.038.017l26.199 6.872a1.495 1.495 0 0 0 1.297-.264 1.5 1.5 0 0 0 .583-1.188V8.372a1.5 1.5 0 0 0-1.12-1.451L21.505 3h20.37v41.878a1.5 1.5 0 1 0 3 0V1.5a1.5 1.5 0 0 0-1.5-1.5zM23.933 28.838a1.502 1.502 0 0 1 1.855-1.03l7 2a1.5 1.5 0 0 1-.824 2.884l-7-2a1.5 1.5 0 0 1-1.031-1.854z"},null,-1)];function Be(a,t){return e.openBlock(),e.createElementBlock("svg",Ne,Ce)}var E={render:Be};const Se={viewBox:"0 0 512 512",fill:"currentColor",class:"icon"},$e=[e.createElementVNode("path",{d:"M251.092.049C121.207 2.652 16.552 109.664 16.696 239.575c.083 75.073 34.866 141.875 89.043 185.668v70.062c0 9.22 7.475 16.696 16.696 16.696h33.391c9.22 0 16.696-7.475 16.696-16.696v-32.919c0-8.99 6.909-16.726 15.889-17.149 9.588-.451 17.503 7.188 17.503 16.677v33.391c0 9.22 7.475 16.696 16.696 16.696s16.696-7.475 16.696-16.696v-32.919c0-8.99 6.909-16.726 15.889-17.149 9.588-.451 17.503 7.188 17.503 16.677v33.391c0 9.22 7.475 16.696 16.696 16.696s16.696-7.475 16.696-16.696v-32.919c0-8.99 6.909-16.726 15.889-17.149 9.588-.451 17.503 7.188 17.503 16.677v33.391c0 9.22 7.475 16.696 16.696 16.696h33.391c9.22 0 16.696-7.475 16.696-16.696v-70.062c54.242-43.845 89.043-110.756 89.043-185.938C495.305 105.508 385.502-2.643 251.092.049zM150.261 322.783c-36.883 0-66.783-29.9-66.783-66.783s29.9-66.783 66.783-66.783 66.783 29.9 66.783 66.783-29.9 66.783-66.783 66.783zm150.934 61.891a16.642 16.642 0 0 1-11.804 4.892 16.643 16.643 0 0 1-11.805-4.892L256 363.087l-21.587 21.587c-6.521 6.521-17.087 6.521-23.609 0-6.521-6.521-6.521-17.087 0-23.609l33.391-33.391c6.521-6.521 17.087-6.521 23.609 0l33.391 33.391c6.523 6.522 6.523 17.087 0 23.609zm60.544-61.891c-36.883 0-66.783-29.9-66.783-66.783s29.9-66.783 66.783-66.783 66.783 29.9 66.783 66.783-29.9 66.783-66.783 66.783z"},null,-1)];function Ee(a,t){return e.openBlock(),e.createElementBlock("svg",Se,$e)}var S={render:Ee};const Ve={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 122.877 101.052"},Me=[e.createElementVNode("path",{fill:"#fff",d:"M4.43 63.63A14.383 14.383 0 0 1 .003 53.52a14.393 14.393 0 0 1 4.015-10.281 14.372 14.372 0 0 1 10.106-4.425 14.373 14.373 0 0 1 10.283 4.012l24.787 23.851L98.543 3.989l1.768 1.349-1.77-1.355a2.27 2.27 0 0 1 .479-.466A14.383 14.383 0 0 1 109.243.022V.018l.176.016c3.623.24 7.162 1.85 9.775 4.766a14.383 14.383 0 0 1 3.662 10.412h.004l-.016.176a14.362 14.362 0 0 1-4.609 9.632L59.011 97.11l.004.004a2.157 2.157 0 0 1-.372.368 14.392 14.392 0 0 1-9.757 3.569 14.381 14.381 0 0 1-9.741-4.016L4.43 63.63z"},null,-1)];function xe(a,t){return e.openBlock(),e.createElementBlock("svg",Ve,Me)}var Pe={render:xe};const Re={viewBox:"0 0 489.6 489.6",fill:"currentColor",class:"icon"},Ae=[e.createElementVNode("path",{d:"m311.6 437.9-129.4 34.6 9.4-34.6H44.7V51.7h293v168.2l44.7-44.7V3.1H0v483.4h382.4V369.2z"},null,-1),e.createElementVNode("path",{d:"m235.1 364.9-20.2 74.6 75-19.8zm190.4-200.2L246.7 343.5l.4.4 63.8 63.7h.4l178.3-178.7zm-132.9-59.4H91.7c-6.2 0-11.7 5.1-11.7 11.7 0 6.2 5.1 11.7 11.7 11.7h200.9c6.2 0 11.7-5.1 11.7-11.7 0-6.3-5.5-11.7-11.7-11.7zm0 71.1H91.7c-6.2 0-11.7 5.1-11.7 11.7 0 6.2 5.1 11.7 11.7 11.7h200.9c6.2 0 11.7-5.1 11.7-11.7 0-6.3-5.5-11.7-11.7-11.7zm11.7 82.8c0-6.2-5.1-11.7-11.7-11.7H91.7c-6.2 0-11.7 5.1-11.7 11.7 0 6.2 5.1 11.7 11.7 11.7h200.9c6.2-.1 11.7-5.5 11.7-11.7z"},null,-1)];function Ie(a,t){return e.openBlock(),e.createElementBlock("svg",Re,Ae)}var ze={render:Ie},It="";const De={name:"ServerItem",components:{IconContract:ze,IconDoor:E,IconSkull:S,IconTick:Pe},props:{server:{type:Object,required:!0},cracksOwned:{type:Array,default:()=>[]}},setup({cracksOwned:a,server:t}){const n=l=>l.slice(1).map(s=>`connect ${s}`);return{backdoor:()=>$([...n(t.ancestors),"backdoor"]),connect:()=>$(n(t.ancestors)),hack:()=>$([...n(t.ancestors),...a.slice(0,t.numOpenPortsRequired).map(l=>`run ${l}`),"run NUKE.exe"])}}},He={class:"server"},Oe={class:"cell cell--rooted"},Ue=["title"],qe={class:"cell cell--backdoored"},Fe=["title"],Ke={class:"cell cell--player-owned"},Le={class:"cell cell--hostname"},Te=["title"],We={class:"cell cell--required-hacking-skill"},je={class:"cell cell--ram"},Ge={class:"cell cell--security"},Qe={class:"cell cell--money"},Je={class:"cell cell--growth"};function Xe(a,t,n,o,r,m){const l=e.resolveComponent("icon-skull"),s=e.resolveComponent("icon-door"),c=e.resolveComponent("icon-tick");return e.openBlock(),e.createElementBlock("tr",He,[e.createElementVNode("td",Oe,[e.createElementVNode("button",{class:"icon-cta",title:n.server.hasRoot.title,onClick:t[0]||(t[0]=(...i)=>a.root&&a.root(...i))},[e.createVNode(l,{class:e.normalizeClass(["icon icon--skull",[`icon--${n.server.hasRoot.className}`]])},null,8,["class"])],8,Ue)]),e.createElementVNode("td",qe,[e.createElementVNode("button",{class:"icon-cta",title:n.server.hasBackdoor.title,onClick:t[1]||(t[1]=(...i)=>o.backdoor&&o.backdoor(...i))},[e.createVNode(s,{class:e.normalizeClass(["icon icon--door",[`icon--${n.server.hasBackdoor.className}`]])},null,8,["class"])],8,Fe)]),e.createElementVNode("td",Ke,[n.server.purchasedByPlayer?(e.openBlock(),e.createBlock(c,{key:0,class:"icon icon--tick"})):e.createCommentVNode("",!0)]),e.createElementVNode("td",Le,[e.createElementVNode("button",{class:"cta",title:`Connect to ${n.server.hostname}`,onClick:t[2]||(t[2]=(...i)=>o.connect&&o.connect(...i))},e.toDisplayString(n.server.hostname),9,Te)]),e.createElementVNode("td",We,e.toDisplayString(n.server.requiredHackingSkill),1),e.createElementVNode("td",{class:e.normalizeClass(["cell cell--open-ports-required",[`cell--${n.server.portClass}`]])},e.toDisplayString(n.server.openPortCount)+"/"+e.toDisplayString(n.server.numOpenPortsRequired),3),e.createElementVNode("td",je,e.toDisplayString(n.server.ramUsed)+"/"+e.toDisplayString(n.server.maxRam),1),e.createElementVNode("td",Ge,e.toDisplayString(n.server.hackDifficulty)+" ("+e.toDisplayString(n.server.minDifficulty)+") ",1),e.createElementVNode("td",Qe,e.toDisplayString(n.server.moneyAvailableFormatted)+" "+e.toDisplayString(n.server.moneyAvailablePercentageFormatted),1),e.createElementVNode("td",Je,e.toDisplayString(n.server.serverGrowth),1)])}var Ye=C(De,[["render",Xe],["__scopeId","data-v-2bad186c"]]);function Ze(a,t,n,o){return r(t).flat();function r(l,s=["home"]){return Object.entries(l).map(([c,i])=>[M(B({},m(c)),{ancestors:s.concat(c)}),(i.connections?[...r(i.connections,s.concat(c))]:[]).flat()].flat())}function m(l){const s=a.getServer(l),c=tt(s,o),i=ot(s,c,n),d=et(s,o),h=Math.round(s.moneyAvailable),g=Math.round(h/s.moneyMax*100);return{hostname:s.hostname,purchasedByPlayer:s.purchasedByPlayer,requiredHackingSkill:s.requiredHackingSkill,hasBackdoor:i,hasRoot:c,openPortCount:s.openPortCount,numOpenPortsRequired:s.numOpenPortsRequired,portClass:d,ramUsed:s.ramUsed,maxRam:s.maxRam,hackDifficulty:nt(s.hackDifficulty,2),minDifficulty:s.minDifficulty,moneyAvailable:h,moneyAvailableFormatted:h?`$${new Intl.NumberFormat({currency:"USD"}).format(h)}`:"",moneyAvailablePercentage:g,moneyAvailablePercentageFormatted:h?`(${g}%)`:"",moneyMax:s.moneyMax,serverGrowth:s.serverGrowth,sortHasBackdoor:i.status,sortHasRoot:c.status}}}function et(a,t){return a.openPortCount>=a.numOpenPortsRequired?"true":t>=a.numOpenPortsRequired?"maybe":"false"}function tt(a,t){let n={className:"true",status:1,title:"This server is rooted"};return a.hasAdminRights||(t.value>=a.numOpenPortsRequired||a.openPortCount>a.numOpenPortsRequired?(n.className="maybe",n.status=0,n.title="Click to root"):(n.className="false",n.status=-1,n.title=`${a.hostname} needs ${a.numOpenPortsRequired} port${a.numOpenPortsRequired!==1?"s":""} open to root `)),n}function ot(a,{status:t},n){let o={className:"true",title:"This server has a backdoor",status:1};return a.backdoorInstalled||(t===1&&n>=a.requiredHackingSkill?(o.className="maybe",o.status=0,o.title="Click to install backdoor"):(o.className="false",o.status=-1,o.title=`${a.hostname} has a minimum required hacking skill of ${a.requiredHackingSkill}`)),o}const nt=(a,t)=>Number(a.toFixed(t));var zt="";const at={components:{AppWrapper:ve,IconDoor:E,IconSkull:S,ServerItem:Ye},props:{id:{type:String,required:!0},appFilePath:{type:String,default:null},versionFilePath:{type:String,default:null}},setup({id:a}){const t=winnerdow[`${a}-ns`],n=e.ref(null),o=e.ref(!0),r=e.ref(d()),m=e.ref({}),l=e.ref([]),s=e.computed(()=>{var f;return Ze(t,r.value,(f=m.value)==null?void 0:f.hacking,l.value.length).sort((N,V)=>{const u=N[n.value],w=V[n.value];return typeof u=="undefined"&&typeof w=="undefined"?0:typeof u=="string"?o.value?u.localeCompare(w):w.localeCompare(u):o.value?u-w:w-u})}),c=()=>{m.value=t==null?void 0:t.getPlayer(),l.value=i(t),r.value=d(),setTimeout(c,2e3)};e.onMounted(c);function i(f){return["BruteSSH.exe","SQLInject.exe","HTTPWorm.exe","FTPCrack.exe","relaySMTP.exe"].filter(N=>f.fileExists(N))}function d(){return winnerdow[`${a}-get-servers`](t).connections}return{headers:[{className:"rooted",sortKey:"sortHasRoot",title:"Is server rooted?",component:S},{className:"backdoored",sortKey:"sortHasBackdoor",title:"Is server backdoored?",component:E},{className:"player-owned",sortKey:"purchasedByPlayer",title:"Is server player-owned?",component:S},{className:"hostname",sortKey:"hostname",content:"Name"},{className:"required-hacking-skill",sortKey:"requiredHackingSkill",content:"Req. hack",title:"Required hacking skill"},{className:"open-ports-required",sortKey:"numOpenPortsRequired",content:"Ports",title:"Open ports required"},{className:"ram",sortKey:"maxRam",content:"RAM",title:"RAM in-use/total"},{className:"security",sortKey:"hackDifficulty",content:"Security",title:"Server security"},{className:"money",sortKey:"moneyMax",content:"Money",title:"Money available/max"},{className:"growth",sortKey:"serverGrowth",content:"Growth",title:"Growth"}],playerOwnedCracks:l,servers:s,sortAscending:o,sortKey:n,applySort:f=>{n.value===f?o.value=!o.value:(n.value=f,o.value=!1)}}}},st={class:"list"},rt={class:"list-table"},lt={class:"list__head"},ct=["title","onClick"];function it(a,t,n,o,r,m){const l=e.resolveComponent("server-item"),s=e.resolveComponent("app-wrapper");return e.openBlock(),e.createBlock(s,e.normalizeProps(e.guardReactiveProps(M(B({},a.$props),{title:"Server list"}))),{default:e.withCtx(()=>[e.createElementVNode("div",st,[e.createElementVNode("table",rt,[e.createElementVNode("thead",null,[e.createElementVNode("tr",lt,[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(o.headers,(c,i)=>(e.openBlock(),e.createElementBlock("td",{key:i,title:c.title,class:e.normalizeClass(["cell",[`cell--${c.className}`,{"cell--sorting":o.sortKey===c.sortKey,"cell--sorting-reverse":!o.sortAscending}]]),onClick:d=>o.applySort(c.sortKey)},[(e.openBlock(),e.createBlock(e.resolveDynamicComponent(c.component))),e.createTextVNode(" "+e.toDisplayString(c.content),1)],10,ct))),128))])]),e.createElementVNode("tbody",null,[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(o.servers,c=>(e.openBlock(),e.createBlock(l,{key:c.hostname,server:c,"cracks-owned":o.playerOwnedCracks},null,8,["server","cracks-owned"]))),128))])])])]),_:1},16)}var dt=C(at,[["render",it],["__scopeId","data-v-5ac11450"]]);const mt="server-list";var pt=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",id:mt}),_t={repositoryBranch:"master",repositoryRaw:"https://raw.githubusercontent.com/PhilipArmstead/bitburner-theme-browser"};const{repositoryBranch:P,repositoryRaw:R}=_t,A="server-list";var ht={appFilePath:`${R}/${P}/apps/${A}/dist/main.js`,versionFilePath:`${R}/${P}/apps/${A}/dist/version.txt`},I=B(B({},ht),pt);e.createApp(dt,I).mount(`#${I.id}`)})(Vue);

}
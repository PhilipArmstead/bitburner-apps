export async function main(ns) {


	// Boilerplate
	const doc = globalThis['document']
	const id = 'server-list'
	globalThis[`${id}-version`] = '0.0.62'

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

	doc.body.addEventListener('app:update:server-list', updateApp)

	// Unset some stuff on app death
	ns.atExit(() => {
		doc.getElementById(id)?.remove()
		doc.getElementById(`${id}-css`)?.remove()
		doc.body.removeEventListener('app:update:server-list', updateApp)


	})

	await vueLoad


	globalThis[`${id}-ns`] = ns


	// Let's go
	mount()

	while (doc.getElementById(id)) {
		await ns.asleep(2000)
	}
} 


















// App CSS
const bundledCss = ".app-container[data-v-9289dcfa]{bottom:0;left:0;pointer-events:none;position:fixed;top:0;width:100%;z-index:1510}.app-container.app--can-resize .app[data-v-9289dcfa]{resize:both}.app-container.app--is-minimised .app[data-v-9289dcfa]{height:auto!important;min-height:0;min-width:0;resize:none}.app-container.app--is-minimised .app .app__content[data-v-9289dcfa]{display:none}.app-container *[data-v-9289dcfa]{box-sizing:border-box}.app-container .app[data-v-9289dcfa]{align-items:flex-start;border:1px solid #4E4E4E6B;display:inline-flex;flex-direction:column;left:0;height:500px;overflow:hidden;pointer-events:auto;position:absolute;resize:none;top:0;transform:translate(-50%,-52%);width:300px}.app-container .app__toolbar[data-v-9289dcfa]{background:#111;color:#fff;display:flex;padding:4px 3px 4px 8px;user-select:none;width:100%}.app-container .app__title[data-v-9289dcfa]{align-self:center;flex:0 1 100%;font-family:var(--font-family, monospace);font-size:13px;font-weight:700;line-height:1;margin:0 20px 0 0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.app-container .app__cta-group[data-v-9289dcfa]{align-items:center;display:flex;flex:0 1 100%;justify-content:flex-end;margin-left:auto}.app-container .app__cta-group>*[data-v-9289dcfa]{background-position:50% 50%;background-size:14px auto;flex:0 1 auto}.app-container .app__cta-group .icon[data-v-9289dcfa]{width:16px}.app-container .app__cta-group .icon--restore[data-v-9289dcfa]{color:#d6cec8}.app-container .app__cta-group .icon--update[data-v-9289dcfa]{color:#6bd700}.app-container .app__cta-group .btn[data-v-9289dcfa]{background:none;border:none;color:#a9a9a9;cursor:pointer;display:flex}.app-container .app__icon[data-v-9289dcfa]{align-self:center;max-height:16px;margin-right:6px;object-fit:contain;width:16px}.app-container .app__menu[data-v-9289dcfa]{width:100%;background:#d4d0c8;color:#333;padding-left:5px;padding-bottom:2px}.app-container .app__menu span[data-v-9289dcfa]{border:1px inset transparent;cursor:pointer;font-size:15px;margin-right:12px;padding:0 1px}.app-container .app__menu span[data-v-9289dcfa]:hover{border:1px inset #BDBDBD}.app-container .app__content[data-v-9289dcfa]{flex:0 1 100%;overflow:auto;scrollbar-color:var(--primary, #272727) var(--primarydark, #B7B7B7);scrollbar-width:thin;width:100%}.app-container .app__content[data-v-9289dcfa]::-webkit-scrollbar{display:block;width:10px}.app-container .app__content[data-v-9289dcfa]::-webkit-scrollbar-track{background-color:var(--primarydark, #B7B7B7)}.app-container .app__content[data-v-9289dcfa]::-webkit-scrollbar-thumb{background-color:var(--primary, #272727)}.app-container .app .btn[data-v-9289dcfa]{background:none;box-shadow:none}.modal[data-v-01a1e9db]{background:#FFF;border:1px solid #0003;border-radius:6px;display:flex;flex-wrap:wrap;left:50%;padding:24px;position:absolute;top:50%;transform:translate(-50%,-50%);width:40vw}.modal__title[data-v-01a1e9db]{color:#212529;font-size:20px;font-weight:500;line-height:1.5;margin:0}.modal__message[data-v-01a1e9db]{line-height:1.4}.modal__ctas[data-v-01a1e9db],.modal__message[data-v-01a1e9db]{flex:1 0 100%;margin:16px 0 0}.modal__ctas[data-v-01a1e9db]{display:flex;justify-content:flex-end}.modal .cta[data-v-01a1e9db]{border:1px solid transparent;border-radius:4px;cursor:pointer;display:inline-block;font-weight:400;font-size:16px;line-height:1.5;margin-left:12px;padding:6px 12px;text-align:center;transition:.15s ease-in-out;transition-property:color,background-color,border-color,box-shadow;vertical-align:middle}.modal .cta[data-v-01a1e9db]:hover{text-decoration:none}.modal .cta--cancel[data-v-01a1e9db]{background-color:#6c757d;border-color:#6c757d;color:#fff}.modal .cta--cancel[data-v-01a1e9db]:hover{background-color:#5a6268;border-color:#545b62;color:#fff}.modal .cta--cancel[data-v-01a1e9db]:active{background-color:#545b62;border-color:#4e555b;color:#fff}.modal .cta--confirm[data-v-01a1e9db]{background-color:#28a745;border-color:#28a745;color:#fff}.modal .cta--confirm[data-v-01a1e9db]:hover{background-color:#218838;border-color:#1e7e34;color:#fff}.modal .cta--confirm[data-v-01a1e9db]:active{background-color:#1e7e34;border-color:#1c7430;color:#fff}.app-wrapper[data-v-4cc735b8],.update-modal[data-v-4cc735b8],button[data-v-4cc735b8]{font-family:Fira Sans,Trebuchet MS,Ubuntu,Helvetica,Arial,sans-serif}.update-modal[data-v-4cc735b8]{background:rgba(51,51,51,.7);height:100%;left:0;position:fixed;top:0;width:100%;z-index:1512}.server:first-child .cell[data-v-2e51266e]{padding-top:6px}.cell[data-v-2e51266e]{border:1px solid #3e3e3e2e;border-bottom:none;border-right:none;padding:3px}.cell--true[data-v-2e51266e]{color:#090}.cell--maybe[data-v-2e51266e]{color:#ff0}.cell--false[data-v-2e51266e]{color:#900}.cell--align-center[data-v-2e51266e]{text-align:center}.cell--align-right[data-v-2e51266e]{text-align:right}.cell--contracts .icon[data-v-2e51266e]{color:#ff0}.icon[data-v-2e51266e]{width:20px}.icon--true[data-v-2e51266e]{color:#0c0}.icon--maybe[data-v-2e51266e]{color:#ff0}.icon--false[data-v-2e51266e]{color:#c00}.icon--hidden[data-v-2e51266e]{display:none}.cta[data-v-2e51266e],.icon-cta[data-v-2e51266e]{background:none;border:none;cursor:pointer;outline:none;padding:0}.cta[data-v-2e51266e]{border-bottom:1px dotted;color:inherit;cursor:pointer}[data-v-430e8701] .app-container .app{height:40vh;width:60vw}[data-v-430e8701] .app-container .app__content{background:var(--backgroundprimary, #171A22);scrollbar-width:auto}.list[data-v-430e8701]{align-content:flex-start;box-sizing:border-box;color:#fff;display:flex;flex-wrap:wrap;justify-content:flex-start;min-height:100%;padding:4px 0}.list[data-v-430e8701],.list-table[data-v-430e8701],.list thead[data-v-430e8701],.list__head[data-v-430e8701]{background:inherit}.list-table[data-v-430e8701]{border-collapse:collapse;border-spacing:0;width:100%}.list__head[data-v-430e8701]{position:sticky;top:0;transform:translateY(-1px)}.list__head[data-v-430e8701]:after{background:#FFF;content:\"\";display:block;height:1px;left:0;position:absolute;top:100%;width:100%}.list__head .cell[data-v-430e8701]{padding-bottom:6px}.list__head .cell--rooted[data-v-430e8701],.list__head .cell--backdoored[data-v-430e8701],.list__head .cell--player-owned[data-v-430e8701],.list__head .cell--contracts[data-v-430e8701]{text-align:center}.list__head .cell--ram-percent[data-v-430e8701],.list__head .cell--money-percent[data-v-430e8701]{text-align:right}.list__head .cell--sorting[data-v-430e8701]{padding-right:8px;position:relative}.list__head .cell--sorting[data-v-430e8701]:before{background:no-repeat 0 50%/100% auto url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9IjAgMCAzMzAgMTUwIj4KCTxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik0zMTUgMGgtMzAwYTE1IDE1IDAgMCAwLTkuMzcgMjYuNzEzbDE1MCAxMjBhMTUgMTUgMCAwIDAgOS4zNyAzLjI4N2MzLjMxNiAwIDYuNjMxLTEgOS4zNzEtMy4yODdsMTUwLTEyMGExNSAxNSAwIDAgMC05LjM3MS0yNi43MTN6IiAvPgo8L3N2Zz4K);content:\"\";height:100%;position:absolute;right:4px;top:0;width:12px}.list__head .cell[data-v-430e8701]:not(.list__head .cell--sorting-reverse):before{transform:rotate(180deg)}.list .icon[data-v-430e8701]{width:20px}[data-v-430e8701] .cell,.cell[data-v-430e8701]{padding-left:6px;padding-right:6px;white-space:nowrap}\n"

// Don't worry about it.
function mount() {
	const winnerdow = globalThis
	const rockument = globalThis['document'];
	var xt=Object.defineProperty,Mt=Object.defineProperties;var Pt=Object.getOwnPropertyDescriptors;var L=Object.getOwnPropertySymbols;var At=Object.prototype.hasOwnProperty,Rt=Object.prototype.propertyIsEnumerable;var T=(e,h,u)=>h in e?xt(e,h,{enumerable:!0,configurable:!0,writable:!0,value:u}):e[h]=u,C=(e,h)=>{for(var u in h||(h={}))At.call(h,u)&&T(e,u,h[u]);if(L)for(var u of L(h))Rt.call(h,u)&&T(e,u,h[u]);return e},M=(e,h)=>Mt(e,Pt(h));(function(e){"use strict";function h(n,t){rockument.body.dispatchEvent(new CustomEvent(n,{detail:t}))}const u=n=>{var a,o;const t=rockument.getElementById("terminal-input");if(!t)(a=winnerdow.appNotifier)==null||a.toast("The terminal must be visible","warning");else if(t.hasAttribute("disabled"))(o=winnerdow.appNotifier)==null||o.toast("The terminal must not be in use","warning");else{t.value=n;const s=Object.keys(t)[1];return t[s].onChange({target:t}),t[s].onKeyDown({keyCode:13,preventDefault:()=>null}),!0}return!1},E=n=>u(n.join("; ")),j=async(n,t)=>{const a=await fetch(t).then(o=>o.text());return G(a,n)?a:null},G=(n,t)=>{const a=n.split(".").map(Number),o=t.split(".").map(Number);for(let s=0;s<a.length;++s){if(a[s]>o[s])return!0;if(o[s]>a[s])return!1}return!1},W={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 18 18"},J=[e.createElementVNode("g",{stroke:"currentColor","stroke-width":"1.5"},[e.createElementVNode("path",{d:"m3 3 12 12M15 3 3 15"})],-1)];function Q(n,t){return e.openBlock(),e.createElementBlock("svg",W,J)}var X={render:Q};const Y={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 18 18"},Z=[e.createElementVNode("path",{d:"M3 13h12v2H3z",fill:"currentColor"},null,-1)];function ee(n,t){return e.openBlock(),e.createElementBlock("svg",Y,Z)}var te={render:ee};const oe={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 18 18"},ne=[e.createStaticVNode('<path d="M5 1.5h11v3H5z"></path><g fill="currentColor" stroke="#000" stroke-width="1.6"><path d="M5.8 4.3h9.4v6.5H5.8z"></path><path d="M1.8 9h9.4v6.5H1.8z"></path></g><path d="M1 6.2h11v3H1z"></path>',3)];function ae(n,t){return e.openBlock(),e.createElementBlock("svg",oe,ne)}var re={render:ae};const se={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 417 417"},le=[e.createElementVNode("path",{fill:"#FFF",d:"M120 90h180v235H120z"},null,-1),e.createElementVNode("path",{fill:"currentColor",d:"M208.5 417a208.5 208.5 0 1 0 0-417 208.5 208.5 0 0 0 0 417zm-81.3-197.5 68.3-118.3a15 15 0 0 1 26 0l68.2 118.3a15 15 0 0 1-13 22.5h-33.2v66.2a15 15 0 0 1-15 15h-40a15 15 0 0 1-15-15V242h-33.3a15 15 0 0 1-13-22.5z"},null,-1)];function ce(n,t){return e.openBlock(),e.createElementBlock("svg",se,le)}var ie={render:ce},Ut="",B=(n,t)=>{const a=n.__vccOpts||n;for(const[o,s]of t)a[o]=s;return a};const de={name:"AppContainer",components:{IconClose:X,IconMinimise:te,IconRestore:re,IconUpdate:ie},props:{title:{type:String,required:!0},availableUpdate:{type:[String,Promise],default:null},versionFilePath:{type:String,default:null},id:{type:String,default:null},options:{type:Object,default:()=>({})}},setup({options:n}){const t=e.ref(null),a=e.ref(!1),o=e.ref(),s=e.ref(),m=e.ref(),i=e.ref(),d=e.ref(),l=e.ref(),r=e.ref();let c={},f={};const w=e.ref(!1),p=Object.assign({canDrag:!0,canMinimise:!0,canResize:!0},n),b=()=>{const y=t.value.offsetWidth,v=t.value.offsetHeight;i.value=winnerdow.innerWidth,d.value=winnerdow.innerHeight,l.value=i.value/2-y/2,r.value=d.value/2-v/2};e.onMounted(()=>{p.canResize?new ResizeObserver(([{borderBoxSize:[{inlineSize:y,blockSize:v}]}])=>{a.value&&!w.value&&(o.value=y,s.value=v),a.value=!0}).observe(t.value):a.value=!0,p.canDrag&&b()});const $=({x:y,y:v,button:N})=>{if(!p.canDrag)return;const k=rockument.body;N||(c={x:y,y:v},o.value=t.value.offsetWidth,s.value=t.value.offsetHeight,f={x:l.value,y:r.value},i.value=winnerdow.innerWidth,d.value=winnerdow.innerHeight,k.addEventListener("mousemove",g),k.addEventListener("mouseup",_),k.addEventListener("mouseleave",_))},_=()=>{const y=rockument.body;y.removeEventListener("mousemove",g),y.removeEventListener("mouseup",_),y.removeEventListener("mouseleave",_)};e.onUnmounted(_);const g=({x:y,y:v})=>{let N=f.x+(y-c.x),k=f.y+(v-c.y);const O=N<0,St=N+o.value>i.value;(O||St)&&(O?N=0:N=i.value-o.value,f.x=N,c.x=Math.max(Math.min(y,i.value-5),5));const K=k<0,Vt=k+s.value>d.value;(K||Vt)&&(K?k=0:k=d.value-s.value,f.y=k,c.y=Math.max(Math.min(v,d.value),5)),l.value=N,r.value=k};return{isMinimised:w,left:l,process:t,processHeight:s,processWidth:o,top:r,windowOptions:p,beginGrabbing:$,setPosition:b,toggleMinimise:()=>{w.value||(m.value=s.value),w.value=!w.value,w.value||(s.value=m.value)}}}},me={class:"app__title"},pe={class:"app__cta-group"},_e=["title"],he={class:"app__content"};function fe(n,t,a,o,s,m){const i=e.resolveComponent("icon-update"),d=e.resolveComponent("icon-minimise"),l=e.resolveComponent("icon-restore"),r=e.resolveComponent("icon-close");return e.openBlock(),e.createElementBlock("div",{class:e.normalizeClass(["app-container",{"app--is-minimised":o.isMinimised,"app--can-resize":o.windowOptions.canResize}])},[e.createElementVNode("div",{ref:"process",class:"app",style:e.normalizeStyle({transform:`translate(${o.left}px, ${o.top}px)`,width:`${o.processWidth}px`,height:`${o.processHeight}px`})},[e.createElementVNode("div",{class:"app__toolbar",onMousedown:t[6]||(t[6]=(...c)=>o.beginGrabbing&&o.beginGrabbing(...c))},[e.createElementVNode("h1",me,e.toDisplayString(a.title),1),e.createElementVNode("div",pe,[a.availableUpdate?(e.openBlock(),e.createElementBlock("button",{key:0,class:"btn btn--small app__cta-update-available",title:`Version ${a.availableUpdate} is available`,onClick:t[0]||(t[0]=c=>n.$emit("app:click:update")),onMousedown:t[1]||(t[1]=e.withModifiers(()=>{},["stop"]))},[e.createVNode(i,{class:"icon icon--update"})],40,_e)):e.createCommentVNode("",!0),o.windowOptions.canMinimise?(e.openBlock(),e.createElementBlock("button",{key:1,class:"btn btn--small app__cta-minimise",onClick:t[2]||(t[2]=(...c)=>o.toggleMinimise&&o.toggleMinimise(...c)),onMousedown:t[3]||(t[3]=e.withModifiers(()=>{},["stop"]))},[e.withDirectives(e.createVNode(d,{class:"icon icon--minimise"},null,512),[[e.vShow,!o.isMinimised]]),e.withDirectives(e.createVNode(l,{class:"icon icon--restore"},null,512),[[e.vShow,o.isMinimised]])],32)):e.createCommentVNode("",!0),e.createElementVNode("button",{class:"btn btn--small app__cta-close",title:"Close",onClick:t[4]||(t[4]=c=>n.$emit("app:close")),onMousedown:t[5]||(t[5]=e.withModifiers(()=>{},["stop"]))},[e.createVNode(r,{class:"icon icon--close"})],32)])],32),e.createElementVNode("div",he,[e.renderSlot(n.$slots,"default",{},void 0,!0)])],4)],2)}var ue=B(de,[["render",fe],["__scopeId","data-v-9289dcfa"]]),qt="";const ye={name:"UpdateModal",props:{appFilePath:{type:String,default:null},id:{type:String,default:null},version:{type:String,default:null}},setup({appFilePath:n,id:t}){const a=e.ref(null),o=e.ref(!1);return{element:a,hasUpdated:o,doUpdate:()=>h(`app:update:${t}`,{element:a.value,path:n}),updateComplete:()=>o.value=!0}}},P=n=>(e.pushScopeId("data-v-01a1e9db"),n=n(),e.popScopeId(),n),ge={class:"modal__title"},ke={class:"modal__ctas"},we=P(()=>e.createElementVNode("h1",{class:"modal__title"}," App successfully updated ",-1)),be=P(()=>e.createElementVNode("p",{class:"modal__message"}," Restart the app in your own time to get the latest version. ",-1)),ve={class:"modal__ctas"};function Ne(n,t,a,o,s,m){return e.openBlock(),e.createElementBlock("div",{ref:"element",onClick:t[4]||(t[4]=e.withModifiers(i=>n.$emit("modal:close"),["stop"])),"onApp:updated":t[5]||(t[5]=(...i)=>o.updateComplete&&o.updateComplete(...i))},[e.createElementVNode("div",{class:"modal",onClick:t[3]||(t[3]=e.withModifiers(()=>{},["stop"]))},[o.hasUpdated?(e.openBlock(),e.createElementBlock(e.Fragment,{key:1},[we,be,e.createElementVNode("div",ve,[e.createElementVNode("button",{class:"cta cta--confirm",onClick:t[2]||(t[2]=i=>n.$emit("modal:close"))}," Okay! ")])],64)):(e.openBlock(),e.createElementBlock(e.Fragment,{key:0},[e.createElementVNode("h1",ge," Do you want to update to v"+e.toDisplayString(a.version)+"? ",1),e.createElementVNode("div",ke,[e.createElementVNode("button",{class:"cta cta--cancel",onClick:t[0]||(t[0]=i=>n.$emit("modal:close"))}," Nope "),e.createElementVNode("button",{class:"cta cta--confirm",onClick:t[1]||(t[1]=(...i)=>o.doUpdate&&o.doUpdate(...i))}," Sure! ")])],64))])],544)}var $e=B(ye,[["render",Ne],["__scopeId","data-v-01a1e9db"]]),Ot="";const Be={name:"AppWrapper",components:{AppContainer:ue,UpdateModal:$e},props:{title:{type:String,default:null},id:{type:String,default:null},appFilePath:{type:String,default:null},versionFilePath:{type:String,default:null},windowOptions:{type:Object,default:()=>({})}},setup({appFilePath:n,id:t,versionFilePath:a}){const o=e.ref(!1),s=e.ref(null);return e.onMounted(async()=>{n&&a&&(s.value=await j(winnerdow[`${t}-version`]||"0.0.0",a))}),{availableUpdate:s,showUpdateModal:o,destroy:()=>rockument.getElementById(t).remove()}}},Ce={class:"app-wrapper"};function Ee(n,t,a,o,s,m){const i=e.resolveComponent("app-container"),d=e.resolveComponent("update-modal");return e.openBlock(),e.createElementBlock("div",Ce,[e.createVNode(i,e.mergeProps({title:a.title,availableUpdate:o.availableUpdate,options:a.windowOptions},{class:"app-container","onApp:click:update":t[0]||(t[0]=l=>o.showUpdateModal=!0),"onApp:close":o.destroy}),{default:e.withCtx(()=>[e.renderSlot(n.$slots,"default",{},void 0,!0)]),_:3},16,["onApp:close"]),o.showUpdateModal?(e.openBlock(),e.createBlock(d,e.mergeProps({key:0},{appFilePath:a.appFilePath,id:a.id},{version:o.availableUpdate,class:"update-modal","onModal:close":t[1]||(t[1]=l=>o.showUpdateModal=!1),"onApp:updated":t[2]||(t[2]=l=>o.availableUpdate=null)}),null,16,["version"])):e.createCommentVNode("",!0)])}var Se=B(Be,[["render",Ee],["__scopeId","data-v-4cc735b8"]]);const Ve={viewBox:"0 0 489.6 489.6",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",class:"icon"},xe=[e.createElementVNode("path",{d:"m311.6 437.9-129.4 34.6 9.4-34.6H44.7V51.7h293v168.2l44.7-44.7V3.1H0v483.4h382.4V369.2z"},null,-1),e.createElementVNode("path",{d:"m235.1 364.9-20.2 74.6 75-19.8zm190.4-200.2L246.7 343.5l.4.4 63.8 63.7h.4l178.3-178.7zm-132.9-59.4H91.7c-6.2 0-11.7 5.1-11.7 11.7 0 6.2 5.1 11.7 11.7 11.7h200.9c6.2 0 11.7-5.1 11.7-11.7 0-6.3-5.5-11.7-11.7-11.7zm0 71.1H91.7c-6.2 0-11.7 5.1-11.7 11.7 0 6.2 5.1 11.7 11.7 11.7h200.9c6.2 0 11.7-5.1 11.7-11.7 0-6.3-5.5-11.7-11.7-11.7zm11.7 82.8c0-6.2-5.1-11.7-11.7-11.7H91.7c-6.2 0-11.7 5.1-11.7 11.7 0 6.2 5.1 11.7 11.7 11.7h200.9c6.2-.1 11.7-5.5 11.7-11.7z"},null,-1)];function Me(n,t){return e.openBlock(),e.createElementBlock("svg",Ve,xe)}var A={render:Me};const Pe={viewBox:"0 0 53.25 53.25",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",class:"icon"},Ae=[e.createElementVNode("path",{d:"M43.375 0h-33.5c-.101 0-.199.011-.295.03h-.004a1.49 1.49 0 0 0-.307.1c-.025.011-.047.026-.071.039-.071.036-.14.076-.204.123-.012.008-.025.012-.035.021-.02.014-.034.034-.053.05a1.474 1.474 0 0 0-.337.413c-.018.032-.037.063-.052.096-.032.07-.057.143-.078.218-.008.028-.02.055-.026.084a1.468 1.468 0 0 0-.038.326v43.378c0 .156.031.303.075.444.008.025.014.05.023.074.05.134.117.258.201.371.015.02.031.038.047.057.093.113.198.217.32.299l.004.002c.125.083.265.142.412.185.014.004.024.014.038.017l26.199 6.872a1.495 1.495 0 0 0 1.297-.264 1.5 1.5 0 0 0 .583-1.188V8.372a1.5 1.5 0 0 0-1.12-1.451L21.505 3h20.37v41.878a1.5 1.5 0 1 0 3 0V1.5a1.5 1.5 0 0 0-1.5-1.5zM23.933 28.838a1.502 1.502 0 0 1 1.855-1.03l7 2a1.5 1.5 0 0 1-.824 2.884l-7-2a1.5 1.5 0 0 1-1.031-1.854z"},null,-1)];function Re(n,t){return e.openBlock(),e.createElementBlock("svg",Pe,Ae)}var V={render:Re};const ze={viewBox:"145 170 460 415",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",class:"icon"},De=[e.createElementVNode("path",{d:"M512.9 530c3-.8 5.2-1.6 8.1-2.3a25.1 25.1 0 0 0 16.3-20 24.1 24.1 0 0 0-10.3-24.4c-4.5-3.7-9.7-6-14.8-8.1a88.5 88.5 0 0 1-11.9-6c-4.4-3-6-7.4-5.2-12.5.8-5.2 3.7-8.2 9-10.4a33.4 33.4 0 0 1 26.6 3.7c1.4-3 2.2-6 3.7-9.6 0 0 0-.8-.8-1.5-3-1.5-5.2-2.2-8.1-3l-10.4-2.2v-9.6h-9.6v10.4c-.7 0-1.5 0-2.2.7-4.5.7-9 3-12.6 6-11.1 8.8-12.6 25.8-.7 35.4a65 65 0 0 0 15.5 9 41 41 0 0 1 12.6 6.6c9.6 7.4 8.1 21.4-3 25.9-2.2.7-5.2 1.5-8.1 1.5a41 41 0 0 1-23-6.7c-.7 3-2.2 6-3 8.9 0 .7 0 1.5.8 2.2 3.7 2.2 7.4 3.7 11.9 4.4 3.7.8 6.6.8 10.3 1.5v10.4h10.4v-10.4z"},null,-1),e.createElementVNode("path",{d:"M510.7 393h-2.2a90.6 90.6 0 0 0-90.3 90.3 91.3 91.3 0 0 0 90.3 91 90.6 90.6 0 0 0 90.2-90.3 89.9 89.9 0 0 0-88-91zm0 161.3h-2.2a71 71 0 0 1 0-142h2.2a71 71 0 0 1 0 142z"},null,-1),e.createElementVNode("path",{d:"M564 350.8 368.6 181.4a11.6 11.6 0 0 0-16.3 0l-68 60.7v-13.4c0-7.4-6-13.3-13.4-13.3h-17c-7.4 0-13.3 6-13.3 13.3v50.4l-84.4 71.7a11.2 11.2 0 0 0 8.2 19.3h55.5v203.5h63.6V458a34.6 34.6 0 0 1 34-34.7c9.7 0 18.5 3.7 24.5 10.3 5.9 6 10.3 14.8 10.3 24.4v116.2h115.4a99.6 99.6 0 0 1-58.4-90.3c0-54 43.7-98.4 97.7-99.1v-14h48.8c10.4-.8 15.6-13.4 8.1-20zm-213.2-2.2h-26.6v-51.8h26.6zm46 0H370v-51.8h26.6z"},null,-1)];function Fe(n,t){return e.openBlock(),e.createElementBlock("svg",ze,De)}var R={render:Fe};const Ie={viewBox:"0 0 512 512",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",class:"icon"},He=[e.createElementVNode("path",{d:"M251.092.049C121.207 2.652 16.552 109.664 16.696 239.575c.083 75.073 34.866 141.875 89.043 185.668v70.062c0 9.22 7.475 16.696 16.696 16.696h33.391c9.22 0 16.696-7.475 16.696-16.696v-32.919c0-8.99 6.909-16.726 15.889-17.149 9.588-.451 17.503 7.188 17.503 16.677v33.391c0 9.22 7.475 16.696 16.696 16.696s16.696-7.475 16.696-16.696v-32.919c0-8.99 6.909-16.726 15.889-17.149 9.588-.451 17.503 7.188 17.503 16.677v33.391c0 9.22 7.475 16.696 16.696 16.696s16.696-7.475 16.696-16.696v-32.919c0-8.99 6.909-16.726 15.889-17.149 9.588-.451 17.503 7.188 17.503 16.677v33.391c0 9.22 7.475 16.696 16.696 16.696h33.391c9.22 0 16.696-7.475 16.696-16.696v-70.062c54.242-43.845 89.043-110.756 89.043-185.938C495.305 105.508 385.502-2.643 251.092.049zM150.261 322.783c-36.883 0-66.783-29.9-66.783-66.783s29.9-66.783 66.783-66.783 66.783 29.9 66.783 66.783-29.9 66.783-66.783 66.783zm150.934 61.891a16.642 16.642 0 0 1-11.804 4.892 16.643 16.643 0 0 1-11.805-4.892L256 363.087l-21.587 21.587c-6.521 6.521-17.087 6.521-23.609 0-6.521-6.521-6.521-17.087 0-23.609l33.391-33.391c6.521-6.521 17.087-6.521 23.609 0l33.391 33.391c6.523 6.522 6.523 17.087 0 23.609zm60.544-61.891c-36.883 0-66.783-29.9-66.783-66.783s29.9-66.783 66.783-66.783 66.783 29.9 66.783 66.783-29.9 66.783-66.783 66.783z"},null,-1)];function Ue(n,t){return e.openBlock(),e.createElementBlock("svg",Ie,He)}var x={render:Ue};const qe={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 122.877 101.052"},Oe=[e.createElementVNode("path",{fill:"#fff",d:"M4.43 63.63A14.383 14.383 0 0 1 .003 53.52a14.393 14.393 0 0 1 4.015-10.281 14.372 14.372 0 0 1 10.106-4.425 14.373 14.373 0 0 1 10.283 4.012l24.787 23.851L98.543 3.989l1.768 1.349-1.77-1.355a2.27 2.27 0 0 1 .479-.466A14.383 14.383 0 0 1 109.243.022V.018l.176.016c3.623.24 7.162 1.85 9.775 4.766a14.383 14.383 0 0 1 3.662 10.412h.004l-.016.176a14.362 14.362 0 0 1-4.609 9.632L59.011 97.11l.004.004a2.157 2.157 0 0 1-.372.368 14.392 14.392 0 0 1-9.757 3.569 14.381 14.381 0 0 1-9.741-4.016L4.43 63.63z"},null,-1)];function Ke(n,t){return e.openBlock(),e.createElementBlock("svg",qe,Oe)}var Le={render:Ke},Xt="";const Te={name:"ServerItem",components:{IconContract:A,IconDoor:V,IconSkull:x,IconTick:Le},props:{server:{type:Object,required:!0},cracksOwned:{type:Array,default:()=>[]}},setup(n){const t=d=>["home",...d.slice(1).map(l=>`connect ${l}`)],a=d=>[...t(d),...n.cracksOwned.slice(0,n.server.numOpenPortsRequired).map(l=>`run ${l}`),"run NUKE.exe"];return{backdoor:()=>E([...a(n.server.ancestors),"backdoor"]),join:()=>E(t(n.server.ancestors)),root:()=>E(a(n.server.ancestors)),runContract:d=>E([...a(n.server.ancestors),`run ${d}`])}}},je={class:"server"},Ge={class:"cell cell--rooted cell--align-center"},We=["title"],Je={class:"cell cell--backdoored cell--align-center"},Qe=["title"],Xe={class:"cell cell--player-owned cell--align-center"},Ye={class:"cell cell--contracts"},Ze=["title","onClick"],et={class:"cell cell--hostname"},tt=["title"],ot={class:"cell cell--required-hacking-skill"},nt={class:"cell cell--ram"},at={class:"cell cell--ram cell--align-right"},rt={class:"cell cell--security"},st=["title"],lt={class:"cell cell--money-percent cell--align-right"},ct={class:"cell cell--growth"},it={class:"cell cell--threads-to-grow"};function dt(n,t,a,o,s,m){const i=e.resolveComponent("icon-skull"),d=e.resolveComponent("icon-door"),l=e.resolveComponent("icon-tick"),r=e.resolveComponent("icon-contract");return e.openBlock(),e.createElementBlock("tr",je,[e.createElementVNode("td",Ge,[e.createElementVNode("button",{class:"icon-cta",title:a.server.hasRoot.title,onClick:t[0]||(t[0]=(...c)=>o.root&&o.root(...c))},[e.createVNode(i,{class:e.normalizeClass(["icon icon--skull",[`icon--${a.server.hasRoot.className}`]])},null,8,["class"])],8,We)]),e.createElementVNode("td",Je,[e.createElementVNode("button",{class:"icon-cta",title:a.server.hasBackdoor.title,onClick:t[1]||(t[1]=(...c)=>o.backdoor&&o.backdoor(...c))},[e.createVNode(d,{class:e.normalizeClass(["icon icon--door",[`icon--${a.server.hasBackdoor.className}`]])},null,8,["class"])],8,Qe)]),e.createElementVNode("td",Xe,[a.server.purchasedByPlayer?(e.openBlock(),e.createBlock(l,{key:0,class:"icon icon--tick"})):e.createCommentVNode("",!0)]),e.createElementVNode("td",Ye,[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(a.server.contracts,c=>(e.openBlock(),e.createElementBlock("button",{key:c,class:"icon-cta",title:`Run ${c}`,onClick:f=>o.runContract(c)},[e.createVNode(r,{class:"icon icon--door"})],8,Ze))),128))]),e.createElementVNode("td",et,[e.createElementVNode("button",{class:"cta",title:`Connect to ${a.server.hostname}`,onClick:t[2]||(t[2]=(...c)=>o.join&&o.join(...c))},e.toDisplayString(a.server.hostname),9,tt)]),e.createElementVNode("td",ot,e.toDisplayString(a.server.requiredHackingSkillDisplay),1),e.createElementVNode("td",{class:e.normalizeClass(["cell cell--open-ports-required",[`cell--${a.server.portClass}`]])},e.toDisplayString(a.server.portDisplay),3),e.createElementVNode("td",nt,e.toDisplayString(a.server.ramFormatted),1),e.createElementVNode("td",at,e.toDisplayString(a.server.ramUsedPercentageFormatted),1),e.createElementVNode("td",rt,e.toDisplayString(a.server.difficultyDisplay),1),e.createElementVNode("td",{class:"cell cell--money",title:a.server.moneyAvailableFormattedFull},e.toDisplayString(a.server.moneyAvailableFormatted),9,st),e.createElementVNode("td",lt,e.toDisplayString(a.server.moneyAvailablePercentageFormatted),1),e.createElementVNode("td",ct,e.toDisplayString(a.server.serverGrowthDisplay),1),e.createElementVNode("td",it,e.toDisplayString(a.server.growThreadsDisplay),1)])}var mt=B(Te,[["render",dt],["__scopeId","data-v-2e51266e"]]);const z=n=>ut(n).connections,pt=(n,t,a,o)=>{const s=new Intl.NumberFormat,m=new Intl.NumberFormat({currency:"USD"}),i=(l,r=["home"])=>Object.entries(l).map(([c,f])=>[M(C({},d(c)),{ancestors:r.concat(c)}),(f.connections?[...i(f.connections,r.concat(c))]:[]).flat()].flat()),d=l=>{const r=n.getServer(l),c=ht(r,o),f=ft(r,c,a),w=_t(r,o),p=Math.round(r.moneyAvailable),b=Math.round(p/r.moneyMax*100),$=r.ramUsed/r.maxRam*100,_=F(r.hackDifficulty,2),g=n.ls(l,".cct"),S=r.moneyMax?Math.ceil(n.growthAnalyze(l,r.moneyMax/Math.max(r.moneyAvailable,1))):-1;return{hostname:r.hostname,purchasedByPlayer:r.purchasedByPlayer,requiredHackingSkill:r.requiredHackingSkill,requiredHackingSkillDisplay:s.format(r.requiredHackingSkill),hasBackdoor:f,hasRoot:c,openPortCount:r.openPortCount,numOpenPortsRequired:r.numOpenPortsRequired,portDisplay:r.purchasedByPlayer?"":r.numOpenPortsRequired,portClass:w,ramUsed:F(r.ramUsed,2),maxRam:r.maxRam,ramFormatted:r.maxRam?`${r.ramUsed.toFixed(2)}/${r.maxRam}`:"",ramUsedPercentage:$,ramUsedPercentageFormatted:r.maxRam?`${Math.round($)}%`:"",hackDifficulty:_,minDifficulty:r.minDifficulty,difficultyDisplay:p?`${_} (${r.minDifficulty})`:"",moneyAvailable:p,moneyAvailableFormatted:p?`${n.nFormat(p,"$0.000a")}`:"",moneyAvailableFormattedFull:p?`$${m.format(p)}`:null,moneyAvailablePercentage:b,moneyAvailablePercentageFormatted:p?`${b}%`:"",moneyMax:r.moneyMax,serverGrowth:r.serverGrowth,serverGrowthDisplay:r.serverGrowth||"",sortHasBackdoor:f.status,sortHasRoot:c.status,contracts:g,contractsLength:g.length,growThreads:S,growThreadsDisplay:S>0?s.format(S):""}};return i(t).flat()},_t=(n,t)=>n.openPortCount>=n.numOpenPortsRequired?"true":t>=n.numOpenPortsRequired?"maybe":"false",ht=(n,t)=>{let a={className:"true",status:1,title:"This server is rooted"};return n.hasAdminRights||(t>=n.numOpenPortsRequired||n.openPortCount>n.numOpenPortsRequired?(a.className="maybe",a.status=0,a.title="Click to root"):(a.className="false",a.status=-1,a.title=`${n.hostname} needs ${n.numOpenPortsRequired} port${n.numOpenPortsRequired!==1?"s":""} open to root `)),a},ft=(n,{status:t},a)=>{let o={className:"true",title:"This server has a backdoor",status:1};return n.purchasedByPlayer?(o.className="hidden",o.status=-2):n.backdoorInstalled||(t===1&&a>=n.requiredHackingSkill?(o.className="maybe",o.status=0,o.title="Click to install backdoor"):(o.className="false",o.status=-1,o.title=`${n.hostname} has a minimum required hacking skill of ${n.requiredHackingSkill}`)),o},ut=n=>{const t=new Set,a={};return D(n,a,t),a},D=(n,t,a,o="home")=>{a.add(o);const s=n.scan(o).filter((m,i)=>i||o==="home");s.length&&(t.connections={}),s.forEach(m=>{t.connections[m]={},a.has(m)?t.connections[m].duplicate=!0:D(n,t.connections[m],a,m)})},F=(n,t)=>Number(n.toFixed(t));var Yt="";const yt={components:{AppWrapper:Se,IconDoor:V,IconLoan:R,IconSkull:x,ServerItem:mt},props:{id:{type:String,required:!0},appFilePath:{type:String,default:null},versionFilePath:{type:String,default:null}},setup({id:n}){const t=winnerdow[`${n}-ns`],a=e.ref(null),o=e.ref(null),s=e.ref(!0),m=e.ref(z(t)),i=e.ref({}),d=e.ref([]),l=e.computed(()=>{var p;return pt(t,m.value,(p=i.value)==null?void 0:p.hacking,d.value.length).sort((b,$)=>{const _=b[o.value],g=$[o.value];return typeof _=="undefined"&&typeof g=="undefined"?0:typeof _=="string"?s.value?_.localeCompare(g):g.localeCompare(_):s.value?_-g:g-_})}),r=()=>{i.value=t==null?void 0:t.getPlayer(),d.value=c(t),m.value=z(t),setTimeout(r,2e3)};e.onMounted(r);function c(p){return["BruteSSH.exe","SQLInject.exe","HTTPWorm.exe","FTPCrack.exe","relaySMTP.exe"].filter(b=>p.fileExists(b))}return{headers:[{className:"rooted",sortKey:"sortHasRoot",title:"Is server rooted?",component:x},{className:"backdoored",sortKey:"sortHasBackdoor",title:"Is server backdoored?",component:V},{className:"player-owned",sortKey:"purchasedByPlayer",title:"Is server player-owned?",component:R},{className:"contracts",sortKey:"contractsLength",title:"Contracts on the server",component:A},{className:"hostname",sortKey:"hostname",content:"Name"},{className:"required-hacking-skill",sortKey:"requiredHackingSkill",content:"Req. hack",title:"Required hacking skill"},{className:"open-ports-required",sortKey:"numOpenPortsRequired",content:"Ports",title:"Open ports required"},{className:"ram",sortKey:"maxRam",content:"RAM",title:"RAM in-use/total"},{className:"ram-percent",sortKey:"ramUsedPercentage",content:"%"},{className:"security",sortKey:"hackDifficulty",content:"Security",title:"Server security"},{className:"money",sortKey:"moneyMax",content:"Money",title:"Money available/max"},{className:"money-percent",sortKey:"moneyAvailablePercentage",content:"%"},{className:"growth",sortKey:"serverGrowth",content:"Growth",title:"Growth"},{className:"threads-to-grow",sortKey:"growThreads",content:"Grow threads",title:"Threads required to grow to max money"}],playerOwnedCracks:d,servers:l,sortAscending:s,sortKey:o,wrapper:a,applySort:p=>{o.value===p?s.value=!s.value:(o.value=p,s.value=!1,a.value.$el.querySelector(".app__content").scrollTop=0)}}}},gt={class:"list"},kt={class:"list-table"},wt={class:"list__head"},bt=["title","onClick"];function vt(n,t,a,o,s,m){const i=e.resolveComponent("server-item"),d=e.resolveComponent("app-wrapper");return e.openBlock(),e.createBlock(d,e.mergeProps({ref:"wrapper"},M(C({},n.$props),{title:"Server list"})),{default:e.withCtx(()=>[e.createElementVNode("div",gt,[e.createElementVNode("table",kt,[e.createElementVNode("thead",null,[e.createElementVNode("tr",wt,[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(o.headers,(l,r)=>(e.openBlock(),e.createElementBlock("td",{key:r,title:l.title,class:e.normalizeClass(["cell",[`cell--${l.className}`,{"cell--sorting":o.sortKey===l.sortKey,"cell--sorting-reverse":!o.sortAscending}]]),onClick:c=>o.applySort(l.sortKey)},[(e.openBlock(),e.createBlock(e.resolveDynamicComponent(l.component))),e.createTextVNode(" "+e.toDisplayString(l.content),1)],10,bt))),128))])]),e.createElementVNode("tbody",null,[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(o.servers,l=>(e.openBlock(),e.createBlock(i,{key:l.hostname,server:l,"cracks-owned":o.playerOwnedCracks},null,8,["server","cracks-owned"]))),128))])])])]),_:1},16)}var Nt=B(yt,[["render",vt],["__scopeId","data-v-430e8701"]]);const $t="server-list";var Bt=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",id:$t}),Ct={repositoryBranch:"master",repositoryRaw:"https://raw.githubusercontent.com/PhilipArmstead/bitburner-theme-browser"};const{repositoryBranch:I,repositoryRaw:H}=Ct,U="server-list";var Et={appFilePath:`${H}/${I}/apps/${U}/dist/main.js`,versionFilePath:`${H}/${I}/apps/${U}/dist/version.txt`},q=C(C({},Et),Bt);e.createApp(Nt,q).mount(`#${q.id}`)})(Vue);

}
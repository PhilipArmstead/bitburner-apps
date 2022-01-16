export async function main(ns) {


	// Boilerplate
	const doc = globalThis['document']
	const id = 'macros-app'
	globalThis[`${id}-version`] = '0.0.8'

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
const bundledCss = ".app-container[data-v-8b75c2ee]{bottom:0;left:0;pointer-events:none;position:fixed;top:0;width:100%;z-index:1510}.app-container.app--can-resize .app[data-v-8b75c2ee]{resize:both}.app-container.app--is-minimised .app[data-v-8b75c2ee]{height:auto!important;min-height:0;min-width:0;resize:none}.app-container.app--is-minimised .app .app__content[data-v-8b75c2ee]{display:none}.app-container *[data-v-8b75c2ee]{box-sizing:border-box}.app-container .app[data-v-8b75c2ee]{align-items:flex-start;border:1px solid #4E4E4E6B;display:inline-flex;flex-direction:column;left:0;height:500px;overflow:hidden;pointer-events:auto;position:absolute;resize:none;top:0;transform:translate(-50%,-52%);width:300px}.app-container .app__toolbar[data-v-8b75c2ee]{background:#111;color:#fff;display:flex;padding:4px 3px 4px 8px;user-select:none;width:100%}.app-container .app__title[data-v-8b75c2ee]{align-self:center;flex:0 1 100%;font-family:var(--font-family, monospace);font-size:13px;font-weight:700;line-height:1;margin:0 20px 0 0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.app-container .app__cta-group[data-v-8b75c2ee]{align-items:center;display:flex;flex:0 1 100%;justify-content:flex-end;margin-left:auto}.app-container .app__cta-group>*[data-v-8b75c2ee]{background-position:50% 50%;background-size:14px auto;flex:0 1 auto}.app-container .app__cta-group .icon[data-v-8b75c2ee]{width:16px}.app-container .app__cta-group .icon--restore[data-v-8b75c2ee]{color:#d6cec8}.app-container .app__cta-group .icon--update[data-v-8b75c2ee]{color:#6bd700}.app-container .app__cta-group .btn[data-v-8b75c2ee]{background:none;border:none;color:#a9a9a9;cursor:pointer;display:flex}.app-container .app__icon[data-v-8b75c2ee]{align-self:center;max-height:16px;margin-right:6px;object-fit:contain;width:16px}.app-container .app__menu[data-v-8b75c2ee]{width:100%;background:#d4d0c8;color:#333;padding-left:5px;padding-bottom:2px}.app-container .app__menu span[data-v-8b75c2ee]{border:1px inset transparent;cursor:pointer;font-size:15px;margin-right:12px;padding:0 1px}.app-container .app__menu span[data-v-8b75c2ee]:hover{border:1px inset #BDBDBD}.app-container .app__content[data-v-8b75c2ee]{flex:0 1 100%;overflow:auto;scrollbar-color:var(--primary, #272727) var(--primarydark, #B7B7B7);scrollbar-width:thin;width:100%}.app-container .app__content[data-v-8b75c2ee]::-webkit-scrollbar{display:block;width:10px}.app-container .app__content[data-v-8b75c2ee]::-webkit-scrollbar-track{background-color:var(--primarydark, #B7B7B7)}.app-container .app__content[data-v-8b75c2ee]::-webkit-scrollbar-thumb{background-color:var(--primary, #272727)}.app-container .app .btn[data-v-8b75c2ee]{background:none;box-shadow:none}.modal[data-v-0be2425c]{background:#FFF;border:1px solid #0003;border-radius:6px;display:flex;flex-wrap:wrap;left:50%;padding:24px;position:absolute;top:50%;transform:translate(-50%,-50%);width:40vw}.modal__title[data-v-0be2425c]{color:#212529;font-size:20px;font-weight:500;line-height:1.5;margin:0}.modal__message[data-v-0be2425c]{line-height:1.4}.modal__ctas[data-v-0be2425c],.modal__message[data-v-0be2425c]{flex:1 0 100%;margin:16px 0 0}.modal__ctas[data-v-0be2425c]{display:flex;justify-content:flex-end}.modal .cta[data-v-0be2425c]{border:1px solid transparent;border-radius:4px;cursor:pointer;display:inline-block;font-weight:400;font-size:16px;line-height:1.5;margin-left:12px;padding:6px 12px;text-align:center;transition:.15s ease-in-out;transition-property:color,background-color,border-color,box-shadow;vertical-align:middle}.modal .cta[data-v-0be2425c]:hover{text-decoration:none}.modal .cta--cancel[data-v-0be2425c]{background-color:#6c757d;border-color:#6c757d;color:#fff}.modal .cta--cancel[data-v-0be2425c]:hover{background-color:#5a6268;border-color:#545b62;color:#fff}.modal .cta--cancel[data-v-0be2425c]:active{background-color:#545b62;border-color:#4e555b;color:#fff}.modal .cta--confirm[data-v-0be2425c]{background-color:#28a745;border-color:#28a745;color:#fff}.modal .cta--confirm[data-v-0be2425c]:hover{background-color:#218838;border-color:#1e7e34;color:#fff}.modal .cta--confirm[data-v-0be2425c]:active{background-color:#1e7e34;border-color:#1c7430;color:#fff}.app-wrapper[data-v-ac30e006],.update-modal[data-v-ac30e006],button[data-v-ac30e006]{font-family:Fira Sans,Trebuchet MS,Ubuntu,Helvetica,Arial,sans-serif}.update-modal[data-v-ac30e006]{background:rgba(51,51,51,.7);height:100%;left:0;position:fixed;top:0;width:100%;z-index:1512}[data-v-136ca352] .app-container .app{height:400px;width:250px}.macro-list[data-v-136ca352]{align-content:flex-start;background:var(--backgroundprimary, #171A22);box-sizing:border-box;display:flex;flex-wrap:wrap;justify-content:flex-start;min-height:100%;padding:6px}.macro[data-v-136ca352]{margin:0 15px 8px 3px}.macro__group[data-v-136ca352]{display:flex;flex:1 0 100%;flex-wrap:wrap}.macro__title[data-v-136ca352]{color:var(--secondary, #FFF);flex:1 0 100%;font-family:Fira Sans,Trebuchet MS,Ubuntu,Helvetica,Arial,sans-serif;font-size:16px}.macro__cta[data-v-136ca352]{background:none;border:none;border-radius:2px;box-shadow:0 0 0 1px var(--primary-dark, #444);color:var(--primary, #17af17);cursor:pointer;font-family:var(--fontfamily, monospace);line-height:1;margin:0;padding:6px 8px;transition:box-shadow .2s linear;width:auto}.macro__cta[data-v-136ca352]:hover{box-shadow:0 0 0 1px var(--primary-light, #BBB)}\n"

// Don't worry about it.
function mount() {
	const winnerdow = globalThis
	const rockument = globalThis['document'];
	var Ue=Object.defineProperty,Ie=Object.defineProperties;var ze=Object.getOwnPropertyDescriptors;var I=Object.getOwnPropertySymbols;var Fe=Object.prototype.hasOwnProperty,Oe=Object.prototype.propertyIsEnumerable;var z=(e,r,d)=>r in e?Ue(e,r,{enumerable:!0,configurable:!0,writable:!0,value:d}):e[r]=d,k=(e,r)=>{for(var d in r||(r={}))Fe.call(r,d)&&z(e,d,r[d]);if(I)for(var d of I(r))Oe.call(r,d)&&z(e,d,r[d]);return e},F=(e,r)=>Ie(e,ze(r));(function(e){"use strict";function r(n,t){rockument.body.dispatchEvent(new CustomEvent(n,{detail:t}))}const d=n=>{var a,o;const t=rockument.getElementById("terminal-input");if(!t)(a=winnerdow.appNotifier)==null||a.toast("The terminal must be visible","warning");else if(t.hasAttribute("disabled"))(o=winnerdow.appNotifier)==null||o.toast("The terminal must not be in use","warning");else{t.value=n;const i=Object.keys(t)[1];return t[i].onChange({target:t}),t[i].onKeyDown({keyCode:13,preventDefault:()=>null}),!0}return!1},O=n=>d(n.join("; ")),P=async(n,t)=>{const a=await fetch(t).then(o=>o.text());return H(a,n)?a:null},H=(n,t)=>{const a=n.split(".").map(Number),o=t.split(".").map(Number);for(let i=0;i<a.length;++i){if(a[i]>o[i])return!0;if(o[i]>a[i])return!1}return!1},j={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 18 18"},D=[e.createElementVNode("g",{stroke:"currentColor","stroke-width":"1.5"},[e.createElementVNode("path",{d:"m3 3 12 12M15 3 3 15"})],-1)];function R(n,t){return e.openBlock(),e.createElementBlock("svg",j,D)}var W={render:R};const L={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 18 18"},T=[e.createElementVNode("path",{d:"M3 13h12v2H3z",fill:"currentColor"},null,-1)];function G(n,t){return e.openBlock(),e.createElementBlock("svg",L,T)}var q={render:G};const K={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 18 18"},J=[e.createStaticVNode('<path d="M5 1.5h11v3H5z"></path><g fill="currentColor" stroke="#000" stroke-width="1.6"><path d="M5.8 4.3h9.4v6.5H5.8z"></path><path d="M1.8 9h9.4v6.5H1.8z"></path></g><path d="M1 6.2h11v3H1z"></path>',3)];function Q(n,t){return e.openBlock(),e.createElementBlock("svg",K,J)}var X={render:Q};const Y={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 417 417"},Z=[e.createElementVNode("path",{fill:"#FFF",d:"M120 90h180v235H120z"},null,-1),e.createElementVNode("path",{fill:"currentColor",d:"M208.5 417a208.5 208.5 0 1 0 0-417 208.5 208.5 0 0 0 0 417zm-81.3-197.5 68.3-118.3a15 15 0 0 1 26 0l68.2 118.3a15 15 0 0 1-13 22.5h-33.2v66.2a15 15 0 0 1-15 15h-40a15 15 0 0 1-15-15V242h-33.3a15 15 0 0 1-13-22.5z"},null,-1)];function ee(n,t){return e.openBlock(),e.createElementBlock("svg",Y,Z)}var te={render:ee},We="",v=(n,t)=>{const a=n.__vccOpts||n;for(const[o,i]of t)a[o]=i;return a};const oe={name:"AppContainer",components:{IconClose:W,IconMinimise:q,IconRestore:X,IconUpdate:te},props:{title:{type:String,required:!0},availableUpdate:{type:[String,Promise],default:null},versionFilePath:{type:String,default:null},id:{type:String,default:null},options:{type:Object,default:()=>({})}},setup({options:n}){const t=e.ref(null),a=e.ref(!1),o=e.ref(),i=e.ref(),p=e.ref(),s=e.ref(),m=e.ref(),c=e.ref(),h=e.ref();let l={},w={};const y=e.ref(!1),$=Object.assign({canDrag:!0,canMinimise:!0,canResize:!0},n),S=()=>{const _=t.value.offsetWidth,g=t.value.offsetHeight;s.value=winnerdow.innerWidth,m.value=winnerdow.innerHeight,c.value=s.value/2-_/2,h.value=m.value/2-g/2};e.onMounted(()=>{$.canResize?new ResizeObserver(([{borderBoxSize:[{inlineSize:_,blockSize:g}]}])=>{a.value&&!y.value&&(o.value=_,i.value=g),a.value=!0}).observe(t.value):a.value=!0,$.canDrag&&S()});const Se=({x:_,y:g,button:u})=>{if(!$.canDrag)return;const f=rockument.body;u||(l={x:_,y:g},o.value=t.value.offsetWidth,i.value=t.value.offsetHeight,w={x:c.value,y:h.value},s.value=winnerdow.innerWidth,m.value=winnerdow.innerHeight,f.addEventListener("mousemove",x),f.addEventListener("mouseup",b),f.addEventListener("mouseleave",b))},b=()=>{const _=rockument.body;_.removeEventListener("mousemove",x),_.removeEventListener("mouseup",b),_.removeEventListener("mouseleave",b)};e.onUnmounted(b);const x=({x:_,y:g})=>{let u=w.x+(_-l.x),f=w.y+(g-l.y);const A=u<0,xe=u+o.value>s.value;(A||xe)&&(A?u=0:u=s.value-o.value,w.x=u,l.x=Math.max(Math.min(_,s.value-5),5));const U=f<0,Ae=f+i.value>m.value;(U||Ae)&&(U?f=0:f=m.value-i.value,w.y=f,l.y=Math.max(Math.min(g,m.value),5)),c.value=u,h.value=f};return{isMinimised:y,left:c,process:t,processHeight:i,processWidth:o,top:h,windowOptions:$,beginGrabbing:Se,setPosition:S,toggleMinimise:()=>{y.value||(p.value=i.value),y.value=!y.value,y.value||(i.value=p.value)}}}},ne={class:"app__title"},ae={class:"app__cta-group"},ie=["title"],se={class:"app__content"};function re(n,t,a,o,i,p){const s=e.resolveComponent("icon-update"),m=e.resolveComponent("icon-minimise"),c=e.resolveComponent("icon-restore"),h=e.resolveComponent("icon-close");return e.openBlock(),e.createElementBlock("div",{class:e.normalizeClass(["app-container",{"app--is-minimised":o.isMinimised,"app--can-resize":o.windowOptions.canResize}])},[e.createElementVNode("div",{ref:"process",class:"app",style:e.normalizeStyle({transform:`translate(${o.left}px, ${o.top}px)`,width:`${o.processWidth}px`,height:`${o.processHeight}px`})},[e.createElementVNode("div",{class:"app__toolbar",onMousedown:t[6]||(t[6]=(...l)=>o.beginGrabbing&&o.beginGrabbing(...l))},[e.createElementVNode("h1",ne,e.toDisplayString(a.title),1),e.createElementVNode("div",ae,[a.availableUpdate?(e.openBlock(),e.createElementBlock("button",{key:0,class:"btn btn--small app__cta-update-available",title:`Version ${a.availableUpdate} is available`,onClick:t[0]||(t[0]=l=>n.$emit("app:click:update")),onMousedown:t[1]||(t[1]=e.withModifiers(()=>{},["stop"]))},[e.createVNode(s,{class:"icon icon--update"})],40,ie)):e.createCommentVNode("",!0),o.windowOptions.canMinimise?(e.openBlock(),e.createElementBlock("button",{key:1,class:"btn btn--small app__cta-minimise",onClick:t[2]||(t[2]=(...l)=>o.toggleMinimise&&o.toggleMinimise(...l)),onMousedown:t[3]||(t[3]=e.withModifiers(()=>{},["stop"]))},[e.withDirectives(e.createVNode(m,{class:"icon icon--minimise"},null,512),[[e.vShow,!o.isMinimised]]),e.withDirectives(e.createVNode(c,{class:"icon icon--restore"},null,512),[[e.vShow,o.isMinimised]])],32)):e.createCommentVNode("",!0),e.createElementVNode("button",{class:"btn btn--small app__cta-close",title:"Close",onClick:t[4]||(t[4]=l=>n.$emit("app:close")),onMousedown:t[5]||(t[5]=e.withModifiers(()=>{},["stop"]))},[e.createVNode(h,{class:"icon icon--close"})],32)])],32),e.createElementVNode("div",se,[e.renderSlot(n.$slots,"default",{},void 0,!0)])],4)],2)}var le=v(oe,[["render",re],["__scopeId","data-v-8b75c2ee"]]),Le="";const ce={name:"UpdateModal",props:{appFilePath:{type:String,default:null},id:{type:String,default:null},version:{type:String,default:null}},setup({appFilePath:n,id:t}){const a=e.ref(null),o=e.ref(!1);return{element:a,hasUpdated:o,doUpdate:()=>r(`app:update:${t}`,{element:a.value,path:n}),updateComplete:()=>o.value=!0}}},E=n=>(e.pushScopeId("data-v-0be2425c"),n=n(),e.popScopeId(),n),de={class:"modal__title"},pe={class:"modal__ctas"},me=E(()=>e.createElementVNode("h1",{class:"modal__title"}," App successfully updated ",-1)),_e=E(()=>e.createElementVNode("p",{class:"modal__message"}," Restart the app in your own time to get the latest version. ",-1)),fe={class:"modal__ctas"};function he(n,t,a,o,i,p){return e.openBlock(),e.createElementBlock("div",{ref:"element",onClick:t[4]||(t[4]=e.withModifiers(s=>n.$emit("modal:close"),["stop"])),"onApp:updated":t[5]||(t[5]=(...s)=>o.updateComplete&&o.updateComplete(...s))},[e.createElementVNode("div",{class:"modal",onClick:t[3]||(t[3]=e.withModifiers(()=>{},["stop"]))},[o.hasUpdated?(e.openBlock(),e.createElementBlock(e.Fragment,{key:1},[me,_e,e.createElementVNode("div",fe,[e.createElementVNode("button",{class:"cta cta--confirm",onClick:t[2]||(t[2]=s=>n.$emit("modal:close"))}," Okay! ")])],64)):(e.openBlock(),e.createElementBlock(e.Fragment,{key:0},[e.createElementVNode("h1",de," Do you want to update to v"+e.toDisplayString(a.version)+"? ",1),e.createElementVNode("div",pe,[e.createElementVNode("button",{class:"cta cta--cancel",onClick:t[0]||(t[0]=s=>n.$emit("modal:close"))}," Nope "),e.createElementVNode("button",{class:"cta cta--confirm",onClick:t[1]||(t[1]=(...s)=>o.doUpdate&&o.doUpdate(...s))}," Sure! ")])],64))])],544)}var ge=v(ce,[["render",he],["__scopeId","data-v-0be2425c"]]),Te="";const ue={name:"AppWrapper",components:{AppContainer:le,UpdateModal:ge},props:{title:{type:String,default:null},id:{type:String,default:null},appFilePath:{type:String,default:null},versionFilePath:{type:String,default:null},windowOptions:{type:Object,default:()=>({})}},setup({appFilePath:n,id:t,versionFilePath:a}){const o=e.ref(!1),i=e.ref(null);return e.onMounted(async()=>{n&&a&&(i.value=await P(winnerdow[`${t}-version`]||"0.0.0",a))}),{availableUpdate:i,showUpdateModal:o,destroy:()=>rockument.getElementById(t).remove()}}},we={class:"app-wrapper"};function ye(n,t,a,o,i,p){const s=e.resolveComponent("app-container"),m=e.resolveComponent("update-modal");return e.openBlock(),e.createElementBlock("div",we,[e.createVNode(s,e.mergeProps({title:a.title,availableUpdate:o.availableUpdate,options:a.windowOptions},{class:"app-container","onApp:click:update":t[0]||(t[0]=c=>o.showUpdateModal=!0),"onApp:close":o.destroy}),{default:e.withCtx(()=>[e.renderSlot(n.$slots,"default",{},void 0,!0)]),_:3},16,["onApp:close"]),o.showUpdateModal?(e.openBlock(),e.createBlock(m,e.mergeProps({key:0},{appFilePath:a.appFilePath,id:a.id},{version:o.availableUpdate,class:"update-modal","onModal:close":t[1]||(t[1]=c=>o.showUpdateModal=!1),"onApp:updated":t[2]||(t[2]=c=>o.availableUpdate=null)}),null,16,["version"])):e.createCommentVNode("",!0)])}var be=v(ue,[["render",ye],["__scopeId","data-v-ac30e006"]]);const ke="macros-app";var B=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",id:ke}),Ge="";const ve={components:{AppWrapper:be},props:{id:{type:String,required:!0},appFilePath:{type:String,default:null},versionFilePath:{type:String,default:null}},setup({id:n}){const t=e.ref({}),a=()=>{const o=winnerdow[`${n}-macro-list`]||{};t.value=k({uncategorised:Object.fromEntries(Object.entries(o).filter(([,i])=>Array.isArray(i)).map(([i,p])=>[i,p]))},Object.fromEntries(Object.entries(o).filter(([,i])=>!Array.isArray(i)).map(([i,p])=>[i,p])))};return e.onMounted(()=>a()),{config:B,items:t,inputTerminalCommands:O}}},$e={class:"macro-list"},Ee={key:0,class:"macro__title"},Be=["onClick"];function Me(n,t,a,o,i,p){const s=e.resolveComponent("app-wrapper");return e.openBlock(),e.createBlock(s,e.normalizeProps(e.guardReactiveProps(F(k({},n.$props),{title:"Macros"}))),{default:e.withCtx(()=>[e.createElementVNode("div",$e,[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(o.items,(m,c)=>(e.openBlock(),e.createElementBlock("div",{key:c,class:"macro__group"},[c!=="uncategorised"?(e.openBlock(),e.createElementBlock("h1",Ee,e.toDisplayString(c),1)):e.createCommentVNode("",!0),(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(m,(h,l)=>(e.openBlock(),e.createElementBlock("div",{key:l,class:"macro"},[e.createElementVNode("button",{class:"macro__cta",onClick:w=>o.inputTerminalCommands(h)},e.toDisplayString(l),9,Be)]))),128))]))),128))])]),_:1},16)}var Ce=v(ve,[["render",Me],["__scopeId","data-v-136ca352"]]),Ve={repositoryBranch:"master",repositoryRaw:"https://raw.githubusercontent.com/PhilipArmstead/bitburner-theme-browser"};const{repositoryBranch:M,repositoryRaw:C}=Ve,V="macros";var Ne={appFilePath:`${C}/${M}/apps/${V}/dist/main.js`,versionFilePath:`${C}/${M}/apps/${V}/dist/version.txt`},N=k(k({},Ne),B);e.createApp(Ce,N).mount(`#${N.id}`)})(Vue);

}
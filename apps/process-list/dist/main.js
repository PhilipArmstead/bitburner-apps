export async function main(ns) {


	// Boilerplate
	const doc = globalThis['document']
	const id = 'process-list'
	globalThis[`${id}-version`] = '0.0.67'

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

	doc.body.addEventListener('app:update:process-list', updateApp)

	// Unset some stuff on app death
	ns.atExit(() => {
		doc.getElementById(id)?.remove()
		doc.getElementById(`${id}-css`)?.remove()
		doc.body.removeEventListener('app:update:process-list', updateApp)


	})

	await vueLoad


	const directories = ns.getRunningScript().filename.split('/')
	const currentDirectory = directories.length === 1 ? '' : `/${directories.slice(1, directories.length - 1).join('/')}/`
	const configFilename = `${currentDirectory}config.txt`
	let config = {}

	if (ns.fileExists(configFilename)) {
		try {
			config = JSON.parse(ns.read(configFilename)).processList
		} catch (e) {
			return ns.tprint(e.message)
		}
	} else {
		ns.tprint(`No config file was detected (tried ${configFilename})`)
	}

	globalThis[`${id}-process-list`] = config


	// Let's go
	mount()

	while (doc.getElementById(id)) {
		await ns.asleep(2000)
	}
} 


















// App CSS
const bundledCss = ".app-container[data-v-a48308fa]{bottom:0;left:0;pointer-events:none;position:fixed;top:0;width:100%;z-index:1510}.app-container.app--can-resize .app[data-v-a48308fa]{resize:both}.app-container.app--is-minimised .app[data-v-a48308fa]{height:auto!important;min-height:0;min-width:0;resize:none}.app-container.app--is-minimised .app .app__content[data-v-a48308fa]{display:none}.app-container *[data-v-a48308fa]{box-sizing:border-box}.app-container .app[data-v-a48308fa]{align-items:flex-start;border:1px solid #4E4E4E6B;display:inline-flex;flex-direction:column;left:0;height:500px;overflow:hidden;pointer-events:auto;position:absolute;resize:none;top:0;transform:translate(-50%,-52%);width:300px}.app-container .app__toolbar[data-v-a48308fa]{background:#111;color:#fff;display:flex;padding:4px 3px 4px 8px;user-select:none;width:100%}.app-container .app__title[data-v-a48308fa]{align-self:center;flex:0 1 100%;font-family:var(--font-family, monospace);font-size:13px;font-weight:700;line-height:1;margin:0 20px 0 0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.app-container .app__cta-group[data-v-a48308fa]{align-items:center;display:flex;flex:0 1 100%;justify-content:flex-end;margin-left:auto}.app-container .app__cta-group>*[data-v-a48308fa]{background-position:50% 50%;background-size:14px auto;flex:0 1 auto}.app-container .app__cta-group .icon[data-v-a48308fa]{width:16px}.app-container .app__cta-group .icon--restore[data-v-a48308fa]{color:#d6cec8}.app-container .app__cta-group .icon--update[data-v-a48308fa]{color:#6bd700}.app-container .app__cta-group .btn[data-v-a48308fa]{background:none;border:none;color:#a9a9a9;cursor:pointer;display:flex}.app-container .app__icon[data-v-a48308fa]{align-self:center;max-height:16px;margin-right:6px;object-fit:contain;width:16px}.app-container .app__menu[data-v-a48308fa]{width:100%;background:#d4d0c8;color:#333;padding-left:5px;padding-bottom:2px}.app-container .app__menu span[data-v-a48308fa]{border:1px inset transparent;cursor:pointer;font-size:15px;margin-right:12px;padding:0 1px}.app-container .app__menu span[data-v-a48308fa]:hover{border:1px inset #BDBDBD}.app-container .app__content[data-v-a48308fa]{background:var(--backgroundsecondary, #171A22);flex:0 1 100%;overflow:auto;scrollbar-color:var(--primary, #272727) var(--primarydark, #B7B7B7);scrollbar-width:thin;width:100%}.app-container .app__content[data-v-a48308fa]::-webkit-scrollbar{display:block;width:10px}.app-container .app__content[data-v-a48308fa]::-webkit-scrollbar-track{background-color:var(--primarydark, #B7B7B7)}.app-container .app__content[data-v-a48308fa]::-webkit-scrollbar-thumb{background-color:var(--primary, #272727)}.app-container .app .btn[data-v-a48308fa]{background:none;box-shadow:none}.modal[data-v-01a1e9db]{background:#FFF;border:1px solid #0003;border-radius:6px;display:flex;flex-wrap:wrap;left:50%;padding:24px;position:absolute;top:50%;transform:translate(-50%,-50%);width:40vw}.modal__title[data-v-01a1e9db]{color:#212529;font-size:20px;font-weight:500;line-height:1.5;margin:0}.modal__message[data-v-01a1e9db]{line-height:1.4}.modal__ctas[data-v-01a1e9db],.modal__message[data-v-01a1e9db]{flex:1 0 100%;margin:16px 0 0}.modal__ctas[data-v-01a1e9db]{display:flex;justify-content:flex-end}.modal .cta[data-v-01a1e9db]{border:1px solid transparent;border-radius:4px;cursor:pointer;display:inline-block;font-weight:400;font-size:16px;line-height:1.5;margin-left:12px;padding:6px 12px;text-align:center;transition:.15s ease-in-out;transition-property:color,background-color,border-color,box-shadow;vertical-align:middle}.modal .cta[data-v-01a1e9db]:hover{text-decoration:none}.modal .cta--cancel[data-v-01a1e9db]{background-color:#6c757d;border-color:#6c757d;color:#fff}.modal .cta--cancel[data-v-01a1e9db]:hover{background-color:#5a6268;border-color:#545b62;color:#fff}.modal .cta--cancel[data-v-01a1e9db]:active{background-color:#545b62;border-color:#4e555b;color:#fff}.modal .cta--confirm[data-v-01a1e9db]{background-color:#28a745;border-color:#28a745;color:#fff}.modal .cta--confirm[data-v-01a1e9db]:hover{background-color:#218838;border-color:#1e7e34;color:#fff}.modal .cta--confirm[data-v-01a1e9db]:active{background-color:#1e7e34;border-color:#1c7430;color:#fff}.app-wrapper[data-v-4cc735b8],.update-modal[data-v-4cc735b8],button[data-v-4cc735b8]{font-family:Fira Sans,Trebuchet MS,Ubuntu,Helvetica,Arial,sans-serif}.update-modal[data-v-4cc735b8]{background:rgba(51,51,51,.7);height:100%;left:0;position:fixed;top:0;width:100%;z-index:1512}.process{color:#00a5f3;display:flex;flex:1 0 100%;position:relative}.process.process--type-weaken{color:#f3f330}.process.process--type-hack{color:#33d833}.process__progress-bar{background:currentColor;bottom:0;left:0;opacity:.3;position:absolute;top:0}[data-v-c6a6a626] .app-container .app{height:400px;width:300px}.process-list>*[data-v-c6a6a626]{display:flex;flex-wrap:wrap}.process-list__head[data-v-c6a6a626]{flex:1 0 auto;margin-bottom:4px}.process-list__head .process-cell[data-v-c6a6a626]{display:block}.process-list .process-list__cta[data-v-c6a6a626]{background:none;border:none;color:#fff;cursor:pointer;font:inherit;pointer-events:auto}.process-list .process-cell[data-v-c6a6a626]{padding:2px 1px;text-align:left}.process-list .process-cell[data-v-c6a6a626]:last-child{margin-left:auto;text-align:right}.process-list__category[data-v-c6a6a626]{position:relative;width:100%}.process-list__category[data-v-c6a6a626]:before{background:#FFF;content:\"\";height:2px;left:0;position:absolute;top:53%;width:100%;z-index:0}.process-list .category__name[data-v-c6a6a626]{background:#000;color:#fff;display:inline-block;font-size:14px;margin-left:5px;padding:0 4px;position:relative}\n"

// Don't worry about it.
function mount() {
	const winnerdow = globalThis
	const rockument = globalThis['document'];
	var Ge=Object.defineProperty,qe=Object.defineProperties;var Je=Object.getOwnPropertyDescriptors;var z=Object.getOwnPropertySymbols;var Ke=Object.prototype.hasOwnProperty,Qe=Object.prototype.propertyIsEnumerable;var F=(e,g,w)=>g in e?Ge(e,g,{enumerable:!0,configurable:!0,writable:!0,value:w}):e[g]=w,k=(e,g)=>{for(var w in g||(g={}))Ke.call(g,w)&&F(e,w,g[w]);if(z)for(var w of z(g))Qe.call(g,w)&&F(e,w,g[w]);return e},V=(e,g)=>qe(e,Je(g));(function(e){"use strict";function g(n,t){rockument.body.dispatchEvent(new CustomEvent(n,{detail:t}))}const w=async(n,t)=>{const s=await fetch(t).then(o=>o.text());return O(s,n)?s:null},O=(n,t)=>{const s=n.split(".").map(Number),o=t.split(".").map(Number);for(let r=0;r<s.length;++r){if(s[r]>o[r])return!0;if(o[r]>s[r])return!1}return!1},H={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 18 18"},L=[e.createElementVNode("g",{stroke:"currentColor","stroke-width":"1.5"},[e.createElementVNode("path",{d:"m3 3 12 12M15 3 3 15"})],-1)];function W(n,t){return e.openBlock(),e.createElementBlock("svg",H,L)}var j={render:W};const T={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 18 18"},G=[e.createElementVNode("path",{d:"M3 13h12v2H3z",fill:"currentColor"},null,-1)];function q(n,t){return e.openBlock(),e.createElementBlock("svg",T,G)}var J={render:q};const K={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 18 18"},Q=[e.createStaticVNode('<path d="M5 1.5h11v3H5z"></path><g fill="currentColor" stroke="#000" stroke-width="1.6"><path d="M5.8 4.3h9.4v6.5H5.8z"></path><path d="M1.8 9h9.4v6.5H1.8z"></path></g><path d="M1 6.2h11v3H1z"></path>',3)];function X(n,t){return e.openBlock(),e.createElementBlock("svg",K,Q)}var Y={render:X};const Z={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 417 417"},ee=[e.createElementVNode("path",{fill:"#FFF",d:"M120 90h180v235H120z"},null,-1),e.createElementVNode("path",{fill:"currentColor",d:"M208.5 417a208.5 208.5 0 1 0 0-417 208.5 208.5 0 0 0 0 417zm-81.3-197.5 68.3-118.3a15 15 0 0 1 26 0l68.2 118.3a15 15 0 0 1-13 22.5h-33.2v66.2a15 15 0 0 1-15 15h-40a15 15 0 0 1-15-15V242h-33.3a15 15 0 0 1-13-22.5z"},null,-1)];function te(n,t){return e.openBlock(),e.createElementBlock("svg",Z,ee)}var oe={render:te},ot="",E=(n,t)=>{const s=n.__vccOpts||n;for(const[o,r]of t)s[o]=r;return s};const ne={name:"AppContainer",components:{IconClose:j,IconMinimise:J,IconRestore:Y,IconUpdate:oe},props:{title:{type:String,required:!0},availableUpdate:{type:[String,Promise],default:null},versionFilePath:{type:String,default:null},id:{type:String,default:null},options:{type:Object,default:()=>({})}},setup({options:n}){const t=e.ref(null),s=e.ref(!1),o=e.ref(),r=e.ref(),h=e.ref(),a=e.ref(),d=e.ref(),_=e.ref(),u=e.ref();let f={},i={};const l=e.ref(!1),p=Object.assign({canDrag:!0,canMinimise:!0,canResize:!0},n),c=()=>{const y=t.value.offsetWidth,S=t.value.offsetHeight;a.value=winnerdow.innerWidth,d.value=winnerdow.innerHeight,_.value=a.value/2-y/2,u.value=d.value/2-S/2};e.onMounted(()=>{p.canResize?new ResizeObserver(([{borderBoxSize:[{inlineSize:y,blockSize:S}]}])=>{s.value&&!l.value&&(o.value=y,r.value=S),s.value=!0}).observe(t.value):s.value=!0,p.canDrag&&c()});const m=({x:y,y:S,button:$})=>{if(!p.canDrag)return;const b=rockument.body;$||(f={x:y,y:S},o.value=t.value.offsetWidth,r.value=t.value.offsetHeight,i={x:_.value,y:u.value},a.value=winnerdow.innerWidth,d.value=winnerdow.innerHeight,b.addEventListener("mousemove",N),b.addEventListener("mouseup",v),b.addEventListener("mouseleave",v))},v=()=>{const y=rockument.body;y.removeEventListener("mousemove",N),y.removeEventListener("mouseup",v),y.removeEventListener("mouseleave",v)};e.onUnmounted(v);const N=({x:y,y:S})=>{let $=i.x+(y-f.x),b=i.y+(S-f.y);const I=$<0,je=$+o.value>a.value;(I||je)&&(I?$=0:$=a.value-o.value,i.x=$,f.x=Math.max(Math.min(y,a.value-5),5));const D=b<0,Te=b+r.value>d.value;(D||Te)&&(D?b=0:b=d.value-r.value,i.y=b,f.y=Math.max(Math.min(S,d.value),5)),_.value=$,u.value=b};return{isMinimised:l,left:_,process:t,processHeight:r,processWidth:o,top:u,windowOptions:p,beginGrabbing:m,setPosition:c,toggleMinimise:()=>{l.value||(h.value=r.value),l.value=!l.value,l.value||(r.value=h.value)}}}},se={class:"app__title"},ae={class:"app__cta-group"},ie=["title"],re={class:"app__content"};function le(n,t,s,o,r,h){const a=e.resolveComponent("icon-update"),d=e.resolveComponent("icon-minimise"),_=e.resolveComponent("icon-restore"),u=e.resolveComponent("icon-close");return e.openBlock(),e.createElementBlock("div",{class:e.normalizeClass(["app-container",{"app--is-minimised":o.isMinimised,"app--can-resize":o.windowOptions.canResize}])},[e.createElementVNode("div",{ref:"process",class:"app",style:e.normalizeStyle({transform:`translate(${o.left}px, ${o.top}px)`,width:`${o.processWidth}px`,height:`${o.processHeight}px`})},[e.createElementVNode("div",{class:"app__toolbar",onMousedown:t[6]||(t[6]=(...f)=>o.beginGrabbing&&o.beginGrabbing(...f))},[e.createElementVNode("h1",se,e.toDisplayString(s.title),1),e.createElementVNode("div",ae,[s.availableUpdate?(e.openBlock(),e.createElementBlock("button",{key:0,class:"btn btn--small app__cta-update-available",title:`Version ${s.availableUpdate} is available`,onClick:t[0]||(t[0]=f=>n.$emit("app:click:update")),onMousedown:t[1]||(t[1]=e.withModifiers(()=>{},["stop"]))},[e.createVNode(a,{class:"icon icon--update"})],40,ie)):e.createCommentVNode("",!0),o.windowOptions.canMinimise?(e.openBlock(),e.createElementBlock("button",{key:1,class:"btn btn--small app__cta-minimise",onClick:t[2]||(t[2]=(...f)=>o.toggleMinimise&&o.toggleMinimise(...f)),onMousedown:t[3]||(t[3]=e.withModifiers(()=>{},["stop"]))},[e.withDirectives(e.createVNode(d,{class:"icon icon--minimise"},null,512),[[e.vShow,!o.isMinimised]]),e.withDirectives(e.createVNode(_,{class:"icon icon--restore"},null,512),[[e.vShow,o.isMinimised]])],32)):e.createCommentVNode("",!0),e.createElementVNode("button",{class:"btn btn--small app__cta-close",title:"Close",onClick:t[4]||(t[4]=f=>n.$emit("app:close")),onMousedown:t[5]||(t[5]=e.withModifiers(()=>{},["stop"]))},[e.createVNode(u,{class:"icon icon--close"})],32)])],32),e.createElementVNode("div",re,[e.renderSlot(n.$slots,"default",{},void 0,!0)])],4)],2)}var ce=E(ne,[["render",le],["__scopeId","data-v-a48308fa"]]),nt="";const de={name:"UpdateModal",props:{appFilePath:{type:String,default:null},id:{type:String,default:null},version:{type:String,default:null}},setup({appFilePath:n,id:t}){const s=e.ref(null),o=e.ref(!1);return{element:s,hasUpdated:o,doUpdate:()=>g(`app:update:${t}`,{element:s.value,path:n}),updateComplete:()=>o.value=!0}}},M=n=>(e.pushScopeId("data-v-01a1e9db"),n=n(),e.popScopeId(),n),pe={class:"modal__title"},me={class:"modal__ctas"},_e=M(()=>e.createElementVNode("h1",{class:"modal__title"}," App successfully updated ",-1)),fe=M(()=>e.createElementVNode("p",{class:"modal__message"}," Restart the app in your own time to get the latest version. ",-1)),he={class:"modal__ctas"};function ge(n,t,s,o,r,h){return e.openBlock(),e.createElementBlock("div",{ref:"element",onClick:t[4]||(t[4]=e.withModifiers(a=>n.$emit("modal:close"),["stop"])),"onApp:updated":t[5]||(t[5]=(...a)=>o.updateComplete&&o.updateComplete(...a))},[e.createElementVNode("div",{class:"modal",onClick:t[3]||(t[3]=e.withModifiers(()=>{},["stop"]))},[o.hasUpdated?(e.openBlock(),e.createElementBlock(e.Fragment,{key:1},[_e,fe,e.createElementVNode("div",he,[e.createElementVNode("button",{class:"cta cta--confirm",onClick:t[2]||(t[2]=a=>n.$emit("modal:close"))}," Okay! ")])],64)):(e.openBlock(),e.createElementBlock(e.Fragment,{key:0},[e.createElementVNode("h1",pe," Do you want to update to v"+e.toDisplayString(s.version)+"? ",1),e.createElementVNode("div",me,[e.createElementVNode("button",{class:"cta cta--cancel",onClick:t[0]||(t[0]=a=>n.$emit("modal:close"))}," Nope "),e.createElementVNode("button",{class:"cta cta--confirm",onClick:t[1]||(t[1]=(...a)=>o.doUpdate&&o.doUpdate(...a))}," Sure! ")])],64))])],544)}var ue=E(de,[["render",ge],["__scopeId","data-v-01a1e9db"]]),st="";const we={name:"AppWrapper",components:{AppContainer:ce,UpdateModal:ue},props:{title:{type:String,default:null},id:{type:String,default:null},appFilePath:{type:String,default:null},versionFilePath:{type:String,default:null},windowOptions:{type:Object,default:()=>({})}},setup({appFilePath:n,id:t,versionFilePath:s}){const o=e.ref(!1),r=e.ref(null);return e.onMounted(async()=>{n&&s&&(r.value=await w(winnerdow[`${t}-version`]||"0.0.0",s))}),{availableUpdate:r,showUpdateModal:o,destroy:()=>rockument.getElementById(t).remove()}}},ye={class:"app-wrapper"};function be(n,t,s,o,r,h){const a=e.resolveComponent("app-container"),d=e.resolveComponent("update-modal");return e.openBlock(),e.createElementBlock("div",ye,[e.createVNode(a,e.mergeProps({title:s.title,availableUpdate:o.availableUpdate,options:s.windowOptions},{class:"app-container","onApp:click:update":t[0]||(t[0]=_=>o.showUpdateModal=!0),"onApp:close":o.destroy}),{default:e.withCtx(()=>[e.renderSlot(n.$slots,"default",{},void 0,!0)]),_:3},16,["onApp:close"]),o.showUpdateModal?(e.openBlock(),e.createBlock(d,e.mergeProps({key:0},{appFilePath:s.appFilePath,id:s.id},{version:o.availableUpdate,class:"update-modal","onModal:close":t[1]||(t[1]=_=>o.showUpdateModal=!1),"onApp:updated":t[2]||(t[2]=_=>o.availableUpdate=null)}),null,16,["version"])):e.createCommentVNode("",!0)])}var Se=E(we,[["render",be],["__scopeId","data-v-4cc735b8"]]),at="";const $e={props:{processes:{type:Array,required:!0}}},ve=["title"],ke={class:"process-cell process__threads"};function Ee(n,t,s,o,r,h){return e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(s.processes,({hosts:a,progress:d,target:_,threads:u,type:f},i)=>(e.openBlock(),e.createElementBlock("div",{key:i,class:e.normalizeClass(["process",[`process--type-${f}`]])},[e.createElementVNode("div",{class:"process-cell process__item",title:`Running on ${a}`},[e.createTextVNode(e.toDisplayString(_)+" ",1),e.withDirectives(e.createElementVNode("span",{class:"process__progress-bar",style:e.normalizeStyle({width:`${d}%`})},null,4),[[e.vShow,d]])],8,ve),e.createElementVNode("div",ke,e.toDisplayString(u),1)],2))),128)}var Ne=E($e,[["render",Ee]]);let x=[],B=0;const Ve=n=>(B--||(B=50,x=C(n).filter(n.hasRootAccess).filter(n.getServerMaxRam)),x),C=(n,t="home",s=new Set)=>{s.add(t);for(const o of n.scan(t))s.has(o)||C(n,o,s);return[...s]},Me=n=>Ve(n).filter(n.getServerUsedRam).map(t=>[t,n.ps(t)]),xe=(n,{filename:t,hosts:s,args:o})=>{const r=n.getScriptLogs(t,s[0],...o);let h=r.length,a;const{onlineRunningTime:d,offlineRunningTime:_}=n.getRunningScript(t,s[0],...o),u=d+_,f=new RegExp(/^sleep:.+?([\d.]+)/),l={duration:r.reduce((p,c)=>{const m=c.match(f);return p+(m?Number(m[1]):0)},0)/1e3,timeRunning:u,isSleeping:!0};for(;!a&&h--;)r[h].indexOf(": Executing")!==-1&&(a=r[h]);if(a){l.isSleeping=!1;const p=a.match(/([0-9.])+ /g).map(Number).reverse(),c=[1,60,3600,86400];for(let m=0;m<p.length;++m)l.duration+=p[m]*c[m]}return l};var it="";const Be={components:{AppWrapper:Se,ProcessListItems:Ne},props:{id:{type:String,required:!0},appFilePath:{type:String,default:null},versionFilePath:{type:String,default:null}},setup({id:n}){const t=winnerdow[`${n}-ns`],s=e.ref(null),o=winnerdow[`${n}-payload-list`]||{},r=e.ref({sleeping:[],running:[]}),h=t.flags([["no-group",!1]])["no-group"],a={param:"expiry",isDescending:!0};e.onMounted(d);function d(){s.value&&(r.value=_(),setTimeout(d,200))}const _=()=>{const i=Me(t).map(([l,p])=>[...p.filter(({args:c})=>c.length).map(({filename:c,args:m,threads:v})=>({hosts:[l],args:m,target:m[0],threads:v,filename:c,type:Object.keys(o).find(N=>o[N].includes(c))})).filter(({type:c})=>c)]).flat().map(l=>V(k({},l),{expiry:xe(t,l)}));if(!h)for(let l=0;l<i.length;++l){let p=i.length;for(;--p>l;)i[l].type===i[p].type&&JSON.stringify(i[l].args)===JSON.stringify(i[p].args)&&(i[l].threads+=i[p].threads,i[l].hosts=[...i[l].hosts,...i[p].hosts],i.splice(p,1))}return i.sort((l,p)=>{const c=l[a.param],m=p[a.param];return a.param==="expiry"?c.duration-c.timeRunning-(m.duration-m.timeRunning):typeof c=="string"?a.isDescending?m.localeCompare(c):c.localeCompare(m):a.isDescending?m-c:c-m}),{running:i.filter(({expiry:l})=>!l.isSleeping).map(u),sleeping:i.filter(({expiry:l})=>l.isSleeping).map(u)}},u=i=>V(k({},i),{hosts:i.hosts.join(", "),progress:i.expiry?Math.min(100,i.expiry.timeRunning/i.expiry.duration*100).toFixed(2):0,threads:i.threads.toLocaleString()});return{processes:r,wrapper:s,doSort:i=>{a.param===i?a.isDescending?a.isDescending=!a.isDescending:a.param="expiry":(a.param=i,a.isDescending=!0)}}}},Ce=n=>(e.pushScopeId("data-v-c6a6a626"),n=n(),e.popScopeId(),n),Ue={class:"process-list__container"},Pe={class:"process-list"},Re={class:"process-list__head"},Ae={class:"process-list__body"},Ie={class:"process-list__category"},De=[Ce(()=>e.createElementVNode("h2",{class:"category__name"}," Sleeping ",-1))];function ze(n,t,s,o,r,h){const a=e.resolveComponent("process-list-items"),d=e.resolveComponent("app-wrapper");return e.openBlock(),e.createBlock(d,e.mergeProps({ref:"wrapper"},V(k({},n.$props),{title:"Process list"})),{default:e.withCtx(()=>[e.createElementVNode("div",Ue,[e.createElementVNode("div",Pe,[e.createElementVNode("div",Re,[e.createElementVNode("button",{class:"process-cell process-list__cta",onClick:t[0]||(t[0]=_=>o.doSort("target"))}," Target "),e.createElementVNode("button",{class:"process-cell process-list__cta",onClick:t[1]||(t[1]=_=>o.doSort("threads"))}," Threads ")]),e.createElementVNode("div",Ae,[e.createVNode(a,{processes:o.processes.running},null,8,["processes"]),e.withDirectives(e.createElementVNode("div",Ie,De,512),[[e.vShow,o.processes.sleeping.length]]),e.createVNode(a,{processes:o.processes.sleeping},null,8,["processes"])])])])]),_:1},16)}var Fe=E(Be,[["render",ze],["__scopeId","data-v-c6a6a626"]]);const Oe="process-list";var He=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",id:Oe}),Le={repositoryBranch:"master",repositoryRaw:"https://raw.githubusercontent.com/PhilipArmstead/bitburner-theme-browser"};const{repositoryBranch:U,repositoryRaw:P}=Le,R="process-list";var We={appFilePath:`${P}/${U}/apps/${R}/dist/main.js`,versionFilePath:`${P}/${U}/apps/${R}/dist/version.txt`},A=k(k({},We),He);e.createApp(Fe,A).mount(`#${A.id}`)})(Vue);

}
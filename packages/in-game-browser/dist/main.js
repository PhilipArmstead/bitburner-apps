export async function main(ns) {
	const doc = globalThis['document']
	const id = 'theme-browser-app'
	globalThis[`${id}-version`] = '0.0.24'

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
	doc.body.insertAdjacentHTML('beforeend', `<section id='${id}'></section>`)

	doc.getElementById(`${id}-css`)?.remove()
	doc.head.insertAdjacentHTML('beforeend', `<style id='${id}-css'>${bundledCss}</style>`)

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

	doc.body.addEventListener('theme:preview', previewTheme)
	doc.body.addEventListener('theme:cancel-preview', resetTheme)

	mount()

	while (doc.getElementById(id)) {
		await ns.asleep(2000)
	}

} 





















































const bundledCss = ".app-container[data-v-883d8b06]{bottom:0;left:0;pointer-events:none;position:fixed;top:0;width:100%;z-index:1510}.app-container *[data-v-883d8b06]{box-sizing:border-box}.app-container .app[data-v-883d8b06]{align-items:flex-start;border:1px solid #4E4E4E6B;display:inline-flex;flex-direction:column;left:50%;height:90vh;overflow:hidden;pointer-events:auto;position:absolute;resize:none;top:50%;transform:translate(-50%,-52%);width:90vw}.app-container .app__toolbar[data-v-883d8b06]{background:#111;color:#fff;display:flex;padding:4px 3px 4px 8px;user-select:none;width:100%}.app-container .app__title[data-v-883d8b06]{align-self:center;flex:0 1 100%;font-family:var(--font-family, monospace);font-size:13px;font-weight:700;line-height:1;margin:0 20px 0 0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.app-container .app__cta-group[data-v-883d8b06]{align-items:center;display:flex;flex:0 1 100%;justify-content:flex-end;margin-left:auto}.app-container .app__cta-group>*[data-v-883d8b06]{background-position:50% 50%;background-size:14px auto;flex:0 1 auto}.app-container .app__cta-group .icon[data-v-883d8b06]{width:16px}.app-container .app__cta-group .icon--restore[data-v-883d8b06]{color:#d6cec8}.app-container .app__cta-group .icon--update[data-v-883d8b06]{color:#6bd700}.app-container .app__cta-group .btn[data-v-883d8b06]{background:none;border:none;color:#a9a9a9;cursor:pointer;display:flex}.app-container .app__icon[data-v-883d8b06]{align-self:center;max-height:16px;margin-right:6px;object-fit:contain;width:16px}.app-container .app__menu[data-v-883d8b06]{width:100%;background:#d4d0c8;color:#333;padding-left:5px;padding-bottom:2px}.app-container .app__menu span[data-v-883d8b06]{border:1px inset transparent;cursor:pointer;font-size:15px;margin-right:12px;padding:0 1px}.app-container .app__menu span[data-v-883d8b06]:hover{border:1px inset #BDBDBD}.app-container .app__content[data-v-883d8b06]{flex:0 1 100%;font-family:Fira Sans,Trebuchet MS,Ubuntu,Helvetica,Arial,sans-serif;overflow:auto;scrollbar-color:var(--primary, #272727) var(--primarydark, #B7B7B7);scrollbar-width:thin;width:100%}.app-container .app__content[data-v-883d8b06]::-webkit-scrollbar{display:block;width:10px}.app-container .app__content[data-v-883d8b06]::-webkit-scrollbar-track{background-color:var(--primarydark, #B7B7B7)}.app-container .app__content[data-v-883d8b06]::-webkit-scrollbar-thumb{background-color:var(--primary, #272727)}.app-container .app .btn[data-v-883d8b06]{background:none;box-shadow:none}.modal[data-v-3500e91b]{background:#FFF;border:1px solid #0003;border-radius:6px;display:flex;flex-wrap:wrap;left:50%;padding:24px;position:absolute;top:50%;transform:translate(-50%,-50%);width:40vw}.modal__title[data-v-3500e91b]{color:#212529;font-size:20px;font-weight:500;line-height:1.5;margin:0}.modal__message[data-v-3500e91b]{line-height:1.4}.modal__ctas[data-v-3500e91b],.modal__message[data-v-3500e91b]{flex:1 0 100%;margin:16px 0 0}.modal__ctas[data-v-3500e91b]{display:flex;justify-content:flex-end}.modal .cta[data-v-3500e91b]{border:1px solid transparent;border-radius:4px;cursor:pointer;display:inline-block;font-weight:400;font-size:16px;line-height:1.5;margin-left:12px;padding:6px 12px;text-align:center;transition:.15s ease-in-out;transition-property:color,background-color,border-color,box-shadow;vertical-align:middle}.modal .cta[data-v-3500e91b]:hover{text-decoration:none}.modal .cta--cancel[data-v-3500e91b]{background-color:#6c757d;border-color:#6c757d;color:#fff}.modal .cta--cancel[data-v-3500e91b]:hover{background-color:#5a6268;border-color:#545b62;color:#fff}.modal .cta--cancel[data-v-3500e91b]:active{background-color:#545b62;border-color:#4e555b;color:#fff}.modal .cta--confirm[data-v-3500e91b]{background-color:#28a745;border-color:#28a745;color:#fff}.modal .cta--confirm[data-v-3500e91b]:hover{background-color:#218838;border-color:#1e7e34;color:#fff}.modal .cta--confirm[data-v-3500e91b]:active{background-color:#1e7e34;border-color:#1c7430;color:#fff}.theme-list[data-v-1ccbb530]{display:flex;flex-wrap:wrap;list-style:none;margin:0;padding:0}.theme-list .theme[data-v-1ccbb530]{box-sizing:border-box;display:flex;flex:0 0 25%;flex-direction:column;margin-bottom:16px;padding:8px}@media (min-width: 1360px){.theme-list .theme[data-v-1ccbb530]{flex-basis:20%}}@media (min-width: 1600px){.theme-list .theme[data-v-1ccbb530]{flex-basis:16.6%}}.theme-list .theme__name[data-v-1ccbb530],.theme-list .theme__author[data-v-1ccbb530],.theme-list .theme__submission-date[data-v-1ccbb530]{margin:8px 0 0}.theme-list .theme__name[data-v-1ccbb530]{font-size:18px}.theme-list .theme__author[data-v-1ccbb530]{color:var(--secondarylight, #DDD);font-size:14px}.theme-list .theme__info[data-v-1ccbb530]{display:flex;display:none;margin-bottom:8px}.theme-list .theme__preview[data-v-1ccbb530]{margin:0 auto;max-height:110px;max-width:100%}.theme-list .theme__submission-date[data-v-1ccbb530]{font-size:12px;margin-left:auto}.theme-list .theme__cta[data-v-1ccbb530]{border:none;border-radius:4px;cursor:pointer;font-size:14px;margin-top:auto;padding:8px 14px;pointer-events:auto}.theme-list .theme__cta--preview[data-v-1ccbb530]{background:var(--button, #4170FB);color:var(--secondarylight, #FFF);box-shadow:0 0 1px 0 var(--welllight);margin-left:auto}.app[data-v-700c2204]{background:var(--backgroundprimary, #333);box-sizing:border-box;color:var(--primary, #FFF);display:flex;flex-direction:column;height:inherit;min-height:100%;padding:24px 32px}.title[data-v-700c2204]{margin:0 0 16px}.preview__ctas[data-v-700c2204]{bottom:0;display:flex;height:150px;justify-content:space-between;position:fixed;right:30px;width:150px}.preview__ctas:not(.preview__ctas--visible) .preview__cta[data-v-700c2204]{pointer-events:none}.preview__ctas:not(.preview__ctas--visible) .preview__cta--cancel[data-v-700c2204]{transform:translate(190px,160px)}.preview__ctas:not(.preview__ctas--visible) .preview__cta--confirm[data-v-700c2204]{transform:translate(110px,160px)}.preview__ctas .preview__cta[data-v-700c2204]{align-items:center;background:no-repeat 50% 50%/30px auto;border:none;border-radius:50%;cursor:pointer;display:flex;flex:0 1 44%;height:66px;justify-content:center;padding:0;position:relative;transition:transform .25s cubic-bezier(.4,0,.2,1)}.preview__ctas .preview__cta--cancel[data-v-700c2204]{background-color:#e33030d4;background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 47.095 47.095'%3E%3Cpath fill='%23FFF' d='m45.363 36.234-13.158-13.16 12.21-12.21a5.906 5.906 0 0 0 0-8.358 5.908 5.908 0 0 0-8.356 0l-12.212 12.21-12.809-12.81a5.91 5.91 0 1 0-8.358 8.358l12.81 12.81L1.732 36.831a5.91 5.91 0 1 0 8.356 8.359l13.759-13.758 13.16 13.16a5.908 5.908 0 0 0 8.356 0 5.907 5.907 0 0 0 0-8.358z'/%3E%3C/svg%3E\");transform:translateY(40px)}.preview__ctas .preview__cta--confirm[data-v-700c2204]{background-color:#72d000d4;background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 122.877 101.052'%3E%3Cpath fill='white' d='M4.43 63.63A14.383 14.383 0 0 1 .003 53.52a14.393 14.393 0 0 1 4.015-10.281 14.372 14.372 0 0 1 10.106-4.425 14.373 14.373 0 0 1 10.283 4.012l24.787 23.851L98.543 3.989l1.768 1.349-1.77-1.355a2.27 2.27 0 0 1 .479-.466A14.383 14.383 0 0 1 109.243.022V.018l.176.016c3.623.24 7.162 1.85 9.775 4.766a14.383 14.383 0 0 1 3.662 10.412h.004l-.016.176a14.362 14.362 0 0 1-4.609 9.632L59.011 97.11l.004.004a2.157 2.157 0 0 1-.372.368 14.392 14.392 0 0 1-9.757 3.569 14.381 14.381 0 0 1-9.741-4.016L4.43 63.63z'/%3E%3C/svg%3E\")}.update-modal[data-v-700c2204]{background:rgba(51,51,51,.7);height:100%;left:0;position:fixed;top:0;width:100%;z-index:1512}.sr-only[data-v-700c2204]{clip:rect(1px,1px,1px,1px);clip-path:inset(50%);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}@keyframes slide-up-left-700c2204{0%{transform:translate(150px,150px)}to{transform:translate(0)}}\n"

function mount() {
	const winnerdow = globalThis
	const rockument = globalThis['document'];
	(function(e){"use strict";const k=async(t,r)=>{const n=await fetch(r).then(a=>a.text());return w(n,t)?n:null},w=(t,r)=>{const n=t.split(".").map(Number),a=r.split(".").map(Number);for(let i=0;i<n.length;++i){if(n[i]>a[i])return!0;if(a[i]>n[i])return!1}return!1};var se="",l=(t,r)=>{const n=t.__vccOpts||t;for(const[a,i]of r)n[a]=i;return n};const y={name:"AppContainer",props:{title:{type:String,required:!0},availableUpdate:{type:[String,Promise],default:null}}},F=t=>(e.pushScopeId("data-v-883d8b06"),t=t(),e.popScopeId(),t),E={class:"app-container"},b={class:"app"},f={class:"app__toolbar"},B={class:"app__title"},A={class:"app__cta-group"},_=["title"],u=[F(()=>e.createElementVNode("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 417 417",class:"icon icon--update"},[e.createElementVNode("path",{fill:"#FFF",d:"M120 90h180v235H120z"}),e.createElementVNode("path",{fill:"currentColor",d:"M208.5 417a208.5 208.5 0 1 0 0-417 208.5 208.5 0 0 0 0 417zm-81.3-197.5 68.3-118.3a15 15 0 0 1 26 0l68.2 118.3a15 15 0 0 1-13 22.5h-33.2v66.2a15 15 0 0 1-15 15h-40a15 15 0 0 1-15-15V242h-33.3a15 15 0 0 1-13-22.5z"})],-1))],D=[F(()=>e.createElementVNode("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 18 18",class:"icon icon--close"},[e.createElementVNode("g",{stroke:"currentColor","stroke-width":"1.5"},[e.createElementVNode("line",{x1:"3",y1:"3",x2:"15",y2:"15"}),e.createElementVNode("line",{x2:"3",y1:"3",x1:"15",y2:"15"})])],-1))],V={class:"app__content"};function N(t,r,n,a,i,d){return e.openBlock(),e.createElementBlock("div",E,[e.createElementVNode("div",b,[e.createElementVNode("div",f,[e.createElementVNode("h1",B,e.toDisplayString(n.title),1),e.createElementVNode("div",A,[n.availableUpdate?(e.openBlock(),e.createElementBlock("button",{key:0,class:"btn btn--small app__cta-update-available",title:`Version ${n.availableUpdate} is available`,onClick:r[0]||(r[0]=o=>t.$emit("app:click:update")),onMousedown:r[1]||(r[1]=e.withModifiers(()=>{},["stop"]))},u,40,_)):e.createCommentVNode("",!0),e.createElementVNode("button",{class:"btn btn--small app__cta-close",title:"Close",onClick:r[2]||(r[2]=o=>t.$emit("app:close")),onMousedown:r[3]||(r[3]=e.withModifiers(()=>{},["stop"]))},D,32)])]),e.createElementVNode("div",V,[e.renderSlot(t.$slots,"default",{},void 0,!0)])])])}var v=l(y,[["render",N],["__scopeId","data-v-883d8b06"]]);function $(t){rockument.getElementById(t).remove()}function h(t,r){rockument.body.dispatchEvent(new CustomEvent(t,{detail:r}))}const p="theme-browser-app",M="https://raw.githubusercontent.com/PhilipArmstead/bitburner-theme-browser/master/packages/in-game-browser/dist/main.js",S="https://raw.githubusercontent.com/PhilipArmstead/bitburner-theme-browser/master/packages/in-game-browser/dist/version.txt";var pe="";const U={name:"UpdateModal",props:{version:{type:String,default:null}},setup(){const t=e.ref(null),r=e.ref(!1);return{element:t,hasUpdated:r,doUpdate:()=>h(`app:update:${p}`,{element:t.value,path:M}),updateComplete:()=>r.value=!0}}},C=t=>(e.pushScopeId("data-v-3500e91b"),t=t(),e.popScopeId(),t),x={class:"modal__title"},G={class:"modal__ctas"},I=C(()=>e.createElementVNode("h1",{class:"modal__title"}," App successfully updated ",-1)),P=C(()=>e.createElementVNode("p",{class:"modal__message"}," Restart the app in your own time to get the latest version. ",-1)),T={class:"modal__ctas"};function L(t,r,n,a,i,d){return e.openBlock(),e.createElementBlock("div",{ref:"element",onClick:r[4]||(r[4]=e.withModifiers(o=>t.$emit("modal:close"),["stop"])),"onApp:updated":r[5]||(r[5]=(...o)=>a.updateComplete&&a.updateComplete(...o))},[e.createElementVNode("div",{class:"modal",onClick:r[3]||(r[3]=e.withModifiers(()=>{},["stop"]))},[a.hasUpdated?(e.openBlock(),e.createElementBlock(e.Fragment,{key:1},[I,P,e.createElementVNode("div",T,[e.createElementVNode("button",{class:"cta cta--confirm",onClick:r[2]||(r[2]=o=>t.$emit("modal:close"))}," Okay! ")])],64)):(e.openBlock(),e.createElementBlock(e.Fragment,{key:0},[e.createElementVNode("h1",x," Do you want to update to v"+e.toDisplayString(n.version)+"? ",1),e.createElementVNode("div",G,[e.createElementVNode("button",{class:"cta cta--cancel",onClick:r[0]||(r[0]=o=>t.$emit("modal:close"))}," Nope "),e.createElementVNode("button",{class:"cta cta--confirm",onClick:r[1]||(r[1]=(...o)=>a.doUpdate&&a.doUpdate(...o))}," Sure! ")])],64))])],544)}var z=l(U,[["render",L],["__scopeId","data-v-3500e91b"]]);function O(t){return new Date(t).toLocaleDateString()}var he="";const R={name:"ThemeList",props:{themes:{type:Array,default:()=>[]}},setup(){return{formatDate:O}}},H={class:"theme-list"},Z=["src"],j={class:"theme__name"},q={class:"theme__author"},W={class:"theme__info"},X={class:"theme__submission-date"},J=["onClick"];function K(t,r,n,a,i,d){return e.openBlock(),e.createElementBlock("ul",H,[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(n.themes,(o,c)=>(e.openBlock(),e.createElementBlock("li",{key:c,class:"theme"},[e.createElementVNode("img",{src:o.preview,alt:"",class:"theme__preview"},null,8,Z),e.createElementVNode("h1",j,e.toDisplayString(o.name),1),e.createElementVNode("h2",q,e.toDisplayString(o.author),1),e.createElementVNode("div",W,[e.createElementVNode("h3",X,e.toDisplayString(a.formatDate(o.submittedOn)),1)]),e.createElementVNode("button",{class:"theme__cta theme__cta--preview",onClick:g=>t.$emit("theme:preview",o.content)}," Preview ",8,J)]))),128))])}var Q=l(R,[["render",K],["__scopeId","data-v-1ccbb530"]]);function Y(){return[{name:"Intense Purple",author:"ZedRiver",content:'{"primarylight":"#FFFFFF","primary":"#FCFCFC","primarydark":"#CCCCCC","successlight":"#16C60C","success":"#14BE0A","successdark":"#0A9602","errorlight":"#E74856","error":"#DC3246","errordark":"#961624","secondarylight":"#E1C8FF","secondary":"#DCC3FA","secondarydark":"#C896E1","warninglight":"#3A96DD","warning":"#328CC8","warningdark":"#086497","infolight":"#F9F1A5","info":"#F0E796","infodark":"#C8BE78","welllight":"#FFFFFF","well":"#0C0C0C","white":"#FCFCFC","black":"#0C0C0C","hp":"#FFFFFF","money":"#FFF7AD","hack":"#FFFFFF","combat":"#FFFFFF","cha":"#FFFFFF","int":"#AFFFFF","rep":"#FFFFFF","disabled":"#3A96DD","backgroundprimary":"#0C0C0C","backgroundsecondary":"#1C0C1C","button":"#3C0C3C"}',preview:"https://cdn.discordapp.com/attachments/921991895230611466/929938813550219274/unknown.png"},{name:"Oblivion - Dark",author:"ZedRiver",content:'{"primarylight":"#D3D7CF","primary":"#D3D7CF","primarydark":"#D3D7CF","successlight":"#8AE234","success":"#73D216","successdark":"#4E9A06","errorlight":"#EF2929","error":"#CC0000","errordark":"#A40000","secondarylight":"#BABDB6","secondary":"#BABDB6","secondarydark":"#BABDB6","warninglight":"#FCAF3E","warning":"#F57900","warningdark":"#CE5C00","infolight":"#729FCF","info":"#3465A4","infodark":"#204A87","welllight":"#D3D7CF","well":"#555753","white":"white","black":"black","hp":"#EF2929","money":"#8AE234","hack":"#FCAF3E","combat":"#EEEEEC","cha":"#AD7FA8","int":"#729FCF","rep":"#D3D7CF","disabled":"#FCE94F","backgroundprimary":"#555753","backgroundsecondary":"#2E3436","button":"#555753"}',preview:"https://cdn.discordapp.com/attachments/921991895230611466/927542146930724894/unknown.png"},{name:"Christmas Noir",author:"Deaeth85",content:'{"primarylight":"#0f0","primary":"#00CC00","primarydark":"#990000","successlight":"#0f0","success":"#0c0","successdark":"#090","errorlight":"#f00","error":"#c00","errordark":"#900","secondarylight":"#DA0606","secondary":"#830505","secondarydark":"#330101","warninglight":"#ff0","warning":"#cc0","warningdark":"#990","infolight":"#69f","info":"#36c","infodark":"#039","welllight":"#E60202","well":"#222","white":"#fff","black":"#000","hp":"#990000","money":"#00CC00","hack":"#990000","combat":"#990000","cha":"#990000","int":"#003399","rep":"#faffdf","disabled":"#66cfbc","backgroundprimary":"#000","backgroundsecondary":"#000","button":"#333"}',preview:"https://cdn.discordapp.com/attachments/921991895230611466/927361890051571742/unknown.png"},{name:"Tomorrow Night",author:"Cyn",content:'{"primarylight":"#e0e0e0","primary":"#c5c8c6","primarydark":"#b4b7b4","successlight":"#c3ca86","success":"#bcc377","successdark":"#b5bd68","errorlight":"#d68484","error":"#d17575","errordark":"#cc6666","secondarylight":"#b4b7b4","secondary":"#969896","secondarydark":"#373b41","warninglight":"#f3d18f","warning":"#f1cb81","warningdark":"#f0c674","infolight":"#9ab4cb","info":"#8dabc4","infodark":"#81a2be","welllight":"#444","well":"#222","white":"#fff","black":"#000","hp":"#d17575","money":"#f1cb81","hack":"#bcc377","combat":"#a3685a","cha":"#b294bb","int":"#8dabc4","rep":"#de935f","disabled":"#8abeb7","backgroundprimary":"#1d1f21","backgroundsecondary":"#161719","button":"#373b41"}',preview:"https://cdn.discordapp.com/attachments/921991895230611466/927077494199308318/2ch7ky.png"},{name:"Atom One Light",author:"GreenMan36",content:'{"primarylight":"#383A42","primary":"#383A42","primarydark":"#383A42","successlight":"#50A14F","success":"#50A14F","successdark":"#50A14F","errorlight":"#E45649","error":"#E45649","errordark":"#E45649","secondarylight":"#808186","secondary":"#808186","secondarydark":"#808186","warninglight":"#986801","warning":"#986801","warningdark":"#986801","infolight":"#4078F2","info":"#4078F2","infodark":"#4078F2","welllight":"#383A42","well":"#E7E7E7","white":"#FAFAFA","black":"#24272D","hp":"#E45649","money":"#986801","hack":"#50A14F","combat":"#383A42","cha":"#A626A4","int":"#4078F2","rep":"#383A42","disabled":"#66cfbc","backgroundprimary":"#FAFAFA","backgroundsecondary":"#F1F1F1","button":"#E7E7E7"}',preview:"https://cdn.discordapp.com/attachments/921991895230611466/926945782957998140/unknown.png"},{name:"Atom One Dark",author:"GreenMan36",content:'{"primarylight":"#A1A9B7","primary":"#A1A9B7","primarydark":"#A1A9B7","successlight":"#8DBB6E","success":"#8DBB6E","successdark":"#8DBB6E","errorlight":"#DC6069","error":"#DC6069","errordark":"#DC6069","secondarylight":"#ABB2BF","secondary":"#ABB2BF","secondarydark":"#ABB2BF","warninglight":"#E1B86F","warning":"#E1B86F","warningdark":"#E1B86F","infolight":"#57A5ED","info":"#57A5ED","infodark":"#57A5ED","welllight":"#A1A9B7","well":"#282C34","white":"#A1A9B7","black":"#24272D","hp":"#DC6069","money":"#E1B86F","hack":"#8DBB6E","combat":"#A1A9B7","cha":"#a671d1","int":"#57A5ED","rep":"#A1A9B7","disabled":"#66cfbc","backgroundprimary":"#282C34","backgroundsecondary":"#24272D","button":"#24272D"}',preview:"https://cdn.discordapp.com/attachments/921991895230611466/926944034960859146/unknown.png"},{name:"Solarized Light",author:"GreenMan36",content:'{"primarylight":"#586E75","primary":"#586E75","primarydark":"#586E75","successlight":"#859900","success":"#859900","successdark":"#859900","errorlight":"#DC322F","error":"#DC322F","errordark":"#DC322F","secondarylight":"#657B83","secondary":"#657B83","secondarydark":"#657B83","warninglight":"#B58900","warning":"#B58900","warningdark":"#B58900","infolight":"#268BD2","info":"#268BD2","infodark":"#268BD2","welllight":"#93A1A1","well":"#FDF6E3","white":"#586E75","black":"#FDF6E3","hp":"#DC322F","money":"#B58900","hack":"#859900","combat":"#2AA198","cha":"#D33682","int":"#268BD2","rep":"#586E75","disabled":"#93A1A1","backgroundprimary":"#FDF6E3","backgroundsecondary":"#EEE8D5","button":"#FDF6E3"}',preview:"https://cdn.discordapp.com/attachments/921991895230611466/926545805182140426/unknown.png"},{name:"Solarized Dark",author:"GreenMan36",content:'{"primarylight":"#93A1A1","primary":"#93A1A1","primarydark":"#93A1A1","successlight":"#859900","success":"#859900","successdark":"#859900","errorlight":"#DC322F","error":"#DC322F","errordark":"#DC322F","secondarylight":"#ECEFF4","secondary":"#ECEFF4","secondarydark":"#ECEFF4","warninglight":"#B58900","warning":"#B58900","warningdark":"#B58900","infolight":"#268BD2","info":"#268BD2","infodark":"#268BD2","welllight":"#073642","well":"#002B36","white":"#93A1A1","black":"#002B36","hp":"#DC322F","money":"#B58900","hack":"#859900","combat":"#2AA198","cha":"#D33682","int":"#268BD2","rep":"#93A1A1","disabled":"#586E75","backgroundprimary":"#002B36","backgroundsecondary":"#073642","button":"#002B36"}',preview:"https://cdn.discordapp.com/attachments/921991895230611466/926544819889786970/unknown.png"},{name:"Nord",author:"GreenMan36",content:'{"primarylight":"#ECEFF4","primary":"#ECEFF4","primarydark":"#ECEFF4","successlight":"#A3BE8C","success":"#A3BE8C","successdark":"#A3BE8C","errorlight":"#BF616A","error":"#BF616A","errordark":"#BF616A","secondarylight":"#ECEFF4","secondary":"#ECEFF4","secondarydark":"#ECEFF4","warninglight":"#EBCB8B","warning":"#EBCB8B","warningdark":"#EBCB8B","infolight":"#88C0D0","info":"#5E81AC","infodark":"#81A1C1","welllight":"#3B4252","well":"#2E3440","white":"#ECEFF4","black":"#3B4252","hp":"#BF616A","money":"#EBCB8B","hack":"#A3BE8C","combat":"#ECEFF4","cha":"#B48EAD","int":"#5E81AC","rep":"#faffdf","disabled":"#8FBCBB","backgroundprimary":"#2E3440","backgroundsecondary":"#2E3440","button":"#333"}',preview:"https://cdn.discordapp.com/attachments/921991895230611466/926542410153099335/unknown.png"},{name:"GX Red",author:"GreenMan36",content:'{"primarylight":"#FB4B71","primary":"#FA1E4E","primarydark":"#CF002E","successlight":"#6ACF6A","success":"#43BF43","successdark":"#3E913E","errorlight":"#C15757","error":"#B34141","errordark":"#752525","secondarylight":"#AAA","secondary":"#888","secondarydark":"#666","warninglight":"#E6E69D","warning":"#DADA56","warningdark":"#A1A106","infolight":"#69f","info":"#36c","infodark":"#039","welllight":"#FA1E4E","well":"#222","white":"#fff","black":"#120F18","hp":"#dd3434","money":"#ffd700","hack":"#adff2f","combat":"#faffdf","cha":"#AD84CF","int":"#6495ed","rep":"#faffdf","disabled":"#76C6B7","backgroundprimary":"#120F18","backgroundsecondary":"#010101","button":"#333"}',preview:"https://cdn.discordapp.com/attachments/921991895230611466/926539444348137482/unknown.png"},{name:"Red Theme",author:"GreenMan36",content:'{"primarylight":"#FF6464","primary":"#FF3232","primarydark":"#FF0000","successlight":"#6ACF6A","success":"#43BF43","successdark":"#3E913E","errorlight":"#C15757","error":"#B34141","errordark":"#752525","secondarylight":"#FF6464","secondary":"#FF6464","secondarydark":"#FF6464","warninglight":"#E6E69D","warning":"#DADA56","warningdark":"#A1A106","infolight":"#69f","info":"#36c","infodark":"#039","welllight":"#FF0000","well":"#222","white":"#fff","black":"#010101","hp":"#FF0000","money":"#ffd700","hack":"#adff2f","combat":"#faffdf","cha":"#AD84CF","int":"#6495ed","rep":"#faffdf","disabled":"#76C6B7","backgroundprimary":"#010101","backgroundsecondary":"#000000","button":"#333"}',preview:"https://cdn.discordapp.com/attachments/921991895230611466/926539286243852288/unknown.png"},{name:"Gruvbox Light",author:"GreenMan36",content:'{"primarylight":"#504945","primary":"#3C3836","primarydark":"#282828","successlight":"#98971A","success":"#98971A","successdark":"#98971A","errorlight":"#CC241D","error":"#9D0006","errordark":"#9D0006","secondarylight":"#7C6F64","secondary":"#665C54","secondarydark":"#504945","warninglight":"#D79921","warning":"#B57614","warningdark":"#B57614","infolight":"#83A598","info":"#458588","infodark":"#458588","welllight":"#3C3836","well":"#F2E5BC","white":"#FBF1C7","black":"#F2E5BC","hp":"#CC241D","money":"#B57614","hack":"#79740E","combat":"#3C3836","cha":"#8F3F71","int":"#076678","rep":"#3C3836","disabled":"#665C54","backgroundprimary":"#f2e5bc","backgroundsecondary":"#FBF1C7","button":"#EBDBB2"}',preview:"https://cdn.discordapp.com/attachments/921991895230611466/926536290453819412/unknown.png"},{name:"Gruvbox Dark",author:"GreenMan36",content:'{"primarylight":"#FBF1C7","primary":"#EBDBB2","primarydark":"#D5C4A1","successlight":"#B8BB26","success":"#B8BB26","successdark":"#98971A","errorlight":"#FB4934","error":"#FB4934","errordark":"#CC241D","secondarylight":"#BDAE93","secondary":"#BDAE93","secondarydark":"#BDAE93","warninglight":"#FABD2F","warning":"#FABD2F","warningdark":"#D79921","infolight":"#83A598","info":"#83A598","infodark":"#458588","welllight":"#282828","well":"#3C3836","white":"#FBF1C7","black":"#1E1E1E","hp":"#FB4934","money":"#FABD2F","hack":"#B8BB26","combat":"#FBF1C7","cha":"#D3869B","int":"#83A598","rep":"#FBF1C7","disabled":"#665C54","backgroundprimary":"#32302F","backgroundsecondary":"#282828","button":"#333"}',preview:"https://cdn.discordapp.com/attachments/921991895230611466/926532609264218122/unknown.png"},{name:"Sweet-Dark",author:"GreenMan36",content:'{"primarylight":"#FFF1E5","primary":"#FFFCFA","primarydark":"#970EA2","successlight":"#51F9BB","success":"#3EFF8C","successdark":"#2DB764","errorlight":"#FF473D","error":"#F92F54","errordark":"#DD1062","secondarylight":"#AAA","secondary":"#888","secondarydark":"#666","warninglight":"#FFBC50","warning":"#FFA560","warningdark":"#FF817A","infolight":"#00DDFF","info":"#05B0FF","infodark":"#0A84FF","welllight":"#970EA2","well":"#0C0E14","white":"#1E1C1B","black":"#1D1D1E","hp":"#F92F54","money":"#FFBC50","hack":"#2DB764","combat":"#FFF1E5","cha":"#914EE4","int":"#0A84FF","rep":"#faffdf","disabled":"#3EFF8C","backgroundprimary":"#161925","backgroundsecondary":"#0C0E14","button":"#3C1F7B"}',preview:"https://cdn.discordapp.com/attachments/921991895230611466/926526430475587654/unknown.png"},{name:"Alpenglow",author:"GreenMan36",content:'{"primarylight":"#FFF1E5","primary":"#FFFCFA","primarydark":"#DDD1F7","successlight":"#51F9BB","success":"#3EFF8C","successdark":"#2DB764","errorlight":"#FF473D","error":"#F92F54","errordark":"#DD1062","secondarylight":"#AAA","secondary":"#888","secondarydark":"#666","warninglight":"#FFBC50","warning":"#FFA560","warningdark":"#FF817A","infolight":"#00DDFF","info":"#05B0FF","infodark":"#0A84FF","welllight":"#AA6FFD","well":"#3C1F7B","white":"#1E1C1B","black":"#1D1D1E","hp":"#F92F54","money":"#FFBC50","hack":"#2DB764","combat":"#FFF1E5","cha":"#914EE4","int":"#0A84FF","rep":"#faffdf","disabled":"#3EFF8C","backgroundprimary":"#281D4D","backgroundsecondary":"#221540","button":"#3C1F7B"}',preview:"https://cdn.discordapp.com/attachments/921991895230611466/926524517751349309/unknown.png"},{name:"Windows Terminal",author:"GreenMan36",content:'{"primarylight":"#CCCCCC","primary":"#CCCCCC","primarydark":"#CCCCCC","successlight":"#16C60C","success":"#16C60C","successdark":"#16C60C","errorlight":"#E74856","error":"#E74856","errordark":"#E74856","secondarylight":"#CCCCCC","secondary":"#CCCCCC","secondarydark":"#CCCCCC","warninglight":"#3A96DD","warning":"#3A96DD","warningdark":"#3A96DD","infolight":"#F9F1A5","info":"#F9F1A5","infodark":"#F9F1A5","welllight":"#CCCCCC","well":"#0C0C0C","white":"#CCCCCC","black":"#0C0C0C","hp":"#CCCCCC","money":"#F9F1A5","hack":"#CCCCCC","combat":"#CCCCCC","cha":"#CCCCCC","int":"#CCCCCC","rep":"#CCCCCC","disabled":"#3A96DD","backgroundprimary":"#0C0C0C","backgroundsecondary":"#0C0C0C","button":"#0C0C0C"}',preview:"https://cdn.discordapp.com/attachments/921991895230611466/926496757288960110/unknown.png"}]}const ee="0.0.24";var me="";const re={components:{AppContainer:v,ThemeList:Q,UpdateModal:z},setup(){const t=e.ref(!1),r=e.ref(null),n=e.ref(!1),a=Y(),i=()=>$(p),d=c=>{h("theme:cancel-preview",c),t.value=!1},o=c=>{h("theme:preview",c),t.value=!0};return e.onMounted(async()=>{r.value=await k(winnerdow[`${p}-version`]||ee,S)}),{availableUpdate:r,isPreviewing:t,showUpdateModal:n,themes:a,cancelPreview:d,destroy:i,showPreview:o}}},m=t=>(e.pushScopeId("data-v-700c2204"),t=t(),e.popScopeId(),t),te={class:"app"},ae=m(()=>e.createElementVNode("h1",{class:"title"}," Theme Browser ",-1)),ne=[m(()=>e.createElementVNode("span",{class:"sr-only"},"Cancel",-1))],oe=[m(()=>e.createElementVNode("span",{class:"sr-only"},"Confirm",-1))];function ie(t,r,n,a,i,d){const o=e.resolveComponent("theme-list"),c=e.resolveComponent("app-container"),g=e.resolveComponent("update-modal");return e.openBlock(),e.createElementBlock(e.Fragment,null,[e.withDirectives(e.createVNode(c,{title:"Bitburner Theme Browser","available-update":a.availableUpdate,"onApp:close":a.destroy,"onApp:click:update":r[0]||(r[0]=s=>a.showUpdateModal=!0)},{default:e.withCtx(()=>[e.createElementVNode("div",te,[ae,e.createVNode(o,{themes:a.themes,class:"themes","onTheme:preview":a.showPreview},null,8,["themes","onTheme:preview"])])]),_:1},8,["available-update","onApp:close"]),[[e.vShow,!a.isPreviewing]]),e.createElementVNode("div",{class:e.normalizeClass(["preview__ctas",{"preview__ctas--visible":a.isPreviewing}])},[e.createElementVNode("button",{class:"preview__cta preview__cta--cancel",onClick:r[1]||(r[1]=(...s)=>a.cancelPreview&&a.cancelPreview(...s))},ne),e.createElementVNode("button",{class:"preview__cta preview__cta--confirm",onClick:r[2]||(r[2]=(...s)=>a.destroy&&a.destroy(...s))},oe)],2),a.showUpdateModal?(e.openBlock(),e.createBlock(g,{key:0,version:a.availableUpdate,class:"update-modal","onModal:close":r[3]||(r[3]=s=>a.showUpdateModal=!1),"onApp:updated":r[4]||(r[4]=s=>a.availableUpdate=null)},null,8,["version"])):e.createCommentVNode("",!0)],64)}var ce=l(re,[["render",ie],["__scopeId","data-v-700c2204"]]);e.createApp(ce).mount(`#${p}`)})(Vue);

}

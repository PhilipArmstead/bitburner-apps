export async function main(ns) {
	const doc = globalThis['document']
	const id = 'theme-browser-app'
	globalThis[`${id}-version`] = '0.0.18'

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

	stylesheet.innerHTML = `:root {${Object.entries(ns.ui.getTheme()).map(([key, value]) => `--${key}: ${value};`).join(' ')}}`


	// Add app's CSS and mount point
	doc.getElementById(id)?.remove()
	doc.body.insertAdjacentHTML('beforeend', `<section id='${id}'></section>`)

	doc.getElementById(`${id}-css`)?.remove()
	doc.head.insertAdjacentHTML('beforeend', `<style id='${id}-css'>${bundledCss}</style>`)

	ns.atExit(() => {
		doc.getElementById(id)?.remove()
		doc.getElementById(`${id}-css`)?.remove()

		doc.body.removeEventListener('theme:preview', previewTheme)
		doc.body.removeEventListener('theme:cancel-preview', resetTheme)

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





















































const bundledCss = ".app-container[data-v-2c802fa9]{bottom:0;left:0;pointer-events:none;position:fixed;top:0;width:100%;z-index:1510}.app-container *[data-v-2c802fa9]{box-sizing:border-box}.app-container .app[data-v-2c802fa9]{align-items:flex-start;border:1px solid #4E4E4E6B;display:inline-flex;flex-direction:column;left:50%;height:90vh;overflow:hidden;pointer-events:auto;position:absolute;resize:none;top:50%;transform:translate(-50%,-52%);width:90vw}.app-container .app__toolbar[data-v-2c802fa9]{background:#111;color:#fff;display:flex;padding:3px 3px 3px 8px;user-select:none;width:100%}.app-container .app__title[data-v-2c802fa9]{align-self:center;flex:0 1 100%;font-size:16px;font-weight:700;line-height:20px;margin:0 20px 0 0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.app-container .app__cta-group[data-v-2c802fa9]{align-items:center;display:flex;flex:0 1 100%;justify-content:flex-end;margin-left:auto}.app-container .app__cta-group>*[data-v-2c802fa9]{background-position:50% 50%;background-size:14px auto;flex:0 1 auto}.app-container .app__cta-group .icon[data-v-2c802fa9]{width:14px}.app-container .app__cta-group .icon--restore[data-v-2c802fa9]{color:#d6cec8}.app-container .app__cta-group .btn[data-v-2c802fa9]{background:none;border:none;color:#a9a9a9}.app-container .app__icon[data-v-2c802fa9]{align-self:center;max-height:16px;margin-right:6px;object-fit:contain;width:16px}.app-container .app__menu[data-v-2c802fa9]{width:100%;background:#d4d0c8;color:#333;padding-left:5px;padding-bottom:2px}.app-container .app__menu span[data-v-2c802fa9]{border:1px inset transparent;cursor:pointer;font-size:15px;margin-right:12px;padding:0 1px}.app-container .app__menu span[data-v-2c802fa9]:hover{border:1px inset #BDBDBD}.app-container .app__content[data-v-2c802fa9]{flex:0 1 100%;overflow:auto;scrollbar-color:#272727 #b7b7b7;scrollbar-width:thin;width:100%}.app-container .app__content[data-v-2c802fa9]::-webkit-scrollbar{display:block;width:10px}.app-container .app__content[data-v-2c802fa9]::-webkit-scrollbar-track{background-color:transparent}.app-container .app__content[data-v-2c802fa9]::-webkit-scrollbar-thumb{background-color:#79797a}.app-container .app .btn[data-v-2c802fa9]{background:none;box-shadow:none}.theme-list[data-v-23916478]{display:flex;flex-wrap:wrap;list-style:none;margin:0;padding:0}.theme-list .theme[data-v-23916478]{box-sizing:border-box;display:flex;flex:1 0 25%;flex-direction:column;margin-bottom:16px;padding:8px}.theme-list .theme__name[data-v-23916478],.theme-list .theme__author[data-v-23916478],.theme-list .theme__submission-date[data-v-23916478]{margin:8px 0 0}.theme-list .theme__name[data-v-23916478]{font-size:18px}.theme-list .theme__author[data-v-23916478]{font-size:14px}.theme-list .theme__info[data-v-23916478]{display:flex;display:none;margin-bottom:8px}.theme-list .theme__preview[data-v-23916478]{max-height:110px;max-width:100%}.theme-list .theme__submission-date[data-v-23916478]{font-size:12px;margin-left:auto}.theme-list .theme__cta[data-v-23916478]{border:none;border-radius:4px;cursor:pointer;font-size:14px;margin-top:auto;padding:8px 14px;pointer-events:auto}.theme-list .theme__cta--preview[data-v-23916478]{background:#4170FB;color:#fff;margin-left:auto}.app[data-v-ddc4b3bc]{color:#333;display:flex;flex-direction:column;padding:24px 32px;position:relative}.app[data-v-ddc4b3bc]:before{background:var(--backgroundprimary);content:\"\";height:100%;left:0;opacity:.75;position:absolute;top:0;width:100%;z-index:-1}.title[data-v-ddc4b3bc]{margin:0 0 16px}.preview__ctas[data-v-ddc4b3bc]{bottom:0;display:flex;height:16vmax;justify-content:space-between;position:fixed;right:30px;width:13vmax}.preview__ctas:not(.preview__ctas--visible) .preview__cta[data-v-ddc4b3bc]{pointer-events:none}.preview__ctas:not(.preview__ctas--visible) .preview__cta--cancel[data-v-ddc4b3bc]{transform:translate(calc(13vmax + 30px),11vmax)}.preview__ctas:not(.preview__ctas--visible) .preview__cta--confirm[data-v-ddc4b3bc]{transform:translate(calc(6.24vmax + 30px),16vmax)}.preview__ctas .preview__cta[data-v-ddc4b3bc]{align-items:center;background:no-repeat 50% 50%/3vmax auto;border:none;border-radius:50%;cursor:pointer;display:flex;flex:0 1 48%;height:6.241vmax;justify-content:center;padding:0;position:relative;transition:transform .25s cubic-bezier(.4,0,.2,1)}.preview__ctas .preview__cta--cancel[data-v-ddc4b3bc]{background-color:#e33030d4;background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 47.095 47.095'%3E%3Cpath fill='%23FFF' d='m45.363 36.234-13.158-13.16 12.21-12.21a5.906 5.906 0 0 0 0-8.358 5.908 5.908 0 0 0-8.356 0l-12.212 12.21-12.809-12.81a5.91 5.91 0 1 0-8.358 8.358l12.81 12.81L1.732 36.831a5.91 5.91 0 1 0 8.356 8.359l13.759-13.758 13.16 13.16a5.908 5.908 0 0 0 8.356 0 5.907 5.907 0 0 0 0-8.358z'/%3E%3C/svg%3E\");transform:translateY(5vmax)}.preview__ctas .preview__cta--confirm[data-v-ddc4b3bc]{background-color:#72d000d4;background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 122.877 101.052'%3E%3Cpath fill='white' d='M4.43 63.63A14.383 14.383 0 0 1 .003 53.52a14.393 14.393 0 0 1 4.015-10.281 14.372 14.372 0 0 1 10.106-4.425 14.373 14.373 0 0 1 10.283 4.012l24.787 23.851L98.543 3.989l1.768 1.349-1.77-1.355a2.27 2.27 0 0 1 .479-.466A14.383 14.383 0 0 1 109.243.022V.018l.176.016c3.623.24 7.162 1.85 9.775 4.766a14.383 14.383 0 0 1 3.662 10.412h.004l-.016.176a14.362 14.362 0 0 1-4.609 9.632L59.011 97.11l.004.004a2.157 2.157 0 0 1-.372.368 14.392 14.392 0 0 1-9.757 3.569 14.381 14.381 0 0 1-9.741-4.016L4.43 63.63z'/%3E%3C/svg%3E\")}.version[data-v-ddc4b3bc]{margin:0;position:absolute;right:0;top:0}.sr-only[data-v-ddc4b3bc]{clip:rect(1px,1px,1px,1px);clip-path:inset(50%);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}@keyframes slide-up-left-ddc4b3bc{0%{transform:translate(150px,150px)}to{transform:translate(0)}}\n"

function mount() {
	const winnerdow = globalThis
	const rockument = globalThis['document'];
	(function(r){"use strict";var j="",d=(e,a)=>{const t=e.__vccOpts||e;for(const[n,c]of a)t[n]=c;return t};const C={name:"AppContainer",props:{title:{type:String,required:!0}}},g=e=>(r.pushScopeId("data-v-2c802fa9"),e=e(),r.popScopeId(),e),m={class:"app-container"},k={class:"app"},w={class:"app__toolbar"},y={class:"app__title"},E={class:"app__cta-group"},A=[g(()=>r.createElementVNode("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 18 18",class:"icon icon--close"},[r.createElementVNode("g",{stroke:"currentColor","stroke-width":"1.5"},[r.createElementVNode("line",{x1:"3",y1:"3",x2:"15",y2:"15"}),r.createElementVNode("line",{x2:"3",y1:"3",x1:"15",y2:"15"})])],-1))],B={class:"app__content"};function f(e,a,t,n,c,i){return r.openBlock(),r.createElementBlock("div",m,[r.createElementVNode("div",k,[r.createElementVNode("div",w,[r.createElementVNode("h1",y,r.toDisplayString(t.title),1),r.createElementVNode("div",E,[r.createElementVNode("button",{class:"btn btn--small app__cta-close",onClick:a[0]||(a[0]=o=>e.$emit("app:close")),onMousedown:a[1]||(a[1]=r.withModifiers(()=>{},["stop"]))},A,32)])]),r.createElementVNode("div",B,[r.renderSlot(e.$slots,"default",{},void 0,!0)])])])}var b=d(C,[["render",f],["__scopeId","data-v-2c802fa9"]]);function _(e){return new Date(e).toLocaleDateString()}var J="";const D={name:"ThemeList",props:{themes:{type:Array,default:()=>[]}},setup(){return{formatDate:_}}},u={class:"theme-list"},v=["src"],N={class:"theme__name"},V={class:"theme__author"},$={class:"theme__info"},S={class:"theme__submission-date"},G=["onClick"];function M(e,a,t,n,c,i){return r.openBlock(),r.createElementBlock("ul",u,[(r.openBlock(!0),r.createElementBlock(r.Fragment,null,r.renderList(t.themes,(o,F)=>(r.openBlock(),r.createElementBlock("li",{key:F,class:"theme"},[r.createElementVNode("img",{src:o.preview,alt:"",class:"theme__preview"},null,8,v),r.createElementVNode("h1",N,r.toDisplayString(o.name),1),r.createElementVNode("h2",V,r.toDisplayString(o.author),1),r.createElementVNode("div",$,[r.createElementVNode("h3",S,r.toDisplayString(n.formatDate(o.submittedOn)),1)]),r.createElementVNode("button",{class:"theme__cta theme__cta--preview",onClick:s=>e.$emit("theme:preview",o.content)}," Preview ",8,G)]))),128))])}var x=d(D,[["render",M],["__scopeId","data-v-23916478"]]);function I(e){rockument.getElementById(e).remove()}function p(e,a){rockument.body.dispatchEvent(new CustomEvent(e,{detail:a}))}function T(){return[{name:"Intense Purple",author:"ZedRiver",content:'{"primarylight":"#FFFFFF","primary":"#FCFCFC","primarydark":"#CCCCCC","successlight":"#16C60C","success":"#14BE0A","successdark":"#0A9602","errorlight":"#E74856","error":"#DC3246","errordark":"#961624","secondarylight":"#E1C8FF","secondary":"#DCC3FA","secondarydark":"#C896E1","warninglight":"#3A96DD","warning":"#328CC8","warningdark":"#086497","infolight":"#F9F1A5","info":"#F0E796","infodark":"#C8BE78","welllight":"#FFFFFF","well":"#0C0C0C","white":"#FCFCFC","black":"#0C0C0C","hp":"#FFFFFF","money":"#FFF7AD","hack":"#FFFFFF","combat":"#FFFFFF","cha":"#FFFFFF","int":"#AFFFFF","rep":"#FFFFFF","disabled":"#3A96DD","backgroundprimary":"#0C0C0C","backgroundsecondary":"#1C0C1C","button":"#3C0C3C"}',preview:"https://cdn.discordapp.com/attachments/921991895230611466/929938813550219274/unknown.png"},{name:"Oblivion - Dark",author:"ZedRiver",content:'{"primarylight":"#D3D7CF","primary":"#D3D7CF","primarydark":"#D3D7CF","successlight":"#8AE234","success":"#73D216","successdark":"#4E9A06","errorlight":"#EF2929","error":"#CC0000","errordark":"#A40000","secondarylight":"#BABDB6","secondary":"#BABDB6","secondarydark":"#BABDB6","warninglight":"#FCAF3E","warning":"#F57900","warningdark":"#CE5C00","infolight":"#729FCF","info":"#3465A4","infodark":"#204A87","welllight":"#D3D7CF","well":"#555753","white":"white","black":"black","hp":"#EF2929","money":"#8AE234","hack":"#FCAF3E","combat":"#EEEEEC","cha":"#AD7FA8","int":"#729FCF","rep":"#D3D7CF","disabled":"#FCE94F","backgroundprimary":"#555753","backgroundsecondary":"#2E3436","button":"#555753"}',preview:"https://cdn.discordapp.com/attachments/921991895230611466/927542146930724894/unknown.png"},{name:"Christmas Noir",author:"Deaeth85",content:'{"primarylight":"#0f0","primary":"#00CC00","primarydark":"#990000","successlight":"#0f0","success":"#0c0","successdark":"#090","errorlight":"#f00","error":"#c00","errordark":"#900","secondarylight":"#DA0606","secondary":"#830505","secondarydark":"#330101","warninglight":"#ff0","warning":"#cc0","warningdark":"#990","infolight":"#69f","info":"#36c","infodark":"#039","welllight":"#E60202","well":"#222","white":"#fff","black":"#000","hp":"#990000","money":"#00CC00","hack":"#990000","combat":"#990000","cha":"#990000","int":"#003399","rep":"#faffdf","disabled":"#66cfbc","backgroundprimary":"#000","backgroundsecondary":"#000","button":"#333"}',preview:"https://cdn.discordapp.com/attachments/921991895230611466/927361890051571742/unknown.png"},{name:"Tomorrow Night",author:"Cyn",content:'{"primarylight":"#e0e0e0","primary":"#c5c8c6","primarydark":"#b4b7b4","successlight":"#c3ca86","success":"#bcc377","successdark":"#b5bd68","errorlight":"#d68484","error":"#d17575","errordark":"#cc6666","secondarylight":"#b4b7b4","secondary":"#969896","secondarydark":"#373b41","warninglight":"#f3d18f","warning":"#f1cb81","warningdark":"#f0c674","infolight":"#9ab4cb","info":"#8dabc4","infodark":"#81a2be","welllight":"#444","well":"#222","white":"#fff","black":"#000","hp":"#d17575","money":"#f1cb81","hack":"#bcc377","combat":"#a3685a","cha":"#b294bb","int":"#8dabc4","rep":"#de935f","disabled":"#8abeb7","backgroundprimary":"#1d1f21","backgroundsecondary":"#161719","button":"#373b41"}',preview:"https://cdn.discordapp.com/attachments/921991895230611466/927077494199308318/2ch7ky.png"},{name:"Atom One Light",author:"GreenMan36",content:'{"primarylight":"#383A42","primary":"#383A42","primarydark":"#383A42","successlight":"#50A14F","success":"#50A14F","successdark":"#50A14F","errorlight":"#E45649","error":"#E45649","errordark":"#E45649","secondarylight":"#808186","secondary":"#808186","secondarydark":"#808186","warninglight":"#986801","warning":"#986801","warningdark":"#986801","infolight":"#4078F2","info":"#4078F2","infodark":"#4078F2","welllight":"#383A42","well":"#E7E7E7","white":"#FAFAFA","black":"#24272D","hp":"#E45649","money":"#986801","hack":"#50A14F","combat":"#383A42","cha":"#A626A4","int":"#4078F2","rep":"#383A42","disabled":"#66cfbc","backgroundprimary":"#FAFAFA","backgroundsecondary":"#F1F1F1","button":"#E7E7E7"}',preview:"https://cdn.discordapp.com/attachments/921991895230611466/926945782957998140/unknown.png"},{name:"Atom One Dark",author:"GreenMan36",content:'{"primarylight":"#A1A9B7","primary":"#A1A9B7","primarydark":"#A1A9B7","successlight":"#8DBB6E","success":"#8DBB6E","successdark":"#8DBB6E","errorlight":"#DC6069","error":"#DC6069","errordark":"#DC6069","secondarylight":"#ABB2BF","secondary":"#ABB2BF","secondarydark":"#ABB2BF","warninglight":"#E1B86F","warning":"#E1B86F","warningdark":"#E1B86F","infolight":"#57A5ED","info":"#57A5ED","infodark":"#57A5ED","welllight":"#A1A9B7","well":"#282C34","white":"#A1A9B7","black":"#24272D","hp":"#DC6069","money":"#E1B86F","hack":"#8DBB6E","combat":"#A1A9B7","cha":"#a671d1","int":"#57A5ED","rep":"#A1A9B7","disabled":"#66cfbc","backgroundprimary":"#282C34","backgroundsecondary":"#24272D","button":"#24272D"}',preview:"https://cdn.discordapp.com/attachments/921991895230611466/926944034960859146/unknown.png"},{name:"Solarized Light",author:"GreenMan36",content:'{"primarylight":"#586E75","primary":"#586E75","primarydark":"#586E75","successlight":"#859900","success":"#859900","successdark":"#859900","errorlight":"#DC322F","error":"#DC322F","errordark":"#DC322F","secondarylight":"#657B83","secondary":"#657B83","secondarydark":"#657B83","warninglight":"#B58900","warning":"#B58900","warningdark":"#B58900","infolight":"#268BD2","info":"#268BD2","infodark":"#268BD2","welllight":"#93A1A1","well":"#FDF6E3","white":"#586E75","black":"#FDF6E3","hp":"#DC322F","money":"#B58900","hack":"#859900","combat":"#2AA198","cha":"#D33682","int":"#268BD2","rep":"#586E75","disabled":"#93A1A1","backgroundprimary":"#FDF6E3","backgroundsecondary":"#EEE8D5","button":"#FDF6E3"}',preview:"https://cdn.discordapp.com/attachments/921991895230611466/926545805182140426/unknown.png"},{name:"Solarized Dark",author:"GreenMan36",content:'{"primarylight":"#93A1A1","primary":"#93A1A1","primarydark":"#93A1A1","successlight":"#859900","success":"#859900","successdark":"#859900","errorlight":"#DC322F","error":"#DC322F","errordark":"#DC322F","secondarylight":"#ECEFF4","secondary":"#ECEFF4","secondarydark":"#ECEFF4","warninglight":"#B58900","warning":"#B58900","warningdark":"#B58900","infolight":"#268BD2","info":"#268BD2","infodark":"#268BD2","welllight":"#073642","well":"#002B36","white":"#93A1A1","black":"#002B36","hp":"#DC322F","money":"#B58900","hack":"#859900","combat":"#2AA198","cha":"#D33682","int":"#268BD2","rep":"#93A1A1","disabled":"#586E75","backgroundprimary":"#002B36","backgroundsecondary":"#073642","button":"#002B36"}',preview:"https://cdn.discordapp.com/attachments/921991895230611466/926544819889786970/unknown.png"},{name:"Nord",author:"GreenMan36",content:'{"primarylight":"#ECEFF4","primary":"#ECEFF4","primarydark":"#ECEFF4","successlight":"#A3BE8C","success":"#A3BE8C","successdark":"#A3BE8C","errorlight":"#BF616A","error":"#BF616A","errordark":"#BF616A","secondarylight":"#ECEFF4","secondary":"#ECEFF4","secondarydark":"#ECEFF4","warninglight":"#EBCB8B","warning":"#EBCB8B","warningdark":"#EBCB8B","infolight":"#88C0D0","info":"#5E81AC","infodark":"#81A1C1","welllight":"#3B4252","well":"#2E3440","white":"#ECEFF4","black":"#3B4252","hp":"#BF616A","money":"#EBCB8B","hack":"#A3BE8C","combat":"#ECEFF4","cha":"#B48EAD","int":"#5E81AC","rep":"#faffdf","disabled":"#8FBCBB","backgroundprimary":"#2E3440","backgroundsecondary":"#2E3440","button":"#333"}',preview:"https://cdn.discordapp.com/attachments/921991895230611466/926542410153099335/unknown.png"},{name:"GX Red",author:"GreenMan36",content:'{"primarylight":"#FB4B71","primary":"#FA1E4E","primarydark":"#CF002E","successlight":"#6ACF6A","success":"#43BF43","successdark":"#3E913E","errorlight":"#C15757","error":"#B34141","errordark":"#752525","secondarylight":"#AAA","secondary":"#888","secondarydark":"#666","warninglight":"#E6E69D","warning":"#DADA56","warningdark":"#A1A106","infolight":"#69f","info":"#36c","infodark":"#039","welllight":"#FA1E4E","well":"#222","white":"#fff","black":"#120F18","hp":"#dd3434","money":"#ffd700","hack":"#adff2f","combat":"#faffdf","cha":"#AD84CF","int":"#6495ed","rep":"#faffdf","disabled":"#76C6B7","backgroundprimary":"#120F18","backgroundsecondary":"#010101","button":"#333"}',preview:"https://cdn.discordapp.com/attachments/921991895230611466/926539444348137482/unknown.png"},{name:"Red Theme",author:"GreenMan36",content:'{"primarylight":"#FF6464","primary":"#FF3232","primarydark":"#FF0000","successlight":"#6ACF6A","success":"#43BF43","successdark":"#3E913E","errorlight":"#C15757","error":"#B34141","errordark":"#752525","secondarylight":"#FF6464","secondary":"#FF6464","secondarydark":"#FF6464","warninglight":"#E6E69D","warning":"#DADA56","warningdark":"#A1A106","infolight":"#69f","info":"#36c","infodark":"#039","welllight":"#FF0000","well":"#222","white":"#fff","black":"#010101","hp":"#FF0000","money":"#ffd700","hack":"#adff2f","combat":"#faffdf","cha":"#AD84CF","int":"#6495ed","rep":"#faffdf","disabled":"#76C6B7","backgroundprimary":"#010101","backgroundsecondary":"#000000","button":"#333"}',preview:"https://cdn.discordapp.com/attachments/921991895230611466/926539286243852288/unknown.png"},{name:"Gruvbox Light",author:"GreenMan36",content:'{"primarylight":"#504945","primary":"#3C3836","primarydark":"#282828","successlight":"#98971A","success":"#98971A","successdark":"#98971A","errorlight":"#CC241D","error":"#9D0006","errordark":"#9D0006","secondarylight":"#7C6F64","secondary":"#665C54","secondarydark":"#504945","warninglight":"#D79921","warning":"#B57614","warningdark":"#B57614","infolight":"#83A598","info":"#458588","infodark":"#458588","welllight":"#3C3836","well":"#F2E5BC","white":"#FBF1C7","black":"#F2E5BC","hp":"#CC241D","money":"#B57614","hack":"#79740E","combat":"#3C3836","cha":"#8F3F71","int":"#076678","rep":"#3C3836","disabled":"#665C54","backgroundprimary":"#f2e5bc","backgroundsecondary":"#FBF1C7","button":"#EBDBB2"}',preview:"https://cdn.discordapp.com/attachments/921991895230611466/926536290453819412/unknown.png"},{name:"Gruvbox Dark",author:"GreenMan36",content:'{"primarylight":"#FBF1C7","primary":"#EBDBB2","primarydark":"#D5C4A1","successlight":"#B8BB26","success":"#B8BB26","successdark":"#98971A","errorlight":"#FB4934","error":"#FB4934","errordark":"#CC241D","secondarylight":"#BDAE93","secondary":"#BDAE93","secondarydark":"#BDAE93","warninglight":"#FABD2F","warning":"#FABD2F","warningdark":"#D79921","infolight":"#83A598","info":"#83A598","infodark":"#458588","welllight":"#282828","well":"#3C3836","white":"#FBF1C7","black":"#1E1E1E","hp":"#FB4934","money":"#FABD2F","hack":"#B8BB26","combat":"#FBF1C7","cha":"#D3869B","int":"#83A598","rep":"#FBF1C7","disabled":"#665C54","backgroundprimary":"#32302F","backgroundsecondary":"#282828","button":"#333"}',preview:"https://cdn.discordapp.com/attachments/921991895230611466/926532609264218122/unknown.png"},{name:"Sweet-Dark",author:"GreenMan36",content:'{"primarylight":"#FFF1E5","primary":"#FFFCFA","primarydark":"#970EA2","successlight":"#51F9BB","success":"#3EFF8C","successdark":"#2DB764","errorlight":"#FF473D","error":"#F92F54","errordark":"#DD1062","secondarylight":"#AAA","secondary":"#888","secondarydark":"#666","warninglight":"#FFBC50","warning":"#FFA560","warningdark":"#FF817A","infolight":"#00DDFF","info":"#05B0FF","infodark":"#0A84FF","welllight":"#970EA2","well":"#0C0E14","white":"#1E1C1B","black":"#1D1D1E","hp":"#F92F54","money":"#FFBC50","hack":"#2DB764","combat":"#FFF1E5","cha":"#914EE4","int":"#0A84FF","rep":"#faffdf","disabled":"#3EFF8C","backgroundprimary":"#161925","backgroundsecondary":"#0C0E14","button":"#3C1F7B"}',preview:"https://cdn.discordapp.com/attachments/921991895230611466/926526430475587654/unknown.png"},{name:"Alpenglow",author:"GreenMan36",content:'{"primarylight":"#FFF1E5","primary":"#FFFCFA","primarydark":"#DDD1F7","successlight":"#51F9BB","success":"#3EFF8C","successdark":"#2DB764","errorlight":"#FF473D","error":"#F92F54","errordark":"#DD1062","secondarylight":"#AAA","secondary":"#888","secondarydark":"#666","warninglight":"#FFBC50","warning":"#FFA560","warningdark":"#FF817A","infolight":"#00DDFF","info":"#05B0FF","infodark":"#0A84FF","welllight":"#AA6FFD","well":"#3C1F7B","white":"#1E1C1B","black":"#1D1D1E","hp":"#F92F54","money":"#FFBC50","hack":"#2DB764","combat":"#FFF1E5","cha":"#914EE4","int":"#0A84FF","rep":"#faffdf","disabled":"#3EFF8C","backgroundprimary":"#281D4D","backgroundsecondary":"#221540","button":"#3C1F7B"}',preview:"https://cdn.discordapp.com/attachments/921991895230611466/926524517751349309/unknown.png"},{name:"Windows Terminal",author:"GreenMan36",content:'{"primarylight":"#CCCCCC","primary":"#CCCCCC","primarydark":"#CCCCCC","successlight":"#16C60C","success":"#16C60C","successdark":"#16C60C","errorlight":"#E74856","error":"#E74856","errordark":"#E74856","secondarylight":"#CCCCCC","secondary":"#CCCCCC","secondarydark":"#CCCCCC","warninglight":"#3A96DD","warning":"#3A96DD","warningdark":"#3A96DD","infolight":"#F9F1A5","info":"#F9F1A5","infodark":"#F9F1A5","welllight":"#CCCCCC","well":"#0C0C0C","white":"#CCCCCC","black":"#0C0C0C","hp":"#CCCCCC","money":"#F9F1A5","hack":"#CCCCCC","combat":"#CCCCCC","cha":"#CCCCCC","int":"#CCCCCC","rep":"#CCCCCC","disabled":"#3A96DD","backgroundprimary":"#0C0C0C","backgroundsecondary":"#0C0C0C","button":"#0C0C0C"}',preview:"https://cdn.discordapp.com/attachments/921991895230611466/926496757288960110/unknown.png"}]}const l="theme-browser-app",P="0.0.18";var K="";const L={components:{AppContainer:b,ThemeList:x},setup(){const e=r.ref(!1),a=T(),t=()=>I(l),n=i=>{p("theme:cancel-preview",i),e.value=!1},c=i=>{p("theme:preview",i),e.value=!0};return{isPreviewing:e,themes:a,version:winnerdow[`${l}-version`]||P,cancelPreview:n,destroy:t,showPreview:c}}},h=e=>(r.pushScopeId("data-v-ddc4b3bc"),e=e(),r.popScopeId(),e),O={class:"app"},R=h(()=>r.createElementVNode("h1",{class:"title"}," Theme Browser ",-1)),z={class:"version"},Z=[h(()=>r.createElementVNode("span",{class:"sr-only"},"Cancel",-1))],q=[h(()=>r.createElementVNode("span",{class:"sr-only"},"Confirm",-1))];function W(e,a,t,n,c,i){const o=r.resolveComponent("theme-list"),F=r.resolveComponent("app-container");return r.openBlock(),r.createElementBlock(r.Fragment,null,[r.withDirectives(r.createVNode(F,{title:"Bitburner Theme Browser","onApp:close":n.destroy},{default:r.withCtx(()=>[r.createElementVNode("div",O,[R,r.createVNode(o,{themes:n.themes,class:"themes","onTheme:preview":n.showPreview},null,8,["themes","onTheme:preview"]),r.createElementVNode("p",z,r.toDisplayString(n.version),1)])]),_:1},8,["onApp:close"]),[[r.vShow,!n.isPreviewing]]),r.createElementVNode("div",{class:r.normalizeClass(["preview__ctas",{"preview__ctas--visible":n.isPreviewing}])},[r.createElementVNode("button",{class:"preview__cta preview__cta--cancel",onClick:a[0]||(a[0]=(...s)=>n.cancelPreview&&n.cancelPreview(...s))},Z),r.createElementVNode("button",{class:"preview__cta preview__cta--confirm",onClick:a[1]||(a[1]=(...s)=>n.destroy&&n.destroy(...s))},q)],2)],64)}var X=d(L,[["render",W],["__scopeId","data-v-ddc4b3bc"]]);r.createApp(X).mount(`#${l}`)})(Vue);

}
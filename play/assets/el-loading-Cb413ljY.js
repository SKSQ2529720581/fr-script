import{l as _,x as B,dm as V,ct as N,d as E,dn as P,bt as g,w as O,a6 as z,b as R,a7 as j,b5 as q,ck as y,b6 as M,a8 as w,bc as A,a$ as b,cl as L,ci as I,A as D,dp as F,dq as G}from"./index-D767YE15.js";function H(t){let e;const l=_(!1),s=B({...t,originalPosition:"",originalOverflow:"",visible:!1});function a(n){s.text=n}function o(){const n=s.parent,r=d.ns;if(!n.vLoadingAddClassList){let i=n.getAttribute("loading-number");i=Number.parseInt(i)-1,i?n.setAttribute("loading-number",i.toString()):(y(n,r.bm("parent","relative")),n.removeAttribute("loading-number")),y(n,r.bm("parent","hidden"))}c(),m.unmount()}function c(){var n,r;(r=(n=d.$el)==null?void 0:n.parentNode)==null||r.removeChild(d.$el)}function v(){var n;t.beforeClose&&!t.beforeClose()||(l.value=!0,clearTimeout(e),e=setTimeout(f,400),s.visible=!1,(n=t.closed)==null||n.call(t))}function f(){if(!l.value)return;const n=s.parent;l.value=!1,n.vLoadingAddClassList=void 0,o()}const u=E({name:"ElLoading",setup(n,{expose:r}){const{ns:i,zIndex:$}=P("loading");return r({ns:i,zIndex:$}),()=>{const C=s.spinner||s.svg,S=g("svg",{class:"circular",viewBox:s.svgViewBox?s.svgViewBox:"0 0 50 50",...C?{innerHTML:C}:{}},[g("circle",{class:"path",cx:"25",cy:"25",r:"20",fill:"none"})]),T=s.text?g("p",{class:i.b("text")},[s.text]):void 0;return g(q,{name:i.b("fade"),onAfterLeave:f},{default:O(()=>[z(R("div",{style:{backgroundColor:s.background||""},class:[i.b("mask"),s.customClass,s.fullscreen?"is-fullscreen":""]},[g("div",{class:i.b("spinner")},[S,T])]),[[j,s.visible]])])})}}}),m=V(u),d=m.mount(document.createElement("div"));return{...N(s),setText:a,removeElLoadingChild:c,close:v,handleAfterLeave:f,vm:d,get $el(){return d.$el}}}let p;const K=function(t={}){if(!M)return;const e=Y(t);if(e.fullscreen&&p)return p;const l=H({...e,closed:()=>{var a;(a=e.closed)==null||a.call(e),e.fullscreen&&(p=void 0)}});Z(e,e.parent,l),h(e,e.parent,l),e.parent.vLoadingAddClassList=()=>h(e,e.parent,l);let s=e.parent.getAttribute("loading-number");return s?s=`${Number.parseInt(s)+1}`:s="1",e.parent.setAttribute("loading-number",s),e.parent.appendChild(l.$el),w(()=>l.visible.value=e.visible),e.fullscreen&&(p=l),l},Y=t=>{var e,l,s,a;let o;return A(t.target)?o=(e=document.querySelector(t.target))!=null?e:document.body:o=t.target||document.body,{parent:o===document.body||t.body?document.body:o,background:t.background||"",svg:t.svg||"",svgViewBox:t.svgViewBox||"",spinner:t.spinner||!1,text:t.text||"",fullscreen:o===document.body&&((l=t.fullscreen)!=null?l:!0),lock:(s=t.lock)!=null?s:!1,customClass:t.customClass||"",visible:(a=t.visible)!=null?a:!0,beforeClose:t.beforeClose,closed:t.closed,target:o}},Z=async(t,e,l)=>{const{nextZIndex:s}=l.vm.zIndex||l.vm._.exposed.zIndex,a={};if(t.fullscreen)l.originalPosition.value=b(document.body,"position"),l.originalOverflow.value=b(document.body,"overflow"),a.zIndex=s();else if(t.parent===document.body){l.originalPosition.value=b(document.body,"position"),await w();for(const o of["top","left"]){const c=o==="top"?"scrollTop":"scrollLeft";a[o]=`${t.target.getBoundingClientRect()[o]+document.body[c]+document.documentElement[c]-Number.parseInt(b(document.body,`margin-${o}`),10)}px`}for(const o of["height","width"])a[o]=`${t.target.getBoundingClientRect()[o]}px`}else l.originalPosition.value=b(e,"position");for(const[o,c]of Object.entries(a))l.$el.style[o]=c},h=(t,e,l)=>{const s=l.vm.ns||l.vm._.exposed.ns;["absolute","fixed","sticky"].includes(l.originalPosition.value)?y(e,s.bm("parent","relative")):L(e,s.bm("parent","relative")),t.fullscreen&&t.lock?L(e,s.bm("parent","hidden")):y(e,s.bm("parent","hidden"))},x=Symbol("ElLoading"),k=(t,e)=>{var l,s,a,o;const c=e.instance,v=n=>I(e.value)?e.value[n]:void 0,f=n=>{const r=A(n)&&(c==null?void 0:c[n])||n;return r&&_(r)},u=n=>f(v(n)||t.getAttribute(`element-loading-${F(n)}`)),m=(l=v("fullscreen"))!=null?l:e.modifiers.fullscreen,d={text:u("text"),svg:u("svg"),svgViewBox:u("svgViewBox"),spinner:u("spinner"),background:u("background"),customClass:u("customClass"),fullscreen:m,target:(s=v("target"))!=null?s:m?void 0:t,body:(a=v("body"))!=null?a:e.modifiers.body,lock:(o=v("lock"))!=null?o:e.modifiers.lock};t[x]={options:d,instance:K(d)}},J=(t,e)=>{for(const l of Object.keys(e))D(e[l])&&(e[l].value=t[l])},U={mounted(t,e){e.value&&k(t,e)},updated(t,e){const l=t[x];e.oldValue!==e.value&&(e.value&&!e.oldValue?k(t,e):e.value&&e.oldValue?I(e.value)&&J(e.value,l.options):l==null||l.instance.close())},unmounted(t){var e;(e=t[x])==null||e.instance.close(),t[x]=null}};async function W(){return G({__tauriModule:"Process",message:{cmd:"relaunch"}})}export{W as r,U as v};

import{d as B,l as b,c as h,y as I,R as i,T,a3 as z,o as C,a as E,m as c,b as n,w as l,ap as R,i as u,u as O,cf as W,z as $,ce as k,E as M,q as N,U as S,L as V,n as p,t as L,e as U,_ as A}from"./index-D767YE15.js";const q={class:"OR-content","data-tauri-drag-region":"",style:{cursor:"move"}},D={class:"btns"},j=B({__name:"OperationRecordWindow",setup(F){O(t=>({"21c77d42":u(_)}));const{borderRadius:m,appOpacity:_,oppositeBgColor:v}=U(),o=b(1),g=h(()=>{const t=Math.floor(o.value/3600),e=Math.floor(o.value%3600/60),s=Math.floor(o.value%60);return`${t?`${t}:`:""}${e?`${e}:`:""}${s}`});let a,d;const f=()=>{i.setSize(new W(180,40)),m.value="20px",i.show(),o.value=1,a=setInterval(()=>{o.value+=1},1e3)};I(async()=>{i.hide(),d=await T.notify.listen(t=>{const{type:e,payload:s}=t.payload;if(e==="custom-message"){const{name:r}=s;r==="init"?f():r==="stop"&&a&&clearInterval(a)}})}),z(()=>{a&&clearInterval(a),d&&d()});const y=async()=>{var t;await $.stopCaptureOperation(),(t=k.getByLabel("main"))==null||t.show(),a&&clearInterval(a),i.hide()};return(t,e)=>{const s=M,r=N,w=S,x=V;return C(),E("div",q,[c("div",{class:"content","data-tauri-drag-region":"",style:R([{cursor:"move"},{color:u(v)}])},[n(s,{class:"icon","data-tauri-drag-region":"",style:{cursor:"move"}},{default:l(()=>e[0]||(e[0]=[c("span",{"i-svg-spinners-pulse-rings-multiple":""},null,-1)])),_:1}),n(r,{class:"icon",size:"small",type:"primary","data-tauri-drag-region":"",style:{cursor:"move"}},{default:l(()=>[p(L(u(g)),1)]),_:1}),n(w,{class:"message","data-tauri-drag-region":"",style:{cursor:"move"}},{default:l(()=>e[1]||(e[1]=[p("操作录制中")])),_:1})],4),c("div",D,[n(x,{class:"btn",size:"small",type:"danger",onClick:y,circle:""},{default:l(()=>[n(s,null,{default:l(()=>e[2]||(e[2]=[c("span",{"i-mdi-stop-circle-outline":""},null,-1)])),_:1})]),_:1})])])}}}),H=A(j,[["__scopeId","data-v-d9ce723c"]]);export{H as default};

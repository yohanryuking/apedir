import{R as n,r as c,j as t,p as u,q as f,b as m,v as y,w as h}from"./vendor-wMn6iGPg.js";import{i as x}from"./index-8i8i33M2.js";import{g as C}from"./search-AUUXBKwj.js";function w({value:s}){const[r,i]=n.useState(new Set(["Todas"])),[o,l]=c.useState([]),d=x(e=>e.setCategory),g=n.useMemo(()=>Array.from(r).join(", ").replaceAll("_"," "),[r]),p=e=>{i(e);const a=Array.from(e)[0];d(a),s&&(s.current={...s.current,category:a})};return c.useEffect(()=>{(async()=>{const a=await C();l(a)})()},[]),o.length>0&&t.jsxs(u,{children:[t.jsx(f,{children:t.jsxs(m,{variant:"bordered",className:"capitalize",style:{paddingLeft:"10px"},children:[t.jsx("p",{children:"Categoría"}),t.jsx("p",{style:{width:"100%",display:"flex"},children:s?s.current.category:g})]})}),t.jsx(y,{variant:"flat",disallowEmptySelection:!0,selectionMode:"single",selectedKeys:r,onSelectionChange:p,style:{padding:"20px"},children:o.map(e=>t.jsx(h,{children:e.name},e.name))})]})}export{w as S};
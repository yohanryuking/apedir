import{r as e,j as n,_ as o}from"./vendor-TeGnUX-f.js";import{g as r}from"./plans-aHx7rJyA.js";import{d as i}from"./index-IetW687g.js";const m=e.lazy(()=>o(()=>import("./PlansTable-QksbnXnk.js"),__vite__mapDeps([0,1,2,3,4,5,6])));function d(){const[l,s]=e.useState([]),c=i.channel("schema-db-changes").on("postgres_changes",{event:"UPDATE",schema:"public",table:"plans"},t=>console.log(t)).subscribe();return e.useEffect(()=>{(async()=>{const a=await r();s(a===null?[]:a)})()},[c]),n.jsx("div",{className:"flex justify-center items-center",style:{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"40px",width:"100%"},children:n.jsx(m,{plans:l})})}export{d as default};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/PlansTable-QksbnXnk.js","assets/vendor-TeGnUX-f.js","assets/EditIcon-fXuEL-Dm.js","assets/DeleteIcon-Ry1QkPjW.js","assets/plans-aHx7rJyA.js","assets/index-IetW687g.js","assets/index-aTiC4Opb.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}

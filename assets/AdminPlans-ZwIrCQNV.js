import{r as e,j as n,_ as o}from"./vendor-wMn6iGPg.js";import{g as r}from"./plans-P6kHv7ap.js";import{d as i}from"./index-8i8i33M2.js";const m=e.lazy(()=>o(()=>import("./PlansTable-o6vSa4wj.js"),__vite__mapDeps([0,1,2,3,4,5,6])));function d(){const[l,s]=e.useState([]),c=i.channel("schema-db-changes").on("postgres_changes",{event:"UPDATE",schema:"public",table:"plans"},t=>console.log(t)).subscribe();return e.useEffect(()=>{(async()=>{const a=await r();s(a===null?[]:a)})()},[c]),n.jsx("div",{className:"flex justify-center items-center",style:{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"40px",width:"100%"},children:n.jsx(m,{plans:l})})}export{d as default};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/PlansTable-o6vSa4wj.js","assets/vendor-wMn6iGPg.js","assets/EditIcon-jeAxN2UI.js","assets/DeleteIcon-6Ouv8ePB.js","assets/plans-P6kHv7ap.js","assets/index-8i8i33M2.js","assets/index-wNeVnfU6.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}

import{R as s,j as e,p as P,q as M,b as x,v as D,w as p,B as oe,C as R,$ as E,E as ce,i as _,G as de,F as ue,H as me,I as he,J as xe,K as fe,M as pe,m as V,e as L,f as B,g as K,h as H,r as je}from"./vendor-wMn6iGPg.js";import{a9 as ge,aa as ve,ab as $,ac as be}from"./index-8i8i33M2.js";import{E as Ce}from"./EditIcon-jeAxN2UI.js";import{D as ye}from"./DeleteIcon-6Ouv8ePB.js";import{S as we}from"./SearchIcon-tx4-ixfu.js";const Se=o=>{let n=new Date(o),l=n.getUTCDate(),r=n.getUTCMonth()+1,u=n.getUTCFullYear(),i=n.getUTCHours(),d=n.getUTCMinutes(),c=n.getUTCSeconds(),U=i>=12?"PM":"AM";return i=i%12,i=i||12,l+"/"+r+"/"+u+" "+i+":"+d+":"+c+" "+U},_e=Se;function Ae({role:o,onChange:n}){const[l,r]=s.useState(new Set([o])),u=s.useMemo(()=>Array.from(l).join(", ").replaceAll("_"," "),[l]),i=d=>{if(r(d),n){const c=Array.from(d)[0];n(c)}};return e.jsxs(P,{className:"ml-2",children:[e.jsx(M,{children:e.jsx(x,{variant:"shadow",color:"secondary",className:"capitalize text-white w-4",children:u})}),e.jsxs(D,{color:"secondary",variant:"shadow",disallowEmptySelection:!0,selectionMode:"single",selectedKeys:l,onSelectionChange:i,children:[e.jsx(p,{children:"Usuario"},"user"),e.jsx(p,{children:"Comerciante"},"merchant"),e.jsx(p,{children:"Admin"},"admin")]})]})}function Ne({isActive:o,onChange:n}){const[l,r]=s.useState(new Set([o===!0?"active":"inactive"])),u=s.useMemo(()=>Array.from(l).join(", ").replaceAll("_"," "),[l]),i=d=>{if(r(d),n){const c=Array.from(d)[0];n(c)}};return e.jsxs(P,{className:"ml-2",children:[e.jsx(M,{children:e.jsx(x,{variant:"shadow",color:"secondary",className:"capitalize text-white w-4",children:u})}),e.jsxs(D,{color:"secondary",variant:"shadow",disallowEmptySelection:!0,selectionMode:"single",selectedKeys:l,onSelectionChange:i,children:[e.jsx(p,{children:"Activo"},"active"),e.jsx(p,{children:"Inactivo"},"inactive")]})]})}function Ee({plan:o,onChange:n}){const[l,r]=s.useState(new Set([o])),u=s.useMemo(()=>Array.from(l).join(", ").replaceAll("_"," "),[l]),i=d=>{if(r(d),n){const c=Array.from(d)[0];n(c)}};return e.jsxs(P,{className:"ml-2",children:[e.jsx(M,{children:e.jsx(x,{variant:"shadow",color:"secondary",className:"capitalize text-white w-4",children:u})}),e.jsxs(D,{color:"secondary",variant:"shadow",disallowEmptySelection:!0,selectionMode:"single",selectedKeys:l,onSelectionChange:i,children:[e.jsx(p,{children:"Gratis"},"gratis"),e.jsx(p,{children:"Básico"},"basico"),e.jsx(p,{children:"Premium"},"premium")]})]})}const Pe={admin:"danger",user:"success",merchant:"warning"},Me={premium:"secondary",basico:"warning",gratis:"success"},De=[{name:"Activo",uid:"active"},{name:"Baneado",uid:"inactive"}],Ue=[{name:"NOMBRE",uid:"name",sortable:!0},{name:"TELÉFONO",uid:"phone_number"},{name:"ACTIVO",uid:"isActive"},{name:"ROL",uid:"role"},{name:"PLAN",uid:"plan"},{name:"FECHA CREACIÓN",uid:"createdAt",sortable:!0},{name:"ACCIONES",uid:"actions"}];function Fe({users:o,setUsers:n,fetchUsers:l}){const[r,u]=s.useState(""),[i,d]=s.useState(new Set([])),[c,U]=s.useState("all"),[b,q]=s.useState(5),[C,G]=s.useState({column:"age",direction:"ascending"}),[m,j]=s.useState(1),w=!!r,S=s.useMemo(()=>{let t=[...o];return w&&(t=t.filter(a=>a.name.toLowerCase().includes(r.toLowerCase()))),c!=="all"&&Array.from(c).length!==De.length&&(t=t.filter(a=>Array.from(c).includes(a.isActive?"active":"inactive"))),t},[o,w,c,r]),g=Math.ceil(S.length/b),A=s.useMemo(()=>{const t=(m-1)*b,a=t+b;return S.slice(t,a)},[m,S,b]),J=s.useMemo(()=>[...A].sort((t,a)=>{const y=t[C.column],z=a[C.column],k=y<z?-1:y>z?1:0;return C.direction==="descending"?-k:k}),[C,A]),[v,F]=s.useState(null),Y=t=>{F(t),f({...h,id:t.id})},Q=()=>{F(null)},[h,f]=s.useState({id:"",name:"",last_name:"",phone_number:"",role:"",isActive:""}),W=async()=>{await ve(h),f({id:"",name:"",last_name:"",phone_number:"",role:"",isActive:""}),l()},{isOpen:I,onOpen:X,onClose:Z}=oe(),[N,ee]=s.useState(null),te=t=>{ee(t),X(),l()},se=s.useCallback((t,a)=>{const y=t[a];switch(a){case"name":return e.jsx(ce,{avatarProps:{radius:"lg",src:t.avatar},description:t.email,name:y+" "+t.last_name,children:t.email});case"role":return e.jsx(E,{className:"capitalize",color:Pe[t.role],size:"sm",variant:"flat",children:t.role});case"plan":return e.jsx(E,{className:"capitalize",color:Me[t.plan],size:"sm",variant:"flat",children:t.plan});case"createdAt":return e.jsx("span",{children:_e(t.createdAt)});case"isActive":return e.jsx(E,{className:"capitalize",color:t.isActive?"success":"danger",size:"sm",variant:"flat",children:t.isActive?"Activo":"Baneado"});case"actions":return e.jsxs("div",{className:"relative flex items-center  gap-2",children:[e.jsx(R,{content:"Editar usuario",children:e.jsx("span",{className:"text-lg text-default-500 cursor-pointer active:opacity-50",onClick:()=>Y(t),children:e.jsx(Ce,{})})}),e.jsx(R,{color:"danger",content:"Eliminar usuario",children:e.jsx("span",{className:"text-lg text-danger cursor-pointer active:opacity-50",onClick:()=>te(t),children:e.jsx(ye,{})})})]});default:return y}},[]),ae=s.useCallback(()=>{m<g&&j(m+1)},[m,g]),ne=s.useCallback(()=>{m>1&&j(m-1)},[m]),T=s.useCallback(t=>{q(Number(t.target.value)),j(1)},[]),O=s.useCallback(t=>{t?(u(t),j(1)):u("")},[]),le=s.useCallback(()=>{u(""),j(1)},[]),re=s.useMemo(()=>e.jsxs("div",{className:"flex flex-col gap-4 justify-center",children:[e.jsx("div",{className:"flex justify-between gap-3 items-start",children:e.jsx(_,{isClearable:!0,className:"w-full lg:max-w-[40%]",placeholder:"Search by name...",startContent:e.jsx(we,{}),value:r,onClear:()=>le(),onValueChange:O})}),e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsxs("span",{className:"text-default-400 text-small",children:["Total ",o.length," usuarios"]}),e.jsxs("label",{className:"flex items-center text-default-400 text-small",style:{marginRight:"10px"},children:["Filas por página:",e.jsxs("select",{className:"bg-transparent outline-none text-default-400 text-small",onChange:T,children:[e.jsx("option",{value:"5",children:"5"}),e.jsx("option",{value:"10",children:"10"}),e.jsx("option",{value:"15",children:"15"})]})]})]})]}),[r,c,T,o.length,O,w]),ie=s.useMemo(()=>e.jsxs("div",{className:"py-2 px-2 flex justify-between items-center",children:[e.jsx("span",{className:"w-[30%] text-small text-default-400",children:i==="all"?"All items selected":`${i.size} of ${S.length} selected`}),e.jsx(de,{className:"text-white",showShadow:!0,color:"secondary",page:m,total:g,onChange:j}),e.jsxs("div",{className:"hidden sm:flex w-[30%] justify-end gap-2",children:[e.jsx(x,{isDisabled:g===1,size:"sm",variant:"flat",onPress:ne,children:"Previous"}),e.jsx(x,{isDisabled:g===1,size:"sm",variant:"flat",onPress:ae,children:"Next"})]})]}),[i,A.length,m,g,w]);return e.jsxs("div",{style:{width:"90%"},children:[e.jsxs(ue,{"aria-label":"users table",isHeaderSticky:!0,bottomContent:ie,bottomContentPlacement:"outside",classNames:{wrapper:"max-h-[382px]"},selectedKeys:i,selectionMode:"multiple",sortDescriptor:C,topContent:re,topContentPlacement:"outside",onSelectionChange:d,onSortChange:G,children:[e.jsx(me,{columns:Ue,children:t=>e.jsx(he,{align:t.uid==="actions"?"center":"start",allowsSorting:t.sortable,children:t.name},t.uid)}),e.jsx(xe,{emptyContent:"No users found",items:J,children:t=>e.jsx(fe,{children:a=>e.jsx(pe,{align:"center",children:se(t,a)})},t.id)})]}),I&&e.jsx(V,{isOpen:I,onOpenChange:Z,children:e.jsx(L,{children:t=>e.jsxs(e.Fragment,{children:[e.jsxs(B,{children:["Eliminar a ",N.name]}),e.jsxs(K,{children:["¿Estás seguro de que quieres eliminar al usuario"," ",N.name,"?"]}),e.jsxs(H,{children:[e.jsx(x,{color:"danger",variant:"flat",onPress:t,children:"Cancelar"}),e.jsx(x,{color:"primary",onPress:async()=>{await ge(N.id),t()},children:"Eliminar"})]})]})})}),v&&e.jsx(V,{backdrop:"blur",isOpen:!!v,onOpenChange:Q,placement:"top-center",children:e.jsx(L,{children:t=>e.jsxs(e.Fragment,{children:[e.jsxs(B,{className:"flex flex-col gap-1",children:["Editar a ",v.name]}),e.jsx(K,{children:e.jsxs("form",{action:"submit",children:[e.jsx(_,{autoFocus:!0,label:"Nombre",placeholder:"Escribe el nuevo nombre",variant:"bordered",type:"text",onChange:a=>f({...h,name:a.target.value})}),e.jsx("br",{}),e.jsx(_,{autoFocus:!0,label:"Apellido",placeholder:"Escribe los nuevos apellidos",variant:"bordered",type:"text",onChange:a=>f({...h,last_name:a.target.value})}),e.jsx("br",{}),e.jsx(_,{label:"Teléfono",placeholder:"Escribe el nuevo número",type:"number",variant:"bordered",onChange:a=>f({...h,phone_number:a.target.value})}),e.jsx("br",{}),e.jsxs("div",{style:{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"},children:[e.jsxs("span",{className:"w-[30%] text-small text-default-500",children:["ROL"," "]}),e.jsx("br",{}),e.jsx(Ae,{role:h.role!==""?h.role:v.role,onChange:a=>f({...h,role:a})})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"},children:[e.jsx("span",{className:"w-[30%] text-small text-default-500",children:"ESTADO"}),e.jsx("br",{}),e.jsx(Ne,{isActive:v.isActive,onChange:a=>{f({...h,isActive:a==="active"})}})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"},children:[e.jsx("span",{className:"w-[30%] text-small text-default-500",children:"PLAN"}),e.jsx("br",{}),e.jsx(Ee,{plan:v.plan,onChange:a=>{f({...h,plan:a})}})]})]})]})}),e.jsxs(H,{children:[e.jsx(x,{color:"danger",variant:"flat",onPress:t,children:"Cerrar"}),e.jsx(x,{className:"text-white",color:"secondary",onPress:()=>{W(),t()},children:"Editar"})]})]})})})]})}function Re(){const o=$(r=>r.users),n=$(r=>r.setUsers),l=async()=>{const r=await be();n(r)};return je.useEffect(()=>{o.length===0&&l()},[]),e.jsx(e.Fragment,{children:e.jsx("div",{className:"flex justify-center items-center",style:{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"40px",width:"100%"},children:e.jsx(Fe,{users:o,setUsers:n,fetchUsers:l})})})}export{Re as default};
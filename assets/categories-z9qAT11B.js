import{d as t}from"./index-8i8i33M2.js";const s=async e=>{let{data:o,error:a}=await t.from("categories").select("*").eq("bussiness",e).order("category",{ascending:!0});return a!==null&&console.log(a),o},c=async e=>{const{data:o,error:a}=await t.from("categories").insert(e);return console.log(a),o},n=async e=>{const{data:o,error:a}=await t.from("categories").update({category:e.category}).eq("id",e.id);console.log({data:o}),console.log(a)},g=async e=>{await t.from("products").delete().eq("category",e),await t.from("categories").delete().eq("id",e)};export{c as a,g as d,s as g,n as u};
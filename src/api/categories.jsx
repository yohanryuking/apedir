import { supabase } from "./client";


const getCategories = async (bussiness) => {
  let { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .eq("bussiness", bussiness)
    .order("category", { ascending: true });
  if (error !== null) {
    console.log(error);
  }
  return categories;
};

const addCategory = async (category) => {
  const { data, error } = await supabase.from("categories").insert(category);

  console.log(error);
  return data;
};

const updateCategory = async (category) => {
  const { data, error } = await supabase
    .from("categories")
    .update({ category: category.category })
    .eq("id", category.id);
  console.log({ data });
  console.log(error);
};

const deleteCategoryById = async (id) => {
  const { d, e } = await supabase.from("products").delete().eq("category", id);

  const { data, error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id);
};

export { getCategories, addCategory, updateCategory, deleteCategoryById };

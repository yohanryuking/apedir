import { supabase } from "./client";

import { getImage } from "./bussiness";

const getBussiness = async (searchInput) => {

    const { data, error } = await supabase
        .from("bussiness")
        .select("*")
        .or(`name.ilike.%${searchInput}%, address.ilike.%${searchInput}%`)
        .order("privileges", { ascending: false })

    if (error) {
        console.log(error)
        return
    }

    const businessesWithImages = await Promise.all(
        data.map(async (business) => {

            const perfil_pic = await getImage(
                "bussiness_perfil",
                business.perfil_pic
            );

            return {
                ...business,
                perfil_pic,
            };
        })
    );
    console.log(businessesWithImages)
    // if (category) {
    //     newArr = data.filter((business) => business.category === category);
    // }
    // if (province) {
    //     newArr = data.filter((business) => business.province === province);

    // }
    // return newArr
    return businessesWithImages
}

const getProducts = async (searchInput) => {
    const { data, error } = await supabase
        .from("products")
        .select("id, name, image, price, currency, category(bussiness(*))")
        .or(`name.ilike.%${searchInput}%`)

    const productsWithImages = await Promise.all(
        data.map(async (product) => {
            const url = product.category.bussiness.value_url
            const province = product.category.bussiness.province
            const image = await getImage(
                "products",
                product.image
            );

            return {
                ...product,
                image,
                url,
                province
            };
        })
    );

    console.log(productsWithImages)
    return productsWithImages
}

const getEvents = async (searchInput) => {
    const { data, error } = await supabase
        .from("events")
        .select("id, name, image, bussiness(*)")
        .or(`name.ilike.%${searchInput}%`)

    const eventsWithImages = await Promise.all(
        data.map(async (event) => {
            const province = event.bussiness.province
            const image = await getImage(
                "events",
                event.image
            );

            return {
                ...event,
                image,
                province
            };
        })
    );

    return eventsWithImages
}

const getBussinessCategories = async () => {
    const { data, error } = await supabase.from("bussiness_categories").select("*")
    return data
}

export {
    getBussiness,
    getProducts,
    getEvents,
    getBussinessCategories,
}




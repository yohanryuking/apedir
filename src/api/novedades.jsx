import { getImage } from "./bussiness";
import { supabase } from "./client";


const getNovedadesfromBussiness = async (bussinessId) => {
    const { data, error } = await supabase.from("novedades").select("*").eq("bussiness", bussinessId)
    if (error) {
        console.log(error)
        return
    }
    return data
}

const insertNovedad = async (novedad) => {
    const { error } = await supabase.from("novedades").upsert(novedad)

    if (error) {
        console.log(error)
    }
}

const deleteNovedad = async (novedadId) => {
    await supabase.from("novedades").delete().eq("id", novedadId)
}

const getAllNovedades = async () => {
    const { data, error } = await supabase
        .from('novedades')
        .select(`
            id,
            bussiness,
            name,
            text,
            bussiness(*)
            // bussiness(province)
        `);
    if (error) console.log(error)

    if (data) {
        const novedades = await Promise.all(data.map(async (item) => {
            const perfilPic = await getImage('bussiness_perfil', item.bussiness.perfil_pic);

            return {
                id: item.id,
                url: item.bussiness.value_url,
                province: item.bussiness.province,
                name: item.bussiness.name,
                perfil_pic: perfilPic,
                // name: item.name,
                text: item.text
            };
        }));

        return novedades;
    }
}

export {
    getNovedadesfromBussiness,
    insertNovedad,
    deleteNovedad,
    getAllNovedades
}





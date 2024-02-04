import getIcon from "../utils/getIcon";
import { supabase } from "./client";
import { getUserByID } from "./profile";
// import { getStarsFromBussiness } from "./starsRate";

const getBussinessName = async (bussinessId) => {
  const { data, error } = await supabase
    .from("bussiness")
    .select("name")
    .eq("id", bussinessId);
  return data.name;
};

const getBussinessUrl = async (bussinessId) => {
  const { data, err } = await supabase
    .from("bussiness")
    .select("value_url")
    .eq("id", bussinessId);
  return data[0].value_url;
};

const upsertBussiness = async (bussiness) => {
  let bussinessToInsert = Object.keys(bussiness).reduce((acc, key) => {
    if (bussiness[key] !== null && bussiness[key] !== "") {
      acc[key] = bussiness[key];
    }
    return acc;
  }, {});
  if (bussiness.id !== "") {
    const { data, error } = await supabase
      .from("bussiness")
      .upsert(bussinessToInsert);
    console.log(error);
    return;
  }

  const { data, error } = await supabase
    .from("bussiness")
    .insert(bussinessToInsert);
  console.log({ error });
};

const getImage = async (bucket, path) => {
  let { data, ef } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
};

const getBussinessImage = async (id) => {
  let { data, error } = await supabase
    .from("bussiness")
    .select("*")
    .eq("id", id);

  if (data && data[0]) {
    if (data[0].perfil_pic) {
      const perfil_pic = await getImage("bussiness_perfil", data[0].perfil_pic);

      return perfil_pic;
    }
  }
};

const getAllBussinessUrl = async () => {
  const { data } = await supabase.from("bussiness").select("id, value_url")
  return data
}

const getOneBussiness = async (ownerId) => {
  let { data } = await supabase
    .from("bussiness")
    .select("*")
    .eq("owner", ownerId);

  if (data && data[0]) {
    if (data[0].front_pic) {
      const front_pic = await getImage("bussiness_front", data[0].front_pic);
      data[0].front_pic = front_pic;
    }

    if (data[0].perfil_pic) {
      const perfil_pic = await getImage("bussiness_perfil", data[0].perfil_pic);
      data[0].perfil_pic = perfil_pic;
    }

    if (data[0].gps_location) {
      const gps_location = await getImage(
        "bussiness_location",
        data[0].gps_location
      );
      data[0].gps_location = gps_location;
    }
    return data[0];
  }
};

const getAllBussinessFromUser = async (ownerId) => {
  const { data, error } = await supabase
    .from("bussiness")
    .select("*")
    .eq("owner", ownerId);
  const businessesWithImages = await Promise.all(
    data.map(async (business) => {
      // const stars = await getStarsFromBussiness(business.id);
      const front_pic = await getImage("bussiness_front", business.front_pic);
      const perfil_pic = await getImage(
        "bussiness_perfil",
        business.perfil_pic
      );
      const gps_location = await getImage(
        "bussiness_location",
        business.gps_location
      );

      return {
        ...business,
        front_pic,
        perfil_pic,
        gps_location,
      };
    })
  );

  // Actualiza el estado con los nuevos elementos
  return businessesWithImages;
};

const updateBussinessSchedule = async (bussinessId, schedules) => {
  const { data, error } = await supabase
    .from("bussiness")
    .update({ schedules: schedules })
    .eq("id", bussinessId);

  console.log({ error });
};

const loadMoreBussiness = async (
  offset,
  setOffset,
  bussinesses,
  setBussiness
) => {
  // Carga los elementos desde Supabase usando la paginación
  const { data, error } = await supabase
    .from("bussiness")
    .select("*")
    .eq("isActive", true)
    .range(offset, offset + 19)
    .order("privileges", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }
  if (data.length === 0) {
    console.log('No data')
    return;
  }
  // Obtener imágenes asociadas a cada negocio
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
  if (bussinesses !== null && bussinesses.length > 0) {
    const newBusinesses = businessesWithImages.filter((business) => {
      return !bussinesses.find(
        (prevBusiness) => prevBusiness.id === business.id
      );
    });

    const finalBusinesses = [...bussinesses, ...newBusinesses];
    setBussiness(finalBusinesses);
  } else {
    setBussiness(businessesWithImages);
  }

  const newOf = offset + 19;
  setOffset(newOf);
  return businessesWithImages.length > 0 ? true : false;
};

const fetchAllBussiness = async () => {
  const { data, error } = await supabase.from("bussiness").select("*");

  if (error) {
    console.error(error);
    return;
  }
  if (data.length === 0) {
    return;
  }
  // Obtener imágenes asociadas a cada negocio
  const businessesWithImages = await Promise.all(
    data.map(async (business) => {
      const owner = await getUserByID(business.owner);
      // const stars = await getStarsFromBussiness(business.id);
      const front_pic = await getImage("bussiness_front", business.front_pic);
      const perfil_pic = await getImage(
        "bussiness_perfil",
        business.perfil_pic
      );
      const gps_location = await getImage(
        "bussiness_location",
        business.gps_location
      );

      return {
        ...business,
        owner,
        front_pic,
        perfil_pic,
        gps_location,
      };
    })
  );

  return businessesWithImages;
};

const fetchBussinessPerProvince = async (province) => {
  const { data, error } = await supabase
    .from("bussiness")
    .select("*")
    .eq("province", province);
  if (error) return;

  const businessesWithImages = await Promise.all(
    data.map(async (business) => {
      const front_pic = await getImage("bussiness_front", business.front_pic);
      const perfil_pic = await getImage(
        "bussiness_perfil",
        business.perfil_pic
      );
      const gps_location = await getImage(
        "bussiness_location",
        business.gps_location
      );

      return {
        ...business,
        front_pic,
        perfil_pic,
        gps_location,
      };
    })
  );
  return businessesWithImages;
};

const fetchBussinessPerName = async (name) => {
  const { data, error } = await supabase
    .from("bussiness")
    .select("*")
    .eq("name", name);
  if (error) return;

  const businessesWithImages = await Promise.all(
    data.map(async (business) => {
      const front_pic = await getImage("bussiness_front", business.front_pic);
      const perfil_pic = await getImage(
        "bussiness_perfil",
        business.perfil_pic
      );
      const gps_location = await getImage(
        "bussiness_location",
        business.gps_location
      );

      return {
        ...business,
        front_pic,
        perfil_pic,
        gps_location,
      };
    })
  );
  return businessesWithImages;
};

const fetchBussinessPerURL = async (valueUrl) => {
  const { data, error } = await supabase
    .from("bussiness")
    .select("*")
    .eq("value_url", valueUrl);
  if (error) return;
  const businessesWithImages = await Promise.all(
    data.map(async (business) => {
      // const stars = await getStarsFromBussiness(business.id);
      const front_pic = await getImage("bussiness_front", business.front_pic);
      const perfil_pic = await getImage(
        "bussiness_perfil",
        business.perfil_pic
      );
      const gps_location = await getImage(
        "bussiness_location",
        business.gps_location
      );

      return {
        ...business,
        front_pic,
        perfil_pic,
        gps_location,
      };
    })
  );
  return businessesWithImages[0];
};

const getSchedule = async (bussinessId) => {
  let { data, error } = await supabase
    .from("bussiness")
    .select("schedules")
    .eq("id", bussinessId);

  data = data[0].schedules;
  if (error) console.log(error);
  if (data) return data;
  else return null;
};

const getSocialMedia = async (bussinessId) => {
  const { data, error } = await supabase
    .from("bussiness")
    .select(
      "telegram_link, facebook,whatsapp, instagram, linkedin, threads, twitter, youtube, email, phone_number"
    )
    .eq("id", bussinessId);

  if (error) console.log(error);
  return data;
};

const setIsActive = async (bussinessId, isActive) => {
  const { data, error } = await supabase
    .from("bussiness")
    .update({ isActive: isActive })
    .eq("id", bussinessId);
  if (error) console.error(error);
};

const setBussinessPrivileges = async (bussinessId, newPrivileges) => {
  try {
    const { data, error } = await supabase
      .from("bussiness")
      .update({ privileges: newPrivileges })
      .eq("id", bussinessId);

    if (error) {
      console.error(error);
    } else {
      console.log(
        `Privileges updated successfully for business with ID ${bussinessId}`
      );
    }
  } catch (error) {
    console.error(error);
  }
};

export {
  // ... (otras funciones)
  setBussinessPrivileges,
};

const deleteBussinessById = async (businessId) => {
  // Obtener las categorías del negocio dado
  const { data: events, error: eventsError } = await supabase
    .from("events")
    .select("id")
    .eq("bussiness", businessId);

  const { data: stars, error: starsError } = await supabase
    .from("stars_rating")
    .select("id")
    .eq("bussiness", businessId);

  const { data: notifications, error: notificationErr } = await supabase
    .from("notifications")
    .select("id")
    .eq("bussiness", businessId);

  const { data: categories, error: categoriesError } = await supabase
    .from("categories")
    .select("id")
    .eq("bussiness", businessId);

  if (starsError) return;

  if (notificationErr) return;

  if (categoriesError) {
    console.error(categoriesError);
    return;
  }

  // Obtener los productos de las categorías del negocio dado
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("id")
    .in(
      "category",
      categories.map((category) => category.id)
    );

  if (productsError) {
    console.error(productsError);
    return;
  }

  // Borrar los productos del negocio dado
  const { error: deleteProductsError } = await supabase
    .from("products")
    .delete()
    .in(
      "id",
      products.map((product) => product.id)
    );

  if (deleteProductsError) {
    console.error(deleteProductsError);
    return;
  }

  // Borrar las categorías del negocio dado
  const { error: deleteCategoriesError } = await supabase
    .from("categories")
    .delete()
    .in(
      "id",
      categories.map((category) => category.id)
    );

  if (deleteCategoriesError) {
    console.error(deleteCategoriesError);
    return;
  }

  const { error: deleteEventsError } = await supabase
    .from("events")
    .delete()
    .in(
      "id",
      events.map((event) => event.id)
    );

  if (deleteEventsError) {
    console.log(deleteEventsError);
    return;
  }

  const { error: deleteStarsError } = await supabase
    .from("stars_rating")
    .delete()
    .in(
      "id",
      stars.map((star) => star.id)
    );

  if (deleteStarsError) {
    console.log(deleteStarsError);
    return;
  }

  const { error: deleteNotificationsError } = await supabase
    .from("notifications")
    .delete()
    .in(
      "id",
      notifications.map((notification) => notification.id)
    );

  if (deleteNotificationsError) {
    console.log(deleteNotificationsError);
    return;
  }

  // Borrar el negocio dado
  const { data: bussinessData, error: deleteBusinessError } = await supabase
    .from("bussiness")
    .delete()
    .eq("id", businessId);

  if (deleteBusinessError) {
    console.error(deleteBusinessError);
    return;
  }
};

const bussinessNum = async (ownerId) => {
  const { data, error } = await supabase
    .from("bussiness")
    .select()
    .eq("owner", ownerId)
    .count();

  return data;
};

const getSubscriptorsOfBussiness = async (bussinessId) => {
  const { data, error } = await supabase
    .from("profiles")
    .select()
    .contains("subscriptions", [bussinessId]);

  if (error) console.error(error);
  if (data == null) return 0;
  return data.length;
};

export {
  setIsActive,
  upsertBussiness,
  getOneBussiness,
  getImage,
  loadMoreBussiness,
  fetchAllBussiness,
  fetchBussinessPerProvince,
  fetchBussinessPerName,
  fetchBussinessPerURL,
  updateBussinessSchedule,
  getSchedule,
  getBussinessImage,
  getBussinessName,
  getBussinessUrl,
  getAllBussinessFromUser,
  getSocialMedia,
  deleteBussinessById,
  bussinessNum,
  getSubscriptorsOfBussiness,
  getAllBussinessUrl,
};

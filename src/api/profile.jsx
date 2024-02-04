import { banUser } from "./auth";
import { supabase } from "./client";


const getRole = async (email) => {
  let { data: profiles, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("email", email);

  if (error) {
    console.log(error);
    return null;
  }
  if (profiles[0] !== null && profiles[0] !== undefined) {
    return profiles[0].role;
  }
};

const getUser = async (email) => {
  let { data: profiles, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", email);

  if (error) {
    console.log(error);
    return null;
  }
  if (profiles[0] !== null && profiles[0] !== undefined) {
    return profiles[0];
  }
};

const getUserByID = async (id) => {
  const { data, err } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  return data;
};

const getUsers = async () => {
  let { data: profiles, error } = await supabase.from("profiles").select("*");
  if (error) {
    return null;
  }
  return profiles;
};

const updateProfile = async (profile) => {
  let updatedProfile = Object.keys(profile).reduce((acc, key) => {
    if (profile[key] !== null && profile[key] !== "") {
      acc[key] = profile[key];
    }
    return acc;
  }, {});
  if ("isActive" in updatedProfile) {
    await banUser(profile.id, updatedProfile.isActive);
  }

  const { data, error } = await supabase
    .from("profiles")
    .update(updatedProfile)
    .eq("id", profile.id)
    .select();
  console.log(error);
};

const deleteProfile = async (id) => {
  const { error } = await supabase.from("profiles").delete().eq("id", id);
};

const getProfileStars = async (userId) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("star_ratings")
    .eq("id", userId)
    .single();
  if (error) {
    console.log(error);
    return;
  }
  return data.star_ratings;
};

const getProfileStarsFromBussiness = async (userId, bussinessId) => {
  let { data: userStars, err } = await supabase
    .from("profiles")
    .select("star_ratings")
    .eq("id", userId)
    .single();
  let bussinessIndex = -1;
  if (userStars.star_ratings !== null) {
    userStars = userStars.star_ratings;

    bussinessIndex = userStars.findIndex(
      (element) => element.bussiness === bussinessId
    );
  }
  if (bussinessIndex > -1) {
    // If business exists in userStars, update the stars rating
    const stars = userStars[bussinessIndex].stars;
    return stars;
  } else {
    // If business doesn't exist in userStars, add it to the list
    return 0;
  }
};

const getUserStarsForBussiness = async (user, bussiness) => {
  const userStars = await getProfileStars(user);
  if (userStars === null) {
    return 0;
  }
  const businessRating = userStars.find(
    (element) => element.bussiness === bussiness
  );
  return businessRating ? businessRating.stars : 0;
};

const updateProfileStars = async (user, bussiness, stars) => {
  let userStars = await getProfileStars(user);

  // Initialize userStars as an empty array if it's null
  if (userStars === null || userStars === undefined) {
    userStars = [];
  }

  const bussinessIndex = userStars.findIndex(
    (element) => element.bussiness === bussiness
  );

  if (bussinessIndex > -1) {
    // Si el negocio ya existe en userStars, actualizar la calificación
    userStars[bussinessIndex].stars = stars;
  } else {
    // Si el negocio no existe en userStars, agregarlo a la lista
    userStars.push({
      bussiness: bussiness,
      stars: stars,
    });
  }

  const { data, err } = await supabase
    .from("profiles")
    .update({ star_ratings: userStars })
    .eq("id", user);
  if (err) console.log(err);
};

const addOrDeleteSubscription = async (userId, bussinessId) => {
  let { data: prevSubs, error } = await supabase
    .from("profiles")
    .select("subscriptions")
    .eq("id", userId);

  prevSubs = prevSubs.length === 1 ? prevSubs[0].subscriptions : [];

  console.log({ error });

  if (prevSubs === null || prevSubs === undefined) {
    prevSubs = [];
    prevSubs.push(bussinessId);
  } else {
    const index = prevSubs.findIndex((b) => b === bussinessId);
    if (index !== -1) {
      // Eliminar el negocio de la suscripción
      prevSubs.splice(index, 1);
    } else {
      // Agregar el negocio a la suscripción
      prevSubs.push(bussinessId);
    }
  }

  const { data, err } = await supabase
    .from("profiles")
    .update({ subscriptions: prevSubs })
    .eq("id", userId);
  if (err) console.log(err);
};

const getSubscription = async (user, bussiness) => {
  let { data, error } = await supabase
    .from("profiles")
    .select("subscriptions")
    .eq("id", user);

  data = data[0].subscriptions;
  if (error) {
    console.error(error);
    return;
  }
  if (!Array.isArray(data)) {
    console.error("Data is not an array");
    return false;
  }

  const subscription = data.find((b) => b === bussiness);
  return subscription ? true : false;
};

export {
  getRole,
  getUser,
  getUserByID,
  getUsers,
  updateProfile,
  deleteProfile,
  updateProfileStars,
  getProfileStarsFromBussiness,
  getProfileStars,
  getUserStarsForBussiness,
  addOrDeleteSubscription,
  getSubscription,
};

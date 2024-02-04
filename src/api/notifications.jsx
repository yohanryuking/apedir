import { supabase } from "./client";


const addNotification = async (notification) => {
  let { data: idList, err } = await supabase
    .from("profiles")
    .select("id")
    .contains("subscriptions", [notification.bussiness]);

  idList = idList.map((obj) => obj.id);

  if (idList instanceof Array && idList.length > 0) {
    notification.addressee = idList;
  } else {
    idList = [idList] || [];
    notification.addressee = idList;
  }
  const { data, error } = await supabase
    .from("notifications")
    .insert(notification);
  if (error) console.log(error);
};

const getNotificationsFromUser = async (id) => {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .contains("addressee", [id])
    .order("created_at", {
      ascending: false,
    });
  return data;
};

const deleteUserNotification = async (notificationId, userId) => {
  console.log(notificationId);
  let { data, error } = await supabase
    .from("notifications")
    .select("addressee")
    .eq("id", notificationId);

  data[0].addressee.pop(userId);

  const { data: updated, err } = await supabase
    .from("notifications")
    .update({ addressee: data[0].addressee })
    .eq("id", notificationId);
  if (err) console.error(err);
};

export { addNotification, getNotificationsFromUser, deleteUserNotification };

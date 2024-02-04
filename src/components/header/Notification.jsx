import React, { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Badge,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { NotificationIcon } from "../Icons/NotificationIcon";
import { useUserStore } from "../../hooks/useStore";
import {
  deleteUserNotification,
  getNotificationsFromUser,
} from "../../api/notifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { supabase } from "../../api/client";
import { faBell } from "@fortawesome/free-solid-svg-icons";

export default function Notification() {
  const user = useUserStore((state) => state.user);
  const [notifications, setNotifications] = useState([]);
  const [isInvisible, setIsInvisible] = useState(false);
  const navigate = useNavigate();

  const channels = supabase
    .channel("custom-insert-channel")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "notifications" },
      (payload) => {
        fetchNotifications();
      }
    )
    .subscribe();

  const fetchNotifications = async () => {
    const notificationList = await getNotificationsFromUser(user.id);
    setNotifications(notificationList);
  };
  React.useEffect(() => {
    return () => fetchNotifications();
  }, [user]);

  const handleDelete = async (notificationId) => {
    await deleteUserNotification(notificationId, user.id);
  };

  return (
    <Dropdown aria-label="notifications for user">
      <DropdownTrigger aria-label="notifications for user">
        <div style={{ marginTop: "10px" }}>
          {notifications && notifications.length > 0 ? (
            <Badge
              color={notifications.length > 0 ? "danger" : "default"}
              content={notifications.length || 0}
              isInvisible={isInvisible}
              shape="circle"
            >
              <FontAwesomeIcon icon={faBell} size="xl" />
            </Badge>
          ) : (
            <FontAwesomeIcon icon={faBell} size="xl" />

          )}
        </div>
      </DropdownTrigger>
      <DropdownMenu items={notifications} aria-label="notifications for user">
        {(item) => (
          <DropdownItem
            key={`${item.id}`}
            onClick={() => {
              handleDelete(item.id);
              navigate(`/lugar/${item.bussiness_link}`);
              fetchNotifications();
            }}
          >
            {item.message}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}

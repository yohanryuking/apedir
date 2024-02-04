import React, { lazy, Suspense } from "react";

import { getUsers } from "../../api/profile";
import { useEffect } from "react";
import UsersTable from "../../components/Admin/UsersTable";
import { useAdminUsers } from "../../hooks/useStore";

export default function AdminDashboard() {
  // const [users, setUsers] = useState([]);

  const users = useAdminUsers((state) => state.users);
  const setUsers = useAdminUsers((state) => state.setUsers);
  const fetchUsers = async () => {
    const ul = await getUsers();
    setUsers(ul);
  };
  useEffect(() => {
    if (users.length === 0) fetchUsers();
  }, []);

  return (
    <>
      <div
        className="flex justify-center items-center"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "40px",
          width: "100%",
        }}
      >
        <UsersTable users={users} setUsers={setUsers} fetchUsers={fetchUsers} />
      </div>
    </>
  );
}

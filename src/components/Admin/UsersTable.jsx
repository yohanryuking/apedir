import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Tooltip,
  Chip,
  User,
  Pagination,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  // useDisclosure,
} from "@nextui-org/react";
import { EditIcon } from "../Icons/Edit/EditIcon";
import { DeleteIcon } from "../Icons/DeleteIcon/DeleteIcon";
import { SearchIcon } from "../Icons/SearchIcon";
import dateConverter from "../../utils/dateConverter";
import UserRoleDropDown from "./UserRoleDropDown";
import ActiveDropdw from "./ActiveDropdw";
import { deleteProfile, updateProfile } from "../../api/profile";
import PlanDropDown from "./PlanDropdown";

const roleColorMap = {
  admin: "danger",
  user: "success",
  merchant: "warning",
};

const planColorMap = {
  premium: "secondary",
  basico: "warning",
  gratis: "success",
};
const statusOptions = [
  { name: "Activo", uid: "active" },
  { name: "Baneado", uid: "inactive" },
];

const columns = [
  { name: "NOMBRE", uid: "name", sortable: true },
  { name: "TELÉFONO", uid: "phone_number" },
  { name: "ACTIVO", uid: "isActive" },
  { name: "ROL", uid: "role" },
  { name: "PLAN", uid: "plan" },
  { name: "FECHA CREACIÓN", uid: "createdAt", sortable: true },
  { name: "ACCIONES", uid: "actions" },
];
export default function UsersTable({ users, setUsers, fetchUsers }) {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));

  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.isActive ? "active" : "inactive")
      );
    }

    return filteredUsers;
  }, [users, hasSearchFilter, statusFilter, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const [selectedUser, setSelectedUser] = React.useState(null);

  const openModal = (user) => {
    setSelectedUser(user);
    setEditedUser({ ...editedUser, id: user.id });
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  const [editedUser, setEditedUser] = React.useState({
    id: "",
    name: "",
    last_name: "",
    phone_number: "",
    role: "",
    isActive: "",
  });

  const handleEditClick = async () => {
    await updateProfile(editedUser);

    setEditedUser({
      id: "",
      name: "",
      last_name: "",
      phone_number: "",
      role: "",
      isActive: "",
    });
    fetchUsers();
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userToDelete, setUserToDelete] = React.useState(null);

  const deleteUser = (user) => {
    // console.log(user)
    setUserToDelete(user);
    onOpen();
    fetchUsers();
  };

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.email}
            name={cellValue + " " + user.last_name}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <Chip
            className="capitalize"
            color={roleColorMap[user.role]}
            size="sm"
            variant="flat"
          >
            {user.role}
          </Chip>
        );
      case "plan":
        return (
          <Chip
            className="capitalize"
            color={planColorMap[user.plan]}
            size="sm"
            variant="flat"
          >
            {user.plan}
          </Chip>
        );
      case "createdAt":
        return <span>{dateConverter(user.createdAt)}</span>;
      case "isActive":
        return (
          <Chip
            className="capitalize"
            color={user.isActive ? "success" : "danger"}
            size="sm"
            variant="flat"
          >
            {user.isActive ? "Activo" : "Baneado"}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center  gap-2">
            <Tooltip content="Editar usuario">
              <span
                className="text-lg text-default-500 cursor-pointer active:opacity-50"
                onClick={() => openModal(user)}
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Eliminar usuario">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => deleteUser(user)}
              >
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4 justify-center">
        <div className="flex justify-between gap-3 items-start">
          <Input
            isClearable
            className="w-full lg:max-w-[40%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {users.length} usuarios
          </span>
          <label
            className="flex items-center text-default-400 text-small"
            style={{ marginRight: "10px" }}
          >
            Filas por página:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    onRowsPerPageChange,
    users.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          className="text-white"
          // isCompact
          // showControls
          showShadow
          color="secondary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <div style={{ width: "90%" }}>
      <Table
        aria-label="users table"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[382px]",
        }}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No users found"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell align="center">
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {isOpen && (
        <Modal isOpen={isOpen} onOpenChange={onClose}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>Eliminar a {userToDelete.name}</ModalHeader>
                <ModalBody>
                  ¿Estás seguro de que quieres eliminar al usuario{" "}
                  {userToDelete.name}?
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Cancelar
                  </Button>
                  <Button
                    color="primary"
                    onPress={async () => {
                      await deleteProfile(userToDelete.id);
                      onClose();
                    }}
                  >
                    Eliminar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
      {selectedUser && (
        <Modal
          backdrop="blur"
          isOpen={!!selectedUser}
          onOpenChange={closeModal}
          placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Editar a {selectedUser.name}
                </ModalHeader>
                <ModalBody>
                  <form action="submit">
                    <Input
                      autoFocus
                      label="Nombre"
                      placeholder="Escribe el nuevo nombre"
                      variant="bordered"
                      type="text"
                      onChange={(e) =>
                        setEditedUser({ ...editedUser, name: e.target.value })
                      }
                    />
                    <br />
                    <Input
                      autoFocus
                      label="Apellido"
                      placeholder="Escribe los nuevos apellidos"
                      variant="bordered"
                      type="text"
                      onChange={(e) =>
                        setEditedUser({
                          ...editedUser,
                          last_name: e.target.value,
                        })
                      }
                    />
                    <br />
                    <Input
                      label="Teléfono"
                      placeholder="Escribe el nuevo número"
                      type="number"
                      variant="bordered"
                      onChange={(e) =>
                        setEditedUser({
                          ...editedUser,
                          phone_number: e.target.value,
                        })
                      }
                    />
                    <br />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <span className="w-[30%] text-small text-default-500">
                          ROL{" "}
                        </span>
                        <br />
                        <UserRoleDropDown
                          role={
                            editedUser.role !== ""
                              ? editedUser.role
                              : selectedUser.role
                          }
                          onChange={(value) =>
                            setEditedUser({ ...editedUser, role: value })
                          }
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <span className="w-[30%] text-small text-default-500">
                          ESTADO
                        </span>
                        <br />
                        <ActiveDropdw
                          isActive={selectedUser.isActive}
                          onChange={(value) => {
                            setEditedUser({
                              ...editedUser,
                              isActive: value === "active" ? true : false,
                            });
                          }}
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <span className="w-[30%] text-small text-default-500">
                          PLAN
                        </span>
                        <br />
                        <PlanDropDown
                          plan={selectedUser.plan}
                          onChange={(value) => {
                            setEditedUser({
                              ...editedUser,
                              plan: value,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </form>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Cerrar
                  </Button>
                  <Button
                    className="text-white"
                    color="secondary"
                    onPress={() => {
                      handleEditClick();
                      onClose();
                    }}
                  >
                    Editar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}

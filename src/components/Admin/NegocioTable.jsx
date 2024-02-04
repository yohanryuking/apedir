import { DeleteIcon } from "../Icons/DeleteIcon/DeleteIcon";
import { SearchIcon } from "../Icons/SearchIcon";
import DeleteBussinessModal from "./modals/DeleteBussinessModal";
import { setIsActive } from "../../api/bussiness";
import { setBussinessPrivileges } from "../../api/bussiness";
import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Tooltip,
  useDisclosure,
  Pagination, Input, Avatar, Checkbox
  
} from "@nextui-org/react";

const columns = [
  { name: "Nombre", uid: "name" },
  { name: "Dueño", uid: "owner" },
  { name: "Foto de portada", uid: "front_pic" },
  { name: "Dirección", uid: "address" },
  { name: "Provincia", uid: "province" },
  { name: "Teléfono", uid: "phone" },
  { name: "Privilegios", uid: "privileges" },
  { name: "Acciones", uid: "actions" },
];

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};


const handleCheckboxChange = async (event, bussinessId) => {
  await setIsActive(bussinessId, event.target.checked);
};

export default function NegocioTable({ bussinessList, getAllBussinesses }) {
  const [bussinessToDelete, setBussinessToDelete] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
  const renderCell = React.useCallback((bussiness, columnKey) => {
    const handlePrivilegesChange = async (event, bussinessId) => {
      const newPrivileges = parseInt(event.target.value, 10);
    
      try {
        await setBussinessPrivileges(bussinessId, newPrivileges);
        await getAllBussinesses();
      } catch (error) {
        console.error(error);
      }
    };  
    
    const cellValue = bussiness.columnKey;
    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "sm", src: bussiness.perfil_pic }}
            name={bussiness.name}
          >
            {bussiness.name}
          </User>
        );
      case "owner":
        return bussiness?.owner ? (
          <User
            avatarProps={{
              radius: "lg",
              src: bussiness?.owner ? bussiness.owner.avatar_pic : null,
            }}
            description={bussiness?.owner ? bussiness.owner.name : null}
            name={cellValue}
          >
            {bussiness?.owner ? bussiness.owner.phone_number : null}
          </User>
        ) : (
          <p>N/A</p>
        );
      case "front_pic":
        return (
          <Avatar
            isBordered
            radius="sm"
            src={bussiness.front_pic ? bussiness.front_pic : null}
          />
        );
      case "address":
        return <p>{bussiness.address || "N/A"}</p>;

      case "province":
        return <p>{bussiness.province || "N/A"}</p>;
      case "phone":
        return <p>{bussiness.phone_number || "N/A"}</p>;

        case "privileges":
          return (
            <Input
              type="number"
              defaultValue={bussiness.privileges}
              onChange={(event) => handlePrivilegesChange(event, bussiness.id)}
            />
          );
        
         

      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <div>
            
              <Tooltip color="primary" content="Activar o desactivar negocio">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <Checkbox
                    isSelected={bussiness.isActive}
                    onValueChange={(event) =>
                      handleCheckboxChange(event, bussiness.id)
                    }
                  />
                </span>
              </Tooltip>
            </div>
            <Tooltip color="danger" content="Eliminar negocio">
              <span
                onClick={() => {
                  setBussinessToDelete(bussiness);
                  onOpen();
                }}
                className="text-lg text-danger cursor-pointer active:opacity-50"
              >
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue || "N/A";
    }
  }, []);

  const [filterValue, setFilterValue] = React.useState("");

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 4;

  const filteredBussinessList = bussinessList.filter((bussiness) =>
    bussiness.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  const pages = Math.ceil(filteredBussinessList.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredBussinessList.slice(start, end);
  }, [page, filteredBussinessList]);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  return (
    <div
      className="py-2 px-2 grid justify-between items-center m-2"
      style={{
        justifyContent: "center",
        padding: "20px",
        width: "100%",
        display: "grid",
      }}
    >
      <div style={{ maxWidth: "1600px" }}>
        <Input
          isClearable
          className="w-full lg:max-w-[40%] mb-2"
          placeholder="Search by name..."
          startContent={<SearchIcon />}
          value={filterValue}
          onClear={() => onSearchChange("")}
          onValueChange={onSearchChange}
        />
        <Table
          aria-label="Bussiness Table"
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                className="text-white"
                isCompact
                showControls
                showShadow
                color="secondary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          }
          classNames={{
            wrapper: "min-h-[222px]",
          }}
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={items}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
        <DeleteBussinessModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          bussinessToDelete={bussinessToDelete}
          getAllBussinesses={getAllBussinesses}
        />
      </div>
    </div>
  );
}

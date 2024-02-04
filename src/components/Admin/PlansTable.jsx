import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Tooltip,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { EditIcon } from "../Icons/Edit/EditIcon";
import { DeleteIcon } from "../Icons/DeleteIcon/DeleteIcon";
import { Toaster, toast } from "sonner";
import { updatePlan, deletePlan } from "../../api/plans";
import EditPlanForm from "./EditPlanForm";

export default function PlansTable({ plans }) {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [selectedPlan, setSelectedPlan] = React.useState(null);
  const openModal = (plan) => {
    setSelectedPlan(plan);
    setEditedPlan({ ...editedPlan, id: plan.id });
  };

  const closeModal = () => {
    setSelectedPlan(null);
  };
  const columns = [
    { name: "Nombre", uid: "name" },
    { name: "Precio", uid: "price" },
    { name: "Cantidad de negocios", uid: "bussiness_num" },
    { name: "Cant. Productos", uid: "product_num" },
    { name: "Domicilio", uid: "delivery" },
    { name: "Redes Sociales", uid: "social_media" },
    { name: "Teléfono", uid: "phone_number" },
    { name: "Email", uid: "email" },
    { name: "Localización GPS", uid: "gps_location" },
    { name: "Eventos", uid: "event_post" },
    { name: "Reserva", uid: "booking" },
    { name: "Prioridad", uid: "priorize" },
    { name: "Acciones", uid: "actions" },
  ];

  const [editedPlan, setEditedPlan] = React.useState({
    id: "",
    name: "",
    price: "",
    bussiness_num: "",
    front_pic: "",
    perfil_pic: "",
    product_num: "",
    delivery: "",
    open_hour: "",
    close_hour: "",
    social_media: "",
    phone_number: "",
    email: "",
    gps_location: "",
    event_post: "",
    booking: "",
    priorize: "",
  });

  const handleEditClick = async () => {
    const error = await updatePlan(editedPlan);

    if (error !== null) {
      toast.error(error.message);
    }

    setEditedPlan({
      id: "",
      name: "",
      price: "",
      bussiness_num: "",
      front_pic: "",
      perfil_pic: "",
      product_num: "",
      delivery: "",
      open_hour: "",
      close_hour: "",
      social_media: "",
      phone_number: "",
      email: "",
      gps_location: "",
      event_post: "",
      booking: "",
      priorize: "",
    });
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [planToDelete, setPlanToDelete] = React.useState(null);

  const handleDeletePlan = async (plan) => {
  
    setPlanToDelete(plan);
    //
    onOpen();
  };

  const renderCell = React.useCallback((plan, columnKey) => {
    const cellValue = plan[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <Chip
            className="capitalize"
            color={
              plan.name === "Gratis"
                ? "success"
                : plan.name === "Básico"
                ? "primary"
                : "danger"
            }
            size="sm"
            variant="flat"
          >
            {plan.name}
          </Chip>
        );
      case "delivery":
        return (
          <Chip
            className="capitalize"
            color={plan.delivery === true ? "success" : "danger"}
            size="sm"
            variant="flat"
          >
            {plan.delivery === true ? "Si" : "No"}
          </Chip>
        );
      case "event_post":
        return (
          <Chip
            className="capitalize"
            color={plan.event_post === true ? "success" : "danger"}
            size="sm"
            variant="flat"
          >
            {plan.event_post === true ? "Si" : "No"}
          </Chip>
        );
      case "booking":
        return (
          <Chip
            className="capitalize"
            color={plan.booking === true ? "success" : "danger"}
            size="sm"
            variant="flat"
          >
            {plan.booking === true ? "Si" : "No"}
          </Chip>
        );
      case "priorize":
        return (
          <Chip
            className="capitalize"
            color={plan.priorize === true ? "success" : "danger"}
            size="sm"
            variant="flat"
          >
            {plan.priorize === true ? "Si" : "No"}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center  gap-2">
            <Tooltip content="Edit user">
              <span
                className="text-lg text-default-500 cursor-pointer active:opacity-50"
                onClick={() => openModal(plan)}
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => handleDeletePlan(plan)}
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

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4 justify-center">
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total: {plans.length} planes
          </span>
          <label
            className="flex items-center text-default-400 text-small"
            style={{ marginRight: "10px" }}
          ></label>
        </div>
      </div>
    );
  }, [filterValue, plans.length]);

  return (
    <div style={{ width: "90%" }}>
      <Table
      aria-label="Plans table"
        isHeaderSticky
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[382px]",
        }}
        selectedKeys={selectedKeys}
        topContent={topContent}
        topContentPlacement="outside"
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
        <TableBody emptyContent={"No plans found"} items={plans}>
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

      <Toaster duration={3000} richColors position="bottom-center" />

      {isOpen && (
        <Modal isOpen={isOpen} onOpenChange={onClose}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>Eliminar a {planToDelete.name}</ModalHeader>
                <ModalBody>
                  ¿Estás seguro de que quieres eliminar al usuario{" "}
                  {planToDelete.name}?
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Cancelar
                  </Button>
                  <Button
                    color="primary"
                    onPress={async () => {
                      await deletePlan(planToDelete.id);

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
      {selectedPlan && (
        <Modal
          backdrop="blur"
          isOpen={!!selectedPlan}
          onOpenChange={closeModal}
          placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Editar plan: {selectedPlan.name}
                </ModalHeader>
                <ModalBody>
                  <EditPlanForm
                    editedPlan={editedPlan}
                    selectedPlan={selectedPlan}
                    setEditedPlan={setEditedPlan}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Cerrar
                  </Button>
                  <Button
                    className="text-white"
                    color="success"
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

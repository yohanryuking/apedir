import React, { useState } from "react";
import {
    Input,
    Button,
    Textarea,
    useDisclosure,
    Modal,
    ModalContent,
    ModalFooter,
    ModalBody,
    ModalHeader,
} from "@nextui-org/react";
import { toast, Toaster } from "sonner";
import Loader from "../Loader/Loader";
import { getNovedadesfromBussiness, insertNovedad } from "../../api/novedades";
import { merchantNovedades } from "../../hooks/useStore";
import { DeleteIcon } from "../Icons/DeleteIcon/DeleteIcon";
import { deleteNovedad } from "../../api/novedades";

export default function EventCard({ bussinessId, event }) {
    const setNovedades = merchantNovedades((state) => state.setNovedades);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [render, setRender] = useState(0)
    const defaultNovedadValues = {
        id: "",
        bussiness: bussinessId !== null && bussinessId !== undefined ? bussinessId : "",
        name: "",
        text: ""
    };

    const fetchEvents = async () => {
        const eventList = await getNovedadesfromBussiness(bussinessId);
        setNovedades(eventList);
    };

    const novedadInput = React.useRef(event !== null && event !== undefined ? event : defaultNovedadValues);

    const handleDelete = async () => {
        setIsDeleting(true);
        await deleteNovedad(event.id);
        await fetchEvents();
        setIsDeleting(false);
    };

    const handleAddEvent = async () => {
        setIsLoading(true);
        const updatedEvent = {
            bussiness: novedadInput.current.bussiness,
            name: novedadInput.current.name,
            text: novedadInput.current.text
        };
        await insertNovedad(updatedEvent);
        toast.success("Novedad actualizada satisfactoriamente");
        setIsLoading(false);
        novedadInput.current = defaultNovedadValues
        await fetchEvents();
    };

    return (
        <div style={{ padding: "5px" }}>
            {event && (
                <section style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                    <span className="text-danger" onClick={onOpen}>
                        <DeleteIcon />
                    </span>
                </section>
            )}
            <br />
            <Input
                type="text"
                label="Nombre del evento"
                variant="bordered"
                placeholder="Escribe el nombre del evento"
                labelPlacement="outside"
                value={novedadInput.current.name}
                onChange={(event) => {
                    novedadInput.current = {
                        ...novedadInput.current,
                        name: event.target.value,
                    };
                    setRender((render) => render + 1);
                }}
            />
            <br />

            <Textarea
                label="Novedad"
                labelPlacement="outside"
                style={{ width: "300px", height: "230px" }}
                placeholder="Escribe una novedad, esta puede ser una oferta de trabajo, una promoción o cualquier cosa"
                variant="bordered"
                value={novedadInput.current.text}
                onChange={(event) => {
                    novedadInput.current = { ...novedadInput.current, text: event.target.value };
                    setRender(render => render + 1)
                }}
            />

            <br />

            {isLoading && <Loader text={"Espere mientras se añade la novedad"} />}
            <Button color="secondary" className="text-white mt-2" onClick={handleAddEvent}>
                Agregar Novedad
            </Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Eliminar {event.name}</ModalHeader>
                            <ModalBody>
                                <p>Si eliminas este evento no podrás recuperarlo.</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onClick={onClose}>
                                    cerrar
                                </Button>
                                <Button color="primary" onClick={() => { handleDelete(); onClose(); }}>
                                    {isDeleting ? "Eliminando..." : "Eliminar"}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Toaster richColors duration={3000} position="bottom-center" theme="dark" />
        </div>
    );
}

import { Input } from "@nextui-org/react";
import UserRoleDropDown from "./UserRoleDropDown";
import ActiveDropdw from "./ActiveDropdw";
import ConditionalDropDown from "./ConditionalDropDown";

export default function EditPlanForm({
  editedPlan,
  setEditedPlan,
  selectedPlan,
}) {
  const divStyle = { display: "flex", flexDirection: "row", gap: "10px" };
  return (
    <div>
      <form action="submit">
        <Input
          autoFocus
          label="Nombre"
          placeholder="Escribe el nuevo nombre"
          variant="bordered"
          type="text"
          onChange={(e) =>
            setEditedPlan({ ...editedPlan, name: e.target.value })
          }
        />
        <br />
        <Input
          autoFocus
          label="Precio"
          placeholder="Escribe el precio"
          variant="bordered"
          type="number"
          onChange={(e) =>
            setEditedPlan({
              ...editedPlan,
              price: e.target.value,
            })
          }
        />
        <br />
        <div style={divStyle}>
          <Input
            autoFocus
            label="Cant. Negocios"
            placeholder="Escribe la cantidad"
            variant="bordered"
            type="number"
            onChange={(e) =>
              setEditedPlan({
                ...editedPlan,
                bussiness_num: e.target.value,
              })
            }
          />

          <Input
            autoFocus
            label="Cantidad de Productos"
            placeholder="Escribe la cantidad"
            variant="bordered"
            type="number"
            onChange={(e) =>
              setEditedPlan({
                ...editedPlan,
                product_num: e.target.value,
              })
            }
          />
        </div>

        <br />

        <div style={divStyle}>
          <Input
            autoFocus
            label="Redes sociales"
            placeholder="Escribe la cantidad"
            variant="bordered"
            type="number"
            onChange={(e) =>
              setEditedPlan({
                ...editedPlan,
                social_media: e.target.value,
              })
            }
          />
          <br />

          <Input
            label="Teléfono"
            placeholder="Escribe la cantidad"
            type="number"
            variant="bordered"
            onChange={(e) =>
              setEditedPlan({
                ...editedPlan,
                phone_number: e.target.value,
              })
            }
          />
        </div>
        <br />

        <div style={divStyle}>
          <Input
            label="Email"
            placeholder="Escribe la cantidad de emails"
            type="number"
            variant="bordered"
            onChange={(e) =>
              setEditedPlan({
                ...editedPlan,
                email: e.target.value,
              })
            }
          />
          <br />

          <Input
            label="Localización GPS"
            placeholder="Escribe la cantidad de localizaciones GPS"
            type="number"
            variant="bordered"
            onChange={(e) =>
              setEditedPlan({
                ...editedPlan,
                gps_location: e.target.value,
              })
            }
          />
        </div>
        <br />

        <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          <div style={{ width: "25%" }}>
            <span
              style={{ marginLeft: "10px" }}
              className="w-[30%] text-small text-default-400"
            >
              Domicilio
            </span>
            <br />
            <ConditionalDropDown
              status={selectedPlan.delivery}
              onChange={(value) => {
                setEditedPlan({
                  ...editedPlan,
                  event_post: value === "true" ? true : false,
                });
              }}
            />
          </div>
          <div style={{ width: "25%" }}>
            <span
              style={{ marginLeft: "12px" }}
              className="w-[30%] text-small text-default-400"
            >
              Eventos
            </span>
            <br />
            <ConditionalDropDown
              isActive={selectedPlan.event_post}
              onChange={(value) => {
                setEditedPlan({
                  ...editedPlan,
                  event_post: value === "active" ? true : false,
                });
              }}
            />
          </div>
          <div style={{ width: "25%" }}>
            <span
              style={{ marginLeft: "12px" }}
              className="w-[30%] text-small text-default-400"
            >
              Reservas
            </span>
            <br />
            <ConditionalDropDown
              isActive={selectedPlan.booking}
              onChange={(value) => {
                setEditedPlan({
                  ...editedPlan,
                  booking: value === "active" ? true : false,
                });
              }}
            />
          </div>
          <div style={{ width: "25%" }}>
            <span
              style={{ marginLeft: "12px" }}
              className="w-[30%] text-small text-default-400"
            >
              Priorizar
            </span>
            <br />
            <ConditionalDropDown
              isActive={selectedPlan.priorize}
              onChange={(value) => {
                setEditedPlan({
                  ...editedPlan,
                  priorize: value === "active" ? true : false,
                });
              }}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

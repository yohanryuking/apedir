import React ,{lazy,Suspense} from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { grid_1_col } from "../styles/styles";

const TextAreaDescription = lazy(()=>import ("./Inputs/TextAreaDescripcion"))
const InputTitle = lazy(()=> import("./Inputs/InputTitle"));
const ImageUploadButton = lazy(()=> import("./Inputs/ImagenUploadButton"));
const InputLocation = lazy(()=> import("./Inputs/InputLocation"));
const ResponsiveTimePickers = lazy(()=> import("./Inputs/ResponsiveTimePicker"));
const ManageProducts = lazy(()=> import("./ManageProducts"));

export default function CrearNegocioGratuito() {

  return (
    <div style={grid_1_col}>
      <div className="flex w-full flex-col">
        <Tabs disabledKeys={["productos"]} >
          <Tab key="perfil" title="Perfil">
            <Card>
              <CardBody>
                <Suspense>
                  <InputTitle></InputTitle>
                  <ImageUploadButton></ImageUploadButton>
                  <TextAreaDescription></TextAreaDescription>
                  <InputLocation></InputLocation>
                </Suspense>
                
              </CardBody>
            </Card>
          </Tab>
          <Tab key="horario" title="Horario">
            <Suspense>
              <ResponsiveTimePickers></ResponsiveTimePickers>         
            </Suspense>
                
          </Tab>
          <Tab key="productos" title="Productos">
            <Card>
              <CardBody>
                <Suspense>
                  <ManageProducts/>
                </Suspense>
                
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

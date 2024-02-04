import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import './ayuda.css'

export default function AyudaInformacionContainer() {
  
  return (
    <Accordion
      variant="splitted"
    >
      <AccordionItem
        key="1"
        aria-label="Accordion 1"
        title="Como crear una cuenta"
      >
        Para crear una cuenta debes de seguir los siguientes pasos:
        <div style={{padding: "10px 10px 20px 40px"}}>
          <li>
            <ul>
              En la parte superior derecha encontraras un boton que dice Sign In
            </ul >
            <ul>Le damos crear cuenta</ul>
            <ul>Llenamos los campos del formulario</ul>
            <ul>Esperamos el gmail de confirmación</ul>
          </li>
        </div>
        
      </AccordionItem>
      <AccordionItem
        key="2"
        aria-label="Accordion 2"
        title="Como cerrar una cuenta"
      >
        Para cerrar una cuenta debes de seguir los siguientes pasos: 
        <div style={{padding: "10px 10px 20px 40px"}}>
          <li>
            <ul>
              En la parte superior derecha encontraras tu perfil, dale click
            </ul>
            <ul>
                Despues darle al boton de logOut
            </ul>
          </li>
        </div>
       
      </AccordionItem>
      <AccordionItem
        key="3"
        aria-label="Accordion 3"
        title="Como crear un negocio"
      >
        Para crear un negocio debes de seguir los siguiente pasos:
        <div style={{padding: "10px 10px 20px 40px"}}>
          <li>
            <ul>
              Primero debes de logearte en la pagina, sino tienes una cuenta aun
              debes de crearla
            </ul>
            <ul>
              En la parte superior derecha encontraras tu perfil, dale click
            </ul>
            <ul>
              Entra a Crear Negocio
            </ul>
            <ul>
              Una vez en Crear Negocio sino posees un negocio inicializaras con el plan gratis
            </ul>
            <ul>
              Llena el formulario de tu negocio
            </ul>
            <ul>
              Dale al boton de crear Negocio
            </ul>
          </li>
        </div>
       
      </AccordionItem>

      <AccordionItem
        key="4"
        aria-label="Accordion 3"
        title="Como mejorar el plan del negocio"
      >
       Para mejorar el plan de negocio: 
       <div style={{padding: "10px 10px 20px 40px"}}>
          <li>
            <ul>
             Al entrar en la pagina de crear Negocio en la parte superior presione el boton de Cambiar de Paquete
            </ul>
            <ul>
               Elija el paquete que desee
            </ul>
            <ul>
              Esto nos envia una solicitud a nuestra cuenta de Whatsapp
            </ul>
            <ul>
              Puede empezar automaticamente a crear su negocio hasta que nosotros lo contactemos para verificar cuenta, propietario, paquete y pago mensual
            </ul>
            <ul>
              El cliente tendra 3 dias para hacer el pago, o sino se le cerrara su cuenta automaticamente
            </ul>
          </li>
        </div>
      </AccordionItem>

      <AccordionItem
        key="5"
        aria-label="Accordion 3"
        title="  Como subir un evento"
      >
        <div style={{padding: "10px 10px 20px 40px"}}>
          <li>
            <ul>
              Para subir un evento es necesario poseer el paquete de Premium
            </ul>
            <ul>
              Se direge al apartado de Crear Negocio y va a la parte de Eventos
            </ul>
            <ul>
              Luego llena el formualario y le da subir el evento
            </ul>
            <ul>
              El evento estara alojado en el sitio por una semana
            </ul>
          </li>
        </div>
      </AccordionItem>


      <AccordionItem
        key="6"
        aria-label="Accordion 3"
        title="Como tener 5 negocios"
      >
       
        <li>
          <ul>
           Para tener 5 negocios es necesario tener el paquete Premium
          </ul>
          <ul></ul>
        </li>
      </AccordionItem>
    </Accordion>
  );
}

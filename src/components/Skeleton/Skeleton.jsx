import React from "react";
import {Card,CardBody, CardHeader, Skeleton} from "@nextui-org/react";
import '../Seccion/seccion.css'
import { CardStyles, ImgCardStyle, LogoStyle } from "../styles/styles";

export default function SkeletonCard() {
  return (
    <Card 
           className="py-4 tarjeta-negocio-card"
          style={{ ...CardStyles, margin: "5px 5px 5px 5px" , minHeight: "300px"}}
    >
      
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <Skeleton className="rounded-lg" style={{width: "50%", height: "20px", borderRadius: "20px", marginTop: "20px"}}>
          <div className="h-24 rounded-lg bg-default-300"></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg" style={{width: "80%", height: "20px", borderRadius: "20px", marginTop: "5px"}}>
          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        
          <Skeleton className="rounded-lg" style={{width: "40%", height: "20px", borderRadius: "20px", marginTop: "5px"}}>
            <div className="h-24 rounded-lg bg-default-300"></div>
          </Skeleton>
        <div>
          
        </div>
      </CardHeader>

      <CardBody
         className="overflow-visible py-2 card-body-seccion"
         style={ImgCardStyle}
      >
        <Skeleton 
          style={{ ...LogoStyle, objectFit: "cover"}}
        >
          <div className="h-24 rounded-lg bg-default-300"></div>
        </Skeleton>
      </CardBody>
    </Card>
  );
}

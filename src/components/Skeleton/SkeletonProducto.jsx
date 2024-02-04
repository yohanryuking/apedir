import React from "react";
import { Card, CardBody, CardFooter, Skeleton } from "@nextui-org/react";
import "react-lazy-load-image-component/src/effects/blur.css";
import { CardStyles2, ProductoStyle } from "../styles/styles";

export default function SkeletonProducto({
  title,
  index,
}) {
  const sectionStyle2 = {
    width: "100%",
    maxWidth: "450px",
    height: "100vh",
    background: "#0F0D13",
  };

  return (
    <div>
      
      <Card
        shadow="sm"
        key={index}
        isPressable
        style={CardStyles2}
        className="producto-card"
        id={title}
        
      >
        <CardBody className="overflow-visible p-0 card-body-productos">
          <Skeleton 
            style={{ ...ProductoStyle, objectFit: "cover" }}
            className="rounded-full product-lazy-load"
          />
        </CardBody>
        <CardFooter
          className="text-small justify-between card-footer-productos"
        >
          <div style={{ gridColumn: "span 2", marginBottom: "10px" }}>
            
            <Skeleton className="h-3  rounded-lg" style={{borderRadius: "10px" , width: "150px", height: "20px"}}/>
          </div>
          <div style={{ gridColumn: "span 2", marginBottom: "10px" }}>
            <Skeleton className="h-3  rounded-lg" style={{borderRadius: "10px" , width: "100px", height: "20px"}}/>
          </div>

          
        </CardFooter>
      </Card>
    </div>
  );
}


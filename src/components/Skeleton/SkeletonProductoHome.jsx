import React from "react";
import { Card,Skeleton } from "@nextui-org/react";
import "react-lazy-load-image-component/src/effects/blur.css";


export default function SkeletonProductosHome(props) {
  return (
    <Card
      isFooterBlurred
      className="w-full h-[300px] col-span-12 sm:col-span-5 card-producto-list-home"
      style={{
        boxShadow: "none",
        position: "relative",
        border: ".8px solid #D4D4D8",
      }}
    >
      <Skeleton
        style={{ width: "100%", objectFit: "cover" }}
        className="lazyload-producto-home"
      />
    </Card>
  );
}

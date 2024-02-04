import React from "react";
import SkeletonCard from "./Skeleton";

export default function ListadoSkeleton() {
  const elementos = [
    "Elemento 1",
    "Elemento 2",
    "Elemento 3"
  ];
  return (
    <div
      className="list-container"
      style={{
        gap: "10px",
        display: "grid",
        placeItems: "center",
        alignContent: "stretch",
      }}
    >
          {elementos.map((index, i) => {
           return <SkeletonCard key = {i}>
           </SkeletonCard>
       })}
    </div>
    
  );
}

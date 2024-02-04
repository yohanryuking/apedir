import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Skeleton,
} from "@nextui-org/react";

export default function SkeletonNovedades() {

  return (
    <Card
      className="max-w-[340px]"
      style={{ width: "90%", boxShadow: "none", border: ".5px solid #E2E2E2" }}
    >
      <CardHeader className="justify-between" style={{ marginBottom: "10px" }}>
        <div className="max-w-[300px] w-full flex items-center gap-3">
          <div>
            <Skeleton className="flex rounded-full w-12 h-12" />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="h-3 w-3/5 rounded-lg" style={{borderRadius: "10px"}}/>
            <Skeleton className="h-3 w-4/5 rounded-lg" style={{borderRadius: "10px"}}/>
          </div>
        </div>
      </CardHeader>

      <CardBody
        className="px-3 py-0 text-small text-default-400"
        style={{ marginBottom: "10px" }}
      >
        <Skeleton className="h-3 w-3/5 rounded-lg" style={{borderRadius: "10px", marginBottom: "10px"}}/>
        <Skeleton className="h-3 w-4/5 rounded-lg" style={{borderRadius: "10px"}}/>
      </CardBody>
    </Card>
  );
}

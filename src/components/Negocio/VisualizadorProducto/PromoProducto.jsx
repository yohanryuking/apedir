import React from "react";
import Like from "../../Like/Like";
import CampanaIcon from "../../Icons/Campana/CampanaIcon";
import { NotificationIcon } from "../../Icons/NotificationIcon";
import RelojIcon from "../../Icons/Reloj/RelojIcon";
import { Card } from "@nextui-org/react";
import ShareLink from "../Share/ShareLink";

export default function PromoProducto(props) {
  const glass = {
    width: "90%",
    //marginTop: "20px",
    position: "absolute",
    bottom: "34.5vh",
    height: "11vh",
    background: "rgba(150, 156, 161, 0.411)",
    borderRadius: "20px",
    //margin: "0% 5% 0% 5%",
    padding: "10px",
    zIndex: "1000",
    border: "gray 1px solid",
    display: "grid",
    placeItems: "center",
    gridTemplateColumns: "1fr 1fr 1fr",
   
  };
 

  const card = {
    width: "40px",
    height: "40px",
    display: "grid",
    placeItems: "center",
    borderRadius: "50%",
  };
  const title = {
    color: "#69E4AF",
    fontWeight: "bold",
    fontSize: "30px",
  };

  return (
    <div
      style={glass}
      className=" backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70"
    >
      <Like></Like>

      
        <ShareLink url = {props.url}></ShareLink>
      
      <Card style={card}>
        <NotificationIcon width={"26px"}></NotificationIcon>
      </Card>
    </div>
  );
}



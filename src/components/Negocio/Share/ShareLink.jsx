import { TelegramShareButton, TelegramIcon } from "react-share";
import { TwitterShareButton, XIcon } from "react-share";
import { WhatsappShareButton, WhatsappIcon } from "react-share";
import {
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
} from "react-share";
import { EmailShareButton, EmailIcon } from "react-share";
import { Snippet } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";

import { faShareNodes } from "@fortawesome/free-solid-svg-icons";

export default function ShareLink(props) {

    const url = `https://apedir.pages.dev${props.url}` 
  return (
    <Popover placement="top" showArrow backdrop="opaque">
      <PopoverTrigger style={{ background: "white", maxWidth: "40px", minWidth: "40px", padding: "0", borderRadius: "50%" }}>
        <Button>
          <FontAwesomeIcon icon={faShareNodes} size="2x" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div
          className="px-1 py-2"
          style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px" }}
        >
          <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            <TelegramShareButton url={url}>
              <TelegramIcon size={40} round />
            </TelegramShareButton>

            <TwitterShareButton
              url={url}
              title={
                "next-share is a social share buttons for your next React apps."
              }
            >
              <XIcon size={40} round />
            </TwitterShareButton>

            <WhatsappShareButton url={url}>
              <WhatsappIcon size={40} round />
            </WhatsappShareButton>

            <FacebookMessengerShareButton url={url}>
              <FacebookMessengerIcon size={40} round />
            </FacebookMessengerShareButton>

            <EmailShareButton url={url}>
              <EmailIcon size={40} round />
            </EmailShareButton>
          </div>
          <Snippet symbol="" variant="bordered" size="sm">
            <div style={{maxWidth: "200px", overflow: "scroll"}}>
                {url}
            </div>
            
          </Snippet>
        </div>
      </PopoverContent>
    </Popover>
  );
}

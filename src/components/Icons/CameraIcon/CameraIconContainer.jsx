import React from "react";
import {Button} from "@nextui-org/react";

import {CameraIcon} from './CameraIcon';

export default function HeartIconContainer() {
  return (
    <div className="flex gap-4 items-center">
          
      <Button isIconOnly color="warning" variant="faded" aria-label="Take a photo">
        <CameraIcon />
      </Button>
    </div>
  );
}

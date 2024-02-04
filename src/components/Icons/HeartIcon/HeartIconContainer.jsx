import React from "react";
import {Button} from "@nextui-org/react";
import {HeartIcon} from './HeartIcon';


export default function HeartIconContainer() {
  return (
    <div className="flex gap-4 items-center">
      <Button isIconOnly color="danger" aria-label="Like">
        <HeartIcon />
      </Button>    
      
    </div>
  );
}

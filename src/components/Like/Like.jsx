import { HeartIcon } from "./HeartIcon";
import { Card, CardBody, Image, Button, Progress } from "@nextui-org/react";
import React from "react";

export default function Like() {
  const [liked, setLiked] = React.useState(false);

  const style = {
    borderRadius: "50%"
  }

  return (
    <Card style={style}>
      <Button
        isIconOnly
        className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
        radius="full"
        variant="light"
        onPress={() => setLiked((v) => !v)}
      >
        <HeartIcon
          className={liked ? "[&>path]:stroke-transparent" : ""}
          fill={liked ? "currentColor" : "none"}
        />
      </Button>
    </Card>
  );
}

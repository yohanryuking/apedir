import React, { useState } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Tooltip,
  Checkbox,
} from "@nextui-org/react";

import PropTypes from "prop-types";
import { EditIcon } from "../Icons/Edit/EditIcon";
import { DeleteIcon } from "../Icons/DeleteIcon/DeleteIcon";
import { updateAvailability, updateRecomended } from "../../api/products";
import { ImgCardStyle } from "../styles/styles";
import { ImgStyle } from "../styles/styles";
import { CardStyles2 } from "../styles/styles";

export default function ProductCard({
  id,
  title,
  img,
  price,
  currency,
  index,
  productInput,
  setProductInput,
  onProductEditOpen,
  onProductDeleteOpen,
  isAvalaible,
  isRecomended,
}) {
  const [isSelected, setIsSelected] = useState(isAvalaible);
  const [recomended, setRecomended] = useState(isRecomended);
  const changeAvailability = async () => {
    setIsSelected(!isSelected);
    await updateAvailability(id, !isSelected);
  };

  const changeRecomended = async () => {
    setRecomended(!recomended);
    await updateRecomended(id, !recomended);
  };

  return (
    <Card
      shadow="sm"
      key={index}
      isPressable
      style={CardStyles2}
      className="producto-card"
    >
      <CardHeader style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="flex">
          <Checkbox
            isSelected={recomended}
            onValueChange={changeRecomended}
          ></Checkbox>
          <p className="text-sm text-default-500">Recomandado</p>
        </div>
        <div className="flex">
          <Checkbox
            isSelected={isSelected}
            onValueChange={changeAvailability}
          ></Checkbox>
          <p className="text-sm text-default-500">Activo</p>
        </div>

        <div className="flex" style={{ gap: "10px" }}>
          <Tooltip content="Editar producto">
            <span
              className="text-lg text-default-500 cursor-pointer active:opacity-50"
              onClick={() => {
                setProductInput(productInput);
                onProductEditOpen();
              }}
            >
              <EditIcon />
            </span>
          </Tooltip>
          <Tooltip color="danger" content="Eliminar producto">
            <span
              className="text-lg text-danger cursor-pointer active:opacity-50"
              onClick={() => {
                setProductInput(productInput);
                onProductDeleteOpen();
              }}
            >
              <DeleteIcon />
            </span>
          </Tooltip>
        </div>
      </CardHeader>
      <CardBody className="overflow-visible p-0" style={ImgCardStyle}>
        <Image
          radius="lg"
          width="100%"
          alt="Card background NextUI hero Image with delay"
          className="object-cover rounded-xl"
          src={img}
          style={ImgStyle}
        />
      </CardBody>
      <CardFooter className="text-small justify-between">
        <b>{title}</b>
        <p className="text-default-500">
          {price} {currency}
        </p>
      </CardFooter>
    </Card>
  );
}

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

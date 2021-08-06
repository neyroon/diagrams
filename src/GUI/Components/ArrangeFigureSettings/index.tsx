import React from "react";
import { moveFigureToBack, moveFigureToFront } from "../../../models/diagrams";
import { Figures } from "../../../typings/field";

type ArrangeFigureProps = {
  figures: Figures;
};

const ArrangeFigure: React.FC<ArrangeFigureProps> = ({ figures }) => {
  const toBack = () => moveFigureToBack();
  const toFront = () => moveFigureToFront();
  return (
    <>
      <button onClick={toBack}>To Back</button>
      <button onClick={toFront}>To Front</button>
    </>
  );
};

export default ArrangeFigure;

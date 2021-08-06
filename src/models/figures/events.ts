import { Figure } from "./../../Figure";
import { createEvent } from "effector";

export const resize = createEvent<{ figure: Figure; x: number; y: number }>();
export const setResizers = createEvent<Figure>();

export const changeFillColor = createEvent<string | null>();
export const changeOpacity = createEvent<number>();
export const changeLineColor = createEvent<string | null>();
export const changeLineSize = createEvent<number>();

export const changeText = createEvent<string>();
export const changeTextSettings = createEvent<TextSettings>();

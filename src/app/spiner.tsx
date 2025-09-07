import React from "react";
import { TailSpin } from "react-loader-spinner";

export function Spinner(args?: { height?: number; width?: number }) {
  return <TailSpin color="#00BFFF" height={args?.height} width={args?.width} />;
}

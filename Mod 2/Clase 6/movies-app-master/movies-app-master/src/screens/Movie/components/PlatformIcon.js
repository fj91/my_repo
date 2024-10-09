import React from "react";
import { Icon } from "./styled";
export const PlatformIcon = ({ name }) => {
  if (name === "Star+")
    return (
      <Icon src="https://www.justwatch.com/images/icon/250272035/s100/icon.webp"></Icon>
    );
  if (name === "Amazon Prime Video") {
    return (
      <Icon src="https://www.justwatch.com/images/icon/52449861/s100/icon.webp"></Icon>
    );
  }
  return null;
};

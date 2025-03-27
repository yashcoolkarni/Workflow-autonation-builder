import React from "react";
import { Label, Input, ErrorText } from "../assets/styles";

export const TextField = ({
  labelText,
  name,
  register,
  errors,
  type = "text",
  placeholder = "",
  ...rest
}) => (
  <>
    <Label>{labelText}</Label>
    <Input type={type} placeholder={placeholder} {...register(name, rest)} />
    {errors[name] && <ErrorText>{errors[name].message}</ErrorText>}
  </>
);

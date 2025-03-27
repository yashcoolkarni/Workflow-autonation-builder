import React from "react";
import { Label, Input, ErrorText } from "../assets/styles";

export const DateField = ({ labelText, name, register, errors, ...rest }) => (
  <>
    <Label>{labelText}</Label>
    <Input type="date" {...register(name, rest)} />
    {errors[name] && <ErrorText>{errors[name].message}</ErrorText>}
  </>
);

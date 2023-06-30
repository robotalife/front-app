import { newBotStartegy } from "./botCreateItems";
import * as Yup from "yup";

export const validationSchema = (schema: any) => Yup.object().shape(schema);

export const passwordSimple = Yup.string()
  .min(8, "Must be at least 8 characters")
  .required("Required");

export const passwordFull = Yup.string()
  .matches(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z\d!@#$%^&*()_{}`~><,.'"|]{8,}$/,
    "Use 8 characters or more for your password."
  )
  .required("Required");

export const email = Yup.string()
  .email("Invalid email")
  .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid email address")
  .required("Required");

export const agreeCheckbox = Yup.boolean().oneOf([true], "To create an account, please acknowledge and accept our terms and privacy policy.");

export const newBotStringSchema = Yup.string().required(
  "This field is required"
);

export const newBotStrategySchema = Yup.string().oneOf(
  ["LONG", "SHORT"],
  "Please select one of the options"
);

export const newBotAccessSchema = Yup.string().oneOf(
  ["PRIVATE", "PUBLIC"],
  "Please select one of the options"
);

export const newBotLeverageTypeSchema = Yup.string().oneOf(
  ["ISOLATED", "CROSS"],
  "Please select one of the options"
);

export const newBotLeverageSchema = Yup.number().oneOf(
  [1, 2, 3, 5, 10, 25, 100],
  "Please select one of the options"
);

export const newBotNumberSchema = Yup.number().positive();

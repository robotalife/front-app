import {
  Checkbox as MUICheckbox,
  CheckboxProps,
  Grid,
  FormHelperText,
} from "@mui/material";
import { Message } from "../../shared/interfaces/Message";
import { PropsWithChildren } from "react";

interface Props extends CheckboxProps, PropsWithChildren {
  message?: string;
  messageType?: Message;
}

const Checkbox = ({ message, messageType, className, sx, ...props }: Props) => {
  return (
    <>
      <Grid
        container
        alignItems={"center"}
        justifyContent={"flex-start"}
        className={className}
        sx={sx}
      >
        <Grid item xs="auto">
          <MUICheckbox {...props} />
        </Grid>
        <Grid item xs="auto">
          {props.children}
        </Grid>
        <Grid item xs={12}>
          <FormHelperText
            error={messageType === "error"}
            sx={{ paddingLeft: 2, paddingRight: 2 }}
          >
            {!!message && message}
          </FormHelperText>
        </Grid>
      </Grid>
    </>
  );
};

export default Checkbox;
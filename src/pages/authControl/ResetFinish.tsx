import Button from "../../components/formElements/Button";
import TextField from "../../components/formElements/TextField";
import { IconKey, IconMail } from "../../shared/icons/Icons";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import useAxios from "../../shared/hooks/useAxios";
import apiEndPoints from "../../shared/consts/apiEndpoints";
import { AxiosResponse } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import routes from "../../shared/consts/routes";

const validationSchema = Yup.object().shape({
  password: Yup.string().required("Required"),
  resetKey: Yup.string().required("Required"),
});

const ResetFinish = () => {
  const navigate = useNavigate();
  const { axios, Snackbar } = useAxios();

  const handleSubmit = async (values: {
    password: string;
    resetKey: string;
  }) => {
    const userData = {
      password: values.password,
      resetKey: values.resetKey,
    };

    try {
      const response: AxiosResponse<
        {
          id: string;
          token: string;
        },
        any
      > = await axios.post(apiEndPoints.resetFinish, userData);

      navigate(routes.signin);
    } catch (error) {
      // Handle error
    }
  };

  return (
    <Formik
      initialValues={{ password: "", resetKey: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ values, handleChange, errors, touched }) => (
        <Form noValidate>
          <div className={"pageTitle"}>New Password</div>
          <TextField
            name="password"
            type="password"
            label="New password"
            startIcon={<IconMail />}
            value={values.password}
            onChange={handleChange}
            required
            error={Boolean(errors.password && touched.password)}
            helperText={errors.password && touched.password && errors.password}
          />
          <TextField
            name="resetKey"
            type="text"
            label="Your one time key"
            value={values.resetKey}
            onChange={handleChange}
            required
            error={Boolean(errors.resetKey && touched.resetKey)}
            helperText={errors.resetKey && touched.resetKey && errors.resetKey}
          />

          <Button type="submit" variant="contained">
            Resset Password
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ResetFinish;

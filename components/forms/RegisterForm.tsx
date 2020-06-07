import React, { useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { REGISTER_USER_MUTATION } from "../../graphql/mutation";
import withApollo from "../../lib/withApollo";

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .min(3, "Too Short!")
    .max(15, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .oneOf([Yup.ref("confirmPassword"), null], "Passwords must match")
    .min(5, "Too Short!")
    .max(100, "Too Long!")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .min(5, "Too Short!")
    .max(100, "Too Long!")
    .required("Required"),
});

const RegisterForm = () => {
  const Router = useRouter();
  const [createUser, { data }] = useMutation(REGISTER_USER_MUTATION);
  useEffect(() => {
    if (data && data.register) {
      Router.push("/login");
    }
  }, [data]);
  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        validationSchema={SignupSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const email: string = values.email;
          const password: string = values.password;

          await createUser({
            variables: {
              email,
              password,
            },
          });

          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <Form onSubmit={handleSubmit}>
            <div>
              Email{" "}
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email ? <div>{errors.email}</div> : null}
              {data && data.register == false ? (
                <div>"User already exists"</div>
              ) : null}
            </div>
            <div>
              Password{" "}
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password ? (
                <div>{errors.password}</div>
              ) : null}
            </div>
            <div>
              Confirm Password{" "}
              <input
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
              />
              {errors.confirmPassword && touched.confirmPassword ? (
                <div>{errors.confirmPassword}</div>
              ) : null}
            </div>
            <div>
              <button type="submit" disabled={isSubmitting}>
                Register
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default withApollo(RegisterForm);

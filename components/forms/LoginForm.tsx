import React, { useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { LOGIN_USER_MUTATION } from "../../graphql/mutation";
import withApollo from "../../lib/withApollo";
import { ALL_USERS_QUERY } from "../../graphql/query";

const LoginForm = () => {
  const [loginUser, { data }] = useMutation(LOGIN_USER_MUTATION, {
    refetchQueries: [{ query: ALL_USERS_QUERY }],
    awaitRefetchQueries: true,
  });
  const Router = useRouter();
  useEffect(() => {
    if (data && data.login) {
      Router.push("/account");
    }
    return;
  }, [data?.login]);
  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors: any = {};
          if (!values.email) {
            errors["email"] = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors["email"] = "Invalid email address";
          }
          if (!values.password) {
            errors["password"] = "Dude, you cant go without password";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const email: string = values.email;
          const password: string = values.password;

          await loginUser({
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
              {errors.email && touched.email && errors.email}
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
              {errors.password && touched.password && errors.password}
            </div>
            <div>
              <button type="submit" disabled={isSubmitting}>
                Login
              </button>
            </div>
            <div>
              {data?.login === false ? "User or Password do not exist" : null}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default withApollo(LoginForm);

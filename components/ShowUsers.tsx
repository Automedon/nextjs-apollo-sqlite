import React, { useEffect } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Formik, Form, FieldArray, Field } from "formik";
import { ALL_USERS_QUERY } from "../graphql/query";
import Link from "next/link";
import withApollo from "../lib/withApollo";
import { DELETE_USER_MUTATION } from "../graphql/mutation";
import Logout from "./Logout";

const ShowUsers = () => {
  const { data, loading } = useQuery(ALL_USERS_QUERY);
  const [deleteUser, deleteDataObj] = useMutation(DELETE_USER_MUTATION, {
    refetchQueries: [{ query: ALL_USERS_QUERY }],
    awaitRefetchQueries: true,
  });
  useEffect(() => {
    // if (data?.allUsers.users.length === 0) {
    //   Router.push("/index");
    // }
  }, [data?.allUsers.users.length]);
  if (loading || deleteDataObj.loading) {
    return <div>Loading Users.Please wait</div>;
  }
  // If you press logout a then will try to go back through "back" you will see it
  if (!data.allUsers.user) {
    return <div>Not logged</div>;
  }
  return (
    <div>
      <Formik
        initialValues={{ users: data.allUsers.users, user: data.allUsers.user }}
        validate={(values) => {
          const errors: any = {};

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(false);
        }}
      >
        {({ values, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            "Hello, {values.user}!"
            <FieldArray
              name="friends"
              render={(arrayHelpers) => (
                <div>
                  {values.users && values.users.length > 0 ? (
                    values.users.map((user, index) => (
                      <div key={index + Math.random()}>
                        <Field name={user.email} value={user.email} />
                        <button
                          type="button"
                          onClick={async () => {
                            await deleteUser({
                              variables: {
                                email: user.email,
                              },
                            });
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    ))
                  ) : (
                    <div>
                      <h3>No users in db</h3>
                      <Link href="/register">
                        <a> Go to Register? </a>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            />
          </Form>
        )}
      </Formik>
      <Logout />
    </div>
  );
};

export default withApollo(ShowUsers);

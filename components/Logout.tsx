import React from "react";
import withApollo from "../lib/withApollo";
import { Button } from "@material-ui/core";
import { useMutation } from "@apollo/react-hooks";
import { DELETE_COOKIES_MUTATION } from "../graphql/mutation";
import { useRouter } from "next/router";

const Logout = () => {
  const [fn, { client }] = useMutation(DELETE_COOKIES_MUTATION);
  localStorage.clear();
  const Router = useRouter();
  return (
    <Button
      variant="outlined"
      color="primary"
      onClick={async () => {
        await fn();
        await client.resetStore();
        await Router.push("/");
      }}
    >
      Logout
    </Button>
  );
};

export default withApollo(Logout);

import React from "react";
import ShowUsers from "../components/ShowUsers";
import { NextPageContext } from "next";
import { auth } from "../lib/serverFunctions";

const AccountPage = () => {
  return (
    <div>
      Account page
      <ShowUsers />
    </div>
  );
};

AccountPage.getInitialProps = async (ctx: NextPageContext) => {
  await auth(ctx);

  return {
    props: {},
  };
};

export default AccountPage;

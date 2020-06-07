import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { Button } from "@material-ui/core";

//just in case to show styled-components + material-ui
const Text = styled.div`
  color: red;
`;

const StyledButton = styled(Button)`
  border: 1px solid red !important;
  width: 100px;
`;

const IndexPage = () => {
  return (
    <div>
      <Text>styled-components + material-ui</Text>
      <StyledButton variant="outlined" color="primary">
        <Link href="/register">
          <a>Register </a>
        </Link>
      </StyledButton>
      <br />
      <div>only material-ui</div>
      <Button variant="outlined" color="primary">
        <Link href="/login">
          <a>Login</a>
        </Link>
      </Button>
    </div>
  );
};

export default IndexPage;

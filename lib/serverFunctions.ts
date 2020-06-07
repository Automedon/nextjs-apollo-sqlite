import nextCookie from "next-cookies";
import { NextPageContext } from "next";

export const auth = async (ctx: NextPageContext) => {
  const data = nextCookie(ctx);

  if (!data["refresh-token"]) {
    ctx.res?.writeHead(301, {
      Location: "http://localhost:3000",
    });
    ctx.res?.end();
  }
  return {
    accessToken: data["access-token"],
    refreshToken: data["refresh-token"],
  };
};

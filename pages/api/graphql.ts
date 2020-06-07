import micro_cors from "micro-cors";
import { ApolloServer } from "apollo-server-micro";
import Cookies from "cookies";
import { verify } from "jsonwebtoken";
import { createTokens } from "../../server/createTokens";
import { typeDefs } from "../../server/typeDefs";
import { resolvers } from "../../server/resolvers";
import { deleteCookie, setCookie } from "../../server/setCookie";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }: any) => {
    const cookies = new Cookies(req, res);
    const accessToken = cookies.get("access-token");
    const refreshToken = cookies.get("refresh-token");
    let data: any;
    try {
      //accessToken valid?
      data = verify(
        accessToken,
        process.env.JWT_ACCESS_TOKEN_SECRET || "your JWT_REFRESH_TOKEN_SECRET"
      );
      req.email = data.email;
      return { req, res };
    } catch {
      //do we have refreshToken?
      if (!refreshToken) {
        return { req, res };
      }
      //refreshToken valid?
      try {
        data = verify(
          refreshToken,
          process.env.JWT_REFRESH_TOKEN_SECRET || "your JWT_ACCESS_TOKEN_SECRET"
        );
        const user = { email: data.email };
        const tokens = createTokens(user);
        setCookie(tokens.accessToken, tokens.refreshToken, req, res);
        req.email = data.email;
        return { req, res };
      } catch {
        //refreshInvalid => delete cookie
        deleteCookie(req, res);
        return { req, res };
      }
    }
  },
});

const handler = apolloServer.createHandler({ path: "/api/graphql" });
export const config = {
  api: {
    bodyParser: false,
  },
};
const cors = micro_cors({
  origin: "http://localhost:3000",
  allowCredentials: true,
});
export default cors((req, res) => {
  if (req.method === "OPTIONS") {
    res.end();
    return;
  }
  return handler(req, res);
});

import { IResolvers } from "graphql-tools";
import * as bcrypt from "bcryptjs";
import { createTokens } from "./createTokens";
import { deleteCookie, setCookie } from "./setCookie";
import { createUser, deleteUser, findAllUsers, findUser } from "../db";

export const resolvers: IResolvers = {
  Query: {
    allUsers: async (_, args, { req }) => {
      if (!req.email) {
        return { users: [], user: "" };
      }
      return { users: await findAllUsers(), user: req.email };
    },
  },
  Mutation: {
    register: async (_, { email, password }) => {
      return await createUser(email, password);
    },
    login: async (_, { email, password }, { req, res }) => {
      const user = await findUser(email);
      if (!user) {
        return false;
      }
      const { accessToken, refreshToken } = createTokens(user);
      setCookie(accessToken, refreshToken, req, res);
      return await bcrypt.compare(password, user.password);
    },
    deleteUser: async (_, { email }, { req }) => {
      if (!req.email) {
        return false;
      }
      return await deleteUser(email);
    },
    deleteCookies: async (_, args, { req, res }) => {
      return deleteCookie(req, res);
    },
  },
};

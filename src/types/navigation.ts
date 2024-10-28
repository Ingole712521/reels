/** @format */

import { User } from "./user";

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Registration: undefined;
  Home: { user: User };
};

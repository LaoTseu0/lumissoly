import { isActiveSession } from "./isActiveSession";
import { connectUser } from "./connectUser";
import { registration } from "./registration";
import { getUser } from "./getUser";
import { logout } from "./logout";

const serviceOAuth = {
  isActiveSession,
  connectUser,
  registration,
  getUser,
  logout,
};

export { serviceOAuth };

import { set } from "./set";
import { deleteCookie } from "./delete";
import { get } from "./get";
import { has } from "./has";

const serviceCookies = {
  set,
  delete: deleteCookie,
  get,
  has,
};

export { serviceCookies };

/**
 * @Dev Gestion des cookies particulière
 * Du fait que les appel aux api back sont fait en mode server,
 * les cookies ne sont pas gérés de la même manière
 * Il faut donc les parser manuellement
 * @param cookiesArray tableau de cookies au format string: ["cookie1=value1; option1; option2", "cookie2=value2; option1; option2"]
 * @returns un objet contenant les cookies: {cookie1: {name: "cookie1", value: "value1", option1: true, option2: true}}
 */
export function parseCookies(cookiesArray: string[]): Record<string, any> {
  const cookiesObject: Record<string, any> = {};

  cookiesArray.forEach((cookieString) => {
    // Séparer les cookies s'il y en a plusieurs dans la même chaîne
    const individualCookies = cookieString.split(",").map((c) => c.trim());

    individualCookies.forEach((cookie) => {
      const parts = cookie.split(";").map((part) => part.trim());
      const [nameValue, ...options] = parts;
      const [name, value] = nameValue.split("=").map((part) => part.trim());

      if (!cookiesObject[name]) {
        cookiesObject[name] = {
          name,
          value: decodeURIComponent(value),
        };
      }

      options.forEach((option) => {
        const [optionName, optionValue] = option
          .split("=")
          .map((part) => part.trim());
        cookiesObject[name][optionName.toLowerCase()] = optionValue
          ? decodeURIComponent(optionValue)
          : true;
      });
    });
  });

  return cookiesObject;
}

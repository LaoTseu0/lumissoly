function get(key: string): string {
  const cookie = document.cookie
    .split(";")
    .find((cookie) => cookie.includes(`${key}=`));

  return cookie ? cookie.split("=")[1] : "";
}

export { get };

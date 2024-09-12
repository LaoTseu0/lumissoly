function set(key: string, value: string) {
  document.cookie = `${key}=${value}`;
}

export { set };

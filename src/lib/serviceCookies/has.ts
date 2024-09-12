function has(key: string): boolean {
  return document.cookie.includes(`${key}=`);
}

export { has };

/** @type {import('next').NextConfig} */

// import fs from "fs";

const dev = process.env.NODE_ENV !== "production";
const nextConfig = {
  reactStrictMode: true,
  // server: {
  //   https: {
  //     key: fs.readFileSync("./localhost+1-key.pem"),
  //     cert: fs.readFileSync("./localhost+1.pem"),
  //   },
  //   host: "0.0.0.0",
  // },
};

export default nextConfig;

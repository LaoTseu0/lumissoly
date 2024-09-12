"use client";
import { icon_back, icon_settings } from "@global/assetsPath";
import { PATH_SCHEMA } from "@global/constants";
import { pathTo_Settings } from "@global/navigation";
import { usePathname, useRouter } from "next/navigation";
import path from "path";
import { FunctionComponent, useEffect, useState } from "react";

interface NavRightProps {
  children?: never;
  href?: string;
}

const NavRight: FunctionComponent<NavRightProps> = ({ children, href }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [matchToSetting, setMatchToSetting] = useState<boolean>(false);

  const pathToDisplayProfile = ["/*"];

  const handleMatch = () => {
    if (pathToDisplayProfile.includes(PATH_SCHEMA.everywhere)) {
      setMatchToSetting(true);
    } else if (pathToDisplayProfile.includes(pathname)) {
      setMatchToSetting(true);
    } else {
      setMatchToSetting(false);
    }
  };

  const handleClick = () => {
    if (matchToSetting) router.push(pathTo_Settings());
  };

  useEffect(() => {
    handleMatch();
  }, []);

  return (
    <div
      className="fixed flex-center top-12 right-4 h-12 w-12 "
      onClick={handleClick}
    >
      {matchToSetting ? <img src={icon_settings()} alt="" /> : ""}
    </div>
  );
};

export default NavRight;

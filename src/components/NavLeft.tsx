"use client";
import { icon_back, icon_profil } from "@global/assetsPath";
import { usePathname, useRouter } from "next/navigation";
import { FunctionComponent, useEffect, useState } from "react";

interface NavLeftProps {
  children?: never;
  href?: string;
}

const NavLeft: FunctionComponent<NavLeftProps> = ({ children, href }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [matchToProfile, setMatchToProfile] = useState<boolean>(false);

  const pathToDisplayProfile = ["/"];

  const handleMatch = () => {
    if (pathToDisplayProfile.includes(pathname)) {
      setMatchToProfile(true);
    } else {
      setMatchToProfile(false);
    }
  };

  useEffect(() => {
    handleMatch();
  }, []);

  return (
    <div
      className="fixed flex-center top-12 left-4 h-12 w-12 "
      onClick={() => router.back()}
    >
      {matchToProfile ? (
        <img src={icon_profil()} alt="" />
      ) : (
        <img src={icon_back()} alt="" />
      )}
    </div>
  );
};

export default NavLeft;

import { img_logo } from "@global/assetsPath";
import { pathTo_Home } from "@global/navigation";
import Link from "next/link";
import { FunctionComponent } from "react";

interface LogoProps {}

const Logo: FunctionComponent<LogoProps> = () => {
  return (
    <div className="flex-center flex-col py-4">
      <Link href={pathTo_Home()} legacyBehavior>
        <img height={66} width={181} src={img_logo()} alt="" />
      </Link>
    </div>
  );
};

export default Logo;

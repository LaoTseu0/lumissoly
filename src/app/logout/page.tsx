"use client";
import { serviceOAuth } from "@app/actions/serviceOAuth";
import { Button } from "@components/ui/button";
import { FunctionComponent, useEffect } from "react";

interface LogoutProps {}

const Logout: FunctionComponent<LogoutProps> = () => {
  const handleLogout = async () => {
    await serviceOAuth.logout();
  };

  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Logout;

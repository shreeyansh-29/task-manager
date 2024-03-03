"use client";

import {SignIn} from "@clerk/nextjs";
import React from "react";

function Page() {
  return (
    <div className="flex items-center h-full justify-center">
      <SignIn />
    </div>
  );
}

export default Page;

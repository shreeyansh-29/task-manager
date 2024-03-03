"use client";

import {SignUp} from "@clerk/nextjs";
import React from "react";

function Page() {
  return (
    <div className="flex items-center h-full justify-center">
      <SignUp />
    </div>
  );
}

export default Page;

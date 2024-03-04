"use client";

import React from "react";
import {useGlobalState} from "../_context/globalProvider";
import Tasks from "../_components/tasks/tasks";

function Page() {
  const {incompleteTasks} = useGlobalState();
  return <Tasks title="Incomplete Tasks" tasks={incompleteTasks} />;
}

export default Page;

"use client";

import React from "react";
import {useGlobalState} from "../_context/globalProvider";
import Tasks from "../_components/tasks/tasks";

function Page() {
  const {importantTasks} = useGlobalState();
  return <Tasks title="Important Tasks" tasks={importantTasks} />;
}

export default Page;

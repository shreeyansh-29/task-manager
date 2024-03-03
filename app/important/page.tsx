"use client";

import React from "react";
import {useGlobalState} from "../context/globalProvider";
import Tasks from "../components/tasks/tasks";

function Page() {
  const {importantTasks} = useGlobalState();
  return <Tasks title="Important Tasks" tasks={importantTasks} />;
}

export default Page;

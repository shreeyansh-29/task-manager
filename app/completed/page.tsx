"use client";

import React from "react";
import {useGlobalState} from "../_context/globalProvider";
import Tasks from "../_components/tasks/tasks";

function Page() {
  const {completedTasks} = useGlobalState();

  return <Tasks title="Completed Tasks" tasks={completedTasks} />;
}

export default Page;

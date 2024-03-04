"use client";

import Tasks from "./_components/tasks/tasks";
import {useGlobalState} from "./_context/globalProvider";

export default function Home() {
  const {tasks} = useGlobalState();

  return <Tasks title={"All Tasks"} tasks={tasks} />;
}

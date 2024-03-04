"use client";

import Tasks from "../components/tasks/tasks";
import {useGlobalState} from "../context/globalProvider";

export default function Home() {
  const {tasks} = useGlobalState();

  return <Tasks title={"All Tasks"} tasks={tasks} />;
}

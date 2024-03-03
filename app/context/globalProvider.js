"use client";

import React, {useContext, createContext, useState, useEffect} from "react";
import themes from "./themes";
import axios from "axios";
import toast from "react-hot-toast";
import {useUser} from "@clerk/nextjs";

export const GlobalContext = createContext();

export const GlobalUpdateContext = createContext();

function GlobalProvider({children}) {
  const {user} = useUser();

  const [selectedTheme, setSelectedTheme] = useState(0);
  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [tasks, setTasks] = useState([]);
  const theme = themes[selectedTheme];

  const toggleTheme = () => setSelectedTheme(+!selectedTheme);

  const openModal = () => setModal(true);

  const closeModal = () => setModal(false);

  const collapseMenu = () => setCollapsed(!collapsed);

  const allTasks = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/tasks");

      const sorted = res.data.tasks.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });

      setTasks(sorted);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      setIsLoading(false);
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await axios.delete(`/api/tasks/${id}`);
      toast.success("Task deleted");

      allTasks();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const updateTask = async (task) => {
    try {
      const res = await axios.put(`/api/tasks`, task);
      toast.success("Task updated");
      allTasks();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const completedTasks = tasks.filter((task) => task.isCompleted === true);
  const importantTasks = tasks.filter((task) => task.isImportant === true);
  const incompleteTasks = tasks.filter((task) => task.isCompleted === false);

  useEffect(() => {
    if (user) allTasks();
  }, [user]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme.name);
  }, [theme]);

  return (
    <GlobalContext.Provider
      value={{
        theme,
        tasks,
        deleteTask,
        isLoading,
        completedTasks,
        importantTasks,
        incompleteTasks,
        updateTask,
        openModal,
        closeModal,
        modal,
        allTasks,
        collapsed,
        collapseMenu,
        toggleTheme,
      }}
    >
      <GlobalUpdateContext.Provider value={{}}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
}

export default GlobalProvider;

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);

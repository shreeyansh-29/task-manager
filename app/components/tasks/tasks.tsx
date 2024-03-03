"use client";

import {useGlobalState} from "@/app/context/globalProvider";
import React from "react";
import styled from "styled-components";
import CreateContent from "../modal/createContent";
import TaskItem from "../taskItem/taskItem";
import {plus} from "@/app/utils/icons";
import Modal from "../modal/modal";

interface Props {
  title: string;
  tasks: any[];
}

const Tasks = ({title, tasks}: Props) => {
  const {theme, isLoading, openModal, modal, toggleTheme} = useGlobalState();

  return (
    <TaskStyled theme={theme}>
      {modal && <Modal content={<CreateContent />} />}
      <div className="header flex items-center w-full justify-between">
        <h1>{title}</h1>
        {/* <div className="mode-switch flex items-center">
          <label>
            <input
              type="checkbox"
              onChange={toggleTheme}
              checked={theme.name === "default"}
            />
            <span className="slider round"></span>
          </label>
        </div> */}
      </div>
      {!isLoading ? (
        <div className="tasks grid">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={{...task}} />
          ))}
          {title === "All Tasks" && (
            <button className="create-task" onClick={() => openModal()}>
              {plus}
              Add new task
            </button>
          )}
        </div>
      ) : (
        <div className="tasks-loader w-full flex items-center justify-center h-full">
          <span className="loader"></span>
        </div>
      )}
    </TaskStyled>
  );
};

export default Tasks;

const TaskStyled = styled.main`
  width: 100%;
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;
  padding: 2rem;
  overflow-y: auto;
  height: 100%;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  .tasks {
    margin: 2rem 0;
  }

  .header {
    h1 {
      font-size: clamp(1.5rem, 2vw, 2rem);
      font-weight: 800;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        bottom: -0.5rem;
        left: 0;
        width: 3rem;
        height: 0.2rem;
        background-color: ${(props) => props.theme.colorPrimaryGreen};
        border-radius: 0.5rem;
      }
    }
    .mode-switch label {
      display: inline-block;
      width: 40px;
      height: 20px;
      position: relative;
      margin-left: 10px;
    }

    .mode-switch .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: -3px;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      transition: 0.4s;
      border-radius: 20px;
    }

    .mode-switch input:checked + .slider {
      background-color: #2196f3 !important;
    }

    .mode-switch .slider:before {
      position: absolute;
      content: "";
      height: 16px;
      width: 16px;
      left: 2px;
      bottom: 2px;
      background-color: white;
      transition: 0.4s;
      border-radius: 50%;
    }

    .mode-switch input:checked + .slider:before {
      transform: translateX(23px) !important;
    }
  }
  .create-task {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    height: 16rem;
    color: ${(props) => props.theme.colorGrey2};
    font-weight: 600;
    cursor: pointer;
    border-radius: 1rem;
    border: 3px dotted ${(props) => props.theme.colorGrey5};
    transition: all 0.3s ease;

    &:hover {
      background-color: ${(props) => props.theme.colorGrey5};
      color: ${(props) => props.theme.colorGrey0};
    }
  }
`;

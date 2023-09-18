import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./useReducer";
import { ITaskCreateRequest } from "../types/ITaskRequest";
import { client } from "../config/client";
import {
  createTask,
  deleteTask,
  editTask,
  setTasks,
  sortTasks,
} from "../store/reducer/taskSlice";
import useToast from "./useToast";
import { ISort } from "../types/ITask";

function useTask() {
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState();
  const dispatch = useAppDispatch();
  const { filteredTasks, count } = useAppSelector((state) => state.task);
  const { Success } = useToast();

  useEffect(() => {
    fetchTasks();
  }, []);

  const createNewTask = async (values: ITaskCreateRequest, cb?: () => void) => {
    try {
      setLoading(true);
      const response = await client.post("api/tasks", values);
      if (response.status === 201) {
        dispatch(createTask(response.data.task));
        Success({ message: "Task Created Successfully!", loading });
        cb?.();
      }
    } catch (error) {
      setErrors(errors);
    } finally {
      setLoading(false);
    }
  };

  const editTaskId = async (
    values: ITaskCreateRequest,
    _id: string,
    cb?: () => void,
  ) => {
    try {
      setLoading(true);
      const response = await client.put(`api/tasks/${_id}`, values);
      if (response.status === 200) {
        dispatch(editTask(response.data.task));
        Success({ message: "Task Edited Successfully!", loading });
        cb?.();
      }
    } catch (error) {
      setErrors(errors);
    } finally {
      setLoading(false);
    }
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await client.get("api/tasks");
      if (response.status === 200) {
        dispatch(setTasks(response.data));
      }
    } catch (error) {
      setErrors(errors);
    } finally {
      setLoading(false);
    }
  };

  const deleteTaskId = async (_id: string) => {
    try {
      setLoading(true);
      const response = await client.delete(`api/tasks/${_id}`);
      if (response.status === 200) {
        Success({ message: "Task Deleted Successfully!", loading });
        dispatch(deleteTask(_id));
      }
    } catch (error) {
      setErrors(errors);
    } finally {
      setLoading(false);
    }
  };

  const toggleTaskCompleted = async (_id: string, completed: boolean) => {
    try {
      setLoading(true);
      const response = await client.put(`api/tasks/${_id}`, { completed });
      if (response.status === 200) {
        fetchTasks();
      }
    } catch (error) {
      setErrors(errors);
    } finally {
      setLoading(false);
    }
  };

  const sortTask = (value: ISort) => {
    dispatch(sortTasks(value));
  };

  return {
    loading,
    errors,
    createNewTask,
    editTaskId,
    fetchTasks,
    deleteTaskId,
    toggleTaskCompleted,
    tasks: filteredTasks,
    count,
    sortTask,
  };
}

export default useTask;

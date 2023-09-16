import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./useReducer";
import { ITaskCreateRequest } from "../types/ITaskRequest";
import { client } from "../config/client";
import {
  createTask,
  deleteTask,
  editTask,
  setTasks,
} from "../store/reducer/taskSlice";

type Props = {};

function useTask() {
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState();
  const dispatch = useAppDispatch();
  const { tasks, count } = useAppSelector((state) => state.task);

  useEffect(() => {
    fetchTasks();
  }, []);

  const createNewTask = async (values: ITaskCreateRequest, cb?: () => void) => {
    try {
      setLoading(true);
      const response = await client.post("api/tasks", values);
      if (response.status === 201) {
        dispatch(createTask(response.data.task));
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
      const response = await client.post("api/tasks");
      if (response.status === 200) {
        dispatch(deleteTask);
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

  return {
    loading,
    errors,
    createNewTask,
    editTaskId,
    fetchTasks,
    deleteTaskId,
    toggleTaskCompleted,
    tasks,
    count,
  };
}

export default useTask;

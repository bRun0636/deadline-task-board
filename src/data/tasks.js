/* src/data/task.js */

import { createTask } from '../types/dto/TaskDTO';

export const initialTasks = [
  createTask({
    id: "1",
    title: "Custom Theme Primary Color",
    status: "Backlog",
    date: "Apr 15",
    tags: ["enhancement"]
  }),
  createTask({
    id: "2",
    title: "Remember The Theme User Selected",
    status: "Backlog",
    date: "Apr 09",
    tags: ["feature"]
  }),
  createTask({
    id: "3",
    title: "Edit Project Title",
    status: "Approved",
    date: "Apr 15",
    tags: ["feature"]
  }),
  createTask({
    id: "4",
    title: "Data Mismatch in Task Editor, Need to Fix",
    status: "Coding",
    date: "Apr 15",
    tags: ["bug"]
  }),
  createTask({
    id: "5",
    title: "Project CRUD",
    status: "Testing",
    date: "Apr 15",
    tags: ["feature"]
  }),
  createTask({
    id: "6",
    title: "Dark Theme",
    status: "Deployed",
    date: "Apr 15",
    tags: ["feature"]
  }),
];

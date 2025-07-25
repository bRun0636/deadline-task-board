/* src/types/dto/TaskDTO.js */

export const TaskStatus = {
  TODO: "К работе",
  IN_PROGRESS: "В процессе",
  DONE: "Сделано",
  REVIEW: "Проверка",
  ACCEPTED: "Принято",
  PAID: "Оплачено",
  BACKLOG: "Backlog",
  APPROVED: "Approved",
  CODING: "Coding",
  TESTING: "Testing",
  DEPLOYED: "Deployed"
};


export const TaskType = {
  PUBLIC: "public",
  PRIVATE: "private",
};

export const TaskDTO = {
  id: "",
  title: "",
  description: "",
  status: TaskStatus.TODO,
  createdAt: new Date().toISOString(),
  deadline: new Date().toISOString(),
  budget: null,
  priority: 3,
  tags: [],
  rating: null,
  assignedTo: null,
  boardId: "",
  type: TaskType.PUBLIC,
  parentId: null,
};

export function createTask(overrides = {}) {
  return {
    ...TaskDTO,
    id: crypto.randomUUID(),
    ...overrides,
  };
}

export interface ICreateTodo {
  name: string;
  description: string;
}

export interface IUpdateTodo {
  name: string;
  description: string;
  is_done: boolean;
}

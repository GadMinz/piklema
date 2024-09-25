import { useTodoStore } from "@/stores/todoStore";
import { storeToRefs } from "pinia";

export function useTodos() {
  const todoStore = useTodoStore();

  const addTodo = (text: string) => {
    todoStore.addTodo(text);
  };

  const removeTodo = (id: number) => {
    todoStore.removeTodo(id);
  };

  const toggleTodo = (id: number) => {
    todoStore.toggleTodo(id);
  };

  const editTodo = (id: number, newText: string) => {
    todoStore.editTodo(id, newText);
  };

  const { todos } = storeToRefs(todoStore);

  return {
    todos,
    addTodo,
    removeTodo,
    toggleTodo,
    editTodo,
  };
}

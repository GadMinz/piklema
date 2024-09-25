import { defineStore } from "pinia";
import { ref, watch } from "vue";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export const useTodoStore = defineStore("todo", () => {
  const todos = ref<Todo[]>([]);

  const loadTodos = () => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      todos.value = JSON.parse(storedTodos);
    }
  };

  watch(
    todos,
    (newTodos) => {
      localStorage.setItem("todos", JSON.stringify(newTodos));
    },
    { deep: true },
  );

  const addTodo = (text: string) => {
    if (text.trim()) {
      todos.value.push({
        id: Date.now(),
        text,
        completed: false,
      });
    }
  };

  const removeTodo = (id: number) => {
    todos.value = todos.value.filter((todo) => todo.id !== id);
  };

  const toggleTodo = (id: number) => {
    const todo = todos.value.find((todo) => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  };

  const editTodo = (id: number, newText: string) => {
    const todo = todos.value.find((todo) => todo.id === id);
    if (todo && newText.trim()) {
      todo.text = newText;
    }
  };

  loadTodos();

  return {
    todos,
    addTodo,
    removeTodo,
    toggleTodo,
    editTodo,
  };
});

<script lang="ts" setup>
import { ref, nextTick } from "vue";
import { useTodos } from "@/hooks/useTodos";

const { todos, addTodo, toggleTodo, removeTodo, editTodo } = useTodos();

const newTodoText = ref("");
const editingId = ref<number | null>(null);
const editText = ref("");
const editInput = ref<HTMLInputElement | null>(null);

const handleAddTodo = () => {
  if (newTodoText.value.trim()) {
    addTodo(newTodoText.value);
    newTodoText.value = "";
  }
};
const handleRemoveTodo = (id: number) => {
  removeTodo(id);
};
const handleToggleTodo = (id: number) => {
  toggleTodo(id);
};

const editMode = (id: number) => {
  editingId.value = id;
  const todo = todos.value.find((t) => t.id === id);
  if (todo) {
    editText.value = todo.text;
    nextTick(() => {
      const inputValue = editInput.value as unknown as HTMLInputElement[];
      inputValue[0].focus();
    });
  }
};

const saveEdit = (id: number) => {
  if (editText.value.trim()) {
    editTodo(id, editText.value);
  }
  editingId.value = null;
};

const cancelEdit = () => {
  editingId.value = null;
  editText.value = "";
};
</script>

<template>
  <div class="todo-container">
    <h1>To-Do List</h1>

    <div class="todo-top">
      <input
        v-model="newTodoText"
        @keyup.enter="handleAddTodo"
        type="text"
        placeholder="Add a new task"
      />
      <button class="button" @click="handleAddTodo">Add</button>
    </div>
    <ul>
      <li v-for="todo in todos" :key="todo.id" class="todo-item">
        <span
          class="todo-item-title"
          v-if="editingId !== todo.id"
          :class="{ completed: todo.completed }"
          @click="handleToggleTodo(todo.id)"
          >{{ todo.text }}</span
        >
        <input v-else v-model="editText" type="text" ref="editInput" />
        <div class="button-group">
          <button
            class="button"
            @click="
              editingId === todo.id ? saveEdit(todo.id) : editMode(todo.id)
            "
          >
              {{ editingId === todo.id ? "Save" : "Edit" }}
          </button>
          <button
            class="button"
            v-if="editingId === todo.id"
            @click="cancelEdit"
          >
            Cancel
          </button>
          <button class="button" @click="handleRemoveTodo(todo.id)">
            Delete
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 24px;
  text-align: center;
}
.todo {
  &-container {
    max-width: 600px;
    margin: 0 auto;
  }
  &-top {
    display: flex;
    gap: 15px;
    margin-bottom: 20px;
  }
  &-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    &-title {
      cursor: pointer;
      &.completed {
        text-decoration: line-through;
        color: gray;
      }
    }
  }
}

.button-group {
  display: flex;
}

.button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
}

.button:hover {
  color: blue;
}

input[type="text"] {
  padding: 5px 10px;
  border: 1px solid #ccc;
  width: 100%;
  border-radius: 5px;
}
</style>

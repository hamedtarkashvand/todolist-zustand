import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
const store = (set) => ({
  tasks: [],
  draggedTask: null,
  addTask: (title, state) =>
    set(
      (store) => ({
        tasks: [...store.tasks, { title, state }],
      }),
      false,
      'addtask'
    ),
  deleteTask: (title) =>
    set((store) => ({
      tasks: store.tasks.filter((task) => task.title !== title),
    })),
  setDraggedTask: (title) => set({ draggedTask: title }),
  moveTask: (title, state) =>
    set(
      (store) => ({
        tasks: store.tasks.map((task) =>
          task.title === title ? { title, state } : task
        ),
      }),
      false,
      'movetask'
    ),
});

const log = (config) => (set, get, api) =>
  config(
    (...arg) => {
      console.log(arg);
      set(...arg);
    },
    get,
    api
  );

export const useStore = create(log(persist(devtools(store), { name: 'store' })));

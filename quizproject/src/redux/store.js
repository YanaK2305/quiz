import { configureStore } from "@reduxjs/toolkit";

import questionsReducer from "./slices/questionsReducer";
import formReducer from "./slices/formReducer";

const preloadedState = localStorage.getItem("redux")
  ? JSON.parse(localStorage.getItem("redux"))
  : {};
// создали константу для определения начального состояния хранилища
// если из localStorage удается получить сохраненные данные, то парсим и подставляем их
// иначе создаем пустое хранилище ввиде объекта
export const store = configureStore({
  reducer: {
    questions: questionsReducer,
    form: formReducer,
  },
  preloadedState,
});
store.subscribe(() => {
  localStorage.setItem("redux", JSON.stringify(store.getState()));
  // при каждом изменении хранилища все состояние сохраняется в localStorage
});

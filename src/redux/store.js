import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // використовуємо localStorage
import contactsReducer from "./contactsSlice";
import filtersReducer from "./filtersSlice";

// Конфігурація для redux-persist
const contactsPersistConfig = {
  key: "usersList",
  storage,
  whitelist: ["items"], // зберігаємо лише items з contacts
};

// Обгортаємо reducer контактів у persistReducer
const persistedContactsReducer = persistReducer(
  contactsPersistConfig,
  contactsReducer
);

// Створення store з persisted contactsReducer та filtersReducer
export const store = configureStore({
  reducer: {
    contacts: persistedContactsReducer,
    filters: filtersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Створюємо persistor для PersistGate
export const persistor = persistStore(store);

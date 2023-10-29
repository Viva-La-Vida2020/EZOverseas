import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import consultingReducers from "./features/consult/consultSlice";
import homeReducers from "./features/home/homeSlice";
import programReducers from "./features/programs/programSlice";
import rankingReducers from "./features/ranking/rankingSlice";
import settingsReducers from "./features/settings/settingSlice";
import dimensionTestReducers from "./features/tests/dimensionTestSlice";
import hollandTestReducers from "./features/tests/hollandTestSlice";
import userReducers from "./features/user/userSlice";
import rootSaga from "./sagas";

let sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    user: userReducers,
    home: homeReducers,
    programs: programReducers,
    hollandTest: hollandTestReducers,
    dimensionTest: dimensionTestReducers,
    consulting: consultingReducers,
    ranking: rankingReducers,
    settings: settingsReducers,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

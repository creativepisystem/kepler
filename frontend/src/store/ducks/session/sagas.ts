import { push } from "connected-react-router";
import { call, put } from "redux-saga/effects";

import AuthService from "@services/AuthService";


import { loginSuccess, loginFailure } from "./actions";

export function* login(action: any) {
  try {
    const { token } = yield call([AuthService, AuthService.login], action.payload.email, action.payload.password);

    yield put(loginSuccess(token));
    yield put(push("/"));
  } catch (err) {
    yield put(loginFailure());
  }
}

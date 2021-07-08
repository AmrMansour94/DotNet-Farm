import { Action, Reducer, Dispatch } from "redux";
import { UserVM } from "./VM/UserVM";

export interface LoginInitialState {
  User: UserVM | null;
}

export interface DispatchAction extends Action<actionTypes> {
  payload: Partial<LoginInitialState>;
}

export const initialState = {
  User: null,
};
export interface SET_USERAction {
  type: actionTypes.SET_USER;
  User: UserVM;
}

export enum actionTypes {
  SET_USER,
}

export const LoginReducer: Reducer<LoginInitialState, DispatchAction> = (
  state = initialState,
  action
) => {
  if (action.type === actionTypes.SET_USER) {
    return {
      ...state,
      User: action.payload.User?? null,
    };
  }
  return state;
};

export class LoginDispatcher {
  private readonly dispatch: Dispatch<DispatchAction>;
  constructor(dispatch: Dispatch<DispatchAction>) {
    this.dispatch = dispatch;
  }

  setUser = (User: UserVM | null) => {
    this.dispatch({
      type: actionTypes.SET_USER,
      payload: { User: User },
    });
  };
}

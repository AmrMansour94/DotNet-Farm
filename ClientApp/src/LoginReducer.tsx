import { Action, Reducer, Dispatch } from "redux";

export interface LoginInitialState {
  ID: number;
}

export interface DispatchAction extends Action<actionTypes> {
  payload: Partial<LoginInitialState>;
}

export const initialState = {
  ID: 0,
};
export interface SET_IDAction {
  type: actionTypes.SET_ID;
  ID: number;
}

export enum actionTypes {
  SET_ID,
}

export const LoginReducer: Reducer<LoginInitialState, DispatchAction> = (
  state = initialState,
  action
) => {
  if (action.type === actionTypes.SET_ID) {
    return {
      ...state,
      ID: action.payload.ID ?? 0,
    };
  }
  return state;
};

export class LoginDispatcher {
  private readonly dispatch: Dispatch<DispatchAction>;
  constructor(dispatch: Dispatch<DispatchAction>) {
    this.dispatch = dispatch;
  }

  setID = (ID: number) => {
    this.dispatch({
      type: actionTypes.SET_ID,
      payload: { ID: ID },
    });
  };
}

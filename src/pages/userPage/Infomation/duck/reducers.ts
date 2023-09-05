import { Action, State } from "../../../../types"
import { UPLOAD_AVATAR, fetchDataFail, fetchDataRequest, fetchDataSuccess } from "./types";
import { UPDATE_USER } from "./types";
const initialState:State = {
    loading:false,
    data:null,
    error:null
}

export const infomationReducer = (state = initialState,action:Action) => {
  switch (action.type) {
    case fetchDataRequest: {
        state.loading = true;
        state.data = null;
        state.error = null;
        return {...state};
    }
    case fetchDataSuccess: {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
        return {...state};
    }
    case fetchDataFail: {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
        return {...state};
    }
    case UPDATE_USER:{
        state.data = action.payload;
        return {...state};
    }
    case UPLOAD_AVATAR:{
        state.data = action.payload;
        return {...state};
    }
    default: {
        return {...state};
    }
  }
}

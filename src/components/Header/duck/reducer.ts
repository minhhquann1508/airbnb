import { State,Action } from "../../../types";
import { fetchDataFail, fetchDataRequest, fetchDataSuccess } from "./types";
const initialState:State = {
    loading:false,
    data:null,
    error:null,
}
export const locationReducer = (state = initialState, action:Action):any => {
    switch(action.type) {
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
        default: {
            return {...state};
        }
    }
}

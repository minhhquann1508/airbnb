import { Action, State } from "../../../../types";
import { addNewComment, fetchDataFail, fetchDataRequest, fetchDataSuccess, getListComment } from "./types";
const initialState:State = {
    loading:false,
    data:null,
    error:null,
    lstComment:null
}
export const roomDetailReducer = (state = initialState, action:Action):any => {
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
        case getListComment:{
            state.lstComment = action.payload;
            return {...state};
        }
        case addNewComment: {
            return {...state};
        }
        default: {
            return {...state};
        }
    }
}

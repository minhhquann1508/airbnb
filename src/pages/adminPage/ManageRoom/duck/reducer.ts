import { Action, State } from "../../../../types";
import {fetchDataFail, fetchDataRequest, fetchDataSuccess, getLstLocation} from "./types";
const initialState:State = {
    loading:false,
    data:null,
    error:null,
    lstLocation:null,
}
export const manageRoomAdminReducer = (state = initialState, action:Action):any => {
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
        case getLstLocation:{
            state.lstLocation = action.payload;
            return {...state};
        }
        default: {
            return {...state};
        }
    }
}
import { Action} from "../../../../types";
import { USER_LOGIN } from "../../../../util/constants";
import { LOGIN } from "./types";
let user:any = null
if(localStorage.getItem(USER_LOGIN)) {
	let json:any = localStorage.getItem(USER_LOGIN);
	user = JSON.parse(json);
}
const initialState = {
	userLogin:user
}
export const loginReducer = (state = initialState, action:Action):any => {
	switch(action.type) {
		case LOGIN:{
			state.userLogin = action.payload;
			localStorage.setItem(USER_LOGIN, JSON.stringify(action.payload));
			return {...state};
		}
		default: {
			return {...state};
		}
	}
}

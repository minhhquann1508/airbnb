import { Action } from "../../../../types"
import { REGISTER } from "./types"
const initialState = {}
export default (state = initialState, action:Action) => {
  switch (action.type) {
    case REGISTER: {
        return { ...state }
    }
    default: {
        return { ...state }
    }
  }
}

import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { lstRoomReducer } from "../components/LstRoom/duck/reducer";
import { roomDetailReducer } from "../pages/userPage/Detail/duck/reducers";
import { loginReducer } from "../pages/userPage/Login/duck/reducers";
import { infomationReducer } from "../pages/userPage/Infomation/duck/reducers";
import { journeyReducer } from "../pages/userPage/Journey/duck/reducer";
import { locationReducer } from "../components/Header/duck/reducer";
import { findingLstReducer } from "../pages/userPage/FindingLst/duck/reducer";
import { locationCategoryReducer } from "../pages/userPage/Location/duck/reducer";
import { manageUserReducer } from "../pages/adminPage/ManageUser/duck/reducer";
import { manageLocationAdminReducer } from "../pages/adminPage/ManageLocation/duck/reducer";
import { manageRoomAdminReducer } from "../pages/adminPage/ManageRoom/duck/reducer";
import { manageRoomOrderAdminReducer } from "../pages/adminPage/ManageRoomOrder/duck/reducer";
const rootReducer = combineReducers({
    lstRoomReducer,
    roomDetailReducer,
    loginReducer,
    infomationReducer,
    journeyReducer,
    locationReducer,
    findingLstReducer,
    locationCategoryReducer,
    manageUserReducer,
    manageLocationAdminReducer,
    manageRoomAdminReducer,
    manageRoomOrderAdminReducer
});

export const store = createStore(rootReducer,applyMiddleware(thunk));
export type RootState = ReturnType<typeof store.getState>

import Swal from "sweetalert2"
import { userService } from "../../../../services/UserService"
import { LOGIN } from "./types";
export const loginAction = (data:any,navigate:any,resetForm:any):any => {
    return async (dispatch:any) => {
        try {
            let result = await userService.login(data);
            if(result.status === 200) {
                await dispatch({
                    type:LOGIN,
                    payload:result.data.content
                })
                await Swal.fire({
                    icon: 'success',
                    title: 'Chúc mừng !',
                    text: 'Bạn đã đăng nhập thành công !',
                })
                if((result.data.content.user.role).toLowerCase() === 'admin') {
                    await navigate('/admin/manageUser');
                }
                else {
                    await navigate('/');
                }
                await resetForm();
                window.location.reload();
            }
        } 
        catch (error:any) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...!',
                text: error.response.data.content,
            })
        }
    }
}
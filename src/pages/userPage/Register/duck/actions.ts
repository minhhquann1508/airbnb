import Swal from "sweetalert2"
import { userService } from "../../../../services/UserService"
import { REGISTER } from "./types";
import { RegisterFormat } from "../../../../types";
export const registerAction = (data:RegisterFormat,resetForm:any,navigate:any):any => {
    return async (dispacth:any) => {
        try {
            let result = await userService.register(data);
            if(result.status === 200) {
                await dispacth({
                    type:REGISTER,
                })
                await Swal.fire({
                    icon: 'success',
                    title: 'Chúc mừng !',
                    text: 'Đăng ký thành công',
                })
                await resetForm();
                await navigate('/login')
            }
        } 
        catch (error:any) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.content,
            })
        }
    }
}
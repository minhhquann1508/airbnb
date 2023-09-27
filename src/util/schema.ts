import * as Yup from 'yup';
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,50}$/;
const nameRegex = /^\D*$/;
const phoneRegex = /^0\d{9}$/;
export const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Email không đúng định dạng')
        .required('Email không được bỏ trống'),
    password: Yup.string()
        .matches(passwordRegex, 'Mật khẩu từ 8-50 ký tự bao gồm chữ thường,chữ hoa,số và ký tự đặc biệt')
        .required('Mật khẩu không được bỏ trống'),
});

export const registerSchema = Yup.object().shape({
    name: Yup.string()
        .matches(nameRegex,'Tên không hợp lệ')
        .required('Tên không được bỏ trống'),
    email: Yup.string()
        .email('Email không đúng định dạng')
        .required('Email không được bỏ trống'),
    password: Yup.string()
        .matches(passwordRegex, 'Mật khẩu từ 8-50 ký tự bao gồm chữ thường,chữ hoa,số và ký tự đặc biệt')
        .required('Mật khẩu không được bỏ trống'),
    phone: Yup.string()
        .matches(phoneRegex, 'Số điện thoại không hợp lệ')
        .required('Số điện thoại không được bỏ trống'),
    birthday:Yup.string()
        .required('Ngày sinh không được bỏ trống'),
});

export const locationSchema = Yup.object().shape({
    tenViTri: Yup.string()
        .required('Không được bỏ trống'),
    tinhThanh: Yup.string()
        .required('Không được bỏ trống'),
    quocGia: Yup.string()
        .required('Không được bỏ trống'),
});

export const roomSchema = Yup.object().shape({
    tenPhong: Yup.string()
        .required('Không được bỏ trống'),
    moTa: Yup.string()
        .required('Không được bỏ trống'),
});

export const updateUserSchema = Yup.object().shape({
    name: Yup.string()
        .matches(nameRegex,'Tên không hợp lệ')
        .required('Tên không được bỏ trống'),
    phone: Yup.string()
        .matches(phoneRegex, 'Số điện thoại không hợp lệ')
        .required('Số điện thoại không được bỏ trống'),
    birthday:Yup.string()
        .required('Ngày sinh không được bỏ trống'),
});




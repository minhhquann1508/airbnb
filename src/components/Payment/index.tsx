import React from 'react';
import { PayPalScriptProvider, PayPalButtons, ReactPayPalScriptOptions } from '@paypal/react-paypal-js';
import { useDispatch } from 'react-redux';
import { bookingRoomAction } from '../../pages/userPage/Detail/duck/actions';

const PayPalButton = (props:any):JSX.Element => {
  const {dataBill,closeModal} = props;
  const dispatch = useDispatch();
  const paypalOptions:ReactPayPalScriptOptions = {
    'clientId': 'AXfm7-g34qvhRsbXmXCQPUNoKByj_76o09Cla2imX88iDyKEYV1iBgRtcQ_ea0zaKJAjZvO9k1DBMfv_', // Thay YOUR_CLIENT_ID bằng Client ID bạn đã lấy từ tài khoản PayPal Developer của bạn
    'currency': 'USD', // Loại tiền tệ
  };

  return (
    <PayPalScriptProvider options={paypalOptions}>
      <PayPalButtons
        createOrder={(data, actions) => {
          // Định nghĩa logic tạo đơn hàng tại đây
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: props.totalBill, // Số tiền của đơn hàng
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          if(actions.order) {
            // Xử lý sau khi thanh toán thành công
            return actions.order.capture().then((details: any) => {
              // Đây là nơi bạn có thể thực hiện các hành động sau khi thanh toán được chấp nhận
              if(details.status = 'COMPLETED') {
                dispatch(bookingRoomAction(dataBill,closeModal))
              }
          });
          }
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;

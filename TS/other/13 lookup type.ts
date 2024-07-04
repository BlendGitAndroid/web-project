// 提交给服务器的数据结构
export type RequestData = {
  transactionId: string;
  user: {
    name: string;
    email: string;
    phone: string;
    nickname: string;
    gender: string;
    dob: string;
    nationality: string;
    address: {
      stress: string;
      unitNumber: string;
      city: string;
      provance: string;
      contury: string;
    }[];
  };
  dirverInfo: {
    licenceNumber: string;
    exporyDate: string;
    classes: string;
    status: string;
  };
  payment: {
    creditCardNumber: string;
  };
};


type PaymentRequest = RequestData["payment"]; // 使用lookup type获取payment的类型，如果是对象，就会返回对象的值，这里是定义类型，区分好

// export function getPayment(): PaymentRequest {
//   return {
//     creditCardNumber: "1234567890",
//   };
// }

export function getPayment(): RequestData["payment"] {
  return {
    creditCardNumber: "1234567890",
  };
}


export function getAddress(): RequestData["user"]["address"][0] {
  return {
    stress: "太古广场",
    unitNumber: "1号",
    city: "广州",
    provance: "广东",
    contury: "中国",
  };
}

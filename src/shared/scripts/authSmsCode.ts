import { authSmsCodeUrl } from "@consts/consts";

type AuthPinCode = {
  content: string;
  pin: string;
};

const headers = new Headers({
  "Content-Type": "application/json",
});

const requestOptions = (body: AuthPinCode) => {
  return {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(body),
  };
};

const authSmsCode = async (
  phoneNumber: string,
  authCode: string,
): Promise<boolean> => {
  // 本番環境以外ではセキュリティ設定によりapiが呼び出せないため固定でtrueを返却する
  if (import.meta.env.MODE === "development") {
    if (authCode != "1234") {
      return Promise.resolve(false);
    }
    return Promise.resolve(true);
  }
  return new Promise((resolve, _) => {
    fetch(
      authSmsCodeUrl,
      requestOptions({ content: phoneNumber, pin: authCode }),
    )
      .then((response) => {
        if (response.status === 200) {
          resolve(true);
        } else {
          console.error("Network response was not ok");
          resolve(false);
        }
      })
      .catch((error: Error) => {
        console.error("There was a problem with the fetch operation:", error);
        resolve(false);
      });
  });
};

export default authSmsCode;

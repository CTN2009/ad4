import { sendAuthCodeUrl } from "@consts/consts";

type SendAuthCode = {
  content: string;
  email: string;
  id: number | undefined;
  ip: string | undefined;
  name: string;
};

const headers = new Headers({
  "Content-Type": "application/json",
});

const requestOptions = (body: SendAuthCode) => {
  return {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(body),
  };
};

const requestAuthCode = async (
  phoneNumber: string,
  email: string,
  id: number | undefined,
  ip: string | undefined,
  name: string
): Promise<[boolean, boolean]> => {
  // 本番環境以外ではセキュリティ設定によりapiが呼び出せないため固定でtrueを返却する
  if (import.meta.env.MODE === "development") {
    if (phoneNumber != "09012345678") {
      return Promise.resolve([false, false]);
    }
    return Promise.resolve([true, false]);
  }

  return new Promise((resolve, _) => {
    fetch(sendAuthCodeUrl, requestOptions({ content: phoneNumber, name: name, email: email, ip: ip, id: id }))
      .then((response) => {
        if (response.ok) {
          resolve([true, false]);
        } else if (response.status === 409) {
          resolve([false, true]);
        } else {
          console.error("Network response was not ok");
          resolve([false, false]);
        }
      })
      .catch((error: Error) => {
        console.error("There was a problem with the fetch operation:", error);
        resolve([false, false]);
      });
  });
};

export default requestAuthCode;

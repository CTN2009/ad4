import { appraisalReqUrl } from "@consts/consts";
import type { LegacyWordPressFormType } from "@type/index";

const headers = new Headers({
  "Content-Type": "application/json; charset=utf-8",
});

const requestOptions = (body: LegacyWordPressFormType) => {
  return {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(body),
  };
};

interface AppraisalResponse {
  success: boolean;
  statusCode: number;
}

const appraisalRequest = async (
  requestParams: LegacyWordPressFormType,
): Promise<AppraisalResponse> => {
  return new Promise((resolve) => {
    fetch(appraisalReqUrl, requestOptions(requestParams))
      .then((response) => {
        if (response.ok) {
          resolve({ success: true, statusCode: response.status });
        } else {
          console.error("Network response was not ok");
          resolve({ success: false, statusCode: response.status });
        }
      })
      .catch((error: Error) => {
        console.error("There was a problem with the fetch operation:", error);
        resolve({ success: false, statusCode: 0 });
      });
  });
};

export default appraisalRequest;

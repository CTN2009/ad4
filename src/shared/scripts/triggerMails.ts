import { triggerMailUrl } from "@consts/consts";
import type { LegacyWordPressFormType } from "@type/index";

const headers = new Headers({
  "Content-Type": "application/json; charset=utf-8",
});

const requestOptions = (body: LegacyWordPressFormType) => {
  return {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  };
};

const triggerMail = async (
  requestParams: LegacyWordPressFormType,
): Promise<boolean> => {
  // Include your development mode logic here if needed

  return new Promise((resolve, _) => {
    fetch(triggerMailUrl, requestOptions(requestParams))
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          resolve(true);
          console.error("Email sent successfully");
        } else {
          console.error("Network response was not ok");
          resolve(false);
        }
      })
      .catch((error: Error) => {
        console.error("There was a problem with the fetch operation:");
        resolve(false);
      });
  });
};

export default triggerMail;

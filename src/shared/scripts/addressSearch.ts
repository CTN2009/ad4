import { zipcodeApiUrl } from "@consts/consts";

type AddressSearchResult = {
  address1: string;
  address2: string;
  address3: string;
  kana1: string;
  kana2: string;
  kana3: string;
  prefcode: string;
  zipcode: string;
};

const addressSearch = (value: string): Promise<AddressSearchResult> => {
  const url = zipcodeApiUrl + value;

  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error(`Network response problem: ${response.status}`);
        }
      })
      .then((data) => {
        if (data.results != null) {
          resolve(data.results[0]);
        } else {
          throw new Error(`No results found: ${data.status}`);
        }
      })
      .catch((error) => {
        reject(error.message || "Unknown error occurred");
      });
  });
};

export default addressSearch;

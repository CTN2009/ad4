export const customerDisplayValue = "CTN";
export const actionWaitTime = 1000;

export const allInputCount = 15;

export const regexFormat: { [key: string]: RegExp } = {
  yourname:
    /^(?:[ぁ-んァ-ヶー\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcfa-zA-Z\s]|[\uD800-\uDBFF][\uDC00-\uDFFF]){2,}$/,
  zipcode: /^[0-9０-９]{7}$/,
  address:
    /^(?:[ぁ-んァ-ヶー\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcfa-zA-Z\s]|[\uD800-\uDBFF][\uDC00-\uDFFF]){2,}$/,
  address2: /^[1-9][0-9]*(?:-[1-9][0-9]*)*$/,
  youremail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  tel: /^\d{10,11}$/,
  authCode: /^\d{4}$/,
};

// 現在の日付を取得
const currentDate = new Date();
const day = currentDate.getDate();
const month = currentDate.getMonth() + 1;
const year = currentDate.getFullYear();

// 日付を2桁の文字列に変換
const dayString = day < 10 ? "0" + day : day.toString();
const monthString = month < 10 ? "0" + month : month.toString();

// ランダムな数字を生成
const randomNum = Math.floor(Math.random() * 1000000);

// パラメータを付与してpostUrlを生成
export const
postUrl = `/kaitori/car/ad3/thanks/?aid=${year}${monthString}${dayString}${randomNum}`;

export const zipcodeApiUrl =
  "https://zipcloud.ibsnet.co.jp/api/search?zipcode=";

const legacyAPIBaseURL =
  import.meta.env.MODE === "development"
    ? // 検証環境URL
      "https://d3hr6jxhk0c2mf.cloudfront.net/api/v1/appraisal"
    : // 本番環境URL
      "https://d3ul0twcmnvo72.cloudfront.net/api/v1/appraisal";

const newAPIBaseURL =
  import.meta.env.MODE === "development"
    ? "https://d3hr6jxhk0c2mf.cloudfront.net/api/v2/appraisal"
    : "https://d3ul0twcmnvo72.cloudfront.net/api/v2/appraisal";

export const sendAuthCodeUrl = `${legacyAPIBaseURL}/pin`;
export const authSmsCodeUrl = `${legacyAPIBaseURL}/vpin`;
export const triggerMailUrl = `${newAPIBaseURL}/emails`;
export const appraisalReqUrl = `${legacyAPIBaseURL}/core/lead`;

export const getImageUrl = (relativeUrl: string): string => {
  if (import.meta.env.MODE === "development") {
    return `../../shared${relativeUrl}`;
  }
  return `.${relativeUrl}`;
};

// 排気量
export const engineCapacityOptions = {
  name: "xilanh",
  value: [
    "〜660cc",
    "〜1300cc",
    "〜1500cc",
    "〜1800cc",
    "〜2200cc",
    "〜2500cc",
    "〜3000cc",
    "〜3500cc",
    "〜4000cc",
    "4000cc〜",
  ],
};

// マンション
export const mansionOptions = {
  name: "mansion",
  value: ["いいえ", "はい"],
};

// 走行距離
export const runOptions = {
  name: "run",
  value: [
    { label: "不明", value: "不明" },
    { label: "1万キロ以下", value: "～10,000km" },
    { label: "2万キロ以下", value: "～20,000km" },
    { label: "3万キロ以下", value: "～30,000km" },
    { label: "4万キロ以下", value: "～40,000km" },
    { label: "5万キロ以下", value: "～50,000km" },
    { label: "6万キロ以下", value: "～60,000km" },
    { label: "7万キロ以下", value: "～70,000km" },
    { label: "8万キロ以下", value: "～80,000km" },
    { label: "9万キロ以下", value: "～90,000km" },
    { label: "10万キロ以下", value: "～100,000km" },
    { label: "11万キロ以下", value: "～110,000km" },
    { label: "12万キロ以下", value: "～120,000km" },
    { label: "13万キロ以下", value: "～130,000km" },
    { label: "14万キロ以下", value: "～140,000km" },
    { label: "15万キロ以下", value: "～150,000km" },
    { label: "17万キロ以下", value: "～170,000km" },
    { label: "20万キロ以下", value: "～200,000km" },
    { label: "21万キロ以下", value: "～210,000km" },
  ],
};
// カラー
export const colorOptions = [
  {
    name: "white",
    value: "ホワイト",
    imgUrl: getImageUrl("/image/car-info-options/white.png"),
  },
  {
    name: "silver",
    value: "シルバー",
    imgUrl: getImageUrl("/image/car-info-options/silver.png"),
  },
  {
    name: "gray",
    value: "グレー",
    imgUrl: getImageUrl("/image/car-info-options/gray.png"),
  },
  {
    name: "black",
    value: "ブラック",
    imgUrl: getImageUrl("/image/car-info-options/black.png"),
  },
  {
    name: "red",
    value: "レッド",
    imgUrl: getImageUrl("/image/car-info-options/red.png"),
  },
  {
    name: "orange",
    value: "オレンジ",
    imgUrl: getImageUrl("/image/car-info-options/orange.png"),
  },
  {
    name: "green",
    value: "グリーン",
    imgUrl: getImageUrl("/image/car-info-options/green.png"),
  },
  {
    name: "blue",
    value: "ブルー",
    imgUrl: getImageUrl("/image/car-info-options/blue.png"),
  },
  {
    name: "brown",
    value: "ブラウン",
    imgUrl: getImageUrl("/image/car-info-options/brown.png"),
  },
  {
    name: "yellow",
    value: "イエロー",
    imgUrl: getImageUrl("/image/car-info-options/yellow.png"),
  },
  {
    name: "pink",
    value: "ピンク",
    imgUrl: getImageUrl("/image/car-info-options/pink.png"),
  },
  {
    name: "pearl",
    value: "パール",
    imgUrl: getImageUrl("/image/car-info-options/perl.png"),
  },
  {
    name: "purple",
    value: "パープル",
    imgUrl: getImageUrl("/image/car-info-options/purple.png"),
  },
  {
    name: "gold",
    value: "ブロンズ",
    imgUrl: getImageUrl("/image/car-info-options/gold.png"),
  },

  {
    name: "notClear",
    value: "不明",
    imgUrl: getImageUrl("/image/car-info-options/notClear.png"),
  },
];

// 事故歴・修復歴
export const troubleOptions = {
  name: "trouble",
  value: ["なし", "あり(修復済み)", "あり(未修理)", "不明"],
};

// ローン残積
export const loanOptions = {
  name: "zansai",
  value: ["なし", "あり"],
};
// 自走可否
export const jisouOptions = {
  name: "jisou",
  value: ["走行不可", "走行可"],
};

// 売却希望時期
export const DesiredTimeOptions = {
  name: "desired",
  value: ["1ヵ月以内", "2ヵ月以内", "未定"],
};

// 車検日
export const inspectionDateOptions = {
  name: "shaken",
  value: ["3ヵ月以内", "6ヵ月以内", "1年以内", "1年以上", "不明"],
};

// 燃料
export const fuelOptions = {
  name: "shane",
  value: ["ガソリン", "ディーゼル", "ハイブリッド", "電気自動車"],
};

// 外装の状態
export const exteriorConditionOptions = [
  {
    name: "shapa",
    value: "傷",
    imgUrl: getImageUrl("/image/car-info-options/exterior_hurt.webp"),
  },
  {
    name: "shahe",
    value: "へこみ",
    imgUrl: getImageUrl("/image/car-info-options/exterior_dent.webp"),
  },
  {
    name: "shage",
    value: "塗装はげ",
    imgUrl: getImageUrl("/image/car-info-options/exterior_baldness.webp"),
  },
  {
    name: "shapi",
    value: "さび",
    imgUrl: getImageUrl("/image/car-info-options/exterior_rust.webp"),
  },
];

// 内装の状態
export const interiorConditionOptions = [
  {
    name: "naitabaco",
    value: "喫煙",
    imgUrl: getImageUrl("/image/car-info-options/interior_smoking.webp"),
  },
  {
    name: "nairua",
    value: "汚れ/シミ",
    imgUrl: getImageUrl("/image/car-info-options/interior_dirty.webp"),
  },
  {
    name: "naishito",
    value: "シート破れ",
    imgUrl: getImageUrl("/image/car-info-options/interior_tear_seat.webp"),
  },
];

// ナビ
export const navigationOptions = {
  name: "sohinnabi",
  value: ["なし", "純正品", "社外品"],
};

// 電動スライド
export const electricSlideOptions = {
  name: "sohinden",
  value: ["なし", "片側", "両側"],
};

// オプション
export const otherItemsOptions = [
  {
    name: "sohinshito",
    value: "革シート",
    imgUrl: getImageUrl("/image/car-info-options/option_leather_seat.webp"),
  },
  {
    name: "sohinmonitor",
    value: "バックモニター",
    imgUrl: getImageUrl("/image/car-info-options/option_back_monitor.webp"),
  },
  {
    name: "sohinsan",
    value: "サンルーフ",
    imgUrl: getImageUrl("/image/car-info-options/option_sunroof.webp"),
  },
  {
    name: "sohintaiya",
    value: "アルミホイール",
    imgUrl: getImageUrl("/image/car-info-options/option_aluminum_wheel.webp"),
  },
];

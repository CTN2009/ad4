import { validate } from "src/shared/scripts/validate";
import { regexFormat } from "src/shared/consts/consts";
import { describe, expect, test } from "vitest";

describe("お客様情報のvalidation", () => {
  test("「お名前」は数字以外の2文字以上である", () => {
    expect(validate("内藤", regexFormat.yourname)).toBe(true);
    expect(validate("𠀋𠀋", regexFormat.yourname)).toBe(true);
    expect(validate("json", regexFormat.yourname)).toBe(true);
    expect(validate("あいう", regexFormat.yourname)).toBe(true);
    expect(validate("内", regexFormat.yourname)).toBe(false);
    expect(validate("j", regexFormat.yourname)).toBe(false);
    expect(validate("あ", regexFormat.yourname)).toBe(false);
    expect(validate("1", regexFormat.yourname)).toBe(false);
    expect(validate("12", regexFormat.yourname)).toBe(false);
    expect(validate("アア", regexFormat.yourname)).toBe(true);
  });

  test("「郵便番号」は半角全角の数字7文字のみである", () => {
    expect(validate("1234567", regexFormat.zipcode)).toBe(true);
    expect(validate("1234-56", regexFormat.zipcode)).toBe(false);
    expect(validate("123456", regexFormat.zipcode)).toBe(false);
    expect(validate("12345678", regexFormat.zipcode)).toBe(false);
    expect(validate("１２３４５６７", regexFormat.zipcode)).toBe(true);
    expect(validate("１２３４５67", regexFormat.zipcode)).toBe(true);
    expect(validate("１２３４５６", regexFormat.zipcode)).toBe(false);
    expect(validate("１２３４５6", regexFormat.zipcode)).toBe(false);
    expect(validate("あいうえおかき", regexFormat.zipcode)).toBe(false);
    expect(validate("内", regexFormat.zipcode)).toBe(false);
    expect(validate("j", regexFormat.zipcode)).toBe(false);
  });

  test("「住所」は数字以外の2文字以上である", () => {
    expect(validate("大阪", regexFormat.address)).toBe(true);
    expect(validate("大阪区", regexFormat.address)).toBe(true);
    expect(validate("大阪区難波", regexFormat.address)).toBe(true);
    expect(validate("おおさか", regexFormat.address)).toBe(true);
    expect(validate("オオサカ", regexFormat.address)).toBe(true);
    expect(validate("OSAKA", regexFormat.address)).toBe(true);
    expect(validate("osaka", regexFormat.address)).toBe(true);
    expect(validate("大", regexFormat.address)).toBe(false);
    expect(validate("オ", regexFormat.address)).toBe(false);
    expect(validate("お", regexFormat.address)).toBe(false);
    expect(validate("o", regexFormat.address)).toBe(false);
    expect(validate("O", regexFormat.address)).toBe(false);
    expect(validate("1", regexFormat.address)).toBe(false);
    expect(validate("12", regexFormat.address)).toBe(false);
  });

  test("「番地」は半角数字1文字以上、または半角数字と-の3文字以上", () => {
    expect(validate("1", regexFormat.address2)).toBe(true);
    expect(validate("123", regexFormat.address2)).toBe(true);
    expect(validate("1-2", regexFormat.address2)).toBe(true);
    expect(validate("1-2-3", regexFormat.address2)).toBe(true);
    expect(validate("1-2-30", regexFormat.address2)).toBe(true);
    expect(validate("1ー2", regexFormat.address2)).toBe(false);
    expect(validate("1-", regexFormat.address2)).toBe(false);
    expect(validate("１", regexFormat.address2)).toBe(false);
    expect(validate("１-２", regexFormat.address2)).toBe(false);
    expect(validate("１-2", regexFormat.address2)).toBe(false);
  });

  test("「メールアドレス」は英数字-_を含むユーザー名@英字.英字である", () => {
    expect(validate("xxx@ctn.co.jp", regexFormat.youremail)).toBe(true);
    expect(validate("xxx@ctn.com", regexFormat.youremail)).toBe(true);
    expect(validate("xxx_aaa@ctn.co.jp", regexFormat.youremail)).toBe(true);
    expect(validate("xxx_aaa-1234@ctn.co.jp", regexFormat.youremail)).toBe(
      true,
    );
    expect(validate("xxx", regexFormat.youremail)).toBe(false);
    expect(validate("xxx@", regexFormat.youremail)).toBe(false);
    expect(validate("xxx@ctn", regexFormat.youremail)).toBe(false);
  });

  test("「電話番号」は半角数字10文字、または11文字のみである", () => {
    expect(validate("1234567890", regexFormat.tel)).toBe(true);
    expect(validate("12345678901", regexFormat.tel)).toBe(true);
    expect(validate("12345678-0", regexFormat.tel)).toBe(false);
    expect(validate("123456789-1", regexFormat.tel)).toBe(false);
    expect(validate("123456789", regexFormat.tel)).toBe(false);
    expect(validate("123456789012", regexFormat.tel)).toBe(false);
    expect(validate("１２３４５６７８９０", regexFormat.tel)).toBe(false);
    expect(validate("１２３４５67", regexFormat.tel)).toBe(false);
    expect(validate("あいうえおかき", regexFormat.tel)).toBe(false);
    expect(validate("内", regexFormat.tel)).toBe(false);
    expect(validate("j", regexFormat.tel)).toBe(false);
  });

  test("「認証コード」は半角数字4文字のみである", () => {
    expect(validate("1234", regexFormat.authCode)).toBe(true);
    expect(validate("123", regexFormat.authCode)).toBe(false);
    expect(validate("12345", regexFormat.authCode)).toBe(false);
    expect(validate("12-3", regexFormat.authCode)).toBe(false);
    expect(validate("あ123", regexFormat.authCode)).toBe(false);
    expect(validate("内123", regexFormat.authCode)).toBe(false);
    expect(validate("j123", regexFormat.authCode)).toBe(false);
    expect(validate("１２３４", regexFormat.tel)).toBe(false);
    expect(validate("１２34", regexFormat.tel)).toBe(false);
  });
});

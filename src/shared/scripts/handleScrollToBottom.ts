import { actionWaitTime } from "@consts/consts";

type ScrollProps = {
  isWait?: boolean;
  waitTime?: number;
  compensation?: number;
};

// スクロールする関数
// スクロールする関数
export const handleScrollToElement = (elementId: string) => {
  // <- elementIdの型を指定
  const element = document.getElementById(elementId);
  if (element) {
    // 要素が見つかった場合にスクロールする
    element.scrollIntoView({ behavior: "smooth" });
  }
};

export const handleScrollToTop = ({
  isWait = true,
  waitTime = actionWaitTime,
  compensation = 0,
}: ScrollProps = {}) => {
  setTimeout(
    () => {
      window.scrollTo({
        top: 0 + compensation,
        left: 0,
        behavior: "smooth",
      });
    },
    isWait ? waitTime : 0,
  );
};

export const handleScrollToBottom = ({
  isWait = true,
  waitTime = actionWaitTime,
  compensation = 0,
}: ScrollProps = {}) => {
  const org = document.body.scrollHeight;

  const footer = 80;

  const callBackTimeout = () => {
    window.scrollBy({
      top: document.body.scrollHeight - org + compensation + footer,
      left: 0,
      behavior: "smooth",
    });
  };

  setTimeout(
    () => {
      callBackTimeout();
    },
    isWait ? waitTime : 100,
  );
};

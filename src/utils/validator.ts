import type { RuleObject, StoreValue } from "ant-design-vue/es/form/interface";

export const checkAccount = (
  rule: RuleObject,
  value: StoreValue,
  callback: (error?: string) => void
): Promise<void> | void => {
  const phoneRegExp = /^1[3-9]\d{9}$/;
  const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const accountRegExp = /^(?=.*[a-zA-Z])(?=.*\d).+$/;
  return new Promise((resolve, reject) => {
    if (
      value &&
      !phoneRegExp.test(value) &&
      !emailRegExp.test(value) &&
      !accountRegExp.test(value)
    ) {
      reject("账号格式错误");
    }
    resolve();
  });
};

export const checkPhone = (
  rule: RuleObject,
  value: StoreValue,
  callback: (error?: string) => void
): Promise<void> | void => {
  const regExp = /^1[3-9]\d{9}$/;
  return new Promise((resolve, reject) => {
    if (value && !regExp.test(value)) {
      reject("手机号格式错误");
    }
    resolve();
  });
};

export const checkPassword = (
  rule: RuleObject,
  value: StoreValue,
  callback: (error?: string) => void
): Promise<void> | void => {
  const regExp = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^\w\s]).+$/;
  return new Promise((resolve, reject) => {
    if (value && !regExp.test(value)) {
      reject("密码必须包含字符、字母和数字");
    }
    resolve();
  });
};

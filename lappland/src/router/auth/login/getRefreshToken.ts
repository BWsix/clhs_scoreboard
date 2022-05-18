import got from "got";

const getVerificationToken = async () => {
  const API = "https://eschool.clhs.tyc.edu.tw/auth/Auth/Login";

  const getResult = await got.get(API);
  const validationCookie = getResult.headers["set-cookie"]![0].split(";")[0];
  const matchToken = /type="hidden" value="([\-\d\w]+)"/g;
  const requestVerificationToken = matchToken.exec(getResult.body)![1];

  if (!validationCookie || !requestVerificationToken) {
    throw new Error("無法登入，可能是學校系統掛掉或是更新了");
  }

  return { validationCookie, requestVerificationToken };
};

export const getRefreshToken = async (id: string, password: string) => {
  const API = "https://eschool.clhs.tyc.edu.tw/auth/Auth/DoLogin";

  console.log("Start executing `getRefreshToken`"); //TODO remove console.log
  const t = Date.now(); //TODO remove console.log

  const tokens = await getVerificationToken();

  const postResult = await got.post(API, {
    headers: {
      cookie: tokens.validationCookie,
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    form: {
      LoginId: id,
      Password: password,
      __RequestVerificationToken: tokens.requestVerificationToken,
      LoginType: "Student",
      IdentityId: undefined,
      IsKeepLogin: true,
      GoogleToken: undefined,
      IsLeaveSchoolStudent: false,
      ChangeAndModifyPwd: false,
      IsTriggerFromReadCard: false,
    },
  });

  if (postResult.headers["set-cookie"] === undefined) {
    throw new Error("錯誤的帳號或密碼");
  }

  try {
    const cookieRawA = postResult.headers["set-cookie"]![0].split(";")[0];
    const cookieRawB = postResult.headers["set-cookie"]![1].split(";")[0];

    console.log("Finish executing `getRefreshToken`: ", Date.now() - t); //TODO remove console.log

    return `${cookieRawA}; ${cookieRawB}; `;
  } catch (e) {
    throw new Error("帳號密碼無誤，但發生錯誤無法登入");
  }
};
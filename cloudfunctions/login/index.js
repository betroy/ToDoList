var request = require("request");
const { URL, URLSearchParams } = require("url");
const baseUrl = new URL("https://api.weixin.qq.com/sns/jscode2session");
// 云函数入口函数
exports.main = async (event, context) => {
  baseUrl.searchParams.append("appid", process.env.appid);
  baseUrl.searchParams.append("secret", process.env.secret);
  baseUrl.searchParams.append("js_code", event.js_code);
  baseUrl.searchParams.append("grant_type", process.env.grant_type);
  console.log("url===>" + baseUrl.href);
  return new Promise((resolve, reject) => {
    request(baseUrl.href, function(error, response, data) {
      console.log(data);
      if (!error && response.statusCode == 200) {
        resolve(response);
      } else {
        reject(error);
      }
    });
  });
};

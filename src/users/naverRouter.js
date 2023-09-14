const { log } = require('console');
var express = require('express');
var app = express();
// var client_id = process.env.NAVER_ID;
var client_id = 'OS67gvVkzjoLCwcu2BjQ';
// var client_secret = process.env.NAVER_SECRET;
var client_secret = '0UzYU19A0J';
var state = Math.random().toString(36).substring(3,14);
var redirectURI = encodeURI("http://localhost:8000/users/naver/callback");
var api_url = "";
const fetch = require("node-fetch");
app.get("/naverlogin", function (req, res) {
  console.log('콜백 다음 통과');
    api_url =
      "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=" +
      client_id +
      "&redirect_uri=" +
      redirectURI +
      "&state=" +
      state;
    res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    res.end(
      "<a href='" +
        api_url +
        "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>"
    );
  });
  app.get("/users/naver/callback", async function (req, res) {
    const code = 'EIc5bFrl4RibFls3';
    const state = Math.random().toString(36);
    const api_url =
      "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=" +
      client_id +
      "&client_secret=" +
      client_secret +
      "&redirect_uri=" +
      redirectURI +
      "&code=" +
      code +
      "&state=" +
      state;
    console.log('api_url :::', api_url);
    console.log('code ::: ', code);
    console.log('state ::: ', state);
  
    const response = await fetch(api_url, {
      headers: {
        "X-Naver-Client-Id": client_id,
        "X-Naver-Client-Secret": client_secret,
      },
    });

    console.log('response:::', response);
  
    const tokenRequest = await response.json();
  
    console.log('tokenRequest:::', tokenRequest);
    //3단계: access_token으로 사용자 정보 받아오기
    if ("access_token" in tokenRequest) {
      console.log('access_token::: ', access_token);
      const { access_token } = tokenRequest;
      const apiUrl = "https://openapi.naver.com/v1/nid/me";
  
      const data = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
  
      const userData = await data.json();
  
      //사용자 정보 콘솔로 받아오기 -> DB에 저장해야 합니다.
      console.log("userData:", userData);
    } else {
      return res.send("토큰을 받아오는데 실패했습니다.");
    }
});

  // http://localhost:8000/users/naver/callback#access_token=AAAAO3nJacdomI2GMvZrq0Ubj7zP7tHZeKVng3KmpABJtagPLoqbIpMSGCNH6gkGGyyOiCVmf-xUl4JfKVFIuV4xLUg&state=733836f5-13c7-4887-96ba-a78c603c4d58&token_type=bearer&expires_in=3600
  
  app.listen(8000, function () {
    console.log("http://127.0.0.1:8000/naverlogin app listening on port 8000!");
  });
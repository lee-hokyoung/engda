const express = require("express");
const router = express.Router();
const User = require("../model/user");
const nodemailer = require("nodemailer");

//  인증번호 전송하기
router.post("/verify", async (req, res) => {
  try {
    let mailTo = req.body.mailAddress;
    let verifyNumber = Math.random().toString(16).substr(2);
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        type: "OAuth2",
        user: mailTo,
        clientId: process.env.GOOGLECLIENTID,
        clientSecret: process.env.GOOGLESECRET,
        refreshToken: process.env.GOOGLEREFRESHTOKEN,
        accessToken: process.env.GOOGLEACCESSTOKEN,
        expires: 3600,
      },

      // service: "gmail",
      // host: "smtp.gmail.email",
      // port: 587,
      // secure: false, // true for 465, false for other ports
      // auth: {
      //   user: process.env.NODEMAILFROM,
      //   pass: process.env.NODEMAILPW,
      // },
    });
    let mailOptions = {
      from: process.env.NODEMAILFROM,
      to: mailTo,
      subject: "잉다 인증번호 확인 메일입니다.",
      html: `
      <div style="width: 960px;">
        <div
          style="
            margin: 4rem auto;
            width: 400px;
            border-radius: 30px;
            border: 1px solid;
            padding: 1.5rem 2rem;
            background-color: whitesmoke;
          "
        >
          <div style="padding-bottom: 1rem;">
            <b style="font-size: 30px;">PZ</b>
            <span style="font-size: 25px; font-weight: bold; padding-left: 5px;">SPORTS</span>
          </div>
          <div style="border: 1px solid; background: white; padding: 0.5rem 1rem;">
            <div style="font-size: 13px;">
              <p>안녕하세요</p>
              <p>잉다 회원가입 인증번호는 <b>${verifyNumber}</b> 입니다</p>
            </div>
          </div>
        </div>
      </div>`,
    };
    // 메일 발송
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.json({ code: 0, message: error });
      } else {
        console.log("Email sent: " + info.response);
        res.json({ code: 1, message: `정상적으로 발송했습니다 \n ${info.response}` });
      }
    });
  } catch (err) {
    res.json({ code: 0, message: err.message });
  }
});
//  비밀번호 찾기(재설정)
router.post("/resetPw", async (req, res) => {
  try {
    let referer = req.headers.referer;
    let user_id = req.body.email;
    let newPw = Math.random().toString(16).substr(2);
    let result = await User.updateOne({ user_id: user_id }, { $set: { user_pw: newPw } });
    if (result.n === 1) {
    } else {
      return res.json({ code: 0, message: "등록되지 않은 이메일(ID)입니다." });
    }
  } catch (err) {
    res.json({ code: 0, message: err.message });
  }
});
module.exports = router;

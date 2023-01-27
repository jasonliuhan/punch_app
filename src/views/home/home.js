import React, { useEffect, useState } from "react";
import styles from "./home.module.scss";

import CryptoJs, { format } from "crypto-js";

import { getArticleList, getCode, registered } from "../../api/home";

import { debounce } from "../../utils/utils";

import Animation from "../component/Loading/load";

import Block from "../../assets/image/home/block.png";
import BackGround from "../../assets/image/home/Appback.png";

import useGoogle from "../../hooks/google";
import useFB from "../../hooks/facebook"

import {
  useNavigate,
  useParams,
  useLocation,
  useMatch,
} from "react-router-dom";

export const HomeView = (props) => {
  const [emailValue, setEmailValue] = useState();
  const [codeValue, setCodeValue] = useState();
  const [passWordValue, setPassWordValue] = useState();

  const [codeText, setCodeText] = useState("Send");
  const [codeTextStatu, setCodeTextStatu] = useState(false);

  const [emailErrorStatue, setEmailErrorStatue] = useState(false);
  const [codeErrorStatue, setCodeErrorStatue] = useState(false);

  const [passFouse, setPassFouse] = useState(false);
  const [passWordShowStatu, setPassWordShowStatu] = useState(false);

  const [passLength, setPassLength] = useState(false);
  const [passAa, setPassAa] = useState(false);
  const [passNum, setPassNum] = useState(false);

  const [singUpStatu, setSingUpStatu] = useState();

  const [invitationCode, setInvitationCode] = useState();

  const [type, setType] = useState();

  const { handleLoginGoogle } = useGoogle();
  const { handleLoginFB } = useFB();

  const emailInput = React.useRef(false);
  const codeInput = React.useRef(false);
  const passInput = React.useRef(false);

  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  const getList = () => {
    let data = getArticleList();
    console.log(data);
  };
  //判断email输入
  const emailValueChange = debounce((e) => {
    let value = e.target.value;
    let reg =
      /^[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/;
    let bool = reg.test(value);
    let regLength = /^(a-z|A-Z|0-9)*[^$%^&*;:,<>?()']{4,50}$/;
    let boolLength = regLength.test(value);
    console.log(bool);
    console.log(boolLength);
    if (bool && boolLength) {
      setEmailErrorStatue(false);
    } else {
      setEmailErrorStatue(true);
    }
  }, 500);
  //判断验证码输入
  const codeValueChange = debounce((e) => {
    let value = e.target.value;
    let codeLength = value.length;
    let data = value;
    if (codeLength > 6) {
      data = value.slice(0, 6);
      codeInput.current.value = data;
    }

    let reg = /^\d{6}$/;
    let bool = reg.test(data);

    if (bool) {
      setCodeErrorStatue(false);
    } else {
      setCodeErrorStatue(true);
    }
  }, 0);
  //判断密码输入
  const passWordValueChange = debounce((e) => {
    let value = e.target.value;
    console.log(value);
    let regLength = /^(a-z|A-Z|0-9)*[^$%^&*;:,<>?()']{8,16}$/;
    let boolLength = regLength.test(value);
    if (boolLength) {
      setPassLength(true);
    } else {
      setPassLength(false);
    }

    let regAa = /\D/;
    let boolAa = regAa.test(value);
    if (boolAa) {
      setPassAa(true);
    } else {
      setPassAa(false);
    }

    let regNum = /^(?![a-zA-Z]+$)[0-9a-zA-Z]/;
    let boolNum = regNum.test(value);
    if (boolNum) {
      setPassNum(true);
    } else {
      setPassNum(false);
    }
  }, 50);

  //删除email
  const deleteEmail = () => {
    emailInput.current.value = "";
    setEmailErrorStatue(false);
  };

  //点击发送验证码
  const sendCode = debounce(async () => {
    if (codeTextStatu) {
      return;
    }
    let eValue = emailInput.current.value;
    if (eValue === "" || emailErrorStatue) {
      alert("Please enter the correct email address!");
      return;
    }
    let query = {
      authWith: 1,
      type: 1,
      email: eValue,
    };
    console.log(query);
    let data = await getCode(query);
    if (data.code === 200 && data.msg === "success") {
      setCodeTextStatu(true);
      downTime();
    } else {
      alert(data.msg);
    }
  }, 500);

  //倒计时
  const downTime = () => {
    let time = 60;
    let downActive = setInterval(() => {
      time--;
      setCodeText(time);
      if (time === 0) {
        clearInterval(downActive);
        setCodeText("Send");
        setCodeTextStatu(false);
      }
    }, 1000);
  };

  // 获得焦点
  const passWordFocus = () => {
    setPassFouse(true);
  };
  //失去焦点
  const passWordBlur = () => {
    // setPassFouse(false);
  };
  //控制密码展示
  const passWordShow = () => {
    let statu = false;
    if (passWordShowStatu) {
      statu = false;
    } else {
      statu = true;
    }
    setPassWordShowStatu(statu);
  };
  //注册
  const singUp = async () => {
    let eValue = emailInput.current.value;
    let cValue = codeInput.current.value;
    let pValue = passInput.current.value;
    if (eValue === "" || emailErrorStatue) {
      alert("Please enter the correct email address!");
      return;
    }
    if (cValue === "" || codeErrorStatue) {
      alert("Please enter the correct verification code!");
      return;
    }
    if (pValue === "" || (!passLength && !passAa && !passNum)) {
      alert("Please enter the correct password!");
      return;
    }
    let aesPass = asePass(pValue, "");
    let query = {
      captcha: cValue,
      email: eValue,
      password: aesPass,
      invitationCode: invitationCode,
    };

    let data = await registered(query);
    if (data.code === 200 && data.msg === "success") {
      navigate("/gogame");
    } else {
      alert(data.msg);
    }
  };
  //ASE加密
  const asePass = (passWord, pkey) => {
    let iv = CryptoJs.enc.Utf8.parse("");
    let key = CryptoJs.enc.Utf8.parse("k983sdj@74687#89");
    let srcs = CryptoJs.enc.Utf8.parse(passWord);
    let encrypted = CryptoJs.AES.encrypt(srcs, key, {
      iv: iv,
      mode: CryptoJs.mode.CBC,
      padding: CryptoJs.pad.Pkcs7,
    });
    console.log(encrypted.toString());
    return encrypted.toString();
  };

  const judgePhoneType = () => {
    const ua = navigator.userAgent || "";
    let isAndroid = ua.indexOf("Android") > -1 || ua.indexOf("Adr") > -1; //android终端
    let isIOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    let isHuawei = ua.indexOf("huawei") > -1 || ua.indexOf("Huawei") > -1; //huawei
    console.log(isAndroid);
    console.log(isIOS);
    let url = "";
    let type = "";
    if (isAndroid && !isHuawei) {
      type = "android";
    }
    if (isHuawei) {
      type = "huawei";
    }
    if (isIOS) {
      type = "ios";
    }
    setType(type);
  };

  const goPrivacy = () => {
    window.location.href = "https://www.punch.games/#/agreement/type";
  };
  const downApp = () => {
    if (type === "ios") {
      window.location.href =
        "https://apps.apple.com/us/app/punch-games/id6443616962";
    }
    if (type === "android" && type !== "huawei") {
      window.location.href =
        "https://play.google.com/store/apps/details?id=com.start.punch&pli=1";
    }
    if (type === "huawei") {
      window.location.href = "https://appgallery.huawei.com/app/C107212619";
    }
  };

  useEffect(() => {
    judgePhoneType();
    let location = window.location;
    let search = location.search.replace("?invite-code=", "");
    setInvitationCode(search);
  });
  return (
    <>
      <div className={styles.homePage}>
        <div className={styles.backgroundVedioBlock}>
          <img className={styles.backgroundGif} src={BackGround} alt="back" />
        </div>

        <div className={styles.pageHeadBlock}>
          <div className={styles.headData}>
            <div className={styles.headMiner}>
              <img className={styles.icon} src={Block} alt="" />
              <div className={styles.text}>Active Miner:</div>
              <div className={styles.mInfo}>80</div>
            </div>
            <div className={styles.headStatus}>
              <img className={styles.icon} src={Block} alt="" />
              <div className={styles.text}>Miner Status:</div>
              <div className={styles.mInfo}>Healthy</div>
            </div>
          </div>
        </div>

        <div className={styles.pageBottomBlock}>
            <div className={styles.BottomButton}>
              <div className={styles.buttonText}>
                Login
              </div>
            </div>
        </div> 

        <div className={styles.popoverBlock}>
          <div className={styles.title}>
            Login in to Punch
          </div>
            <div className={styles.popoverButton}>
              {/* <div className={`${styles.singleButton} ${styles.email}`}>
               Continue with Email
              </div> */}
              <button onClick={handleLoginGoogle}>使用google登入</button>
              <button onClick={handleLoginFB}>使用facebook登入</button>
            </div>

        </div>

        <div className={styles.blockAir}>
          <div className={styles.single}>
            <img
              src={Block}
              className={`${styles.block}   ${styles.block1}`}
              alt=""
            />
          </div>
          <div className={styles.single}>
            <img
              src={Block}
              className={`${styles.block}   ${styles.block2}`}
              alt=""
            />
          </div>

          <div className={styles.single}>
            <img
              src={Block}
              className={`${styles.block}   ${styles.block3}`}
              alt=""
            />
          </div>

          <div className={styles.single}>
            <img
              src={Block}
              className={`${styles.block}   ${styles.block4}`}
              alt=""
            />
          </div>

          <div className={styles.single}>
            <img
              src={Block}
              className={`${styles.block}   ${styles.block5}`}
              alt=""
            />
          </div>

          <div className={styles.single}>
            <img
              src={Block}
              className={`${styles.block}   ${styles.block6}`}
              alt=""
            />
          </div>

          <div className={styles.single}>
            <img
              src={Block}
              className={`${styles.block}   ${styles.block7}`}
              alt=""
            />
          </div>

          <div className={styles.single}>
            <img
              src={Block}
              className={`${styles.block}   ${styles.block8}`}
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

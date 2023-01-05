import React, { useEffect, useState } from "react";

import styles from "./invitation.module.scss";

import BackGround from "../../assets/image/invitation/100002.png";

import LogoImg from "../../assets/image/invitation/100004.png";
import LogoTextImg from "../../assets/image/invitation/100006.png";

import TrophyImg from "../../assets/image/invitation/100001.png";
import DollImg from "../../assets/image/invitation/100005.png";

import DialogImg from "../../assets/image/invitation/100008.png";

import ButtonImg from "../../assets/image/invitation/100003.png";

import ButtonWakeUp from "../../assets/image/invitation/100007.png";

import copy from "copy-to-clipboard";

import {CopyToClipboard} from "react-copy-to-clipboard"

export const InvitationView = (props) => {
  const [type, setType] = useState();
  const [url, setUrl] = useState();
  const [rouse, setRouse] = useState(false);

  const [gameName, setGameName] = useState("");
  const [roomNo, setRoomNo] = useState("");
  const [nickName, setNickName] = useState("");
  const [invitationCode, setInvitationCode] = useState("");

  useEffect(() => {
    judgePhoneType();
    parsing();
  });

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
      url =
        "https://play.google.com/store/apps/details?id=com.start.punch&pli=1";
      type = "android";
    }
    if (isHuawei) {
      url = "https://appgallery.huawei.com/app/C107212619";
      type = "huawei";
    }
    if (isIOS) {
      url = "https://apps.apple.com/us/app/punch-games/id6443616962";
      type = "ios";
    }
    setType(type);
    setUrl(url);
  };

  const goApp = () => {
    if (type === "android" && type !== "huawei") {
      let url = `punch://wakeup.punch.xyz`;
      window.location.href = url;
      setRouse(true);
    } else if (type === "ios") {
      let url = `punch://wakeup.punch.xyz`;
      window.location.href = url;
      setRouse(true);
    }
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

  const copyText = (type)=>  {
    // 数字没有 .length 不能执行selectText 需要转化成字符串
    const textString = 'punch://com.start.punch/battleInvite?roomNo='+roomNo+'&inviteCode='+invitationCode;
    let input = document.querySelector('#copy-input');
    if (!input) {
      input = document.createElement('input');
      input.id = "copy-input";
      input.readOnly = "readOnly";        // 防止ios聚焦触发键盘事件
      input.style.position = "absolute";
      input.style.left = "-1000px";
      input.style.zIndex = "-1000";
      document.body.appendChild(input)
    }

    input.value = textString;
    // ios必须先选中文字且不支持 input.select();
    selectText(input, 0, textString.length);
    console.log(document.execCommand('copy'), 'execCommand');
    if (document.execCommand('copy')) {
      document.execCommand('copy');
     console.log('success')

     if(type ==='down'){
        downApp()
     }
     if(type ==='go')
        goApp()
    }
    input.blur();

    // input自带的select()方法在苹果端无法进行选择，所以需要自己去写一个类似的方法
    // 选择文本。createTextRange(setSelectionRange)是input方法
    function selectText(textbox, startIndex, stopIndex) {
      if (textbox.createTextRange) {//ie
        const range = textbox.createTextRange();
        range.collapse(true);
        range.moveStart('character', startIndex);//起始光标
        range.moveEnd('character', stopIndex - startIndex);//结束光标
        range.select();//不兼容苹果
      } else {//firefox/chrome
        textbox.setSelectionRange(startIndex, stopIndex);
        textbox.focus();
      }
    }
};

  const parsing = () => {
    let gameName = queryString("gameName");
    let roomNo = queryString("roomNo");
    let nickName = queryString("nickName");
    let invitationCode = queryString("invitationCode");

    console.log(queryString("roomNo"))

    setGameName(gameName);
    setRoomNo(roomNo);
    setNickName(nickName);
    setInvitationCode(invitationCode);
  };

  const queryString = (name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    console.log(window.location.hash.split("?")[1].substr(0))
    var r = window.location.hash.split("?")[1].substr(0).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  };

  return (
    <div className={styles.openPage}>
      <div className={styles.backgroundVedioBlock}>
        <img className={styles.background} src={BackGround} />
      </div>

      <div className={styles.headBlock}>
        <div className={styles.logoBlock}>
          <img className={styles.logo} src={LogoImg} />
        </div>
        <div className={styles.logoTextBlock}>
          <img className={styles.logoText} src={LogoTextImg} />
        </div>
      </div>

      <div className={styles.bodyBlock}>
        <div className={`${styles.trophyBlock}  ${styles.hot_1}`}>
          <img className={`${styles.trophy}` } src={TrophyImg} />
        </div>
        <div className={`${styles.dollBlock}  ` }>
          <img className={`${styles.doll}  ${styles.hot_2}`  } src={DollImg} />
        </div>
        <div className={styles.dialogBlock}>
          <img className={styles.dialog} src={DialogImg} />
          <div className={styles.dialogTextBlock}>
            <span className={styles.dialogName}>{nickName} </span>
            <span className={styles.dialogText}>invite you to battle in </span>
            <span className={styles.dialogGameName}>
              { gameName}
            </span>
            <span className={styles.dialogGameName}>!</span>
          </div>
        </div>
      </div>

      <div className={styles.bottomBlock}>
        <div className={styles.bottomAir}></div>
        <div className={`${styles.view}`}>
          <img
            onClick={() => {
              copyText('down');
            }}
            src={ButtonImg}
            className={styles.bottomButton}
          />
        </div>


        <div
          onClick={() => {
            copyText('go');
          }}
          className={styles.buttonWakeUpBlock}
        >
          <img src={ButtonWakeUp} className={styles.buttonWakeUp} />
          <div className={styles.buttonWakeUpText}>
            I’ve installed Punch Games. Let’s go!
          </div>
        </div>
      </div>
    </div>
  );
};

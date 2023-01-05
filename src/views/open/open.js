import React, { useEffect, useState } from "react";

import styles from "./open.module.scss";

import LogoImg from "../../assets/image/home/logo.png";
import LogoTextImg from "../../assets/image/home/logoText.png";

import GameApp from "../../assets/image/home/gameApp.png";
import GameText from "../../assets/image/home/text2.png";
import GameButton from "../../assets/image/home/goGameButton.png";

import AnDown from "../../assets/image/open/android-en.png"
import IosDown from "../../assets/image/open/ios-en.png"

export const OpenView = () => {
  const [type, setType] = useState();
  const [url, setUrl] = useState();

  const [rouse,setRouse] = useState(false);

  useEffect(() => {
    judgePhoneType();
  });

  const judgePhoneType = () => {
    const ua = navigator.userAgent || "";
    let isAndroid = ua.indexOf("Android") > -1 || ua.indexOf("Adr") > -1; //android终端
    let isIOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    let isHuawei = (ua.indexOf("huawei") > -1) || (ua.indexOf("Huawei") > -1); //huawei
    console.log(isAndroid);
    console.log(isIOS);
    let url = "";
    let type = "";
    if (isAndroid && !isHuawei) {
      url = "https://play.google.com/store/apps/details?id=com.start.punch&pli=1";
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

  const goApp = () =>{
      if (type === "android" && type !== "huawei") {
        let url = `punch://wakeup.punch.xyz`;
        window.location.href = url;
        setRouse(true)
      } else if (type === "ios") {
        let url = `punch://wakeup.punch.xyz`;
        window.location.href = url;
        setRouse(true)
      }
    }

    const downApp = () =>{
      if(type==='ios'){
        window.location.href = 'https://apps.apple.com/us/app/punch-games/id6443616962'
      }
      if(type ==='android' && type !== 'huawei'){
        window.location.href = 'https://play.google.com/store/apps/details?id=com.start.punch&pli=1'
      }
      if(type === 'huawei'){
        window.location.href = 'https://appgallery.huawei.com/app/C107212619'
      }
    }

  return (
    <div className={styles.openPage}>
      <div className={styles.backgroundVedioBlock}>
        <video
          className={`${styles.video} `}
          autoPlay
          preload="auto"
          controlsList="nodownload"
          loop="loop"
          muted
          playsInline
          data-wf-ignore="true"
          data-object-fit="cover"
        >
          <source
            src="./punch_background.mp4"
            type="video/mp4"
            data-wf-ignore="true"
          />
          您的浏览器不支持 video 标签。
        </video>
      </div>
      <div className={styles.headBlock}>
        <div className={styles.headLeft}>
          <div className={styles.logoBlock}>
            <img className={styles.logoImg} src={LogoImg} alt="logo" />
          </div>
          <div className={styles.logoTextBlock}>
            <img
              className={styles.logoTextImg}
              src={LogoTextImg}
              alt="logoText"
            />
          </div>
        </div>
        <div onClick={()=>{downApp()}} className={styles.headRight}>Download</div>
      </div>

      <div className={styles.bodyBlock}>
        <div className={styles.gameImgBlock}>
          <img className={styles.gameImg} src={GameApp} alt="gameApp" />
        </div>
        <div className={styles.GameTextBlock}>
        <div className={styles.GameTitle}>
            Congratulations !
          </div>
          <div className={styles.GameText}>
            You have successfully sign up. Next Gen Web 3.0 Gaming Platform.
          </div>
        </div>
      </div>

      <div className={styles.bottomBlock}>
        <div className={styles.openButtonBlock}>
          {rouse?( <img  onClick={()=>{downApp()}} className={styles.openButton} src={type==='ios'?IosDown:AnDown} alt="button" />):( <img  onClick={()=>{goApp()}} className={styles.openButton} src={GameButton} alt="button" />)}
         
        </div>
      </div>
    </div>
  );
};

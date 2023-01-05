import React, { useEffect, useState } from "react";

import styles from "./undertake.module.scss";

import BackGround from "../../assets/image/invitation/100002.png";

import LogoImg from "../../assets/image/invitation/100004.png";
import LogoTextImg from "../../assets/image/invitation/100006.png";

import TrophyImg from "../../assets/image/invitation/100001.png";
import DollImg from "../../assets/image/invitation/100005.png";

import { getLink } from "../../api/undertake";

export const UndertakeView = () => {

  const init = () => {
    let location = window.location;
    let search = location.hash.split("?s=");
    console.log(search[1]);
    getGoUrl(search[1]);
  };

  const getGoUrl = async (data) => {
    let query = {
      shortUrl: data,
    };

    let info = await getLink(query);
    if(info.code === 200 && info.data != ''){
        window.location.href = info.data
    }else{
        alert(info.msg)
    }
  };

  useEffect(() => {
    init();
  });

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
        <div className={styles.trophyBlock}>
          <img className={styles.trophy} src={TrophyImg} />
        </div>
        <div className={styles.dollBlock}>
          <img className={styles.doll} src={DollImg} />
        </div>
      </div>
    </div>
  );
};

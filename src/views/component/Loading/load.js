import React, { useEffect, useRef, useState } from "react";
import lottie from "lottie-web";

const Animation = (props) => {
  const { renderer, loop, path, canvasStyle } = props;

  const lottieRef = useRef(null);
  const [, setLottie] = useState(null);
  const [, setSpeed] = useState(null);
  useEffect(() => {
    const lot =  lottie.loadAnimation({
      container: lottieRef.current,
      // 渲染方式
      renderer,
      // autoplay 自动播放
      // 是否循环播放
      loop,
      // 路径
      path,
    })
    lot.play()
    lot.setSpeed(0.3)
  }, []);
  return (
    <div>
      <div ref={lottieRef} className="lottie" style={canvasStyle}></div>
    </div>
  );
};
export default Animation;

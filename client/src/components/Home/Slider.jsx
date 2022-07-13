import { useEffect, useState } from "react";
import s from "../Styles/Slider.module.css";

export default function Slider() {
  let imgs = [
    "https://www.fullh4rd.com.ar/adminrgb/img/banner/117.png",
    "https://www.fullh4rd.com.ar/adminrgb/img/banner/118.png",
    "https://www.fullh4rd.com.ar/adminrgb/img/banner/101.png",
    "https://www.fullh4rd.com.ar/adminrgb/img/banner/114.png",
    "https://www.fullh4rd.com.ar/adminrgb/img/banner/69.png",
    "https://www.fullh4rd.com.ar/adminrgb/img/banner/74.png",

  ];
  let [restart, setRestart] = useState(0);

  function timeLapse () {
   for(let i = 0; i < 20; i++) {
    setTimeout(() => {
     if(restart === imgs.length - 1) {
      setRestart(0);
     } else {
      setRestart(restart + 1);
     }
    }, 3000) 
   }
  }
  timeLapse()

  return (
    <div className={s.slider}>
      {/* <div className="img"> */}
      <img
        src={imgs[restart]}
        alt=""
      />

      {/* </div> */}
      {/* <ul>
        <li>
          <img
            src="https://i.pinimg.com/originals/2e/8c/c8/2e8cc8d8577a27b2829b75269dda0f29.jpg"
            alt=""
          />
        </li>
        <li>
          <img
            src="https://i.pinimg.com/originals/20/f5/35/20f535c616bbe807a1166e5661b396fd.jpg"
            alt=""
          />
        </li>
        <li>
          <img src="https://wallpapercave.com/wp/wp4585047.jpg" alt="" />
        </li>
        <li>
          <img
            src="https://cutewallpaper.org/21/gaming-setup-wallpaper/1920x1080-Gaming-Setup-Gaming-Setups-Wallbang-.jpg"
            alt=""
          />
        </li>
      </ul> */}
    </div>
  );
}

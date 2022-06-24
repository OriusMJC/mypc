import { useEffect, useState } from "react";
import s from "../Styles/Slider.module.css";

export default function Slider() {
  let imgs = [
    "https://i.pinimg.com/originals/2e/8c/c8/2e8cc8d8577a27b2829b75269dda0f29.jpg",
    "https://i.pinimg.com/originals/20/f5/35/20f535c616bbe807a1166e5661b396fd.jpg",
    "https://wallpapercave.com/wp/wp4585047.jpg",
    "https://cutewallpaper.org/21/gaming-setup-wallpaper/1920x1080-Gaming-Setup-Gaming-Setups-Wallbang-.jpg",
  ];
  let [restart, setRestart] = useState(0);

  async function timeLapse () {
   for(let i = 0; i < 20; i++) {
    await setTimeout(() => {
     if(restart === imgs.length - 1) {
      setRestart(0);
     } else {
      setRestart(restart + 1);
     }
    }, 2000) 
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

import style from './Controls.module.css';
import {useEffect } from 'react';

export default function Controls({handleMoveRight,handleMoveLeft,handleMoveUp,volume,setVolume}){

    
  const volumeIncrease = () =>{
    if(volume<100)
      setVolume(prev=>prev+10);
  }

  const volumeDecrease = () =>{
    if(volume>0)
      setVolume(prev=>prev-10);
  }

  useEffect(() => {
    const handleKey = (event) => {
      switch (event.key) {
        case 'ArrowUp':
          handleMoveUp();
          break;
        case 'ArrowLeft':
          handleMoveLeft();
          break;
        case 'ArrowRight':
          handleMoveRight();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
    };
  }, [handleMoveUp, handleMoveLeft, handleMoveRight]);


    return(
        <div className={style["controls"]}>
        <h2 className={style["controls-title"]}>GAME CONTROLS</h2>

        <div className={style["dpad"]}>
          <div></div>
          <button className={style["btn"]} onClick={handleMoveUp}>↑</button>
          <div></div>
          <button className={style["btn"]} onClick={handleMoveLeft}>←</button>
          <div></div>
          <button className={style["btn"]} onClick={handleMoveRight}>→</button>
          <div></div>
          <button className={style["btn"]}>↓</button>
        </div>

        <h3 className={style["volume-title"]}>Volume Control</h3>
        <div className={style["volume-buttons"]}>
          <button className={style["btn"]} onClick={volumeIncrease}>🔈+</button>
          <button className={style["btn"]} onClick={()=>setVolume(0)}>🔇</button>
          <button className={style["btn"]} onClick={volumeDecrease}>🔊-</button>
        </div>

        <div className={style["volume-bar"]}>
          <div className={style["volume-level"]} style={{width: volume+'%'}}></div>
        </div>
      </div>
    )
}
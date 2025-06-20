import style from './GameScreen.module.css';
import mario from '../../assets/mario.png';
import landscape from '../../assets/landscape.png';
import flag from '../../assets/flag.png';
import object from '../../assets/image (4).png';
import gameOverImg from '../../assets/image (1).png';

export default function GameScreen({powerOn,marioPosition,gameWon,handleStart,handleStop,handleReplay,gameOver,isJumping}){

    return(
        <div className={style["screen"]}>
        <div className={style["screen-content"]}>
        {(!gameWon && !gameOver) &&
          <>
            <img src={mario} alt='mario' className={style["mario-large"]}/>
            <h1 className={style["screen-title"]}>SUPER MARIO BROS</h1>
          </>}
          {!powerOn ? (
            <>
              <p className={style["screen-subtitle"]}>PRESS START TO PLAY</p>
            </>
          ) : (
            <div className={style["mario-world"]}>
              {[...Array(10)].map((_, idx) => (
                <div key={idx} className={style['world-tile']}>
                  {idx == 3 && <img src={object} alt='obj' className={style['object']}/>}
                  {idx==5 &&  <img src={object} alt='obj' className={style['object']}/>}
                  {idx==7 &&  <img src={object} alt='obj' className={style['object']}/>}
                  {idx == 9 && <img src={flag} alt='flag' className={style["flag"]}/>}
                </div>
              ))}

              <img src={mario} alt='mario' 
              className={style["mario-mini"]}
              style={{
                transform: `translate(${marioPosition}px, ${isJumping ? '-40px' : '24px'})`,
                transition: 'transform 0.3s ease'
              }}/>

            </div>
          )}
          <img src={landscape} className={style['land-scape']}/>
        </div>

        {gameWon && (
            <div className={style["game-success"]}>
              <p>You reached the flag! 🎉</p>
              <button className={style["btn"]} onClick={handleReplay}>Replay</button>
            </div>
          )}
          {gameOver && (
            <div className={style["game-over"]}>
              <img src={gameOverImg} className={style['game-over-img']}/>
              <button className={style["btn"]} onClick={handleReplay}>Replay</button>
            </div>
          )
          }

        <div className={style["button-row"]}>
          <button className={style["start-btn"]} onClick={handleStart}>START</button>
          <button className={style["power-btn"]}>POWER</button>
          <button className={style["stop-btn"]} onClick={handleStop}>STOP</button>
        </div>
      </div>
    )
}
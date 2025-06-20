import React from "react";
import style from "./Mario.module.css";
import song from '../../assets/Ratata.mp3';
import { useState,useRef,useEffect,useCallback } from "react";
import Controls from "../../components/Controls/Controls";
import GameScreen from "../../components/GameScreen/GameScreen";

export default function Mario() {

  const [powerOn, setPowerOn] = useState(false);
  const [marioPosition, setMarioPosition] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [gameOver,setGameOver] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [volume,setVolume] = useState(60);
  const audioRef = useRef(null);

  useEffect(()=>{
    if (audioRef.current) {
      audioRef.current.volume = volume/100;
    }
  },[volume])

  useEffect(()=>{
    setTimeout(()=>{
      console.log(marioPosition);
      console.log(isJumping);
      console.log(marioPosition == 190 && !isJumping);
      if(marioPosition == 190 && !isJumping)
      {
        setGameOver(true);
      }
    },500)
  },[marioPosition])

  const handleMoveRight = useCallback(() => {
    if (!powerOn || gameWon || gameOver) return;
    setMarioPosition((prev) => {
      const next = prev + 38;
      if (next >= 342) setGameWon(true);
      if( next == 190 && !isJumping) setGameOver(true);
      return next;
    });
  },[powerOn,gameWon,gameOver,isJumping]);

  const handleMoveLeft = useCallback(() => {
    if (!powerOn || gameWon || gameOver) return;
    setMarioPosition((prev) => {
      const next = prev - 38;
      if( next == 190 && !isJumping) setGameOver(true);
      if(prev == 0)
        return prev;
      return next;
    });
  },[powerOn,gameWon,gameOver,isJumping]);

  const handleMoveUp = useCallback(() => {
    if (!powerOn || gameWon || isJumping || gameOver) return;
  
    setIsJumping(true);
  
    setTimeout(() => {
      setIsJumping(false);
      setMarioPosition((prev) => {
        if (prev === 190) {
          setGameOver(true);
        }
        return prev;
      });
  
    }, 500);
  },[powerOn,gameWon,gameOver,isJumping]);

  const handleStart = useCallback(() => {
    setPowerOn(true);
    setMarioPosition(0);
    setGameOver(false);
    setGameWon(false);
    audioRef.current.play();
  },[]);

  const handleStop = useCallback(() =>{
    setPowerOn(false);
    setGameWon(false);
    audioRef.current.currentTime = 0;
    audioRef.current.pause();
  },[]);

  const handleReplay = useCallback(() => {
    setMarioPosition(0);
    setGameOver(false);
    setGameWon(false);
  },[]);
  return (
    <div className={style["container"]}>
      <div className={style["game-box"]}>
        <Controls handleMoveRight={handleMoveRight} handleMoveLeft={handleMoveLeft} handleMoveUp={handleMoveUp} volume={volume} setVolume={setVolume}/>

        <GameScreen powerOn={powerOn} marioPosition={marioPosition} gameWon={gameWon} handleStart={handleStart} handleStop={handleStop} handleReplay={handleReplay} gameOver={gameOver} isJumping={isJumping}/>

      </div>
      <audio ref={audioRef} src={song} loop/>
    </div>
  );
}

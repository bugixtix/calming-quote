'use client'
import {Card, CardBody, Button, Progress, CardProps} from "@heroui/react";
import {useState, FC, useEffect, useRef} from "react";
import {clsx} from "@heroui/shared-utils";
import { MdOutlinePauseCircleOutline as PauseOl} from "react-icons/md";
import { MdOutlinePauseCircleFilled as PauseFi } from "react-icons/md";
import { MdOutlinePlayCircleFilled as PlayFi} from "react-icons/md";
import { MdPlayCircleOutline as PlayOl } from "react-icons/md";
import Image from "next/image";
import Lofi from '@/public/lofi.jpg'
// import { ProgressBar } from "react-bootstrap";
// import lofi from '@/public/mp3/good_night_lofi.mp3'
// const lofi = require('@/public/mp3/good_night_lofi.mp3')
import useSound from 'use-sound'
import { audio } from "motion/react-client";
// import url from '@/public/mp3/good_night_lofi.mp3'
// import { audio } from "motion/react-client";

export const MusicPlayer = () =>{
    const pfad = '/mp3/good_night_lofi.mp3'
    const [currentTime, setCurrentTime] = useState(0)
    const soundRef = useRef()

    
    useEffect(()=>{
        soundRef.current = new Audio(pfad)
    },[])
    const HandleSound =()=>{
        soundRef.current.play()
    }
    const updateTime = () =>{
    
    }
   return(
    <div className="MusicPlayer">
        <div className="MusicPlayerBody">
            <div className="player--img">
                <Image src={Lofi} className="image"/>
                {/* <span>img here</span> */}
            </div>
            <div className="player--content">
                <div className="player--info">
                    <h2> Unknown Track </h2>
                    {/* <p>Author</p> */}
                </div>
                <div className="player--options">
                    <ProgressBar currentValue={50}/>
                    <div className="audio--length">
                        <p className="start-value">02:02</p>
                        <p className="final-value">04:04</p>
                    </div>
                </div>
            </div>
            
            <div className="player--button">
                <button className="play-button" onClick={HandleSound}>
                    <PlayOl className="play-icon"/>
                </button>
            </div>
        </div>

    </div>
   )
}


const ProgressBar = ({ currentValue, maxValue = 100 }) => {
  return (
    <div className="progressbar">
      <div
        className="progressbar-child"
        style={{ width: `${(currentValue / maxValue) * 100}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;

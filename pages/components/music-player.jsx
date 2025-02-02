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
import MP3_DATA from '@/pages/mp3_list.json'

export const MusicPlayer = () =>{
    // const pfad = '/mp3/good_night_lofi.mp3'
    const [track, setTrack] = useState(MP3_DATA[1])
    const [playing, setPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [maxTime, setMaxTime] = useState(0)
    const soundRef = useRef()

    
    useEffect(()=>{
        soundRef.current = new Audio(track.track_url)
        // new code from chatgpt
        const audio = soundRef.current;
        const updateTime=()=>setCurrentTime(audio.currentTime.toFixed())
        const updateDuration=()=>setMaxTime(audio.duration.toFixed())
        const updatePath=()=>setTrack(MP3_DATA[2])
        
        audio.addEventListener("timeupdate", updateTime)
        audio.addEventListener("loadedmetadata", updateDuration)
        audio.addEventListener("ended", updatePath)

        return()=> {
            audio.removeEventListener("timeupdate", updateTime)
            audio.removeEventListener("loadedmetadata", updateDuration)
            audio.removeEventListener("ended", updatePath)
        }
        // 
    },[track])
    const HandleSound =()=>{
        if(!playing) 
        {soundRef.current.play()
         setPlaying(true)
        }else{
            soundRef.current.pause()
            setPlaying(false)
        }
        console.log(soundRef.current.duration)
    }
    const updateTime = () =>{
    }
    const formatTime = seconds =>{
        let mins = 0
        let secs = 0
        if(!isNaN(seconds)){
            mins = Math.floor(seconds/60).toString().padStart(2,'0');
            secs = (seconds%60).toString().padStart(2,'0')
        }else{
            mins = '01'
            secs = '00'
        }
        return `${mins}:${secs}`
    }
   return(
    <div className="MusicPlayer">
        <div className="MusicPlayerBody">
            <div className="player--img">
                <Image src={track.track_cover || '/lofi.jpg'} width={100} height={100} className="image"/>
                {/* <span>img here</span> */}
            </div>
            <div className="player--content">
                <div className="player--info">
                    <h2> {track?.track_name || "Unknown Track"} </h2>
                    {/* <p>Author</p> */}
                </div>
                <div className="player--options">
                    <ProgressBar currentValue={currentTime} maxValue={soundRef.current?.duration||1}/>
                    <div className="audio--length">
                        <p className="start-value">{formatTime(currentTime)}</p>
                        <p className="final-value">{formatTime(maxTime)}</p>
                    </div>
                </div>
            </div>
            
            <div className="player--button">
                <button className="play-button" onClick={HandleSound}>
                {
                    playing ? <PauseOl className="play-icon"/> :  <PlayOl className="play-icon"/>
                }
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

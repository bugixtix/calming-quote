'use client'
// import {Card, CardBody, Button, Progress, CardProps} from "@heroui/react";
import {useState, FC, useEffect, useRef, useMemo} from "react";
// import {clsx} from "@heroui/shared-utils";
import { MdOutlinePauseCircleOutline as PauseOl} from "react-icons/md";
// import { MdOutlinePauseCircleFilled as PauseFi } from "react-icons/md";
// import { MdOutlinePlayCircleFilled as PlayFi} from "react-icons/md";
import { MdPlayCircleOutline as PlayOl } from "react-icons/md";
import Image from "next/image";
// import Lofi from '@/public/lofi.jpg'
import MP3_DATA from '@/pages/mp3_list.json'
// import shuffledMP3 from "./shuffle.js";

export const MusicPlayer = () =>{

    function shuffledMP3(){
        const array = MP3_DATA.sort(() => Math.random() - 0.5);
        return array
    }

    const [trackNr, setTrackNr] = useState(0)
    const [track, setTrack] = useState([
        {track_name:"out",
        track_cover:"/covers/lofi_girl_dreams.svg",
        track_author:"FASSounds",
        track_url:"/mp3/test1.mp3"}
    ])
    const soundRef = useRef()
    const [playing, setPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [maxTime, setMaxTime] = useState(0)
    const [ended, setEnded] = useState(false)
    const [started, setStarted] = useState(false)
    
    useEffect(()=>{
        const array = shuffledMP3()
        setTrack(array)
        function handleStart(){
            setStarted(true)
            document.body.removeEventListener("click", handleStart)
        }
        // document.querySelector('.body').addEventListener('click',handleStart )
        document.body.addEventListener("click", handleStart, { once: true });
        return ()=> {document.body.removeEventListener('click', handleStart)}
    },[])
    useEffect(()=>{
        function Do(){
            soundRef.current.play()
            setPlaying(true)
            setStarted(false)
        }
        if(started){
            setTimeout(Do, 1000)}
        return ()=>{
            clearTimeout(Do, 1000)
        }
    },[started])
    
    useEffect(()=>{

        if(track[trackNr].track_name.toString() !== 'out'){

            soundRef.current = new Audio(track[trackNr].track_url.toString())
            const audio = soundRef.current;

            const updateTime=()=>setCurrentTime(audio.currentTime.toFixed())
            const updateDuration=()=>setMaxTime(audio.duration.toFixed())
            const updatePath=()=>{DoNextAudio()}
            
            audio.addEventListener("timeupdate", updateTime)
            audio.addEventListener("loadedmetadata", updateDuration)
            audio.addEventListener("ended", updatePath)
            
            if(ended){
                setTimeout(()=>{
                    soundRef.current.play()
                    setEnded(false)
            }, 1000)}
            
        return()=> {
            audio.removeEventListener("timeupdate", updateTime)
            audio.removeEventListener("loadedmetadata", updateDuration)
            audio.removeEventListener("ended", updatePath)
        }
    }
        // 
    },[trackNr,track])


    const HandleSound =()=>{
        if(!playing) 
        {soundRef.current.play()
         setPlaying(true)
        }else{
            soundRef.current.pause()
            setPlaying(false)
        }
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
    function DoNextAudio(){
        setTrackNr(p=>p!==MP3_DATA.length-1 ? p=p+1 : p=0);
        setCurrentTime(0)
        setMaxTime(0)
        setEnded(true)
    }
    function HandleClick(){
        setTrackNr(p=>p!==MP3_DATA.length-1 ? p=p+1 : p=0);
        setCurrentTime(0)
        setMaxTime(0)
    }   
    
   return(
    <div className="MusicPlayer">
        <div className="MusicPlayerBody">
            <div className="player--img">
                <Image priority alt="track image" src={track[trackNr].track_cover.toString() || '/lofi.jpg'} width={100} height={100} className="image"/>
            </div>
            <div className="player--content">
                <div className="player--info">
                    <h2> {track[trackNr].track_name.toString() || "Unknown Track"} </h2>
                    <span>{track[trackNr].track_author.toString() || "Unknown Author"}</span>
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
                {/* <button onClick={HandleClick}> click</button> */}
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

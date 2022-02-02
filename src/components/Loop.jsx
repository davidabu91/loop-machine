import React, {useEffect, useState, useRef} from 'react';
import styled from 'styled-components';
import {BsVolumeUpFill} from 'react-icons/bs';
import {BiVolumeMute} from 'react-icons/bi';

function Loop({ name, color, path, isLoop, playAudio}) {

    const [isMute, setIsMute] = useState(false);
    
    const audioPlayer = useRef();

    useEffect(()=>{
        playAudio ? audioPlayer.current.play() : stopAndGoStart();
    },[playAudio])

    const stopAndGoStart = () => {
        audioPlayer.current.pause();
        audioPlayer.current.currentTime = 0;
    }

    const toggleMute = () => {
        setIsMute(!isMute);
    }

    return  <Item color={color}>
        <p>{name}</p>
        <audio src={path} muted={isMute}  ref={audioPlayer} loop={isLoop} ></audio>
        <MuteIcon onClick={toggleMute}>{!isMute ? <BsVolumeUpFill/> : <BiVolumeMute/>}</MuteIcon>
    </Item>;
}


const Item = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 8px 24px;
    height: 3rem;
    background: ${props => props.color};
    margin-bottom: 15px;
    color: #140303;
    border-top-left-radius: 5px;
    border-bottom-right-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    font-size: 16px;
    align-items: center;
    letter-spacing: 1.5px;
    font-weight: bolder;
    
`

const MuteIcon = styled.button`
    font-size: 23px;
    color: #191970;
    border: none;
    background: none;
    cursor: pointer;
`

export default Loop;

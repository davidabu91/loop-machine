import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { GlobalStyle } from './styles.js'
import Loop from './components/Loop';
import Slider from './components/Slider';
import { loops } from './LoopFiles/index.js';
import { FaPlay, FaStop } from 'react-icons/fa';
import { ImLoop2 } from 'react-icons/im';



function App() {

  const [playAudio, setPlayAudio] = useState(false);
  const [isLoop, setIsLoop] = useState(false);

  const playButton = useRef();
  const stopButton = useRef();
  const loopButton = useRef();


  useEffect(() => {
    playAudio ? playButton.current.style.color = "red" : playButton.current.style.color = "white" 
    isLoop ? loopButton.current.style.color = "red" : loopButton.current.style.color = "white"
  }, [playAudio, isLoop])
  

  return (
    <>
      <GlobalStyle />
      <Layout >
        <h1>Loop Machine</h1>
        <Slider playAudio={playAudio} isLoop={isLoop} setPlayAudio={setPlayAudio} />

        <ChanelsContainer>
          {loops.map((loop, index) => {
            return <Loop path={loop.path} color={loop.color} name={loop.name} key={index} playAudio={playAudio} isLoop={isLoop} />
          })}
        </ChanelsContainer>
        <ButtomsContainer>
          <Button onClick={() => setPlayAudio(true)} ref={playButton}><FaPlay /></Button>
          <Button onClick={() => setPlayAudio(false)} ref={stopButton}><FaStop /></Button>
          <Button onClick={() => setIsLoop(!isLoop)} ref={loopButton} ><ImLoop2 /></Button>
        </ButtomsContainer>
      </Layout>
    </>
  );
}

const ChanelsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 250px;
`
const ButtomsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    width: 150px;
`
const Layout = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 35px;
`
const Button = styled.button`
    font-size: 20px;
    color: white;
    border: none;
    background: none;
    cursor: pointer;
`


export default App;

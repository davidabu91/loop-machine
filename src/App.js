import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { GlobalStyle } from './styles.js'
import Loop from './components/Loop';
import Slider from './components/Slider';
import { loops } from './LoopFiles/index.js';
import { FaPlay, FaStop } from 'react-icons/fa';
import { ImLoop2 } from 'react-icons/im';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';



function App() {

  const [playAudio, setPlayAudio] = useState(false);
  const [isLoop, setIsLoop] = useState(false);

  const playButton = useRef();
  const loopButton = useRef();


  useEffect(() => {
    playAudio ? playButton.current.style.color = "red" : playButton.current.style.color = "white"
    isLoop ? loopButton.current.style.color = "red" : loopButton.current.style.color = "white"
  }, [playAudio, isLoop])

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(sections);
    const [reorderIndex] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderIndex);

    setSectios(items);
  }

  const header = { element: <Slider playAudio={playAudio} isLoop={isLoop} setPlayAudio={setPlayAudio} />, id: "slider" }
  const chanels = {
    element: <ChanelsContainer>{loops.map((loop, index) => {
      return <Loop path={loop.path} color={loop.color} name={loop.name} key={index} playAudio={playAudio} isLoop={isLoop} />
    })} </ChanelsContainer>, id: "chanels"
  }
  const buttons = {
    element: <ButtomsContainer>
      <Button onClick={() => setPlayAudio(true)} ref={playButton}><FaPlay /></Button>
      <Button onClick={() => setPlayAudio(false)}><FaStop /></Button>
      <Button onClick={() => setIsLoop(!isLoop)} ref={loopButton} ><ImLoop2 /></Button>
    </ButtomsContainer>, id: "buttons"
  }

  const [sections, setSectios] = useState([header, chanels, buttons]);




  return (
    <>
      <GlobalStyle />
      <Layout >
        <h1>Loop Machine</h1>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId='drop-slider'>
            {(provider) => (
              <div className="slider-container" {...provider.droppableProps} ref={provider.innerRef}>

                {sections.map((item, index) => {
                  return (
                    <Draggable draggableId={item.id} key={item.id} index={index}>
                      {(provider) => (
                        <div ref={provider.innerRef} {...provider.draggableProps} {...provider.dragHandleProps}>
                          {item.element}
                        </div>
                      )}

                    </Draggable>
                  )
                })}

                {provider.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

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
    margin-left: 45px;
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

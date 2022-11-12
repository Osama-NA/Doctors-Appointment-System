import React from 'react'
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const SuccessMessage = ({setShow, message}) => {
  return (
    <Wrapper>
        <CloseOverlay
            onClick={() => setShow(false)}
        ></CloseOverlay>
        
        <Container>
            <p>{message}</p>
            <div className='close-btn' onClick={() => setShow(false)}>
                <FontAwesomeIcon icon={faXmark} />
            </div>
        </Container>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  place-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 0 2rem;
  background-color: rgb(8, 25, 51, .4);
  z-index: 1000;

  @media (max-width: 460px) {
    padding: 0 1rem;
  }
`
const CloseOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 500px;
  background-color: #fff;
  border-radius: 17.5px;
  z-index: 2;
  overflow: hidden;

  p{
    font-size: 16px;
    line-height: 26px;
    font-weight: 600;
    padding-right: 1.5rem;
    padding: 1.25rem 1.75rem;
  }
  .close-btn{
    cursor: pointer;
    display: grid;
    place-items: center;
    background-color: #2d59eb;
    border-radius: 17.5px;
    transition: all .2s ease;

    padding: 1.25rem 1.75rem;

    svg{
        color: #fff;
        padding: 0;
        margin: 0;
        font-size: 20px;
    }

    &:hover{
        background-color: #2248c5;
    }
  }

  @media (max-width: 660px) {
    max-width: 435px;
    border-radius: 15px;
  
    p{
      font-size: 14px;
      line-height: 24px;
      padding-right: 1.25rem;
      padding: 1rem 1.5rem;
    }
    .close-btn{
      border-radius: 15px;
  
      padding: 1rem 1.5rem;
  
      svg{
          font-size: 18px;
      }
    }
  }

  @media (max-width: 460px) {
    max-width: 375px;
    border-radius: 12.5px;
  
    p{
      font-size: 12px;
      line-height: 22px;
      padding-right: 1.25rem;
      padding: .75rem 1.25rem;
    }
    .close-btn{
      border-radius: 12.5px;
  
      padding: .75rem 1.25rem;
  
      svg{
          font-size: 16px;
      }
    }
  }
`

export default SuccessMessage
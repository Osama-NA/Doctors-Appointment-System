import React from 'react'
import styled from "styled-components";
import Img from '../../../assets/img/dashboard/profile-img.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const Booking = () => {
  return (
    <Wrapper>
        <img src={Img} alt='' />
        <div className="info">
            <h3>Kamala Emmanuelle</h3>
            <p>03/02/2022 | 12:00 PM</p>
        </div>
        <div className="confirm-btn">
          <FontAwesomeIcon icon={faCheck} />
        </div>
    </Wrapper>
  )
}

export default Booking

const Wrapper = styled.div`
width: 100%;
display: flex;
flex-direction: row;
align-items: center;
margin-top: 1rem;

img{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 1rem;
  object-fit: contain;
}
.info{
  width: 100%;
  display: flex;
  flex-direction: column;
  h3{
    font-size: 18px;
  }
  p{
    padding: .5rem 0;
    line-height: 0;
    color: #808080;
  }
}
.confirm-btn{
  display: grid;
  place-items: center;
  cursor: pointer;
  justify-self: flex-end;
  width: 40px;
  min-width: 40px;
  height: 40px;
  background-color: #2d59eb;
  border-radius: 10px;
  transition: all .25s ease;

  svg{
    font-size: 16px;
    color: #fff;
  }

  &:hover{
    background-color: #2248c5;
  }
}

@media (max-width: 860px){
  margin-top: .75rem;

  img{
    width: 40px;
    height: 40px;
    margin-right: .75rem;
  }
  .info{
    h3{
      font-size: 14px;
    }
    p{
      font-size: 12px;
      padding: .35rem 0;
    }
  }
  .confirm-btn{
    width: 30px;
    min-width: 30px;
    height: 30px;
    border-radius: 7.5px;

    svg{
      font-size: 12px;
    }
  }
}
`;
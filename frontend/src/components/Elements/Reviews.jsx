import React from 'react'
import styled from "styled-components";
import Review from "./Review";

const Reviews = ({setShowReviews, name, reviews}) => {
  return (
    <Wrapper>
      <CloseOverlay
       onClick={() => setShowReviews(false)}
      ></CloseOverlay>
      
      <Container>
        <Header>
          <h1>{name}'s Reviews</h1>
          <button 
            className='font13'
            onClick={() => setShowReviews(false)}
          >close</button>
        </Header>

        <NumberOfReviews>
          <p>{reviews.length} reviews</p>
          <div></div>
        </NumberOfReviews>

        <ReviewsList>
          <Review
            name={name}
            reviewBy='Morgaine Uchenna'
            review={`The services that I receive from ${name} is excellent. 
            Dr. ${name} and the staff are friendly and ensure that I am 
            properly informed about my health and care. I would have no 
            qualms in recommending them to friendly and friends.`}
            rate={3}
          />
          <Review
            name={name}
            reviewBy='Ambrus Matthieu'
            review={`${name} did a great job with my first ever health exam. 
            She explained everything to me in a very clear manner. She was 
            also kind and friendly. All of the staff was great – they were 
            helpful, patient and helped with my insurance.`}
            rate={4}
          />
        </ReviewsList>
      </Container>
    </Wrapper>
  )
}

export default Reviews

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
  width: 100%;
  max-width: 600px;
  height: 650px;
  border-radius: 20px;
  background-color: #fff;
  padding: 2rem;
  z-index: 2;
  overflow: hidden;
  
  @media (max-width: 960px) {
    max-width: 550px;
    height: 600px;
  }
  @media (max-width: 660px) {
    max-width: 450px;
    height: 500px;
    padding: 1.6rem 1.75rem;
  }
  @media (max-width: 460px) {
    min-height: 500px;
    height: 100%;
    max-height: 550px;
    padding: 1.5rem;
  }
`

const Header = styled.header`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;

  h1{
    font-size: 22px;
    line-height: 30px;
  }
  button{
    cursor: pointer;
    outline: none;
    border: 1px solid #F95F5F;
    padding: 0 15px;
    height: 35px;
    color: #F95F5F;
    background: transparent;
    border-radius: 7.5px;
    letter-spacing: 1px;
    transition: all .2s ease-out;

    &:hover{
      background-color: #F95F5F;
      color: #fff;
    }
  }

  @media (max-width: 660px) {
    h1{
      font-size: 20px;
      line-height: 28px;
    }
    button{
      padding: 0 15px;
      height: 30px;
      border-radius: 7.5px;
    }
  }
  @media (max-width: 460px) {
    h1{
      font-size: 18px;
      line-height: 26px;
    }
    button{
      font-size: 11px;
      padding: 0 12.5px;
      height: 27.5px;
    }
  }
`

const NumberOfReviews = styled.div`
  display: flex;
  align-items: center;
  padding-top: 1.5rem;

  p{
    line-height: 0px;
    padding: 0 .5rem 0 0;
    font-size: 13px;
    min-width: 75px;
    color: #aaa;
  }
  div{
    height: 1px;
    width: 100%;
    background-color: #aaa;
  }
  
  @media (max-width: 960px) {
    padding-top: 1.25rem;
  }
  @media (max-width: 460px) {
    p{
      padding: 0 .5rem 0 0;
      font-size: 11px;
      min-width: 65px;
    }
  }
`

const ReviewsList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 500px;
  overflow-x: hidden;
  margin-top: 1.5rem;
  padding-right: .5rem;

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #bbb;
    border-radius: 4px;
  }
  
  @media (max-width: 960px) {
    margin-top: 1.25rem;
    height: 460px;
  }
  @media (max-width: 660px) {
    height: 375px;
  }
  @media (max-width: 460px) {
    min-height: 375px;
    height: 81.5%;
  }
`
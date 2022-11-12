import React from 'react'
import styled from "styled-components";
import ReviewStars from './ReviewStars'

const Review = ({name, reviewBy, rate, review}) => {
  return (
    <Wrapper>
      <ReviewHeader>
        <h3>{reviewBy}</h3>
        <ReviewStars rate={rate}/>
      </ReviewHeader>
      <p>{review}</p>
    </Wrapper>
  )
}

const Wrapper = styled.div`
    width: 100%;
    margin-bottom: 1.5rem;
    border-radius: 12.5px;
    padding: .75rem 1rem;
    background-color: rgb(0 124 255 / 10%);

    p{
        font-size: 13px;
        line-height: 21px;
        padding-top: .5rem;
    }

    &:nth-last-child(1){
      margin-bottom: 0;
    }

    @media (max-width: 660px) {
      margin-bottom: 1.25rem;
    }
    @media (max-width: 460px) {
      border-radius: 10px;
      padding: .6rem .85rem;

      p{
          font-size: 11px;
          line-height: 19px;
          padding-top: .25rem;
      }
    }
`

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;

  h3{
    font-size: 18px;
    line-height: 26px;
    font-weight: 600;
  }
  .review-stars{
    padding-top: .15rem;
  }
  @media (max-width: 460px) {
    h3{
      font-size: 16px;
      line-height: 24px;
    }
    .review-stars{
      padding-top: .1rem;
    }
  }
`

export default Review
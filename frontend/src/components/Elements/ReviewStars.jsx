import React from 'react'
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStarRegular} from '@fortawesome/free-regular-svg-icons'
import { faStar as faStarSolid} from '@fortawesome/free-solid-svg-icons'

const ReviewStars = ({rate}) => {
  return (
    <Wrapper className='review-stars'>
        <Star rate={rate} index={1} />
        <Star rate={rate} index={2} />
        <Star rate={rate} index={3} />
        <Star rate={rate} index={4} />
        <Star rate={rate} index={5} />
    </Wrapper>
  )
}

const Star = ({rate, index}) => {
    return <FontAwesomeIcon icon={rate >= index ? faStarSolid : faStarRegular} />
}

const Wrapper = styled.div`
    display: flex;
    
    svg{
        width: 13px;
        color: #FFBC3A;
        margin: 0 .1rem;
    }

    @media (max-width: 860px) {
        svg{
            width: 11px;
            margin: 0 .05rem;
        }
    }
`

export default ReviewStars
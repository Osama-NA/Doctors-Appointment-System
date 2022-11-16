import React from 'react'
import styled from "styled-components";

const Button = ({action, type, text}) => {
  return (
    <Wrapper
        className={type}
        onClick={action}
        type={type}
    >
        {text}
    </Wrapper>
  )
}

export default Button

const Wrapper = styled.button`
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    outline: none;
    border: none;
    padding: .75rem 1.5rem;
    border-radius: 7.5px;
    background-color: ${
        props => props.type === 'primary' ? '#2d59eb' : 
                    props.type === 'danger' ? '#F95F5F' : 
                    props.type === 'secondary' ? '#c2c2c2' : '#2d59eb'
    };
    transition: all .25s ease;

    &:hover{
        background-color: ${
            props => props.type === 'primary' ? '#2248c5' : 
                        props.type === 'danger' ? '#e65656' : 
                        props.type === 'secondary' ? '#afadad' : '#2248c5'
        };
    }
    
  @media (max-width: 860px){
    font-size: 12px;
    padding: .6rem 1.2rem;
    border-radius: 6px;
  }
`
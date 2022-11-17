import React, {useState} from "react";
import styled from "styled-components";
import Review from './Review'
import ConfirmTab from "../../Elements/ConfirmTab";

const Reviews = () => {
  const [showConfirmTab, setShowConfirmTab] = useState(false)

  return (
    <>
    <Wrapper>
      <h1>Reviews</h1>

      <Container>
        {true ? (
          <>
          <Review setShowConfirmTab={setShowConfirmTab} />
          <Review setShowConfirmTab={setShowConfirmTab} />
          <Review setShowConfirmTab={setShowConfirmTab} />
          <Review setShowConfirmTab={setShowConfirmTab} />
          </>
        ) : (
          <p className="no-results">You do not have any reviews yet</p>
        )}
      </Container>
    </Wrapper>

    {
      showConfirmTab &&
      <ConfirmTab 
        setShow={setShowConfirmTab}
        promptText='Are you sure you want to delete this review?'
        type='danger'
        cta='Delete'
        action={() => alert('delete')}
      />
    }
    </>
  );
};

export default Reviews;

const Wrapper = styled.div`
  h1 {
    text-align: center;
    font-size: 24px;
  }

  @media (max-width: 860px) {
    h1 {
      font-size: 18px;
    }
  }
`;
const Container = styled.div`
  width: 100%;
  max-width: 600px;
  min-height: 600px;
  background-color: #fff;
  padding: 1.5rem;
  margin: 0.75rem auto;
  border-radius: 10px;
  box-shadow: 0 10px 25px -15px #2525252e;

  .no-results {
    text-align: center;
  }

  @media (max-width: 860px) {
    max-width: 500px;
    padding: 1.25rem;
    margin: 0.25rem auto;

    .no-results {
      font-size: 12px;
    }
  }
`;
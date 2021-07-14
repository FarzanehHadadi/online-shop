import React from "react";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
const Stars = ({ stars, reviews }) => {
  console.log(stars);
  const tempStars = Array.from({ length: 5 }, (_, index) => {
    const number = index + 0.1;
    return (
      <span>
        {stars >= index + 1 ? (
          <BsStarFill />
        ) : stars >= number ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
    );
  });
  return (
    <Wrapper>
      <div data-tip={stars}>{tempStars}</div>
      <p>{reviews} reviews</p>
      <ReactTooltip />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`;
export default Stars;

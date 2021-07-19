import React from "react";
import styled from "styled-components";
import { PageHero, StripeCheckout } from "../components";
// extra imports
import { Link } from "react-router-dom";

const CheckoutPage = () => {
  return (
    <main>
      <PageHero title="checkout" />

      <Wrapper className="page">
        <div className="empty">
          <h1>please contant to administrator ....</h1>
          <Link to="/" className="btn">
            back to home
          </Link>
        </div>
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.div`
  .empty {
    padding: 3rem;
    text-align: center;
    margin: 2rem auto;
  }
  h1 {
    margin-bottom: 2rem;
  }
`;
export default CheckoutPage;

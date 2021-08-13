import React from "react";
import styled from "styled-components";
import { Filters, ProductList, Sort, PageHero } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { sortProducts, filterProducts } from "../redux/actions/filter_actions";
const ProductsPage = () => {
  const { products } = useSelector((state) => state.products_reducer);
  const { sort, filters } = useSelector((state) => state.filter_reducer);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(filterProducts);
    dispatch(sortProducts);
  }, [products, sort, filters]);
  return (
    <main>
      <PageHero title="Products" />
      <Wrapper className="page">
        <div className="section-center products">
          <Filters />
          <div>
            <Sort />
            <ProductList />
          </div>
        </div>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.div`
  .products {
    display: grid;
    gap: 3rem 1.5rem;
    margin: 4rem auto;
  }
  @media (min-width: 768px) {
    .products {
      grid-template-columns: 200px 1fr;
    }
  }
`;

export default ProductsPage;

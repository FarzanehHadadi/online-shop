import { React, lazy, Suspense, useEffect } from "react";
import styled from "styled-components";
import { Filters, Sort, PageHero } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { sortProducts, filterProducts } from "../redux/actions/filter_actions";
import Loading from "../components/Loading";
const ProductList = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("../components/ProductList")), 1000);
  });
});

const ProductsPage = () => {
  const { products } = useSelector((state) => state.products_reducer);
  const { sort, filters } = useSelector((state) => state.filter_reducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(filterProducts);
    dispatch(sortProducts);
  }, [products, sort, filters]);
  return (
    <main>
      <PageHero title="Products" />
      <Wrapper className="page">
        <div className="section-center products">
          <Filters />
          <Suspense fallback={<Loading />}>
            <div>
              <Sort />
              <ProductList />
            </div>
          </Suspense>
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

import Product from "@components/ecommerce/Product/Product";
import { Container } from "react-bootstrap";
import { Loading } from "@components/feedback";
import { GridList, Heading } from "@components/common";
import useProduct from "@hooks/useProduct";

const Products = () => {
  const { loading, error, recordFullInfo, paramsPrefix } = useProduct();

  return (
    <Container>
      <Heading title={`${paramsPrefix?.toUpperCase()} Products`} />
      <Loading loading={loading} error={error} type="product">
        <GridList
         emptyMessage="Your Products Is Empty"
          recoreds={recordFullInfo}
          returnItem={(record) => <Product {...record} />}
        />
      </Loading>
    </Container>
  );
};

export default Products;

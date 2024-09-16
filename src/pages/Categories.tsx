import Category from "@components/ecommerce/Category/Category";
import { Container } from "react-bootstrap";
import { Loading } from "@components/feedback";
import { GridList, Heading } from "@components/common";
import useCategories from "@hooks/useCategories";

const Categories = () => {
  const { recoreds, loading, error } = useCategories();

  return (
    <Container>
      <Heading title="Categories"></Heading>
      <Loading loading={loading} error={error} type="category">
        <GridList
          emptyMessage="Your Categories Is Empty"
          recoreds={recoreds}
          returnItem={(record) => <Category {...record} />}
        />
      </Loading>
    </Container>
  );
};

export default Categories;

import { LottieHandler } from "@components/feedback/lottieHandler/LottieHandler";
import { Col, Row } from "react-bootstrap";

type GridListProps<T> = {
  recoreds: T[];
  returnItem: (record: T) => React.ReactNode;
  emptyMessage: string;
};

type HasId = { id?: number };

const GridList = <T extends HasId>({
  recoreds,
  returnItem,
  emptyMessage,
}: GridListProps<T>) => {
  const categoryList =
    recoreds.length > 0 ? (
      recoreds.map((record) => {
        return (
          <Col
            xs={6}
            md={3}
            key={record.id}
            className="d-flex justify-content-center mb-5 mt-2"
          >
            {returnItem(record)}
          </Col>
        );
      })
    ) : (
      <LottieHandler type="shooping" message={emptyMessage} />
    );

  return <Row>{categoryList}</Row>;
};

export default GridList;

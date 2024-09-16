import { LottieHandler } from "@components/feedback/lottieHandler/LottieHandler";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <Container>
      <div className="d-flex flex-column align-items-center mt-5">
        <LottieHandler type="notFound" />
        <Link to="/" replace={true}>
          Back Home
        </Link>
      </div>
    </Container>
  );
};
export default ErrorPage;

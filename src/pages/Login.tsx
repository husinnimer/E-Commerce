import { Heading } from "@components/common";
import { Alert, Button, Col, Form, Row, Spinner } from "react-bootstrap";
import {
  signInScheema,
  TFormInputs,
} from "@components/validations/signInScheema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useSearchParams, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hook";
import actAuthLogin from "@store/auth/act/actAuthLogin";
import { useEffect } from "react";
import { reastUi } from "@store/auth/authSlice";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error, loading, accessToken } = useAppSelector((state) => state.auth);

  const [searchParam, setSearchParam] = useSearchParams();
  const [searchLogin, setSearchLogin] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormInputs>({
    mode: "onBlur",
    resolver: zodResolver(signInScheema),
  });
  const submitForm: SubmitHandler<TFormInputs> = (data) => {
    if (searchParam.get("message")) {
      setSearchParam("");
      setSearchLogin("");
    }
    dispatch(actAuthLogin(data))
      .unwrap()
      .then(() => navigate("/"));
  };

  useEffect(() => {
    return () => {
      dispatch(reastUi());
    };
  }, [dispatch]);

  if (accessToken) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Heading title="User Login" />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          {searchParam.get("message") === "account_created" && (
            <Alert variant="success">Your Acount Is Created Please Login</Alert>
          )}
          {searchLogin.get("message") === "login_required" && (
            <Alert variant="success">To Access This Page Please Login</Alert>
          )}
          <Form onSubmit={handleSubmit(submitForm)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="text"
                {...register("email")}
                isInvalid={!!errors.email?.message}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                {...register("password")}
                isInvalid={!!errors.password?.message}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="info" style={{ color: "white" }} type="submit">
              {loading === "pending" ? <Spinner size="sm" /> : "Submit"}
            </Button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </Form>
          <p className="mt-5">If You Dont Have Account Go To Register</p>
          <Button
            variant="info"
            style={{ color: "white" }}
            onClick={() => navigate("/register")}
          >
            {loading === "pending" ? <Spinner size="sm" /> : "Register"}
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Login;

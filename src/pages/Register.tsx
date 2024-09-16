import { useAppDispatch, useAppSelector } from "@store/hook";
import { actAuthRegiester, reastUi } from "@store/auth/authSlice";

import { useForm, SubmitHandler } from "react-hook-form";
import {
  signUpScheema,
  TFormInputs,
} from "@components/validations/signUpScheema";
import { Heading } from "@components/common";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { zodResolver } from "@hookform/resolvers/zod";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { error, loading, accessToken } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormInputs>({
    mode: "onBlur",
    resolver: zodResolver(signUpScheema),
  });

  const submitForm: SubmitHandler<TFormInputs> = (data) => {
    const { firstName, lastName, email, password } = data;
    dispatch(actAuthRegiester({ firstName, lastName, email, password }))
      .unwrap()
      .then(() => navigate("/login?message=account_created"));
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
      <Heading title="User Register" />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit(submitForm)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                {...register("firstName")}
                isInvalid={!!errors.firstName?.message}
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                {...register("lastName")}
                isInvalid={!!errors.lastName?.message}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName?.message}
              </Form.Control.Feedback>
            </Form.Group>
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
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                {...register("confirmPassword")}
                isInvalid={!!errors.confirmPassword?.message}
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              variant="info"
              style={{ color: "white" }}
              type="submit"
              disabled={loading === "pending"}
            >
              {loading === "pending" ? <Spinner size="sm" /> : "Submit"}
            </Button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Register;

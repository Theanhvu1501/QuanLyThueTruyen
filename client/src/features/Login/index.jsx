import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, FormGroup, Spinner } from "reactstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import * as yup from "yup";
import { InputField } from "../../customField/InputField";
import { isLoggedState, tokenState } from "../../recoilState/authState";
import "./Login.scss";

const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

export default function Login() {
  const { register, handleSubmit, errors, formState } = useForm({
    resolver: yupResolver(schema),
  });
  const { isSubmitting } = formState;

  const isLogged = useRecoilValue(isLoggedState);
  const [token, setToken] = useRecoilState(tokenState);

  useEffect(() => {
    if (localStorage.getItem("firstLogin")) {
      window.location.href = "/home";
    }
    return () => {};
  }, []);

  const onSubmit = async (data) => {
    try {
      const result = await axios.post("user/login", data);
      setToken(result.data.accesstoken);
      localStorage.setItem("firstLogin", true);
      window.location.href = "/home";
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  return (
    <section className="login">
      <div className="login__form">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            ref={register}
            label="Email"
            placeholder="Woo ..."
            type="text"
            name="email"
            invalid={!!errors.email}
            helperText={errors?.email?.message}
          />
          <InputField
            ref={register}
            label="Password"
            placeholder="Woo ..."
            type="password"
            name="password"
            invalid={!!errors.password}
            helperText={errors?.password?.message}
          />

          <FormGroup>
            <Button type="submit">
              {isSubmitting ? <Spinner size="sm" /> : null}
              Login
            </Button>
            {/* <Link to='/register' className="btn-link">Register</Link> */}
          </FormGroup>
        </Form>
      </div>
    </section>
  );
}

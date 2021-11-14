import "./style.css";

import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

function Login() {
  const [user, setUser] = useState("");
  const [login, setLogin] = useState(false);

  const schema = yup.object().shape({
    email: yup.string().required("E-mail obrigatório"),
    password: yup.string().required("Senha obrigatória"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    axios
      .post("https://kenzieshop.herokuapp.com/sessions/", data)
      .then((response) => {
        setUser("Requisição completa");
        setLogin(true);
      })
      .catch((error) => {
        setUser("Requisição falhou");
        setLogin(false);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="E-mail" {...register("email")} />
        <p>{errors.email?.message}</p>
        <input type="password" placeholder="Senha" {...register("password")} />
        <p>{errors.password?.message}</p>
        <button type="submit">Login</button>
      </form>
      <h2 className={login ? "green" : "red"}>{user}</h2>
    </>
  );
}

export default Login;

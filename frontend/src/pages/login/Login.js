import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, TextField, Typography, Container } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Header } from "../../components";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    // You can handle the login logic here
  };

  return (
    <div>
      <Header />
      <Container component="main" maxWidth="xs">
        <div>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register("email")}
              label="Email"
              variant="outlined"
              margin="normal"
              fullWidth
              type="text"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              {...register("password")}
              label="Password"
              variant="outlined"
              margin="normal"
              fullWidth
              type="password"
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </form>
          <Typography variant="body2" style={{ marginTop: 16 }}>
            Don't have an account?{" "}
            <Link
              to="/signup"
              style={{ textDecoration: "none", color: "#1976D2" }}
            >
              Create New Account
            </Link>
          </Typography>
        </div>
      </Container>
    </div>
  );
};

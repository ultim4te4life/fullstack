import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, TextField, Typography, Container } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Header } from "../../components";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
import { useUserContext } from "../../context/UserContext";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { signIn } = useUserContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await axios.post(
        "http://localhost:8080/users/signin",
        data
      );

      const user = await response.data;

      localStorage.setItem("user", JSON.stringify(user));
      signIn(data);

      console.log("Sign-in successful", user);

      toast.success("Sign-in successful", {
        position: toast.POSITION.TOP_CENTER,
      });

      reset();
      navigate("/");
    } catch (error) {
      console.error("Login failed", error.response.data);

      toast.error(error.response.data, {
        position: toast.POSITION.TOP_CENTER,
      });
    } finally {
      setLoading(false);
    }
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="button"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? (
                <ClipLoader color={"#ffffff"} loading={true} size={15} />
              ) : (
                "Sign In"
              )}
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

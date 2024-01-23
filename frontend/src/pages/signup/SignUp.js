import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, TextField, Typography, Container, Grid } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./SignUp.css";
import { Header } from "../../components";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";
import { useUserContext } from "../../context/UserContext";
import { useTheme } from "../../context/ThemeContext";

const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  age: yup
    .number()
    .positive("Age must be a positive number")
    .integer("Age must be an integer")
    .required("Age is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      "Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { signUp } = useUserContext();
  const [loading, setLoading] = useState(false);
  const { isDarkTheme } = useTheme();

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkTheme);
    document.body.classList.toggle("light", !isDarkTheme);
  }, [isDarkTheme]);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await axios.post("http://localhost:8080/users/signup", {
        firstname: data.firstName,
        lastname: data.lastName,
        age: data.age,
        email: data.email,
        password: data.password,
      });

      const user = response.data;

      localStorage.setItem("user", JSON.stringify(user));
      signUp(data);
      toast.success("Signup successful", {
        position: toast.POSITION.TOP_CENTER,
      });
      reset();
    } catch (error) {
      console.error("Signup failed", error?.response?.data);

      toast.error(error?.response?.data, {
        position: toast.POSITION.TOP_CENTER,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={isDarkTheme ? "dark" : "light"}>
      <Header />
      <Container component="main" maxWidth="xs" className="container">
        <div>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} className="form">
            <Grid container spacing={2} className="form-grid">
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("firstName")}
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  className={`input-field ${
                    isDarkTheme ? "dark-text" : "light-text"
                  }`}
                  InputProps={{
                    style: {
                      color: isDarkTheme ? "#fff" : "#000",
                    },
                  }}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("lastName")}
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("age")}
                  label="Age"
                  variant="outlined"
                  fullWidth
                  type="number"
                  error={!!errors.age}
                  helperText={errors.age?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("email")}
                  label="Email"
                  variant="outlined"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("password")}
                  label="Password"
                  variant="outlined"
                  fullWidth
                  type="password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("confirmPassword")}
                  label="Confirm Password"
                  variant="outlined"
                  fullWidth
                  type="password"
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                />
              </Grid>
            </Grid>
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
                "Sign Up"
              )}
            </Button>

            <Typography variant="body2" style={{ marginTop: 16 }}>
              Already have an account?{" "}
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "#1976D2" }}
              >
                Sign In
              </Link>
            </Typography>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default SignUpPage;

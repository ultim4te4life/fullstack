import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, TextField, Typography, Container, Grid } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./SignUp.css";
import { Header } from "../../components";

const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  age: yup
    .number()
    .positive("Age must be a positive number")
    .integer("Age must be an integer")
    .required("Age is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
});

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    // You can handle the signup logic here
  };

  return (
    <div>
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
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="button"
            >
              Sign Up
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

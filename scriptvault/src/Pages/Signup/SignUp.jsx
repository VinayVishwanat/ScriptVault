import React, { useState } from "react";
import axios from "axios";
import styles from "./SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignupPage() {
  const navigate = useNavigate();

  // State for form data and error message
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    PAN: "",
    dob: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Event handler for form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Event handler for submitting the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      // Create an object containing all user data
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        dob: formData.dob,
        PAN: formData.PAN,
        phone: formData.phone,
      };

      // Send the signup request to the server with all user data
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/register`,
        userData
      );
      setLoading(false);

      if (response.data.message === "User registered successfully") {
        toast.success("User registered successfully!!")
        navigate("/signin");
      } else if (response.data.message === "User already exists") {
        setError("User with this email already exists.");
        toast.error("User with this email already exists")
      }
    } catch (error) {
      setLoading(false);
      console.error("Signup failed:", error);
      toast.error("Sign-up failed. Please try again.")
      setError("Sign-up failed. Please try again.");
    }
  };

  return (
    <div>
      <div className={styles.background}></div>
      <div className={styles.signupCard}>
        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="name">
              Name
            </label>
            <input
              className={styles.input}
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email Input */}
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
              className={styles.input}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone Input */}
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="phone">
              Phone
            </label>
            <input
              className={styles.input}
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          {/* PAN Input */}
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="PAN">
              PAN
            </label>
            <input
              className={styles.input}
              type="text"
              id="PAN"
              name="PAN"
              value={formData.PAN}
              onChange={handleChange}
              required
            />
          </div>

          {/* Date of Birth Input */}
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="dob">
              Date of Birth
            </label>
            <input
              className={styles.input}
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Input */}
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <input
              className={styles.input}
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Error message */}
          {error && <p className={styles.error}>{error}</p>}

          <button className={styles.button} type="submit">
            {loading && <div class="loader"></div>}
            Sign Up
          </button>
        </form>
      </div>
      <p className={styles.loginLinkp}>
        Already have an account?{" "}
        <Link to="/signin" className={styles.loginLink}>
          Login
        </Link>
      </p>
      <ToastContainer />
    </div>
  );
}

export default SignupPage;
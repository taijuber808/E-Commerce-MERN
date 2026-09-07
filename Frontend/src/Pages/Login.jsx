import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../api";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await loginUser(formData);

      if (data.status) {
        // Save token
        localStorage.setItem("token", data.data.token);

        // Save user information
        localStorage.setItem(
          "user",
          JSON.stringify(data.data.user)
        );

        alert("Login Successful!");

        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log("Login Error:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        {/* Heading */}
        <div className="login-heading">

          <p>SHOPCART</p>

          <h1>Welcome Back</h1>

          <span>
            Login to continue shopping with us.
          </span>

        </div>


        {/* Login Form */}
        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="form-group">

            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>


          {/* Password */}
          <div className="form-group">

            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />

          </div>


          {/* Forgot Password */}
          <div className="forgot-password">

            <Link to="#">
              Forgot Password?
            </Link>

          </div>


          {/* Button */}
          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>


        {/* Register */}
        <div className="register-link">

          Don't have an account?

          <Link to="/register">
            Create Account
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;
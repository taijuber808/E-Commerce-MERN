import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../api";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    phone: "",
    dateOfBirth: "",
    address: "",
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

      const data = await registerUser(formData);

      if (data.status) {
        alert("Registration Successful!");

        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log("Register Error:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <div className="register-heading">
          <p>SHOPCART</p>

          <h1>Create Account</h1>

          <span>Register yourself and start shopping with us.</span>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="form-group">
            <label>Full Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

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

          {/* Gender + Phone */}
          <div className="form-row">
            <div className="form-group">
              <label>Gender</label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Phone</label>

              <input
                type="tel"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Date of Birth */}
          <div className="form-group">
            <label>Date of Birth</label>

            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>

          {/* Address */}
          <div className="form-group">
            <label>Address</label>

            <textarea
              name="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          {/* Button */}
          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="login-link">
          Already have an account?
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;

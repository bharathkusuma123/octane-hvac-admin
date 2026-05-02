import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import baseURL from "../ApiUrl/Apiurl";
import { FaLock } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";

const AdminResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = location.state || {};

  const [q1, setQ1] = useState(user?.security_question1 || "");
  const [q2, setQ2] = useState(user?.security_question2 || "");
  const [a1, setA1] = useState(user?.answer1 || "");
  const [a2, setA2] = useState(user?.answer2 || "");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  if (!user) {
    return <div className="container mt-4">No user data found</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!q1 || !q2 || !a1 || !a2 || !newPassword) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Form",
        text: "Please fill in all fields.",
      });
      return;
    }

    if (q1 === q2) {
      Swal.fire({
        icon: "error",
        title: "Invalid Questions",
        text: "Please select different questions.",
      });
      return;
    }

    const payload = {
      login: user.username,
      security_question1: q1,
      answer1: a1,
      security_question2: q2,
      answer2: a2,
      new_password: newPassword,
    };

    try {
      const response = await fetch(`${baseURL}/user-forgot-password/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        let errorMessage = "Something went wrong";

        if (result?.errors?.new_password) {
          errorMessage = result.errors.new_password[0];
        } else if (result?.message) {
          errorMessage = result.message;
        }

        Swal.fire({
          icon: "error",
          title: "Failed",
          text: errorMessage,
        });

        return;
      }

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Password reset successfully!",
      }).then(() => navigate(-1));

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong",
      });
    }
  };

  return (
    <div className="container mt-4">
      <h3>Reset Password</h3>

      <form onSubmit={handleSubmit} style={{ maxWidth: "600px" }}>

        {/* Username */}
        <div className="mb-3">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={user.username}
            readOnly
          />
        </div>

        {/* Row 1 */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Security Question 1</label>
            <input
              type="text"
              className="form-control"
              value={q1}
              readOnly
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Answer 1</label>
            <input
              type="text"
              className="form-control"
              value={a1}
              onChange={(e) => setA1(e.target.value)}
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Security Question 2</label>
            <input
              type="text"
              className="form-control"
              value={q2}
              readOnly
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Answer 2</label>
            <input
              type="text"
              className="form-control"
              value={a2}
              onChange={(e) => setA2(e.target.value)}
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-3">
          <label>New Password</label>

          <div className="set-input-wrapper">
            <FaLock className="input-icon-left" />

            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              style={{ paddingLeft: "35px", paddingRight: "35px" }}
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <span
              className="input-icon-right"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>
        </div>

        <button className="btn btn-danger w-100">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default AdminResetPassword;
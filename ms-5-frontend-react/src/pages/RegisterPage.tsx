import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { authService } from "../services/authService";
import { extractErrorMessage } from "../utils/errorUtils";

function RegisterPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await authService.register({
        username,
        password,
        role
      });

      setSuccess(
        "Registration successful. Redirecting to login..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setError(
        extractErrorMessage(error)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container mt-5"
      style={{ maxWidth: "450px" }}
    >
      <div className="card shadow">
        <div className="card-body">
          <h3 className="text-center mb-4">
            Register
          </h3>

          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          {success && (
            <div className="alert alert-success">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Role
              </label>
              <select
                className="form-select"
                value={role}
                onChange={(e) =>
                  setRole(e.target.value)
                }
              >
                <option value="USER">
                  USER
                </option>
                <option value="ADMIN">
                  ADMIN
                </option>
              </select>
            </div>

            <button
              type="submit"
              className="btn btn-success w-100"
              disabled={loading}
            >
              {loading
                ? "Registering..."
                : "Register"}
            </button>
          </form>

          <p className="text-center mt-3 mb-0">
            Already have an account?{" "}
            <Link to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
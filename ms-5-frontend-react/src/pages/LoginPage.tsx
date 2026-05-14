import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { authService } from "../services/authService";
import { extractErrorMessage } from "../utils/errorUtils";

function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await authService.login({
        username,
        password
      });

      navigate("/");
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
            Login
          </h3>

          {error && (
            <div className="alert alert-danger">
              {error}
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

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </button>
          </form>

          <p className="text-center mt-3 mb-0">
            Don't have an account?{" "}
            <Link to="/register">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
import { useEffect, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

function Login() {
  const [formData, setFromData] = useState({
    email: "",
    password: "",
  });

  const {  email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // redirect when log in
    if (isSuccess && user) {
      navigate("/");
    }
    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  const onChange = (e) => {
    setFromData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email, password
    }

    dispatch(login(userData))
  };

  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please login to get support</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Login</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
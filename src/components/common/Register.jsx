import React, { Fragment, useState } from "react";
import { registerUser } from "../../redux/actions/authAction";
import { connect, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { setAlert } from "../../redux/actions/alertAction";

const Register = ({ user, isAuthenticated, registerUser }) => {
  const [formData, handleFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    usertag: "",
    role: "",
  });

  const { email, password, confirmPassword, name, usertag, role } = formData;

  let passwordWarning = "";

  const dispatch = useDispatch();

  const handleRegister = (e) => {
    handleFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {
      registerUser({ name, email, usertag, password, role });
    } else dispatch(setAlert("entered passwords do not match", "danger"));
  };

  return (
    <Fragment>
      <div className="m-10 w-1/3">
        <span className="text-2xl"> Sign up It's Free</span>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="field">
            <div className="control">
              <input
                className="input m-2"
                placeholder="Name"
                type="text"
                id="name"
                value={name}
                onChange={(e) => handleRegister(e)}
              />
              <input
                className="input m-2"
                placeholder="Email"
                type="email"
                id="email"
                value={email}
                onChange={(e) => handleRegister(e)}
              />
              <input
                className="input m-2"
                placeholder="Choose a Username"
                type="text"
                id="usertag"
                value={usertag}
                onChange={(e) => handleRegister(e)}
              />
              <input
                className={`input m-2 ${passwordWarning}`}
                placeholder="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => handleRegister(e)}
              />
              <input
                className={`input m-2 ${passwordWarning}`}
                placeholder="Confirm password"
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => handleRegister(e)}
              />
              <label htmlFor="Type of Organisation" className="radio">
                <input
                  className="m-2"
                  type="radio"
                  name="role"
                  id="role"
                  checked={role === "individual"}
                  value="individual"
                  onChange={(e) => handleRegister(e)}
                />
                Individual
                <input
                  className="m-2"
                  type="radio"
                  name="role"
                  id="role"
                  checked={role === "ngo"}
                  value="ngo"
                  onChange={(e) => handleRegister(e)}
                />
                NGO
              </label>
            </div>
          </div>
          <button
            className="button"
            type="submit"
            onClick={(e) => handleRegister(e)}
          >
            Register
          </button>
        </form>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  user: state.authReducer.user,
});

export default connect(mapStateToProps, { registerUser })(Register);

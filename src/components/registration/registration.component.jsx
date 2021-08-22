import React from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

import "./registration.styles.scss";

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      Name: "",
      Age:"",
      MobileNo:"",
      email: "",
      password: "",
      confirmPassword: ""
    };
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { Name, Age, MobileNo, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("passwords don`t match");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      createUserProfileDocument(user, { Name, Age, MobileNo });

      this.setState({
        Name: "",
        Age:"",
        MobileNo:"",
        email: "",
        password: "",
        confirmPassword: ""
      });
    } catch (error) {
      console.error(error);
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { Name, Age, MobileNo, email, password, confirmPassword } = this.state;
    return (
      <div className="sign-up">
        <h2 className="title">I do not have account</h2>
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            name="Name"
            value={Name}
            onChange={this.handleChange}
            label="Name"
            required
          />
          <FormInput
            type="text"
            name="Age"
            value={Age}
            onChange={this.handleChange}
            label="Age"
            required
          />
          <FormInput
            type="text"
            name="MobileNo"
            value={MobileNo}
            onChange={this.handleChange}
            label="Mobile No."
            required
          />
          <FormInput
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            label="Email"
            required
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            label="Password"
            required
          />
          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={this.handleChange}
            label="Confirm Password"
            required
          />
          <CustomButton type="submit">SIGN UP</CustomButton>
        </form>
      </div>
    );
  }
}
export default SignUp;

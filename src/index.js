import React, { Component } from "react";
import ReactDOM from "react-dom";
import classname from "classnames";

import "./styles.css";

// form component
class Form extends Component {
  constructor() {
    super();

    this.formRef = React.createRef();
  }

  state = {
    name: "",
    email: "",
    password: "",
    error: {}
  };

  submitHandler = e => {
    e.preventDefault();

    let arr = [...this.formRef.current];

    let formData = {};

    arr.forEach((element, index) => {
      if (index !== arr.length - 1) {
        if (element.value) {
          formData[element.name] = element.value;
          let error = { ...this.state.error };
          delete error[element.name];
          this.setState({
            error
          });
        } else {
          this.setState(prev => {
            return {
              error: {
                ...prev.error,
                [element.name]: `You can't provie empty ${element.name}`
              }
            };
          });
        }
      }
    });

    if (Object.keys(this.state.error).length === 0) {
      console.log(formData);
      this.formRef.current.reset();
    }
  };

  render() {
    let { error } = this.state;
    console.log(this.state.error);

    return (
      <div className="m-4">
        <form ref={this.formRef} onSubmit={this.submitHandler}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Your Name"
              className={classname("form-control", {
                "is-invalid": error.name
              })}
            />
            <div className="invalid-feedback">Please provide a valid name.</div>
          </div>
          <div className="form-group">
            <label htmlFor="name">Email:</label>
            <input
              type="text"
              name="email"
              placeholder="Enter Your Email"
              className={classname("form-control", {
                "is-invalid ": error.email
              })}
            />
            <div className="invalid-feedback">
              Please provide a valid email.
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="name">Password:</label>
            <input
              type="text"
              name="password"
              placeholder="Enter Your Password"
              className={classname("form-control", {
                "is-invalid ": error.password
              })}
            />
            <div className="invalid-feedback">
              Please provide a valid password.
            </div>
          </div>

          <button className="btn btn-primary">Submit Form</button>
        </form>
      </div>
    );
  }
}

function App() {
  return <Form />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

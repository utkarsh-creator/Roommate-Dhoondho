import React, { useState } from "react";
import "./ProfileForm.css";

class ProfileForm extends React.Component {
  constructor() {
    super();
    this.state = {
      fields: { gender: "M" },
      errors: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.submituserRegistrationForm =
      this.submituserRegistrationForm.bind(this);
  }

  handleChange(e) {
    let fields = this.state.fields;

    // Handling the gender selection
    if (e.target.getAttribute("data-gender")) {
      fields["gender"] = e.target.getAttribute("data-gender");
    } else {
      fields[e.target.name] = e.target.value;
    }

    this.setState({
      fields,
    });
  }

  submituserRegistrationForm(e) {
    e.preventDefault();
    if (this.validateForm()) {
      let fields = {};
      fields["firstname"] = "";
      fields["lastname"] = "";
      fields["Regno"] = "";
      fields["emailid"] = "";
      fields["mobileno"] = "";
      this.setState({ fields: fields });
      alert("Form submitted");
    }
  }

  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["firstname"]) {
      formIsValid = false;
      errors["firstname"] = "*Please enter your firstname.";
    }

    if (typeof fields["firstname"] !== "undefined") {
      if (!fields["firstname"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["firstname"] = "*Please enter alphabet characters only.";
      }
    }
    if (!fields["lastname"]) {
      formIsValid = false;
      errors["lastname"] = "*Please enter your lastname.";
    }

    if (typeof fields["lastname"] !== "undefined") {
      if (!fields["lastname"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["lastname"] = "*Please enter alphabet characters only.";
      }
    }

    if (!fields["regno"]) {
      formIsValid = false;
      errors["regno"] = "*Please enter your registration number.";
    }

    if (typeof fields["regno"] !== "undefined") {
      // Regular expression for registration number validation
      var pattern2 = /^[0-9]{2}[A-Za-z]{3}[0-9]{4}$/;

      if (!pattern2.test(fields["regno"])) {
        formIsValid = false;
        errors["regno"] = "*Please enter a valid registration number.";
      }
    }

    if (!fields["emailid"]) {
      formIsValid = false;
      errors["emailid"] = "*Please enter your email-ID.";
    }

    if (typeof fields["emailid"] !== "undefined") {
      //regular expression for email validation
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(fields["emailid"])) {
        formIsValid = false;
        errors["emailid"] = "*Please enter valid email-ID.";
      }
    }

    if (!fields["mobileno"]) {
      formIsValid = false;
      errors["mobileno"] = "*Please enter your contact no.";
    }

    if (typeof fields["mobileno"] !== "undefined") {
      if (!fields["mobileno"].match(/^[0-9]{10}$/)) {
        formIsValid = false;
        errors["mobileno"] = "*Please enter valid contact no.";
      }
    }

    this.setState({
      errors: errors,
    });
    return formIsValid;
  }
  render() {
    return (
      <div id="main-registration-container">
        <div id="register">
          <form
            method="post"
            name="userRegistrationForm"
            onSubmit={this.submituserRegistrationForm}
          >
            <div className="form-section-1">
              <div className="form-section-1a">
                <label>First Name*</label>
                <input
                  type="text"
                  name="firstname"
                  value={this.state.fields.firstname}
                  onChange={this.handleChange}
                />
                <div className="errorMsg">{this.state.errors.firstname}</div>
              </div>
              <div className="form-section-1b">
                <label>Last Name*</label>
                <input
                  type="text"
                  name="lastname"
                  value={this.state.fields.lastname}
                  onChange={this.handleChange}
                />
                <div className="errorMsg">{this.state.errors.lastname}</div>
              </div>
            </div>
            <div className="form-section-3">
              <div className="input-group">
                <div className="flex">
                  <label>Gender*</label>
                  <span className="form-section-3-border">
                    <div
                      data-gender="M"
                      name="gender"
                      className={`mr-6  bg-[#D9D9D9] rounded-[10px] py-2 px-8 text-center cursor-pointer female ${
                        this.state.fields.gender === "M"
                          ? "border-2 border-black"
                          : ""
                      }`}
                      onClick={this.handleChange}
                    >
                      M
                    </div>
                    <div
                      data-gender="F"
                      name="gender"
                      className={`bg-[#D9D9D9] rounded-[10px] py-2 px-8 text-center cursor-pointer female ${
                        this.state.fields.gender === "F"
                          ? "border-2 border-black"
                          : ""
                      }`}
                      onClick={this.handleChange}
                    >
                      F
                    </div>
                  </span>
                </div>
              </div>
              <div className="form-section-3b">
                <label> Registration Number*</label>
                <input
                  type="text"
                  name="Registration Number"
                  value={this.state.fields.regno}
                  onChange={this.handleChange}
                />
                <div className="errorMsg">{this.state.errors.regno}</div>
              </div>
            </div>
            <div className="form-section-2">
              <div className="form-section-2a">
                <label>Email*</label>
                <input
                  type="text"
                  name="emailid"
                  value={this.state.fields.emailid}
                  onChange={this.handleChange}
                />
                <div className="errorMsg">{this.state.errors.emailid}</div>
              </div>
              <div className="form-section-2b">
                <label>Contact Number*</label>
                <input
                  type="text"
                  name="mobileno"
                  value={this.state.fields.mobileno}
                  onChange={this.handleChange}
                />
                <div className="errorMsg">{this.state.errors.mobileno}</div>
              </div>
            </div>
            <div className="form-section-4">
              <button className="mx-auto bg-[#06105A] px-[2.5rem] py-[0.75rem] text-white rounded-[8px] self-start disabled:hover:cursor-not-allowed">
                <input type="submit" className="button" value="Submit" />
              </button>
            </div>
          </form>
          <div className="form-section-5">
            <hr />
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileForm;

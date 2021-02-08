import React, { Component } from "react";

class BadgeForm extends Component {
  handleClick = (e) => {
    console.log("Button was clicked");
  };

  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(this.state)
  // };

  render() {
    return (
      <div>
        <form onSubmit={this.props.onSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input
              onChange={this.props.onChange}
              value={this.props.formValues.firstName}
              type="text"
              className="form-control"
              name="firstName"
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              onChange={this.props.onChange}
              value={this.props.formValues.lastName}
              type="text"
              className="form-control"
              name="lastName"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              onChange={this.props.onChange}
              value={this.props.formValues.email}
              type="email"
              className="form-control"
              name="email"
            />
          </div>
          <div className="form-group">
            <label>Job title</label>
            <input
              onChange={this.props.onChange}
              value={this.props.formValues.jobTitle}
              type="text"
              className="form-control"
              name="jobTitle"
            />
          </div>
          <div className="form-group">
            <label>twitter</label>
            <input
              onChange={this.props.onChange}
              value={this.props.formValues.twitter}
              type="text"
              className="form-control"
              name="twitter"
            />
          </div>
          <button onClick={this.handleClick} className="btn btn-primary">
            Save
          </button>

          {this.props.error && <p className="text-danger">{this.props.error.message}</p>}
        </form>
      </div>
    );
  }
}

export default BadgeForm;

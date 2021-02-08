import React, { Component, Fragment } from "react";

import "../styles/BadgeNew.css";

import header from "../images/platziconf-logo.svg";
import Badge from "../components/Badge";
import BadgeForm from '../components/BadgeForm'
import PageLoading from '../components/PageLoading'

import api from '../api'

class BadgeNew extends Component {
  state = { 
    loading: false,
    error: null,
    form: {
      firstName: '',
      lastName: '',
      email: '',
      jobTitle: '',
      twitter: '',
    }   
  }

  handleChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    })
  }

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true, error: null})
    
    try {
      await api.badges.create(this.state.form)
      this.setState({ loading: false})

      this.props.history.push('/badges')
    } catch (error) {
      this.setState({ loading: false, error: error})
    }
  }

  render() {
    if (this.state.loading) {
      return <PageLoading />
    }

    return (
      <Fragment>
        <div className="BadgeNew__hero">
          <img className="img-fluid" src={header} alt="Logo" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <Badge
                firstName={this.state.form.firstName || 'FIRST_NAME'}
                lastName={this.state.form.lastName || 'LAST_NAME'}
                twitter={this.state.form.twitter || 'TWITTER'}
                jobTitle={this.state.form.jobTitle || 'JOB_TITLE'}
                email={this.state.form.email || 'EMAIL'}
                avatarUrl="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
              />
            </div>
            <div className="col-6">
              <h1>New attendant</h1>
              <BadgeForm error={this.state.error} onSubmit={this.handleSubmit} onChange={this.handleChange} formValues={this.state.form}/>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default BadgeNew;

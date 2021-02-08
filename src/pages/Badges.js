import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import '../styles/Badges.css';
import BadgesList from '../components/BadgesList'
import Skeleton from '../components/Skeleton'
import PageError from '../components/PageError'
import MiniLoader from '../components/MiniLoader'

import confLogo from '../images/badge-header.svg';
import api from '../api'

class Badges extends Component {

  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      error: null,
      data: []
    }
  }


  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    this.setState({loading: true, error: null})
    try {
      const data = await api.badges.list()
      this.setState({loading: false, data: data})
    } catch (error) {
      this.setState({loading: false, error: error})
    }
  }

  componentWillUnmount() {
  }

  render() {
    if (this.state.error) {
      return <PageError error={this.state.error}/>
    }

    return (
      <Fragment>
        <div className="Badges">
          <div className="Badges__hero">
            <div className="Badges__container">
              <img className="Badges_conf-logo" src={confLogo} alt="" />
            </div>
          </div>
        </div>

        <div className="Badges__container">
          <div className="Badges__buttons">
            <Link to="/badges/new" className="btn btn-primary">New Badge</Link>
          </div>

          { this.state.loading && this.state.data.length === 0 ?
            new Array(3).fill(1).map((_, i) => {
              return <Skeleton key={i} />;
            })
            : <BadgesList badges={this.state.data}/>
          }

          {this.state.loading && <MiniLoader />}

        </div>
      </Fragment>
    )
  }
}

export default Badges;
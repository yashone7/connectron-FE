import React, { Fragment, useState } from 'react';
import saving_1 from '../../assets/save-world.svg';
import docs from '../../assets/doctors.svg';
import analytics from '../../assets/analytics.svg';
import '../../styles/utils.css';
import { MdMenu } from 'react-icons/md';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Landing = ({ isAuthenticated, user }) => {
  const [isSidebarToggled, toggleSidebar] = useState('');

  if (isAuthenticated) {
    if (user.role === 'doctor') {
      return <Redirect to="/doctor" />;
    } else return <Redirect to="/home" />;
  }

  const handleSidebar = () => {
    if (isSidebarToggled === '') {
      toggleSidebar('is-active');
    } else toggleSidebar('');
  };

  return (
    <Fragment>
      <section
        className="hero is-info is-fullheight nav-font"
        id="main-container"
      >
        <div className="hero-head">
          <header className="navbar">
            <div className="container">
              <div className="navbar-brand">
                <h2 className="navbar-item has-text-white text-2xl font-normal">
                  ConnecTron
                </h2>
                <div
                  className={`navbar-burger burger py-3 px-2 `}
                  onClick={() => handleSidebar()}
                >
                  <MdMenu size={22} color="#f4f4f4" />
                </div>
              </div>
              <div
                className={`navbar-menu ${isSidebarToggled} bg-lazy-blue`}
                id="navbarMenuHeroC"
              >
                <div className="navbar-end">
                  <p className="navbar-item has-text-white font-bold has-text-right">
                    Home
                  </p>
                  <p className="navbar-item has-text-white font-bold has-text-right">
                    About us
                  </p>
                  <p className="navbar-item has-text-white font-bold has-text-right">
                    Technology
                  </p>
                  <p className="navbar-item has-text-white font-bold has-text-right">
                    Contact us
                  </p>
                </div>
              </div>
            </div>
          </header>
        </div>
        <div className="hero-body nav-font animated slideInDown">
          <div className="w:4/7 sm:w-4/5 sm:h-3/5 pr-10 lg:pr-5 mb-10 lg:mb-5 sm:self-center md:w-3/7 lg:w-3/5 lg:h-1/3 lg:mx-24 lg:pt-24">
            <p className="text-4xl pr-5 py-5 lg:text-6xl lg:py-0 text-gray-400">
              Data driven apps help you to take better
              <span style={{ color: '#68F7FA' }}> decisions.</span>
            </p>
            <p className="text-3xl w-4/5 h-auto pr-10 lg:my-5 text-gray-400  font-normal">
              <span style={{ color: '#68F7FA' }}>ConnecTron</span> is the way to
              GO!
            </p>
          </div>
        </div>
      </section>
      <section className="section bg-gray-100 my-8 mx-8 md:mx-12 lg:mx-16">
        <div className="container" style={{ margin: '2em 0' }}>
          <div className="columns items-center">
            <div className="column">
              <div className="content">
                <p className="font-normal text-xl lg:text-3xl nav-font">
                  ConnecTron is built to help the under-privileged
                </p>
                <p className="text-md nav-font">
                  ConnecTron connects NGOs or the people who want to help the
                  needy ones. It serves as a bridge between the seekers and
                  helpers
                </p>
              </div>
            </div>
            <div className="column">
              <figure className="image">
                <img
                  src={saving_1}
                  alt="built for doctors"
                  style={{ height: '30%', width: '30%', marginLeft: '30%' }}
                />
              </figure>
            </div>
          </div>
        </div>
        <div className="container" style={{ margin: '2em 0' }}>
          <div className="columns items-center">
            <div className="column">
              <div className="content">
                <p className="font-normal text-xl lg:text-3xl nav-font">
                  ConnecTron is data collection platform
                </p>
                <p className="text-md nav-font">
                  ConnecTron helps you to collect patients test reports and
                  health reports at a very granular level which help in pin
                  point analysis
                </p>
              </div>
            </div>
            <div className="column">
              <figure className="image">
                <img
                  src={docs}
                  alt="woman saving the world"
                  style={{ height: '30%', width: '30%', marginLeft: '34%' }}
                />
              </figure>
            </div>
          </div>
        </div>
        <div className="container" style={{ margin: '2em 0' }}>
          <div className="columns items-center">
            <div className="column">
              <div className="content">
                <p className="font-normal text-xl lg:text-3xl nav-font">
                  Visualize with ConnecTron
                </p>
                <p className="text-md nav-font">
                  ConnecTron has an efficient and powerful visualization
                  framework based on Uber's Deck.gl, This gives you actionable
                  insights to take informed decisions
                </p>
              </div>
            </div>
            <div className="column">
              <figure className="image">
                <img
                  src={analytics}
                  alt="woman saving the world"
                  style={{ height: '30%', width: '30%', marginLeft: '34%' }}
                />
              </figure>
            </div>
          </div>
        </div>
      </section>
      <section id="get-started">
        <div className="space-between mx-12">
        <Link to="/login" className="button is-primary m-2">
         Login Here
        </Link>
        <Link to="/register" className="button is-primary m-2">
          Register Here
        </Link>
        </div>
      </section>
    </Fragment>
  );
};

const mapStatetoProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  token: state.authReducer.token,
  user: state.authReducer.user,
});

export default connect(mapStatetoProps)(Landing);

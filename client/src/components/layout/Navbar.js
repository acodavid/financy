import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { getBrand } from '../../actions/dashboardActions';

class Navbar extends Component {

    componentDidMount() {
        this.props.getBrand();
    }

    onLogoutClick(e) {
        e.preventDefault();

        this.props.logoutUser();
    }
    render() {

        const { isLogged, user } = this.props.auth;
        const { brand } = this.props.brand;

        let brandContent;

        if (brand === null) {
            brandContent = 'brand'
        } else {

            const mostRecentDate = new Date(Math.max.apply(null, brand.map(e => {
                return new Date(e.MeasureDate);
            })));
            const mostRecentObject = brand.filter(e =>
                mostRecentDate !== e.brand
            );

            brandContent = mostRecentObject[0].brand;

        }


        const Logged = (
            <ul className="navbar-nav ml-auto">
                {user.isAdmin === true ? (
                    <li className="nav-item">
                        <Link className="nav-link" to="/settings"> Podesavanja
                                </Link>
                    </li>
                ) : null}
                <li className="nav-item">
                    <Link className="nav-link text-muted" to="/">{user.name}</Link>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="http://localhost:3000/login" onClick={this.onLogoutClick.bind(this)}>Odjava</a>
                </li>
            </ul>
        )

        const notLogged = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Prijava</Link>
                </li>
            </ul>
        )

        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
                <div className="container">
                    <Link className="navbar-brand" to="/">{brandContent}</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav mr-auto">
                            {isLogged === true ? (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/"> Pocetna
                                    </Link>
                                </li>
                            ) : null}
                            {(user.type === 'arhive' || user.type === 'company' || isLogged === false) ? null : (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/statistics"> Statistika
                                </Link>
                                </li>
                            )}
                            {user.isAdmin === true ? (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/companies"> Radnje
                                </Link>
                                </li>
                            ) : null}
                            {(user.type === 'company' || isLogged === false) ? null : (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/archive"> Arhiva
                                </Link>
                                </li>
                            )}

                        </ul>
                        {isLogged ? Logged : notLogged}
                    </div>
                </div>
            </nav>
        )
    }
}

Navbar.propTypes = {
    auth: PropTypes.object.isRequired,
    brand: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    getBrand: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    brand: state.brand
})

export default connect(mapStateToProps, { logoutUser, getBrand })(Navbar);

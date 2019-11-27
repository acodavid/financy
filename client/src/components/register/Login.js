import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loginUser, clearErrors } from '../../actions/authActions'

class Login extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.auth.isLogged) {
            this.props.history.push('/')
        }

        this.props.clearErrors();

    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isLogged) {
            this.props.history.push('/')
        }

        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const loggedUser = {
            email: this.state.email,
            password: this.state.password
        }

        this.props.loginUser(loggedUser);

    }

    render() {

        const { errors } = this.state;

        return (
            <div className="container">
                <h3 className="mb-3">Prijava: </h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input type="text" value={this.state.email} onChange={this.onChange} className="form-control dorm-control-lg mb-1" name="email" placeholder="Email" />
                        {errors.email ? (
                            <p className="ml-2" style={{ color: 'red' }}>{errors.email}</p>
                        ) : null}
                    </div>
                    <div className="form-group">
                        <input type="text" value={this.state.password} onChange={this.onChange} className="form-control dorm-control-lg mb-1" name="password" placeholder="Lozinka" />
                        {errors.password ? (
                            <p className="ml-2" style={{ color: 'red' }}>{errors.password}</p>
                        ) : null}
                    </div>
                    <input type="submit" value="Potvrdi" className="btn btn-secondary btn-block mb-5" />
                </form>
            </div>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { loginUser, clearErrors })(Login);

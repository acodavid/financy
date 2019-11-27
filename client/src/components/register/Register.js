import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { registerUser, clearErrors } from '../../actions/authActions'

class Register extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            workplace: '',
            isAdmin: false,
            type: 'company',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.props.clearErrors();
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            workplace: this.state.workplace,
            isAdmin: this.state.isAdmin,
            type: this.state.type
        }

        this.props.registerUser(newUser, this.props.history);

    }

    render() {

        const { errors } = this.state;

        return (
            <div className="container">
                <h3 className="mb-3">Registracija:</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input type="text" value={this.state.name} onChange={this.onChange} className="form-control form-control-lg mb-1" name="name" placeholder="Ime" />
                        {errors.name ? (
                            <p className="ml-2" style={{ color: 'red' }}>{errors.name}</p>
                        ) : null}
                    </div>
                    <div className="form-group">
                        <input type="text" value={this.state.email} onChange={this.onChange} className="form-control form-control-lg mb-1" name="email" placeholder="Email" />
                        {errors.email ? (
                            <p className="ml-2" style={{ color: 'red' }}>{errors.email}</p>
                        ) : null}
                    </div>
                    <div className="form-group">
                        <input type="password" value={this.state.password} onChange={this.onChange} className="form-control form-control-lg mb-1" name="password" placeholder="Lozinka" />
                        {errors.password ? (
                            <p className="ml-2" style={{ color: 'red' }}>{errors.password}</p>
                        ) : null}
                    </div>
                    <div className="form-group">
                        <input type="text" value={this.state.workplace} onChange={this.onChange} className="form-control form-control-lg mb-1" name="workplace" placeholder="Lokacija" />
                        {errors.workplace ? (
                            <p className="ml-2" style={{ color: 'red' }}>{errors.workplace}</p>
                        ) : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="type">Tip korisnika: </label>
                        <select name="type" id="type" className="form-control form-control-lg mb-1" onChange={this.onChange} value={this.state.type}>
                            <option value="company">Radnja</option>
                            <option value="arhive">Analiticar</option>
                            <option value="statistic">Statisticar</option>
                        </select>
                    </div>
                    <input type="submit" value="Potvrdi" className="btn btn-secondary btn-block mb-5" />
                </form>
            </div>
        )
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors
})

export default connect(mapStateToProps, { registerUser, clearErrors })(withRouter(Register));

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addBrand } from '../../actions/dashboardActions';

class Settings extends Component {

    constructor() {
        super();
        this.state = {
            brand: '',
            flag: false
        }
    }

    componentDidMount() {
        if (!this.props.auth.user.isAdmin) {
            this.props.history.push('/')
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newBrand = {
            brand: this.state.brand
        }

        this.props.addBrand(newBrand);

        this.setState({
            brand: '',
            flag: true
        });


    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="form-group">
                        <label htmlFor="brand">Podesavanje brenda naslovne linije:</label>
                        <input type="text" value={this.state.brand} onChange={this.onChange.bind(this)} className="form-control form-control-lg" name="brand" id="brand" placeholder="Brend" />
                        {this.state.flag ? (
                            <p className="lead" style={{ color: 'green' }}>Uspjesno promijenjen brend! Osvjezite vasu stranicu kako bi se promijenio brend u naslovnoj strani!</p>
                        ) : null}
                        <input type="submit" value="Potvrdi" className="btn btn-secondary btn-block mb-5 mt-3" />
                    </div>
                </form>
            </div>
        )
    }
}

Settings.propTypes = {
    brand: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addBrand: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    brand: state.brand,
    auth: state.auth
})

export default connect(mapStateToProps, { addBrand })(Settings);

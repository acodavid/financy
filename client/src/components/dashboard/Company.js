import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteUser } from '../../actions/authActions';

class Company extends Component {

    onDelete(id, e) {
        e.preventDefault();

        this.props.deleteUser(id)
    }

    render() {

        const { company } = this.props;

        return (
            <tr>
                <td>{company.name}</td>
                <td>{company.email}</td>
                <td>{company.workplace} <button title="Delete" onClick={this.onDelete.bind(this, company._id)} style={{ float: 'right', color: 'red' }}>X</button></td>
            </tr>
        )
    }
}

Company.propTypes = {
    company: PropTypes.object.isRequired
}

export default connect(null, { deleteUser })(Company);

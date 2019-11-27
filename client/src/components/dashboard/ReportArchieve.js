import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ReportArchieve extends Component {
    render() {

        const { report } = this.props;

        return (

            <tr>
                <td>{report.workplace}</td>
                <td style={{ color: 'green' }}>{parseFloat(report.visaCard, 10) + parseFloat(report.virman, 10) + parseFloat(report.cash, 10) + parseFloat(report.companyCard, 10)} KM</td>
                <td>{report.person}</td>
                <td>{report.date.slice(8, 10) + '.' + report.date.slice(5, 7) + '.' + report.date.slice(0, 4) + '.'}</td>
                <td>
                    <div className="container">
                        <Link className="btn btn-secondary" to={`/report/${report._id}`}>Detaljno</Link>
                    </div>
                </td>
            </tr>

        )
    }
}


ReportArchieve.propTypes = {
    report: PropTypes.object.isRequired
}

export default ReportArchieve;

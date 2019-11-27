import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteReport } from '../../actions/dashboardActions';


class Report extends Component {

    onDeleteClick(id, e) {
        e.preventDefault();

        this.props.deleteReport(id);
    }


    render() {

        const { report, auth } = this.props;

        return (
            <tr id="toDownload">
                <td>{report.workplace}</td>
                <td style={{ color: 'green' }}>{parseFloat(report.visaCard, 10) + parseFloat(report.virman, 10) + parseFloat(report.cash, 10) + parseFloat(report.companyCard, 10)} KM</td>
                <td>{report.person}</td>
                <td>{report.date.slice(8, 10) + '.' + report.date.slice(5, 7) + '.' + report.date.slice(0, 4) + '.'}</td>
                <td>
                    <div className="container">
                        <Link className="btn btn-secondary" to={`/report/${report._id}`}>Detaljno</Link>
                    </div>
                </td>
                <td>
                    {auth.user.id === report.user ? (
                        <div className="container">
                            <Link to={`/update/report/${report._id}`} className="mr-1"><i className="fas fa-edit" title="Edit"></i></Link>
                            <button onClick={this.onDeleteClick.bind(this, report._id)}>
                                <i title="Delete" className="fas fa-times" style={{ cursor: 'pointer', color: 'red' }}></i>
                            </button>
                        </div>

                    ) : (
                            <p>-</p>
                        )}
                </td>
            </tr>
        )
    }
}

Report.propTypes = {
    report: PropTypes.object,
    auth: PropTypes.object.isRequired,
    deleteReport: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { deleteReport })(Report);

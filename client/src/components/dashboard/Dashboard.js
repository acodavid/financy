import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTodaysReports, getTodaysAmmount, getCurrentMonthAmmount, getCurrentWeekAmmount, getCurrentYearAmmount } from '../../actions/dashboardActions';
import Report from './Report';
import spinner from '../../../src/spinner.gif'


class Dashboard extends Component {

    componentDidMount() {

        if (this.props.auth.user.type === 'arhive') {
            this.props.history.push('/archive');
        }

        this.props.getTodaysReports();
        this.props.getTodaysAmmount();
        this.props.getCurrentMonthAmmount();
        this.props.getCurrentWeekAmmount();
        this.props.getCurrentYearAmmount();
    }

    render() {

        const { today, todayAmmount, monthAmmount, weekAmmount, yearAmmount } = this.props.dashboard;

        const { user } = this.props.auth;

        let content;

        let flag = false;

        const bgColor = {
            Gray: "#EEEEEE"
        }

        if (today === null) {
            content = (
                <div className="text-center">
                    <img src={spinner} alt="Ucitavanje..." />
                </div>
            )
        } else {
            if (today.length > 0) {

                if (user.type === 'company') {

                    const filtered = today.filter(report => report.workplace === user.workplace);

                    content = filtered.map(report => (
                        <Report key={report._id} report={report} />
                    ))
                }
                else {

                    content = today.map(report => (
                        <Report key={report._id} report={report} />
                    ))

                }

                flag = true;
            } else {
                content = <p style={{ textAlign: "center" }} className="lead mb-3 mt-5">Jos nisu podneseni danasnji izvjestaji</p>
            }
        }

        return (
            <div className="container">
                <div className="row mb-4">
                    <div className="col md-3" style={{ backgroundColor: bgColor.Gray }}>
                        <i className="fa fa-calendar-day mr-2" style={{ fontSize: 15 }}></i>
                        Danasnji profit:
                        <p style={{ fontSize: 40 }}>{todayAmmount} KM</p>
                    </div>
                    <div className="col md-3">
                        <i className="fa fa-calendar-week mr-2" style={{ fontSize: 15 }}></i>
                        Sedmicni profit:
                        <p style={{ fontSize: 40 }}>{weekAmmount} KM</p>
                    </div>
                    <div className="col md-3" style={{ backgroundColor: bgColor.Gray }}>
                        <i className="fa fa-calendar-alt mr-2" style={{ fontSize: 15 }}></i>
                        Mjesecni profit:
                        <p style={{ fontSize: 40 }}>{monthAmmount} KM</p>
                    </div>
                    <div className="col md-3">
                        <i className="fa fa-calendar mr-2" style={{ fontSize: 15 }}></i>
                        Godisnji profit:
                        <p style={{ fontSize: 40 }}>{yearAmmount} KM</p>
                    </div>
                </div>

                {flag ? (
                    <table className="table table-hover">
                        <thead className="text-center">
                            <tr>
                                <th scope="col">RADNJA</th>
                                <th scope="col">PROFIT</th>
                                <th scope="col">AUTOR IZVJESTAJA</th>
                                <th scope="col">DATUM</th>
                                <th scope="col">DETALJNO</th>
                                <th scope="col">AKCIJE</th>
                            </tr>

                        </thead>
                        <tbody className="text-center">
                            {content}
                        </tbody>
                    </table>
                ) : (
                        <div className="container">
                            {content}
                        </div>
                    )}



                <Link to="/create/report" className="btn btn-secondary btn-block">Podnesi izvjestaj</Link>
            </div >
        )
    }
}

Dashboard.propTypes = {
    dashboard: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getTodaysReports: PropTypes.func.isRequired,
    getTodaysAmmount: PropTypes.func.isRequired,
    getCurrentMonthAmmount: PropTypes.func.isRequired,
    getCurrentWeekAmmount: PropTypes.func.isRequired,
    getCurrentYearAmmount: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    dashboard: state.dashboard,
    auth: state.auth
})

export default connect(mapStateToProps, { getTodaysReports, getTodaysAmmount, getCurrentMonthAmmount, getCurrentWeekAmmount, getCurrentYearAmmount })(Dashboard);

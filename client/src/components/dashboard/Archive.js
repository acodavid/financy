import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllReports } from '../../actions/archieveActions';
import spinner from '../../../src/spinner.gif'
import ReportArchieve from './ReportArchieve';

class Archive extends Component {

    constructor() {
        super();
        this.state = {
            year: new Date().getFullYear().toString(),
            month: (new Date().getMonth() + 1).toString()
        };

        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        if (this.props.auth.user.type === 'company') {
            this.props.history.push('/')
        }

        this.props.getAllReports();

    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });

    }

    render() {

        const { reports } = this.props.archieve;
        let content;
        let flag = false;

        if (reports === null) {
            content = (
                <div className="text-center">
                    <img src={spinner} alt="Ucitavanje..." />
                </div>
            )
        } else {
            if (reports.length > 0) {

                const { year, month } = this.state;

                const filtered = reports.filter(report => report.date.slice(0, 4) === year && report.date.slice(5, 7) === month)

                content = filtered.map(report => (
                    <ReportArchieve key={report._id} report={report} />
                ))

                flag = true;

            } else {
                content = (
                    <p className="lead">Ne postoji ni jedan izvjestaj</p>
                )
            }
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <select className="form-control form-control-lg mb-5" name="year" id="year" value={this.state.year} onChange={this.onChange}>
                            <option value={2019}>2019</option>
                            <option value={2018}>2018</option>
                            <option value={2017}>2017</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <select className="form-control form-control-lg mb-5" name="month" id="month" value={this.state.month} onChange={this.onChange}>
                            <option value='01'>January</option>
                            <option value='02'>February</option>
                            <option value='03'>March</option>
                            <option value='04'>April</option>
                            <option value='05'>May</option>
                            <option value='06'>June</option>
                            <option value='07'>July</option>
                            <option value='08'>August</option>
                            <option value='09'>September</option>
                            <option value='10'>October</option>
                            <option value='11'>November</option>
                            <option value='12'>December</option>
                        </select>
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
                            </tr>

                        </thead>
                        <tbody className="text-center">
                            {content}
                        </tbody>
                    </table>
                ) : null}
            </div>
        )
    }
}

Archive.propTypes = {
    auth: PropTypes.object.isRequired,
    archieve: PropTypes.object.isRequired,
    getAllReports: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    archieve: state.archieve
})

export default connect(mapStateToProps, { getAllReports })(Archive);

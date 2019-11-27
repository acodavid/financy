import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import { getCompanies, getArhive, getStatPerson } from '../../actions/companiesActions';
import Company from './Company';

import spinner from '../../../src/spinner.gif'

class Companies extends Component {

    componentDidMount() {
        if (!this.props.auth.user.isAdmin) {
            this.props.history.push('/')
        }

        this.props.getCompanies();
        this.props.getArhive();
        this.props.getStatPerson();
    }

    render() {

        const { companies, arhive, statistic } = this.props.companies;

        let content;

        if (companies === null || arhive === null || statistic === null) {
            content = (
                <div className="text-center">
                    <img src={spinner} alt="Ucitavanje..." />
                </div>
            )
        } else {
            if (companies.length > 0 || arhive.length > 0 || statistic.length > 0) {
                const first = companies.map(company =>
                    (
                        <Company key={company._id} company={company} />
                    )

                )

                const second = arhive.map(company =>
                    (
                        <Company key={company._id} company={company} />
                    )

                )

                const third = statistic.map(company =>
                    (
                        <Company key={company._id} company={company} />
                    )

                )

                content = (
                    <div className="container">
                        <div className="container">
                            <h5 style={{ float: 'left' }} className="ml-3 mb-3 mt-3">Radnje:</h5>
                            <table className="table table-hover">
                                <thead className="text-center">
                                    <tr>
                                        <th scope="col">Naziv</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Lokacija</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {first}
                                </tbody>
                            </table>
                        </div>
                        <div className="container">
                            <h5 style={{ float: 'left' }} className="ml-3 mb-3 mt-5">Analiticari:</h5>
                            <table className="table table-hover">
                                <thead className="text-center">
                                    <tr>
                                        <th scope="col">Naziv</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Lokacija</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {second}
                                </tbody>
                            </table>
                        </div>
                        <div className="container">
                            <h5 style={{ float: 'left' }} className="ml-3 mb-3 mt-5">Statisticari:</h5>
                            <table className="table table-hover">
                                <thead className="text-center">
                                    <tr>
                                        <th scope="col">Naziv</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Lokacija</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {third}
                                </tbody>
                            </table>
                        </div>

                    </div>
                )
            }
            else {
                content = <p>Nemate korisnike, molimo vas da ih dodate.</p>
            }
        }

        return (
            <div className="container text-center">
                {content}

                <Link to="/register" className="btn btn-secondary btn-block mt-4 mb-5">Dodaj Radnju / Dodaj Analiticara / Dodaj Statisticara</Link>
            </div>
        )
    }
}

Companies.propTypes = {
    auth: PropTypes.object.isRequired,
    companies: PropTypes.object.isRequired,
    getCompanies: PropTypes.func.isRequired,
    getArhive: PropTypes.func.isRequired,
    getStatPerson: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    companies: state.companies
})

export default connect(mapStateToProps, { getCompanies, getArhive, getStatPerson })(Companies);

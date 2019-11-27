import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { getReportById, updateReport } from '../../actions/dashboardActions';
import { clearErrors } from '../../actions/authActions'

class UpdateReport extends Component {

    constructor() {
        super();
        this.state = {
            person: '',
            shift: 'Prva',
            visaCard: '',
            virman: '',
            cash: '',
            companyCard: '',
            customersIn: '',
            customersWithBill: '',
            showGoods: false,
            goodsNotHave: '',
            showUnhappy: false,
            unhappyCustomers: '',
            showPraise: false,
            praiseCustomer: '',
            showAcceptanceGoods: false,
            acceptanceGoods: '',
            orderingItemSold: false,
            showGeneralProblems: false,
            generalProblems: '',
            showUnsolvedProblems: false,
            unsolvedProblems: '',
            showReclamation: false,
            reclamation: '',
            showProblemsCashRegister: false,
            problemsCashRegister: '',
            sendedReportCashRegister: false,
            resetCashRegister: false,
            suggestion: '',
            other: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onClickgoods = this.onClickgoods.bind(this);
        this.onClickgoodsNot = this.onClickgoodsNot.bind(this);
        this.onClickUnhappy = this.onClickUnhappy.bind(this);
        this.onClickUnhappyNot = this.onClickUnhappyNot.bind(this);
        this.onClickPraise = this.onClickPraise.bind(this);
        this.onClickPraiseNot = this.onClickPraiseNot.bind(this);
        this.onClickAcceptance = this.onClickAcceptance.bind(this);
        this.onClickAcceptanceNot = this.onClickAcceptanceNot.bind(this);
        this.onClickGeneral = this.onClickGeneral.bind(this);
        this.onClickGeneralNot = this.onClickGeneralNot.bind(this);
        this.onClickUnsolved = this.onClickUnsolved.bind(this);
        this.onClickUnsolvedNot = this.onClickUnsolvedNot.bind(this);
        this.onClickReclamation = this.onClickReclamation.bind(this);
        this.onClickReclamationNot = this.onClickReclamationNot.bind(this);
        this.onClickRegister = this.onClickRegister.bind(this);
        this.onClickRegisterNot = this.onClickRegisterNot.bind(this);


    }

    componentDidMount() {

        this.props.getReportById(this.props.match.params.id);

    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {

        if (nextProps.dashboard.report) {
            const report = nextProps.dashboard.report;

            this.setState({
                person: report.person,
                shift: report.shift,
                visaCard: report.visaCard,
                virman: report.virman,
                cash: report.cash,
                companyCard: report.companyCard,
                customersIn: report.customersIn,
                customersWithBill: report.customersWithBill,
                goodsNotHave: report.goodsNotHave,
                unhappyCustomers: report.unhappyCustomers,
                praiseCustomer: report.praiseCustomer,
                acceptanceGoods: report.acceptanceGoods,
                generalProblems: report.generalProblems,
                unsolvedProblems: report.unsolvedProblems,
                reclamation: report.reclamation,
                problemsCashRegister: report.problemsCashRegister,
                sendedReportCashRegister: report.sendedReportCashRegister,
                resetCashRegister: report.resetCashRegister,
                suggestion: report.suggestion,
                other: report.other
            })
        }

        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }

    }

    onSubmit(id, e) {
        e.preventDefault();

        const newReport = {
            _id: id,
            person: this.state.person,
            shift: this.state.shift,
            visaCard: this.state.visaCard,
            virman: this.state.virman,
            cash: this.state.cash,
            companyCard: this.state.companyCard,
            customersIn: this.state.customersIn,
            customersWithBill: this.state.customersWithBill,
            goodsNotHave: this.state.goodsNotHave,
            unhappyCustomers: this.state.unhappyCustomers,
            praiseCustomer: this.state.praiseCustomer,
            acceptanceGoods: this.state.acceptanceGoods,
            orderingItemSold: this.state.orderingItemSold,
            generalProblems: this.state.generalProblems,
            unsolvedProblems: this.state.unsolvedProblems,
            reclamation: this.state.reclamation,
            problemsCashRegister: this.state.problemsCashRegister,
            sendedReportCashRegister: this.state.sendedReportCashRegister,
            resetCashRegister: this.state.resetCashRegister,
            suggestion: this.state.suggestion,
            other: this.state.other
        }

        this.props.updateReport(newReport, this.props.history);

        this.setState({
            person: '',
            shift: 'Prva',
            visaCard: '',
            virman: '',
            cash: '',
            companyCard: '',
            customersIn: '',
            customersWithBill: '',
            showGoods: false,
            goodsNotHave: '',
            showUnhappy: false,
            unhappyCustomers: '',
            showPraise: false,
            praiseCustomer: '',
            showAcceptanceGoods: false,
            acceptanceGoods: '',
            orderingItemSold: false,
            showGeneralProblems: false,
            generalProblems: '',
            showUnsolvedProblems: false,
            unsolvedProblems: '',
            showReclamation: false,
            reclamation: '',
            showProblemsCashRegister: false,
            problemsCashRegister: '',
            sendedReportCashRegister: false,
            resetCashRegister: false,
            suggestion: '',
            other: ''
        })

    }

    onClickgoods(e) {
        e.preventDefault();

        this.setState({
            showGoods: true
        })
    }

    onClickgoodsNot(e) {
        e.preventDefault()

        this.setState({
            showGoods: false,
            goodsNotHave: ''
        })
    }

    onClickUnhappy(e) {
        e.preventDefault();

        this.setState({
            showUnhappy: true
        })
    }

    onClickUnhappyNot(e) {
        e.preventDefault();

        this.setState({
            showUnhappy: false,
            unhappyCustomers: ''
        })
    }

    onClickPraise(e) {
        e.preventDefault();
        this.setState({
            showPraise: true
        })
    }
    onClickPraiseNot(e) {
        e.preventDefault();
        this.setState({
            showPraise: false,
            praiseCustomer: ''
        })
    }

    onClickAcceptance(e) {
        e.preventDefault();
        this.setState({
            showAcceptanceGoods: true
        })
    }
    onClickAcceptanceNot(e) {
        e.preventDefault();
        this.setState({
            showAcceptanceGoods: false,
            acceptanceGoods: ''
        })
    }

    onClickGeneral(e) {
        e.preventDefault();
        this.setState({
            showGeneralProblems: true
        })
    }
    onClickGeneralNot(e) {
        e.preventDefault();
        this.setState({
            showGeneralProblems: false,
            generalProblems: ''
        })
    }

    onClickUnsolved(e) {
        e.preventDefault();
        this.setState({
            showUnsolvedProblems: true
        })
    }
    onClickUnsolvedNot(e) {
        e.preventDefault();
        this.setState({
            showUnsolvedProblems: false,
            unsolvedProblems: ''
        })
    }

    onClickReclamation(e) {
        e.preventDefault();
        this.setState({
            showReclamation: true
        })
    }
    onClickReclamationNot(e) {
        e.preventDefault();
        this.setState({
            showReclamation: false,
            reclamation: ''
        })
    }

    onClickRegister(e) {
        e.preventDefault();
        this.setState({
            showProblemsCashRegister: true
        })
    }
    onClickRegisterNot(e) {
        e.preventDefault();
        this.setState({
            showProblemsCashRegister: false,
            problemsCashRegister: ''
        })
    }

    render() {

        const { shift, visaCard, virman, cash, companyCard, customersIn, customersWithBill, goodsNotHave, unhappyCustomers, praiseCustomer, acceptanceGoods, orderingItemSold, generalProblems, unsolvedProblems, reclamation, problemsCashRegister, sendedReportCashRegister, resetCashRegister, suggestion, other, showGoods, showUnhappy, showPraise, showAcceptanceGoods, showGeneralProblems, showUnsolvedProblems, showReclamation, showProblemsCashRegister, person, errors } = this.state;

        return (
            <div className="container">
                <form onSubmit={this.onSubmit.bind(this, this.props.match.params.id)}>
                    <div className="form-group">
                        <label htmlFor="person">Ime i prezime: </label>
                        <input type="text" value={person} onChange={this.onChange} className="form-control form-control-lg mb-2" name="person" id="person" placeholder="Ime i prezime" />
                        {errors.person ? (
                            <p className="ml-2" style={{ color: 'red' }}>{errors.person}</p>
                        ) : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="shift">Smjena:</label>
                        <select className="form-control form-control-lg mb-1" name="shift" id="shift" onChange={this.onChange} value={shift}>
                            <option value="Prva">Prva</option>
                            <option value="Druga">Druga</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="visaCard">Pos. term: </label>
                        <input type="number" value={visaCard} onChange={this.onChange} className="form-control form-control-lg mb-2" name="visaCard" id="visaCard" placeholder="Pos. term" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="virman">Virman: </label>
                        <input type="number" value={virman} onChange={this.onChange} className="form-control form-control-lg mb-2" name="virman" id="virman" placeholder="Virman" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cash">Gotovina: </label>
                        <input type="number" value={cash} onChange={this.onChange} className="form-control form-control-lg mb-2" name="cash" id="cash" placeholder="Gotovina" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="companyCard">Kartica firme: </label>
                        <input type="number" value={companyCard} onChange={this.onChange} className="form-control form-control-lg mb-2" name="companyCard" id="companyCard" placeholder="Kartica firme" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="customersIn">Broj kupaca koji su usli u radnju: </label>
                        <input type="number" value={customersIn} onChange={this.onChange} className="form-control form-control-lg mb-2" name="customersIn" id="customersIn" placeholder="Broj kupaca" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="customersWithBill">Broj ostvarenih kupovina: </label>
                        <input type="number" value={customersWithBill} onChange={this.onChange} className="form-control form-control-lg mb-2" name="customersWithBill" id="customersWithBill" placeholder="Broj kupovina" />
                    </div>

                    <p>Upit za robom koju ne posjedujemo: </p>
                    <button className="btn btn-secondary mb-3 mr-1" onClick={this.onClickgoods}>Da</button>
                    <button className="btn btn-secondary mb-3" onClick={this.onClickgoodsNot}>Ne</button>
                    {showGoods ? (
                        <div className="form-group mb-3">
                            <textarea name="goodsNotHave" id="goodsNotHave" cols="30" rows="5" className="form-control form-control-lg mb-3" value={goodsNotHave} onChange={this.onChange}></textarea>
                        </div>

                    ) : null}

                    <p>Nezadovoljstvo kupaca: </p>
                    <button className="btn btn-secondary mb-3 mr-1" onClick={this.onClickUnhappy}>Da</button>
                    <button className="btn btn-secondary mb-3" onClick={this.onClickUnhappyNot}>Ne</button>
                    {showUnhappy ? (
                        <div className="form-group mb-3">
                            <textarea name="unhappyCustomers" id="unhappyCustomers" cols="30" rows="5" className="form-control form-control-lg mb-3" value={unhappyCustomers} onChange={this.onChange}></textarea>
                        </div>
                    ) : null}

                    <p>Pohvale kupaca: </p>
                    <button className="btn btn-secondary mb-3 mr-1" onClick={this.onClickPraise}>Da</button>
                    <button className="btn btn-secondary mb-3" onClick={this.onClickPraiseNot}>Ne</button>
                    {showPraise ? (
                        <div className="form-group mb-3">
                            <textarea name="praiseCustomer" id="praiseCustomer" cols="30" rows="5" className="form-control form-control-lg mb-3" value={praiseCustomer} onChange={this.onChange}></textarea>
                        </div>
                    ) : null}

                    <p>Prijem robe: </p>
                    <button className="btn btn-secondary mb-3 mr-1" onClick={this.onClickAcceptance}>Da</button>
                    <button className="btn btn-secondary mb-3" onClick={this.onClickAcceptanceNot}>Ne</button>
                    {showAcceptanceGoods ? (
                        <div className="form-group mb-3">
                            <textarea name="acceptanceGoods" id="acceptanceGoods" cols="30" rows="5" className="form-control form-control-lg mb-3" value={acceptanceGoods} onChange={this.onChange}></textarea>
                        </div>
                    ) : null}

                    <div className="form-group">
                        <label htmlFor="orderingItemSold">Da li je poslata narudza prodatih artikala proteklog dana? </label>
                        <select className="form-control form-control-lg mb-1" name="orderingItemSold" id="orderingItemSold" onChange={this.onChange} value={orderingItemSold}>
                            <option value="true">Da</option>
                            <option value="false">Ne</option>
                        </select>
                    </div>

                    <p>Uopsteni problemi: </p>
                    <button className="btn btn-secondary mb-3 mr-1" onClick={this.onClickGeneral}>Da</button>
                    <button className="btn btn-secondary mb-3" onClick={this.onClickGeneralNot}>Ne</button>
                    {showGeneralProblems ? (
                        <div className="form-group mb-3">
                            <textarea name="generalProblems" id="generalProblems" cols="30" rows="5" className="form-control form-control-lg mb-3" value={generalProblems} onChange={this.onChange}></textarea>
                        </div>
                    ) : null}

                    <p>Nerjesivi problemi: </p>
                    <button className="btn btn-secondary mb-3 mr-1" onClick={this.onClickUnsolved}>Da</button>
                    <button className="btn btn-secondary mb-3" onClick={this.onClickUnsolvedNot}>Ne</button>
                    {showUnsolvedProblems ? (
                        <div className="form-group mb-3">
                            <textarea name="unsolvedProblems" id="unsolvedProblems" cols="30" rows="5" className="form-control form-control-lg mb-3" value={unsolvedProblems} onChange={this.onChange}></textarea>
                        </div>
                    ) : null}

                    <p>Reklamacije: </p>
                    <button className="btn btn-secondary mb-3 mr-1" onClick={this.onClickReclamation}>Da</button>
                    <button className="btn btn-secondary mb-3" onClick={this.onClickReclamationNot}>Ne</button>
                    {showReclamation ? (
                        <div className="form-group mb-3">
                            <textarea name="reclamation" id="reclamation" cols="30" rows="5" className="form-control form-control-lg mb-3" value={reclamation} onChange={this.onChange}></textarea>
                        </div>
                    ) : null}

                    <p>Probemi sa kasom, pos term...: </p>
                    <button className="btn btn-secondary mb-3 mr-1" onClick={this.onClickRegister}>Da</button>
                    <button className="btn btn-secondary mb-3" onClick={this.onClickRegisterNot}>Ne</button>
                    {showProblemsCashRegister ? (
                        <div className="form-group mb-3">
                            <textarea name="problemsCashRegister" id="problemsCashRegister" cols="30" rows="5" className="form-control form-control-lg mb-3" value={problemsCashRegister} onChange={this.onChange}></textarea>
                        </div>
                    ) : null}

                    <div className="form-group">
                        <label htmlFor="sendedReportCashRegister">Izvjestaj Pos kase??? </label>
                        <select className="form-control form-control-lg mb-1" name="sendedReportCashRegister" id="sendedReportCashRegister" onChange={this.onChange} value={sendedReportCashRegister}>
                            <option value="true">Da</option>
                            <option value="false">Ne</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="resetCashRegister">Da li je obrisan PCM za protekli dan??? </label>
                        <select className="form-control form-control-lg mb-1" name="resetCashRegister" id="resetCashRegister" onChange={this.onChange} value={resetCashRegister}>
                            <option value="true">Da</option>
                            <option value="false">Ne</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="suggestion">Prijedlozi za unapredjenje: </label>
                        <textarea name="suggestion" id="suggestion" cols="30" rows="5" className="form-control form-control-lg mb-3" value={suggestion} onChange={this.onChange} placeholder="Sugestije"></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="other">Kako je prosao dan (kratko i konkretno): </label>
                        <textarea name="other" id="other" cols="30" rows="5" className="form-control form-control-lg mb-3" value={other} onChange={this.onChange} placeholder="Ostalo"></textarea>
                        {errors.other ? (
                            <p className="ml-2" style={{ color: 'red' }}>{errors.other}</p>
                        ) : null}
                    </div>

                    <input type="submit" value="Potvrdi" className="btn btn-secondary btn-block mb-5" />

                </form>
            </div>
        )
    }
}

UpdateReport.propTypes = {
    dashboard: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    getReportById: PropTypes.func.isRequired,
    updateReport: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    dashboard: state.dashboard,
    errors: state.errors
})

export default connect(mapStateToProps, { getReportById, updateReport, clearErrors })(withRouter(UpdateReport));

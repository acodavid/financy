import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getReportById } from '../../actions/dashboardActions';
import spinner from '../../../src/spinner.gif';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


class SingleReport extends Component {

    componentDidMount() {

        this.props.getReportById(this.props.match.params.id);

    }

    downloadPdf(e) {

        e.preventDefault();

        const input = document.getElementById('toDownload');

        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');

                const pdf = new jsPDF('a4');
                pdf.addImage(imgData, 'JPEG', 0, 0, 211, 298);
                pdf.save("download.pdf");
            })

    }

    render() {

        const { report } = this.props.dashboard;

        let content;

        if (report === null) {
            content = (
                <div className="text-center">
                    <img src={spinner} alt="Ucitavanje..." />
                </div>
            )
        } else {
            content = (
                <div className="container">

                    <div className="toFix row" style={{ backgroundColor: '#F5F5F5' }}>
                        <div className="col-md-4">
                            <p style={{ fontWeight: 'bold' }}>Ime i prezime:</p>
                            <p>{report.person}</p>
                        </div>
                        <div className="col-md-4">
                            <p style={{ fontWeight: 'bold' }}>Radnja:</p>
                            <p>{report.workplace}</p>
                        </div>
                        <div className="col-md-4">
                            <p style={{ fontWeight: 'bold' }}>Smjena:</p>
                            <p>{report.shift}</p>
                        </div>
                    </div>

                    <div className="toFix row">
                        <div className="col-md-4">
                            <p style={{ fontWeight: 'bold' }}>Profit:</p>
                            <p>Pos. term: {report.visaCard} KM</p>
                            <p>Virman: {report.virman} KM</p>
                            <p>Gotovina: {report.cash} KM</p>
                            <p>Kartica firme: {report.companyCard} KM</p>
                            <p> <p style={{ fontWeight: 'bold' }}>Ukupan profit: </p> <p style={{ color: 'green', fontWeight: 'bold' }}>{parseFloat(report.visaCard) + parseFloat(report.virman) + parseFloat(report.cash) + parseFloat(report.companyCard)} KM</p></p>
                        </div>
                        <div className="col-md-4">
                            <p> <p style={{ fontWeight: 'bold' }}>Broj kupaca koji su usli u radnju:</p> {report.customersIn}</p>
                            <p> <p style={{ fontWeight: 'bold' }}>Broj ostvarenih kupovina: </p>{report.customersWithBill}</p>
                        </div>
                        <div className="col-md-4">
                            <p> <p style={{ fontWeight: 'bold' }}>Da li je poslata narudzba prodatih artikala proteklog dana? </p> <p >{report.orderingItemSold ? (<p>Da</p>) : null}</p></p>

                            <p> <p style={{ fontWeight: 'bold' }}>Da li je poslat izvjestaj POS kase? </p>             <p >{report.sendedReportCashRegister ? (<p>Da</p>) : (<p>Ne</p>)}</p>
                            </p>

                            <p> <p style={{ fontWeight: 'bold' }}>Obrisan PCM za protekli dan? </p> <p >{report.resetCashRegister ? (<p>Da</p>) : (<p>Ne</p>)}</p></p>
                        </div>
                    </div>

                    <div className="toFix row" style={{ backgroundColor: '#F5F5F5' }}>
                        <div className="col-md-4">
                            <p style={{ fontWeight: 'bold' }}>Upit za robom koju ne posjedujemo:</p>
                            <p>{report.goodsNotHave}</p>
                        </div>
                        <div className="col-md-4">
                            <p style={{ fontWeight: 'bold' }}>Nezadovoljstvo kupaca:</p>
                            <p>{report.unhappyCustomers}</p>
                        </div>
                        <div className="col-md-4">
                            <p style={{ fontWeight: 'bold' }}>Pohvale kupaca:</p>
                            <p>{report.praiseCustomer}</p>
                        </div>
                    </div>

                    <div className="toFix row">
                        <div className="col-md-4">
                            <p style={{ fontWeight: 'bold' }}>Prijem robe:</p>
                            <p>{report.acceptanceGoods}</p>
                        </div>
                        <div className="col-md-4">
                            <p style={{ fontWeight: 'bold' }}>Uopsteni problemi:</p>
                            <p>{report.generalProblems}</p>
                        </div>
                        <div className="col-md-4">
                            <p style={{ fontWeight: 'bold' }}>Nerjesivi problemi:</p>
                            <p>{report.unsolvedProblems}</p>
                        </div>
                    </div>

                    <div className="toFix row" style={{ backgroundColor: '#F5F5F5' }}>
                        <div className="col-md-4">
                            <p style={{ fontWeight: 'bold' }}>Reklamacije:</p>
                            <p>{report.reclamation}</p>
                        </div>
                        <div className="col-md-4">
                            <p style={{ fontWeight: 'bold' }}>Problemi sa kasom, pos. term:</p>
                            <p>{report.problemsCashRegister}</p>
                        </div>
                        <div className="col-md-4">
                            <p style={{ fontWeight: 'bold' }}>Prijedlozi za unapredjenje:</p>
                            <p>{report.suggestion}</p>
                        </div>
                    </div>

                    <div className="toFix row m-auto">
                        <p className="ml-2 mr-2" style={{ fontWeight: 'bold' }}> Kako je prosao dan? </p>
                        <p>{report.other}</p>
                    </div>

                </div>
            )


        }

        return (
            <div className="container">
                <button onClick={this.downloadPdf.bind(this)} className="btn btn-block btn-secondary mt-3">Preuzmi izvjestaj</button>
                <div className="mt-3" id="toDownload">
                    {content}
                </div>
            </div>
        )
    }
}

SingleReport.propTypes = {
    getReportById: PropTypes.func.isRequired,
    dashboard: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    dashboard: state.dashboard,
    auth: state.auth
})

export default connect(mapStateToProps, { getReportById })(SingleReport);
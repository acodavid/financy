import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getReportById } from '../../actions/dashboardActions';
import spinner from '../../../src/spinner.gif';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';

import ReportPDF from '../pdf/ReportPDF';



class SingleReport extends Component {

    componentDidMount() {

        this.props.getReportById(this.props.match.params.id);

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
                <div>
                    <PDFDownloadLink className="btn btn-block btn-secondary mt-3 mb-3" document={<ReportPDF report={report} />} fileName={`report_${report.date}.pdf`}>Preuzmi izvještaj</PDFDownloadLink>
                    <PDFViewer width="100%" height="600px">
                        <ReportPDF report={report} />
                    </PDFViewer>
                </div>
            )


        }

        return (
            <div className="container">
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
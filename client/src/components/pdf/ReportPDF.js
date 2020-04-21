import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        fontSize: 12
    },
    row: {
        margin: 5,
        padding: 5,
        alignItems: 'flex-start',
        flexGrow: 0,
        flexDirection: 'row',
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#e4e4e4'
    },
    sectionRow: {
        margin: 7,
        padding: 7,
        flexGrow: 1
    },
    marginBottom: {
        marginBottom: 5
    }
});

class ReportPDF extends Component {
    render() {

        const { report } = this.props;

        const sum = parseFloat(report.visaCard) + parseFloat(report.virman) + parseFloat(report.cash) + parseFloat(report.companyCard);

        return (
            <Document title="Izvještaj" author={report.author}>
                <Page wrap size="A4" style={styles.page}>

                    <View style={styles.row}>
                        <View style={styles.sectionRow}>
                            <Text>Ime i prezime:</Text>
                            <Text style={styles.marginBottom}>{report.person}</Text>
                            <Text>Smjena:</Text>
                            <Text style={styles.marginBottom}>{report.shift}</Text>
                            <Text>Radnja:</Text>
                            <Text>{report.workplace}</Text>
                        </View>
                        <View style={styles.sectionRow}>
                            <Text>Pos. term: {report.visaCard}KM</Text>
                            <Text>Gotovina: {report.cash}KM</Text>
                            <Text>Virman: {report.virman}KM</Text>
                            <Text style={styles.marginBottom}>Kartica firme: {report.companyCard}KM</Text>
                            <Text>Ukupan profit:</Text>
                            <Text>{sum}KM</Text>
                        </View>
                        <View style={styles.sectionRow}>
                            <Text>Broj kupaca koji</Text>
                            <Text style={styles.marginBottom}> su ušli u radnju: <Text>{report.customersIn}</Text></Text>
                            <Text>Broj ostvarenih</Text>
                            <Text> kupovina: <Text>{report.customersWithBill}</Text></Text>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.sectionRow}>
                            <Text style={styles.marginBottom}>Da li je poslata narudžba prodatih artikala proteklog dana? <Text>{report.orderingItemSold ? (
                                <Text>Da</Text>
                            ) : (
                                    <Text>Ne</Text>
                                )}</Text></Text>
                            <Text style={styles.marginBottom}>Da li je poslat izvještaj POS kase? <Text>{report.sendedReportCashRegister ? (
                                <Text>Da</Text>
                            ) : (
                                    <Text>Ne</Text>
                                )}</Text></Text>
                            <Text>Obrisan PCM za protekli dan? <Text>{report.resetCashRegister ? (
                                <Text>Da</Text>
                            ) : (
                                    <Text>Ne</Text>
                                )}</Text></Text>
                        </View>
                    </View>

                    <View wrap={false} style={styles.row}>
                        <View style={styles.sectionRow}>
                            <Text style={styles.marginBottom}>Upit za robom koju ne posjedujemo:</Text>
                            <Text>{report.goodsNotHave}</Text>
                        </View>
                    </View>

                    <View wrap={false} style={styles.row}>
                        <View style={styles.sectionRow}>
                            <Text style={styles.marginBottom}>Pohvale kupaca:</Text>
                            <Text>{report.praiseCustomer}</Text>
                        </View>
                    </View>

                    <View wrap={false} style={styles.row}>
                        <View style={styles.sectionRow}>
                            <Text style={styles.marginBottom}>Uopšteni problemi:</Text>
                            <Text>{report.generalProblems}</Text>
                        </View>
                    </View>

                    <View wrap={false} style={styles.row}>
                        <View style={styles.sectionRow}>
                            <Text style={styles.marginBottom}>Reklamacije:</Text>
                            <Text>{report.reclamation}</Text>
                        </View>
                    </View>

                    <View wrap={false} style={styles.row}>
                        <View style={styles.sectionRow}>
                            <Text style={styles.marginBottom}>Prijedlozi za unapredjenje:</Text>
                            <Text>{report.suggestion}</Text>
                        </View>
                    </View>

                    <View wrap={false} style={styles.row}>
                        <View style={styles.sectionRow}>
                            <Text style={styles.marginBottom}>Nezadovoljstvo kupaca:</Text>
                            <Text>{report.unhappyCustomers}</Text>
                        </View>
                    </View>

                    <View wrap={false} style={styles.row}>
                        <View style={styles.sectionRow}>
                            <Text style={styles.marginBottom}>Prijem robe:</Text>
                            <Text>{report.acceptanceGoods}</Text>
                        </View>
                    </View>

                    <View wrap={false} style={styles.row}>
                        <View style={styles.sectionRow}>
                            <Text style={styles.marginBottom}>Nerješivi problemi:</Text>
                            <Text>{report.unsolvedProblems}</Text>
                        </View>
                    </View>

                    <View wrap={false} style={styles.row}>
                        <View style={styles.sectionRow}>
                            <Text style={styles.marginBottom}>Problemi sa kasom, pos. term:</Text>
                            <Text>{report.problemsCashRegister}</Text>
                        </View>
                    </View>

                    <View wrap={false} style={styles.row}>
                        <View style={styles.sectionRow}>
                            <Text style={styles.marginBottom}>Kako je prošao dan?</Text>
                            <Text>{report.other}</Text>
                        </View>
                    </View>


                </Page>
            </Document>
        )
    }
}

ReportPDF.propTypes = {
    report: PropTypes.object.isRequired
}

export default ReportPDF;


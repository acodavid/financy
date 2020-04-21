import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCurrentYearMonth, getLastYearMonth, getPastYearMonth, clearStatistics } from '../../actions/statActions'
import spinner from '../../../src/spinner.gif'

class Statistics extends Component {

    componentDidMount() {

        if (this.props.auth.user.type === 'company' || this.props.auth.user.type === 'arhive') {
            this.props.history.push('/')
        }

        this.props.clearStatistics();

        this.props.getCurrentYearMonth();
        this.props.getLastYearMonth();
        this.props.getPastYearMonth();

    }

    render() {

        const { statisticCurrent, statisticLast, statisticPast } = this.props.statistic;

        let content;


        if (statisticCurrent.length === 0 && statisticLast.length === 0 && statisticPast.length === 0) {
            content = (
                <div className="text-center">
                    <img src={spinner} alt="Ucitavanje..." />
                </div>
            )
        } else {
            if (statisticCurrent.length !== 12 || statisticLast.length !== 12 || statisticPast.length !== 12) {
                content = (
                    <div className="text-center">
                        <img src={spinner} alt="Ucitavanje..." />
                    </div>
                )
            }

            else if (statisticCurrent.length === 12 && statisticLast.length === 12 && statisticPast.length === 12) {

                statisticCurrent.sort((a, b) => a.month - b.month);
                statisticLast.sort((a, b) => a.month - b.month);
                statisticPast.sort((a, b) => a.month - b.month);

                let arrayOfPercentage = [];

                //00
                if (parseInt(statisticCurrent[0].value) > parseInt(statisticLast[0].value)) {
                    const item0 = parseInt(((parseFloat(statisticCurrent[0].value) - parseFloat(statisticLast[0].value)) / parseFloat(statisticLast[0].value)) * 100)
                    arrayOfPercentage.push(item0);
                } else {
                    const item0 = parseInt(((parseFloat(statisticCurrent[0].value) - parseFloat(statisticLast[0].value)) / parseFloat(statisticCurrent[0].value)) * 100)
                    arrayOfPercentage.push(item0);
                }

                //01
                if (parseInt(statisticCurrent[1].value) > parseInt(statisticLast[1].value)) {
                    const item1 = parseInt(((parseFloat(statisticCurrent[1].value) - parseFloat(statisticLast[1].value)) / parseFloat(statisticLast[1].value)) * 100);
                    arrayOfPercentage.push(item1)
                } else {
                    const item1 = parseInt(((parseFloat(statisticCurrent[1].value) - parseFloat(statisticLast[1].value)) / parseFloat(statisticCurrent[1].value)) * 100);
                    arrayOfPercentage.push(item1)
                }

                //02
                if (parseInt(statisticCurrent[2].value) > parseInt(statisticLast[2].value)) {
                    const item2 = parseInt(((parseFloat(statisticCurrent[2].value) - parseFloat(statisticLast[2].value)) / parseFloat(statisticLast[2].value)) * 100)
                    arrayOfPercentage.push(item2)
                } else {
                    const item2 = parseInt(((parseFloat(statisticCurrent[2].value) - parseFloat(statisticLast[2].value)) / parseFloat(statisticCurrent[2].value)) * 100)
                    arrayOfPercentage.push(item2)
                }

                //03
                if (parseInt(statisticCurrent[3].value) > parseInt(statisticLast[3].value)) {
                    const item3 = parseInt(((parseFloat(statisticCurrent[3].value) - parseFloat(statisticLast[3].value)) / parseFloat(statisticLast[3].value)) * 100)
                    arrayOfPercentage.push(item3)
                } else {
                    const item3 = parseInt(((parseFloat(statisticCurrent[3].value) - parseFloat(statisticLast[3].value)) / parseFloat(statisticCurrent[3].value)) * 100)
                    arrayOfPercentage.push(item3)
                }

                //04
                if (parseInt(statisticCurrent[4].value) > parseInt(statisticLast[4].value)) {
                    const item4 = parseInt(((parseFloat(statisticCurrent[4].value) - parseFloat(statisticLast[4].value)) / parseFloat(statisticLast[4].value)) * 100)
                    arrayOfPercentage.push(item4)
                } else {
                    const item4 = parseInt(((parseFloat(statisticCurrent[4].value) - parseFloat(statisticLast[4].value)) / parseFloat(statisticCurrent[4].value)) * 100)
                    arrayOfPercentage.push(item4)
                }

                //05
                if (parseInt(statisticCurrent[5].value) > parseInt(statisticLast[5].value)) {
                    const item5 = parseInt(((parseFloat(statisticCurrent[5].value) - parseFloat(statisticLast[5].value)) / parseFloat(statisticLast[5].value)) * 100)
                    arrayOfPercentage.push(item5)
                } else {
                    const item5 = parseInt(((parseFloat(statisticCurrent[5].value) - parseFloat(statisticLast[5].value)) / parseFloat(statisticCurrent[5].value)) * 100)
                    arrayOfPercentage.push(item5)
                }

                //06
                if (parseInt(statisticCurrent[6].value) > parseInt(statisticLast[6].value)) {
                    const item6 = parseInt(((parseFloat(statisticCurrent[6].value) - parseFloat(statisticLast[6].value)) / parseFloat(statisticLast[6].value)) * 100)
                    arrayOfPercentage.push(item6)
                } else {
                    const item6 = parseInt(((parseFloat(statisticCurrent[6].value) - parseFloat(statisticLast[6].value)) / parseFloat(statisticCurrent[6].value)) * 100)
                    arrayOfPercentage.push(item6)
                }

                //07
                if (parseInt(statisticCurrent[7].value) > parseInt(statisticLast[7].value)) {
                    const item7 = parseInt(((parseFloat(statisticCurrent[7].value) - parseFloat(statisticLast[7].value)) / parseFloat(statisticLast[7].value)) * 100)
                    arrayOfPercentage.push(item7)
                } else {
                    const item7 = parseInt(((parseFloat(statisticCurrent[7].value) - parseFloat(statisticLast[7].value)) / parseFloat(statisticCurrent[7].value)) * 100)
                    arrayOfPercentage.push(item7)
                }

                //08
                if (parseInt(statisticCurrent[8].value) > parseInt(statisticLast[8].value)) {
                    const item8 = parseInt(((parseFloat(statisticCurrent[8].value) - parseFloat(statisticLast[8].value)) / parseFloat(statisticLast[8].value)) * 100)
                    arrayOfPercentage.push(item8)
                } else {
                    const item8 = parseInt(((parseFloat(statisticCurrent[8].value) - parseFloat(statisticLast[8].value)) / parseFloat(statisticCurrent[8].value)) * 100)
                    arrayOfPercentage.push(item8)
                }

                //09
                if (parseInt(statisticCurrent[9].value) > parseInt(statisticLast[9].value)) {
                    const item9 = parseInt(((parseFloat(statisticCurrent[9].value) - parseFloat(statisticLast[9].value)) / parseFloat(statisticLast[9].value)) * 100)
                    arrayOfPercentage.push(item9)
                } else {
                    const item9 = parseInt(((parseFloat(statisticCurrent[9].value) - parseFloat(statisticLast[9].value)) / parseFloat(statisticCurrent[9].value)) * 100)
                    arrayOfPercentage.push(item9)
                }

                //10
                if (parseInt(statisticCurrent[10].value) > parseInt(statisticLast[10].value)) {
                    const item10 = parseInt(((parseFloat(statisticCurrent[10].value) - parseFloat(statisticLast[10].value)) / parseFloat(statisticLast[10].value)) * 100)
                    arrayOfPercentage.push(item10)
                } else {
                    const item10 = parseInt(((parseFloat(statisticCurrent[10].value) - parseFloat(statisticLast[10].value)) / parseFloat(statisticCurrent[10].value)) * 100)
                    arrayOfPercentage.push(item10)
                }

                //11
                if (parseInt(statisticCurrent[11].value) > parseInt(statisticLast[11].value)) {
                    const item11 = parseInt(((parseFloat(statisticCurrent[11].value) - parseFloat(statisticLast[11].value)) / parseFloat(statisticLast[11].value)) * 100)
                    arrayOfPercentage.push(item11)
                } else {
                    const item11 = parseInt(((parseFloat(statisticCurrent[11].value) - parseFloat(statisticLast[11].value)) / parseFloat(statisticCurrent[11].value)) * 100)
                    arrayOfPercentage.push(item11)
                }


                //testing of statisticsCurrent, statisticLast and arrayOfPercentage
                //console.log(arrayOfPercentage);
                //console.log(statisticCurrent);
                //console.log(statisticLast);

                let i = 0

                //statistic current
                const first = statisticCurrent
                    .map(item => (
                        <td key={item.month} align="center"><div style={{ display: 'inline-block' }}>{item.value}</div> {item.value === '0' ? null : (
                            <div style={{ display: 'inline-block' }}>
                                {arrayOfPercentage[i] > 0 ? (
                                    <p style={{ float: 'right', color: 'green', fontSize: '9.5px' }}>
                                        {arrayOfPercentage[i++]}%
                                    </p>
                                ) : (
                                        <p style={{ float: 'right', color: 'red', fontSize: '9.5px' }}>
                                            {arrayOfPercentage[i++]}%
                                        </p>
                                    )}
                            </div>
                        )}</td>
                    ));


                let ammountCurrentYear = 0;
                statisticCurrent.map(item => {
                    ammountCurrentYear = ammountCurrentYear + parseFloat(item.value);
                    return null;
                })

                //statistic last
                const second = statisticLast
                    .map(item => (
                        <td key={item.month} align="center">{item.value}</td>
                    ));

                let ammountLastYear = 0;
                statisticLast.map(item => {
                    ammountLastYear = ammountLastYear + parseFloat(item.value);
                    return null;
                })

                //statistic past
                const third = statisticPast
                    .map(item => (
                        <td key={item.month} align="center">{item.value}</td>
                    ));

                let ammountPastYear = 0;
                statisticPast.map(item => {
                    ammountPastYear = ammountPastYear + parseFloat(item.value);
                    return null;
                })

                content = (
                    <table className="table table-responsive-md table-hover">
                        <thead>
                            <tr style={{ backgroundColor: '#F5F5F5' }} className="text-center">
                                <th scope="col"></th>
                                <th scope="col">Jan</th>
                                <th scope="col">Feb</th>
                                <th scope="col">Mar</th>
                                <th scope="col">Apr</th>
                                <th scope="col">Maj</th>
                                <th scope="col">Jun</th>
                                <th scope="col">Jul</th>
                                <th scope="col">Avg</th>
                                <th scope="col">Sep</th>
                                <th scope="col">Okt</th>
                                <th scope="col">Nov</th>
                                <th scope="col">Dec</th>
                                <th scope="col">Ukupno</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ backgroundColor: '#F0F0F0' }}>
                                <th scope="row">{new Date().getFullYear()}</th>
                                {first}
                                <td align="center" style={{ color: 'green' }}>{ammountCurrentYear}</td>
                            </tr>
                            <tr style={{ backgroundColor: '#F5F5F5' }}>
                                <th scope="row">{new Date().getFullYear() - 1}</th>
                                {second}
                                <td align="center" style={{ color: 'green' }}>{ammountLastYear}</td>
                            </tr>
                            <tr style={{ backgroundColor: '#F0F0F0' }}>
                                <th scope="row">{new Date().getFullYear() - 2}</th>
                                {third}
                                <td align="center" style={{ color: 'green' }}>{ammountPastYear}</td>
                            </tr>
                        </tbody>
                    </table>

                )

            }



        }

        return (
            <div className="container">
                {content}
            </div>
        )
    }
}

Statistics.propTypes = {
    statistic: PropTypes.object.isRequired,
    getCurrentYearMonth: PropTypes.func.isRequired,
    getLastYearMonth: PropTypes.func.isRequired,
    getPastYearMonth: PropTypes.func.isRequired,
    clearStatistics: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    statistic: state.statistic,
    auth: state.auth
})

export default connect(mapStateToProps, { getCurrentYearMonth, getLastYearMonth, getPastYearMonth, clearStatistics })(Statistics);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReportSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    person: {
        type: String,
        required: true
    },
    workplace: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    shift: {
        type: String,
        required: true
    },
    visaCard: {
        type: String
    },
    virman: {
        type: String
    },
    cash: {
        type: String
    },
    companyCard: {
        type: String
    },
    customersIn: {
        type: String
    },
    customersWithBill: {
        type: String
    },
    goodsNotHave: {
        type: String
    },
    unhappyCustomers: {
        type: String
    },
    praiseCustomer: {
        type: String
    },
    acceptanceGoods: {
        type: String
    },
    orderingItemSold: {
        type: Boolean
    },
    generalProblems: {
        type: String
    },
    unsolvedProblems: {
        type: String
    },
    reclamation: {
        type: String
    },
    problemsCashRegister: {
        type: String
    },
    sendedReportCashRegister: {
        type: Boolean
    },
    resetCashRegister: {
        type: Boolean
    },
    suggestion: {
        type: String
    },
    other: {
        type: String,
        required: true
    }
});

module.exports = Report = mongoose.model('reports', ReportSchema);
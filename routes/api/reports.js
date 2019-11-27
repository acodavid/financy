const express = require('express');
const router = express.Router();
const passport = require('passport');

//validation
const validationReport = require('../../validation/report');

//models
const Report = require('../../models/Report');
const User = require('../../models/User');

// @route   GET api/reports/test
// @desc    Testing reports route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Reports are working!!!' }));

// @route   GET api/reports
// @desc    get all reports
// @access  Public
router.get('/', (req, res) => {
    Report.find()
        .sort({ date: -1 })
        .then(report => {
            res.json(report)
        })
        .catch(err => {
            res.status(404).json({ notFound: 'There is not any report' });
            console.log(err);
        })
})

// @route   GET api/reports/:id
// @desc    get specific report by ID
// @access  Public
router.get('/report/:id', (req, res) => {
    Report.findById(req.params.id)
        .then(report => {
            res.json(report)
        })
        .catch(err => {
            res.status(404).json({ notFound: 'There is not report with this ID' });
            console.log(err);
        })
})

// @route   GET api/reports/company
// @desc    get all reports from one specific company/user
// @access  private
router.get('/company', passport.authenticate('jwt', { session: false }), (req, res) => {

    Report.find().where('user').equals(req.user._id)
        .then(report => {
            res.json(report)
        })
        .catch(err => {
            res.status(404).json({ notFound: 'There is not any report' });
            console.log(err);
        })

});

// @route   GET api/reports/today
// @desc    get all reports from today
// @access  private
router.get('/today', passport.authenticate('jwt', { session: false }), (req, res) => {

    let today = new Date(); //start of the day
    today.setHours(2, 0, 0, 0);

    let today2 = new Date(); //end of the day
    today2.setHours(25, 59, 59, 999);


    Report.find({ "date": { "$gte": today, "$lt": today2 } }).then(reports => {
        res.json(reports);
    })
        .catch(err => console.log(err))

});

// @route   GET api/reports/today/ammount
// @desc    get todays ammount
// @access  private
router.get('/today/ammount', passport.authenticate('jwt', { session: false }), (req, res) => {

    let today = new Date(); //start of the day
    today.setHours(2, 0, 0, 0);

    let today2 = new Date(); //end of the day
    today2.setHours(25, 59, 59, 999);


    Report.find({ "date": { "$gte": today, "$lt": today2 } }).then(reports => {

        let ammount = 0;

        reports.map(report => {
            ammount = ammount + parseFloat(report.visaCard, 10) + parseFloat(report.virman, 10) + parseFloat(report.cash, 10) + parseFloat(report.companyCard, 10);
        })

        res.json(ammount);
    })
        .catch(err => console.log(err))

});

// @route   GET api/reports/month/current
// @desc    get all reports from current month
// @access  private
router.get('/month/current', passport.authenticate('jwt', { session: false }), (req, res) => {

    let now = new Date(); //current month
    now.setDate(1);
    now.setHours(2, 0, 0, 0);

    let lastDay = new Date(); //beggining of next month
    lastDay.setMonth(now.getMonth() + 1);
    lastDay.setDate(1);
    lastDay.setHours(2, 0, 0, 0);

    Report.find({ "date": { "$gte": now, "$lt": lastDay } })
        .then(reports => {
            res.json(reports)
        })
        .catch(err => console.log(err))

});

// @route   GET api/reports/month/current/ammount
// @desc    get ammount current month
// @access  private
router.get('/month/current/ammount', passport.authenticate('jwt', { session: false }), (req, res) => {

    let now = new Date(); //current month
    now.setDate(1);
    now.setHours(2, 0, 0, 0);

    let lastDay = new Date(); //beggining of next month
    lastDay.setMonth(now.getMonth() + 1);
    lastDay.setDate(1);
    lastDay.setHours(2, 0, 0, 0);

    Report.find({ "date": { "$gte": now, "$lt": lastDay } })
        .then(reports => {
            let ammount = 0;

            reports.map(report => {
                ammount = ammount + parseFloat(report.visaCard, 10) + parseFloat(report.virman, 10) + parseFloat(report.cash, 10) + parseFloat(report.companyCard, 10);
            })

            res.json(ammount);
        })
        .catch(err => console.log(err))

});

//CURRENT YEAR

// @route   GET api/reports/currentyear/month/ammount/january
// @desc    get current year statistic monthly
// @access  private
router.get('/currentyear/month/ammount/january', passport.authenticate('jwt', { session: false }), (req, res) => {

    let firstDayJan = new Date();
    let lastDayJan = new Date();

    firstDayJan.setMonth(0);
    firstDayJan.setDate(1);
    firstDayJan.setHours(2, 0, 0, 0);

    lastDayJan.setMonth(1);
    lastDayJan.setDate(1);
    lastDayJan.setHours(2, 0, 0, 0);

    //January
    Report.find({ "date": { "$gte": firstDayJan, "$lt": lastDayJan } })
        .then(reports => {

            let ammountJan = 0;

            reports.map(report => {
                ammountJan = ammountJan + parseFloat(report.visaCard, 10) + parseFloat(report.virman, 10) + parseFloat(report.cash, 10) + parseFloat(report.companyCard, 10);
            })
            res.json({
                month: 1,
                value: ammountJan.toString()
            })
        })
        .catch(err => console.log(err))

})

// @route   GET api/reports/currentyear/month/ammount/february
// @desc    get current year statistic monthly
// @access  private
router.get('/currentyear/month/ammount/february', passport.authenticate('jwt', { session: false }), (req, res) => {

    let firstDayFeb = new Date();
    let lastDayFeb = new Date();

    firstDayFeb.setMonth(1);
    firstDayFeb.setDate(1);
    firstDayFeb.setHours(2, 0, 0, 0);

    lastDayFeb.setMonth(2);
    lastDayFeb.setDate(1);
    lastDayFeb.setHours(2, 0, 0, 0);

    //February
    Report.find({ "date": { "$gte": firstDayFeb, "$lt": lastDayFeb } })
        .then(reports => {

            let ammountFeb = 0;

            reports.map(report => {
                ammountFeb = ammountFeb + parseFloat(report.visaCard, 10) + parseFloat(report.virman, 10) + parseFloat(report.cash, 10) + parseFloat(report.companyCard, 10);
            })
            res.json({
                month: 2,
                value: ammountFeb.toString()
            })
        })
        .catch(err => console.log(err))

})

// @route   GET api/reports/currentyear/month/ammount/march
// @desc    get current year statistic monthly
// @access  private
router.get('/currentyear/month/ammount/march', passport.authenticate('jwt', { session: false }), (req, res) => {

    let firstDayMar = new Date();
    let lastDayMar = new Date();

    firstDayMar.setMonth(2);
    firstDayMar.setDate(1);
    firstDayMar.setHours(2, 0, 0, 0);

    lastDayMar.setMonth(3);
    lastDayMar.setDate(1);
    lastDayMar.setHours(2, 0, 0, 0);

    Report.find({ "date": { "$gte": firstDayMar, "$lt": lastDayMar } })
        .then(reports => {

            let ammountMar = 0;

            reports.map(report => {
                ammountMar = ammountMar + parseFloat(report.visaCard, 10) + parseFloat(report.virman, 10) + parseFloat(report.cash, 10) + parseFloat(report.companyCard, 10);
            })
            res.json({
                month: 3,
                value: ammountMar.toString()
            })
        })
        .catch(err => console.log(err))

})

// @route   GET api/reports/currentyear/month/ammount/april
// @desc    get current year statistic monthly
// @access  private
router.get('/currentyear/month/ammount/april', passport.authenticate('jwt', { session: false }), (req, res) => {

    let firstDayApr = new Date();
    let lastDayApr = new Date();

    firstDayApr.setMonth(3);
    firstDayApr.setDate(1);
    firstDayApr.setHours(2, 0, 0, 0);

    lastDayApr.setMonth(4);
    lastDayApr.setDate(1);
    lastDayApr.setHours(2, 0, 0, 0);

    Report.find({ "date": { "$gte": firstDayApr, "$lt": lastDayApr } })
        .then(reports => {

            let ammountApr = 0;

            reports.map(report => {
                ammountApr = ammountApr + parseFloat(report.visaCard, 10) + parseFloat(report.virman, 10) + parseFloat(report.cash, 10) + parseFloat(report.companyCard, 10);
            })
            res.json({
                month: 4,
                value: ammountApr.toString()
            })
        })
        .catch(err => console.log(err))

})

// @route   GET api/reports/currentyear/month/ammount/may
// @desc    get current year statistic monthly
// @access  private
router.get('/currentyear/month/ammount/may', passport.authenticate('jwt', { session: false }), (req, res) => {

    let firstDayMay = new Date();
    let lastDayMay = new Date();

    firstDayMay.setMonth(4);
    firstDayMay.setDate(1);
    firstDayMay.setHours(2, 0, 0, 0);

    lastDayMay.setMonth(5);
    lastDayMay.setDate(1);
    lastDayMay.setHours(2, 0, 0, 0);

    Report.find({ "date": { "$gte": firstDayMay, "$lt": lastDayMay } })
        .then(reports => {

            let ammountMay = 0;

            reports.map(report => {
                ammountMay = ammountMay + parseFloat(report.visaCard, 10) + parseFloat(report.virman, 10) + parseFloat(report.cash, 10) + parseFloat(report.companyCard, 10);
            })
            res.json({
                month: 5,
                value: ammountMay.toString()
            })
        })
        .catch(err => console.log(err))

})

// @route   GET api/reports/currentyear/month/ammount/june
// @desc    get current year statistic monthly
// @access  private
router.get('/currentyear/month/ammount/june', passport.authenticate('jwt', { session: false }), (req, res) => {

    let firstDayJun = new Date();
    let lastDayJun = new Date();

    firstDayJun.setMonth(5);
    firstDayJun.setDate(1);
    firstDayJun.setHours(2, 0, 0, 0);

    lastDayJun.setMonth(6);
    lastDayJun.setDate(1);
    lastDayJun.setHours(2, 0, 0, 0);

    Report.find({ "date": { "$gte": firstDayJun, "$lt": lastDayJun } })
        .then(reports => {

            let ammountJun = 0;

            reports.map(report => {
                ammountJun = ammountJun + parseFloat(report.visaCard, 10) + parseFloat(report.virman, 10) + parseFloat(report.cash, 10) + parseFloat(report.companyCard, 10);
            })
            res.json({
                month: 6,
                value: ammountJun.toString()
            })
        })
        .catch(err => console.log(err))

})

// @route   GET api/reports/currentyear/month/ammount/july
// @desc    get current year statistic monthly
// @access  private
router.get('/currentyear/month/ammount/july', passport.authenticate('jwt', { session: false }), (req, res) => {

    let firstDayJul = new Date();
    let lastDayJul = new Date();

    firstDayJul.setMonth(6);
    firstDayJul.setDate(1);
    firstDayJul.setHours(2, 0, 0, 0);

    lastDayJul.setMonth(7);
    lastDayJul.setDate(1);
    lastDayJul.setHours(2, 0, 0, 0);

    Report.find({ "date": { "$gte": firstDayJul, "$lt": lastDayJul } })
        .then(reports => {

            let ammountJul = 0;

            reports.map(report => {
                ammountJul = ammountJul + parseFloat(report.visaCard, 10) + parseFloat(report.virman, 10) + parseFloat(report.cash, 10) + parseFloat(report.companyCard, 10);
            })
            res.json({
                month: 7,
                value: ammountJul.toString()
            })
        })
        .catch(err => console.log(err))

})

// @route   GET api/reports/currentyear/month/ammount/august
// @desc    get current year statistic monthly
// @access  private
router.get('/currentyear/month/ammount/august', passport.authenticate('jwt', { session: false }), (req, res) => {

    let firstDayAug = new Date();
    let lastDayAug = new Date();

    firstDayAug.setMonth(7);
    firstDayAug.setDate(1);
    firstDayAug.setHours(2, 0, 0, 0);

    lastDayAug.setMonth(8);
    lastDayAug.setDate(1);
    lastDayAug.setHours(2, 0, 0, 0);

    Report.find({ "date": { "$gte": firstDayAug, "$lt": lastDayAug } })
        .then(reports => {

            let ammountAug = 0;

            reports.map(report => {
                ammountAug = ammountAug + parseFloat(report.visaCard, 10) + parseFloat(report.virman, 10) + parseFloat(report.cash, 10) + parseFloat(report.companyCard, 10);
            })
            res.json({
                month: 8,
                value: ammountAug.toString()
            })
        })
        .catch(err => console.log(err))

})

// @route   GET api/reports/currentyear/month/ammount/september
// @desc    get current year statistic monthly
// @access  private
router.get('/currentyear/month/ammount/september', passport.authenticate('jwt', { session: false }), (req, res) => {

    let firstDaySep = new Date();
    let lastDaySep = new Date();

    firstDaySep.setMonth(8);
    firstDaySep.setDate(1);
    firstDaySep.setHours(2, 0, 0, 0);

    lastDaySep.setMonth(9);
    lastDaySep.setDate(1);
    lastDaySep.setHours(2, 0, 0, 0);


    Report.find({ "date": { "$gte": firstDaySep, "$lt": lastDaySep } })
        .then(reports => {

            let ammountSep = 0;
            reports.map(report => {

                ammountSep = ammountSep + parseFloat(report.visaCard, 10) + parseFloat(report.virman, 10) + parseFloat(report.cash, 10) + parseFloat(report.companyCard, 10);
            })
            res.json({
                month: 9,
                value: ammountSep.toString()
            })
        })
        .catch(err => console.log(err))

})

// @route   GET api/reports/currentyear/month/ammount/october
// @desc    get current year statistic monthly
// @access  private
router.get('/currentyear/month/ammount/october', passport.authenticate('jwt', { session: false }), (req, res) => {

    let firstDayOct = new Date();
    let lastDayOct = new Date();

    firstDayOct.setMonth(9);
    firstDayOct.setDate(1);
    firstDayOct.setHours(2, 0, 0, 0);

    lastDayOct.setMonth(10);
    lastDayOct.setDate(1);
    lastDayOct.setHours(2, 0, 0, 0);

    Report.find({ "date": { "$gte": firstDayOct, "$lt": lastDayOct } })
        .then(reports => {

            let ammountOct = 0;

            reports.map(report => {
                ammountOct = ammountOct + parseFloat(report.visaCard, 10) + parseFloat(report.virman, 10) + parseFloat(report.cash, 10) + parseFloat(report.companyCard, 10);
            })
            res.json({
                month: 10,
                value: ammountOct.toString()
            })
        })
        .catch(err => console.log(err))

})

// @route   GET api/reports/currentyear/month/ammount/november
// @desc    get current year statistic monthly
// @access  private
router.get('/currentyear/month/ammount/november', passport.authenticate('jwt', { session: false }), (req, res) => {

    let firstDayNov = new Date();
    let lastDayNov = new Date();

    firstDayNov.setMonth(10);
    firstDayNov.setDate(1);
    firstDayNov.setHours(2, 0, 0, 0);

    lastDayNov.setMonth(11);
    lastDayNov.setDate(1);
    lastDayNov.setHours(2, 0, 0, 0);

    Report.find({ "date": { "$gte": firstDayNov, "$lt": lastDayNov } })
        .then(reports => {

            let ammountNov = 0;

            reports.map(report => {
                ammountNov = ammountNov + parseFloat(report.visaCard, 10) + parseFloat(report.virman, 10) + parseFloat(report.cash, 10) + parseFloat(report.companyCard, 10);
            })
            res.json({
                month: 11,
                value: ammountNov.toString()
            })
        })
        .catch(err => console.log(err))

})

// @route   GET api/reports/currentyear/month/ammount/december
// @desc    get current year statistic monthly
// @access  private
router.get('/currentyear/month/ammount/december', passport.authenticate('jwt', { session: false }), (req, res) => {

    let firstDayDec = new Date();
    let lastDayDec = new Date();

    firstDayDec.setMonth(11);
    firstDayDec.setDate(1);
    firstDayDec.setHours(2, 0, 0, 0);

    lastDayDec.setMonth(12);
    lastDayDec.setDate(1);
    lastDayDec.setHours(2, 0, 0, 0);

    Report.find({ "date": { "$gte": firstDayDec, "$lt": lastDayDec } })
        .then(reports => {

            let ammountDec = 0;

            reports.map(report => {
                ammountDec = ammountDec + parseFloat(report.visaCard, 10) + parseFloat(report.virman, 10) + parseFloat(report.cash, 10) + parseFloat(report.companyCard, 10);
            })
            res.json({
                month: 12,
                value: ammountDec.toString()
            })
        })
        .catch(err => console.log(err))

})

/* END OF CURRENT YEAR MONTHS */

//LAST YEAR

// @route   GET api/reports/lastyear/month/ammount/january
// @desc    get last year statistic monthly
// @access  private
router.get('/lastyear/month/ammount/january', passport.authenticate('jwt', { session: false }), (req, res) => {

    let firstDayJan = new Date();
    let lastDayJan = new Date();

    firstDayJan.setFullYear(lastDayJan.getFullYear() - 1);
    firstDayJan.setMonth(0);
    firstDayJan.setDate(1);
    firstDayJan.setHours(2, 0, 0, 0);

    lastDayJan.setFullYear(firstDayJan.getFullYear());
    lastDayJan.setMonth(1);
    lastDayJan.setDate(1);
    lastDayJan.setHours(2, 0, 0, 0);

    //January
    Report.find({ "date": { "$gte": firstDayJan, "$lt": lastDayJan } })
        .then(reports => {

            let ammountJan = 0;

            reports.map(report => {
                ammountJan = ammountJan + parseFloat(report.visaCard, 10) + parseFloat(report.virman, 10) + parseFloat(report.cash, 10) + parseFloat(report.companyCard, 10);
            })
            res.json({
                month: 1,
                value: ammountJan.toString()
            })
        })
        .catch(err => console.log(err))

})

// @route   GET api/reports/lastyear/month/ammount/february
// @desc    get last year statistic monthly
// @access  private
router.get('/lastyear/month/ammount/february', passport.authenticate('jwt', { session: false }), (req, res) => {

    let firstDayFeb = new Date();
    let lastDayFeb = new Date();

    firstDayFeb.setFullYear(lastDayFeb.getFullYear() - 1);
    firstDayFeb.setMonth(1);
    firstDayFeb.setDate(1);
    firstDayFeb.setHours(2, 0, 0, 0);

    lastDayFeb.setFullYear(firstDayFeb.getFullYear())
    lastDayFeb.setMonth(2);
    lastDayFeb.setDate(1);
    lastDayFeb.setHours(2, 0, 0, 0);

    //February
    Report.find({ "date": { "$gte": firstDayFeb, "$lt": lastDayFeb } })
        .then(reports => {

            let ammountFeb = 0;

            reports.map(report => {
                ammountFeb = ammountFeb + parseFloat(report.visaCard, 10) + parseFloat(report.virman, 10) + parseFloat(report.cash, 10) + parseFloat(report.companyCard, 10);
            })
            res.json({
                month: 2,
                value: ammountFeb.toString()
            })
        })
        .catch(err => console.log(err))

})

// @route   GET api/reports/lastyear/month/ammount/march
// @desc    get last year statistic monthly
// @access  private
router.get('/lastyear/month/ammount/march', passport.authenticate('jwt', { session: false }), (req, res) => {

    let firstDayMar = new Date();
    let lastDayMar = new Date();

    firstDayMar.setFullYear(lastDayMar.getFullYear() - 1);
    firstDayMar.setMonth(2);
    firstDayMar.setDate(1);
    firstDayMar.setHours(2, 0, 0, 0);

    lastDayMar.setFullYear(firstDayMar.getFullYear())
    lastDayMar.setMonth(3);
    lastDayMar.setDate(1);
    lastDayMar.setHours(2, 0, 0, 0);

    Report.find({ "date": { "$gte": firstDayMar, "$lt": lastDayMar } })
        .then(reports => {

            let ammountMar = 0;

            reports.map(report => {
                ammountMar = ammountMar + parseFloat(report.visaCard, 10) + parseFloat(report.virman, 10) + parseFloat(report.cash, 10) + parseFloat(report.companyCard, 10);
            })
            res.json({
                month: 3,
                value: ammountMar.toString()
            })
        })
        .catch(err => console.log(err))

})

// @route   GET api/reports/lastyear/month/ammount/april
// @desc    get last year statistic monthly
// @access  private
router.get('/lastyear/month/ammount/april', passport.authenticate('jwt', { session: false }), (req, res) => {

    let firstDayApr = new Date();
    let lastDayApr = new Date();

    firstDayApr.setFullYear(lastDayApr.getFullYear() - 1);
    firstDayApr.setMonth(3);
    firstDayApr.setDate(1);
    firstDayApr.setHours(2, 0, 0, 0);

    lastDayApr.setFullYear(firstDayApr.getFullYear())
    lastDayApr.setMonth(4);
    lastDayApr.setDate(1);
    lastDayApr.setHours(2, 0, 0, 0);

    Report.find({ "date": { "$gte": firstDayApr, "$lt": lastDayApr } })
        .then(reports => {

            let ammountApr = 0;

            reports.map(report => {
                ammountApr = ammountApr + parseFloat(report.visaCard, 10) + parseFloat(report.virman, 10) + parseFloat(report.cash, 10) + parseFloat(report.companyCard, 10);
            })
            res.json({
                month: 4,
                value: ammountApr.toString()
            })
        })
        .catch(err => console.log(err))

})

// @route   GET api/reports/lastyear/month/ammount/may
// @desc    get last year statistic monthly
// @access  private
router.get('/lastyear/month/ammount/may', passport.authenticate('jwt', { session: false }), (req, res) => {

    let firstDayMay = new Date();
    let lastDayMay = new Date();

    firstDayMay.setFullYear(lastDayMay.getFullYear() - 1);
    firstDayMay.setMonth(4);
    firstDayMay.setDate(1);
    firstDayMay.setHours(2, 0, 0, 0);

    lastDayMay.setFullYear(firstDayMay.getFullYear())
    lastDayMay.setMonth(5);
    lastDayMay.setDate(1);
    lastDayMay.setHours(2, 0, 0, 0);

    Report.find({ "date": { "$gte": firstDayMay, "$lt": lastDayMay } })
        .then(reports => {

            let ammountMay = 0;

            reports.map(report => {
                ammountMay = ammountMay + parseFloat(report.visaCard, 10) + parseFloat(report.virman, 10) + parseFloat(report.cash, 10) + parseFloat(report.companyCard, 10);
            })
            res.json({
                month: 5,
                value: ammountMay.toString()
            })
        })
        .catch(err => console.log(err))

})

// @route   GET api/reports/lastyear/month/ammount/june
// @desc    get last year statistic monthly
// @access  private
router.get('/lastyear/month/ammount/june', passport.authenticate('jwt', { session: false }), (req, res) => {

    let firstDayJun = new Date();
    let lastDayJun = new Date();

    firstDayJun.setFullYear(lastDayJun.getFullYear() - 1);
    firstDayJun.setMonth(5);
    firstDayJun.setDate(1);
    firstDayJun.setHours(2, 0, 0, 0);

    lastDayJun.setFullYear(firstDayJun.getFullYear())
    lastDayJun.setMonth(6);
    lastDayJun.setDate(1);
    lastDayJun.setHours(2, 0, 0, 0);

    Report.find({ "date": { "$gte": firstDayJun, "$lt": lastDayJun } })
        .then(reports => {

            let ammountJun = 0;

            reports.map(report => {
                ammountJun = ammountJun + parseFloat(report.visaCard, 10) + parseFloat(report.virman, 10) + parseFloat(report.cash, 10) + parseFloat(report.companyCard, 10);
            })
            res.json({
                month: 6,
                value: ammountJun.toString()
            })
        })
        .catch(err => console.log(err))

})

// @route   GET api/reports/lastyear/month/ammount/july
// @desc    get last year statistic monthly
// @access  private
router.get('/lastyear/month/ammount/july', passport.authenticate('jwt', { session: false }), (req, res) => {

    let firstDayJul = new Date();
    let lastDayJul = new Date();

    firstDayJul.setFullYear(lastDayJul.getFullYear() - 1);
    firstDayJul.setMonth(6);
    firstDayJul.setDate(1);
    firstDayJul.setHours(2, 0, 0, 0);

    lastDayJul.setFullYear(firstDayJul.getFullYear())
    lastDayJul.setMonth(7);
    lastDayJul.setDate(1);
    lastDayJul.setHours(2, 0, 0, 0);

    Report.find({ "date": { "$gte": firstDayJul, "$lt": lastDayJul } })
        .then(reports => {

            let ammountJul = 0;

            reports.map(report => {
                ammountJul = ammountJul + parseFloat(report.visaCard, 10) + parseFloat(report.virman, 10) + parseFloat(report.cash, 10) + parseFloat(report.companyCard, 10);
            })
            res.json({
                month: 7,
                value: ammountJul.toString()
            })
        })
        .catch(err => console.log(err))

})

// @route   GET api/reports/lastyear/month/ammount/august
// @desc    get last year statistic monthly
// @access  private
router.get('/lastyear/month/ammount/august', passport.authenticate('jwt', { session: false }), (req, res) => {

    let firstDayAug = new Date();
    let lastDayAug = new Date();

    firstDayAug.setFullYear(lastDayAug.getFullYear() - 1);
    firstDayAug.setMonth(7);
    firstDayAug.setDate(1);
    firstDayAug.setHours(2, 0, 0, 0);

    lastDayAug.setFullYear(firstDayAug.getFullYear())
    lastDayAug.setMonth(8);
    lastDayAug.setDate(1);
    lastDayAug.setHours(2, 0, 0, 0);

    Report.find({ "date": { "$gte": firstDayAug, "$lt": lastDayAug } })
        .then(reports => {

            let ammountAug = 0;

            reports.map(report => {
                ammountAug = ammountAug + parseFloat(report.visaCard, 10) + parseFloat(report.virman, 10) + parseFloat(report.cash, 10) + parseFloat(report.companyCard, 10);
            })
            res.json({
                month: 8,
                value: ammountAug.toString()
            })
        })
        .catch(err => console.log(err))

})

// @route   GET api/reports/lastyear/month/ammount/september
// @desc    get last year statistic monthly
// @access  private
router.get('/lastyear/month/ammount/september', passport.authenticate('jwt', { session: false }), (req, res) => {

    let firstDaySep = new Date();
    let lastDaySep = new Date();

    firstDaySep.setFullYear(lastDaySep.getFullYear() - 1);
    firstDaySep.setMonth(8);
    firstDaySep.setDate(1);
    firstDaySep.setHours(2, 0, 0, 0);

    lastDaySep.setFullYear(firstDaySep.getFullYear())
    lastDaySep.setMonth(9);
    lastDaySep.setDate(1);
    lastDaySep.setHours(2, 0, 0, 0);


    Report.find({ "date": { "$gte": firstDaySep, "$lt": lastDaySep } })
        .then(reports => {

            let ammountSep = 0;
            reports.map(report => {

                ammountSep = ammountSep + parseFloat(report.visaCard, 10) + parseFloat(report.virman, 10) + parseFloat(report.cash, 10) + parseFloat(report.companyCard, 10);
            })
            res.json({
                month: 9,
                value: ammountSep.toString()
            })
        })
        .catch(err => console.log(err))

})

// @route   GET api/reports/lastyear/month/ammount/october
// @desc    get last year statistic monthly
// @access  private
router.get('/lastyear/month/ammount/october', passport.authenticate('jwt', { session: false }), (req, res) => {

    let firstDayOct = new Date();
    let lastDayOct = new Date();

    firstDayOct.setFullYear(lastDayOct.getFullYear() - 1);
    firstDayOct.setMonth(9);
    firstDayOct.setDate(1);
    firstDayOct.setHours(2, 0, 0, 0);

    lastDayOct.setFullYear(firstDayOct.getFullYear())
    lastDayOct.setMonth(10);
    lastDayOct.setDate(1);
    lastDayOct.setHours(2, 0, 0, 0);

    Report.find({ "date": { "$gte": firstDayOct, "$lt": lastDayOct } })
        .then(reports => {

            let ammountOct = 0;

            reports.map(report => {
                ammountOct = ammountOct + parseFloat(report.visaCard, 10) + parseFloat(report.virman, 10) + parseFloat(report.cash, 10) + parseFloat(report.companyCard, 10);
            })
            res.json({
                month: 10,
                value: ammountOct.toString()
            })
        })
        .catch(err => console.log(err))

})

// @route   GET api/reports/lastyear/month/ammount/november
// @desc    get last year statistic monthly
// @access  private
router.get('/lastyear/month/ammount/november', passport.authenticate('jwt', { session: false }), (req, res) => {

    let firstDayNov = new Date();
    let lastDayNov = new Date();

    firstDayNov.setFullYear(lastDayNov.getFullYear() - 1);
    firstDayNov.setMonth(10);
    firstDayNov.setDate(1);
    firstDayNov.setHours(2, 0, 0, 0);

    lastDayNov.setFullYear(firstDayNov.getFullYear())
    lastDayNov.setMonth(11);
    lastDayNov.setDate(1);
    lastDayNov.setHours(2, 0, 0, 0);

    Report.find({ "date": { "$gte": firstDayNov, "$lt": lastDayNov } })
        .then(reports => {

            let ammountNov = 0;

            reports.map(report => {
                ammountNov = ammountNov + parseFloat(report.visaCard, 10) + parseFloat(report.virman, 10) + parseFloat(report.cash, 10) + parseFloat(report.companyCard, 10);
            })
            res.json({
                month: 11,
                value: ammountNov.toString()
            })
        })
        .catch(err => console.log(err))

})

// @route   GET api/reports/lastyear/month/ammount/december
// @desc    get last year statistic monthly
// @access  private
router.get('/lastyear/month/ammount/december', passport.authenticate('jwt', { session: false }), (req, res) => {

    let firstDayDec = new Date();
    let lastDayDec = new Date();

    firstDayDec.setFullYear(lastDayDec.getFullYear() - 1);
    firstDayDec.setMonth(11);
    firstDayDec.setDate(1);
    firstDayDec.setHours(2, 0, 0, 0);

    lastDayDec.setFullYear(firstDayDec.getFullYear())
    lastDayDec.setMonth(12);
    lastDayDec.setDate(1);
    lastDayDec.setHours(2, 0, 0, 0);

    Report.find({ "date": { "$gte": firstDayDec, "$lt": lastDayDec } })
        .then(reports => {

            let ammountDec = 0;

            reports.map(report => {
                ammountDec = ammountDec + parseFloat(report.visaCard, 10) + parseFloat(report.virman, 10) + parseFloat(report.cash, 10) + parseFloat(report.companyCard, 10);
            })
            res.json({
                month: 12,
                value: ammountDec.toString()
            })
        })
        .catch(err => console.log(err))

})

/*END OF LAST YEAR*/

//PAST YEAR

// @route   GET api/reports/pastyear/month/ammount/january
// @desc    get past year statistic monthly
// @access  private
router.get('/pastyear/month/ammount/january', passport.authenticate('jwt', { session: false }), (req, res) => {

    let firstDayJan = new Date();
    let lastDayJan = new Date();

    firstDayJan.setFullYear(lastDayJan.getFullYear() - 2);
    firstDayJan.setMonth(0);
    firstDayJan.setDate(1);
    firstDayJan.setHours(2, 0, 0, 0);

    lastDayJan.setFullYear(firstDayJan.getFullYear());
    lastDayJan.setMonth(1);
    lastDayJan.setDate(1);
    lastDayJan.setHours(2, 0, 0, 0);

    //January
    Report.find({ "date": { "$gte": firstDayJan, "$lt": lastDayJan } })
        .then(reports => {

            let ammountJan = 0;

            reports.map(report => {
                ammountJan = ammountJan + parseFloat(report.visaCard, 10) + parseFloat(report.virman, 10) + parseFloat(report.cash, 10) + parseFloat(report.companyCard, 10);
            })
            res.json({
                month: 1,
                value: ammountJan.toString()
            })
        })
        .catch(err => console.log(err))

})

// @route   GET api/reports/pastyear/month/ammount/february
// @desc    get past year statistic monthly
// @access  private
router.get('/pastyear/month/ammount/february', passport.authenticate('jwt', { session: false }), (req, res) => {

    let firstDayFeb = new Date();
    let lastDayFeb = new Date();

    firstDayFeb.setFullYear(lastDayFeb.getFullYear() - 2);
    firstDayFeb.setMonth(1);
    firstDayFeb.setDate(1);
    firstDayFeb.setHours(2, 0, 0, 0);

    lastDayFeb.setFullYear(firstDayFeb.getFullYear())
    lastDayFeb.setMonth(2);
    lastDayFeb.setDate(1);
    lastDayFeb.setHours(2, 0, 0, 0);

    //February
    Report.find({ "date": { "$gte": firstDayFeb, "$lt": lastDayFeb } })
        .then(reports => {

            let ammountFeb = 0;

            reports.map(report => {
                ammountFeb = ammountFeb + parseFloat(report.visaCard, 10) + parseFloat(report.virman, 10) + parseFloat(report.cash, 10) + parseFloat(report.companyCard, 10);
            })
            res.json({
                month: 2,
                value: ammountFeb.toString()
            })
        })
        .catch(err => console.log(err))

})

// @route   GET api/reports/pastyear/month/ammount/march
// @desc    get past year statistic monthly
// @access  private
router.get('/pastyear/month/ammount/march', passport.authenticate('jwt', { session: false }), (req, res) => {

    let firstDayMar = new Date();
    let lastDayMar = new Date();

    firstDayMar.setFullYear(lastDayMar.getFullYear() - 2);
    firstDayMar.setMonth(2);
    firstDayMar.setDate(1);
    firstDayMar.setHours(2, 0, 0, 0);

    lastDayMar.setFullYear(firstDayMar.getFullYear())
    lastDayMar.setMonth(3);
    lastDayMar.setDate(1);
    lastDayMar.setHours(2, 0, 0, 0);

    Report.find({ "date": { "$gte": firstDayMar, "$lt": lastDayMar } })
        .then(reports => {

            let ammountMar = 0;

            reports.map(report => {
                ammountMar = ammountMar + parseFloat(report.visaCard, 10) + parseFloat(report.virman, 10) + parseFloat(report.cash, 10) + parseFloat(report.companyCard, 10);
            })
            res.json({
                month: 3,
                value: ammountMar.toString()
            })
        })
        .catch(err => console.log(err))

})

// @route   GET api/reports/pastyear/month/ammount/april
// @desc    get past year statistic monthly
// @access  private
router.get('/pastyear/month/ammount/april', passport.authenticate('jwt', { session: false }), (req, res) => {

    let firstDayApr = new Date();
    let lastDayApr = new Date();

    firstDayApr.setFullYear(lastDayApr.getFullYear() - 2);
    firstDayApr.setMonth(3);
    firstDayApr.setDate(1);
    firstDayApr.setHours(2, 0, 0, 0);

    lastDayApr.setFullYear(firstDayApr.getFullYear())
    lastDayApr.setMonth(4);
    lastDayApr.setDate(1);
    lastDayApr.setHours(2, 0, 0, 0);

    Report.find({ "date": { "$gte": firstDayApr, "$lt": lastDayApr } })
        .then(reports => {

            let ammountApr = 0;

            reports.map(report => {
                ammountApr = ammountApr + parseFloat(report.visaCard, 10) + parseFloat(report.virman, 10) + parseFloat(report.cash, 10) + parseFloat(report.companyCard, 10);
            })
            res.json({
                month: 4,
                value: ammountApr.toString()
            })
        })
        .catch(err => console.log(err))

})

// @route   GET api/reports/pastyear/month/ammount/may
// @desc    get past year statistic monthly
// @access  private
router.get('/pastyear/month/ammount/may', passport.authenticate('jwt', { session: false }), (req, res) => {

    let firstDayMay = new Date();
    let lastDayMay = new Date();

    firstDayMay.setFullYear(lastDayMay.getFullYear() - 2);
    firstDayMay.setMonth(4);
    firstDayMay.setDate(1);
    firstDayMay.setHours(2, 0, 0, 0);

    lastDayMay.setFullYear(firstDayMay.getFullYear())
    lastDayMay.setMonth(5);
    lastDayMay.setDate(1);
    lastDayMay.setHours(2, 0, 0, 0);

    Report.find({ "date": { "$gte": firstDayMay, "$lt": lastDayMay } })
        .then(reports => {

            let ammountMay = 0;

            reports.map(report => {
                ammountMay = ammountMay + parseFloat(report.visaCard, 10) + parseFloat(report.virman, 10) + parseFloat(report.cash, 10) + parseFloat(report.companyCard, 10);
            })
            res.json({
                month: 5,
                value: ammountMay.toString()
            })
        })
        .catch(err => console.log(err))

})

// @route   GET api/reports/pastyear/month/ammount/june
// @desc    get past year statistic monthly
// @access  private
router.get('/pastyear/month/ammount/june', passport.authenticate('jwt', { session: false }), (req, res) => {

    let firstDayJun = new Date();
    let lastDayJun = new Date();

    firstDayJun.setFullYear(lastDayJun.getFullYear() - 2);
    firstDayJun.setMonth(5);
    firstDayJun.setDate(1);
    firstDayJun.setHours(2, 0, 0, 0);

    lastDayJun.setFullYear(firstDayJun.getFullYear())
    lastDayJun.setMonth(6);
    lastDayJun.setDate(1);
    lastDayJun.setHours(2, 0, 0, 0);

    Report.find({ "date": { "$gte": firstDayJun, "$lt": lastDayJun } })
        .then(reports => {

            let ammountJun = 0;

            reports.map(report => {
                ammountJun = ammountJun + parseFloat(report.visaCard, 10) + parseFloat(report.virman, 10) + parseFloat(report.cash, 10) + parseFloat(report.companyCard, 10);
            })
            res.json({
                month: 6,
                value: ammountJun.toString()
            })
        })
        .catch(err => console.log(err))

})

// @route   GET api/reports/pastyear/month/ammount/july
// @desc    get past year statistic monthly
// @access  private
router.get('/pastyear/month/ammount/july', passport.authenticate('jwt', { session: false }), (req, res) => {

    let firstDayJul = new Date();
    let lastDayJul = new Date();

    firstDayJul.setFullYear(lastDayJul.getFullYear() - 2);
    firstDayJul.setMonth(6);
    firstDayJul.setDate(1);
    firstDayJul.setHours(2, 0, 0, 0);

    lastDayJul.setFullYear(firstDayJul.getFullYear())
    lastDayJul.setMonth(7);
    lastDayJul.setDate(1);
    lastDayJul.setHours(2, 0, 0, 0);

    Report.find({ "date": { "$gte": firstDayJul, "$lt": lastDayJul } })
        .then(reports => {

            let ammountJul = 0;

            reports.map(report => {
                ammountJul = ammountJul + parseFloat(report.visaCard, 10) + parseFloat(report.virman, 10) + parseFloat(report.cash, 10) + parseFloat(report.companyCard, 10);
            })
            res.json({
                month: 7,
                value: ammountJul.toString()
            })
        })
        .catch(err => console.log(err))

})

// @route   GET api/reports/pastyear/month/ammount/august
// @desc    get past year statistic monthly
// @access  private
router.get('/pastyear/month/ammount/august', passport.authenticate('jwt', { session: false }), (req, res) => {

    let firstDayAug = new Date();
    let lastDayAug = new Date();

    firstDayAug.setFullYear(lastDayAug.getFullYear() - 2);
    firstDayAug.setMonth(7);
    firstDayAug.setDate(1);
    firstDayAug.setHours(2, 0, 0, 0);

    lastDayAug.setFullYear(firstDayAug.getFullYear())
    lastDayAug.setMonth(8);
    lastDayAug.setDate(1);
    lastDayAug.setHours(2, 0, 0, 0);

    Report.find({ "date": { "$gte": firstDayAug, "$lt": lastDayAug } })
        .then(reports => {

            let ammountAug = 0;

            reports.map(report => {
                ammountAug = ammountAug + parseFloat(report.visaCard, 10) + parseFloat(report.virman, 10) + parseFloat(report.cash, 10) + parseFloat(report.companyCard, 10);
            })
            res.json({
                month: 8,
                value: ammountAug.toString()
            })
        })
        .catch(err => console.log(err))

})

// @route   GET api/reports/pastyear/month/ammount/september
// @desc    get past year statistic monthly
// @access  private
router.get('/pastyear/month/ammount/september', passport.authenticate('jwt', { session: false }), (req, res) => {

    let firstDaySep = new Date();
    let lastDaySep = new Date();

    firstDaySep.setFullYear(lastDaySep.getFullYear() - 2);
    firstDaySep.setMonth(8);
    firstDaySep.setDate(1);
    firstDaySep.setHours(2, 0, 0, 0);

    lastDaySep.setFullYear(firstDaySep.getFullYear())
    lastDaySep.setMonth(9);
    lastDaySep.setDate(1);
    lastDaySep.setHours(2, 0, 0, 0);


    Report.find({ "date": { "$gte": firstDaySep, "$lt": lastDaySep } })
        .then(reports => {

            let ammountSep = 0;
            reports.map(report => {

                ammountSep = ammountSep + parseFloat(report.visaCard, 10) + parseFloat(report.virman, 10) + parseFloat(report.cash, 10) + parseFloat(report.companyCard, 10);
            })
            res.json({
                month: 9,
                value: ammountSep.toString()
            })
        })
        .catch(err => console.log(err))

})

// @route   GET api/reports/pastyear/month/ammount/october
// @desc    get past year statistic monthly
// @access  private
router.get('/pastyear/month/ammount/october', passport.authenticate('jwt', { session: false }), (req, res) => {

    let firstDayOct = new Date();
    let lastDayOct = new Date();

    firstDayOct.setFullYear(lastDayOct.getFullYear() - 2);
    firstDayOct.setMonth(9);
    firstDayOct.setDate(1);
    firstDayOct.setHours(2, 0, 0, 0);

    lastDayOct.setFullYear(firstDayOct.getFullYear())
    lastDayOct.setMonth(10);
    lastDayOct.setDate(1);
    lastDayOct.setHours(2, 0, 0, 0);

    Report.find({ "date": { "$gte": firstDayOct, "$lt": lastDayOct } })
        .then(reports => {

            let ammountOct = 0;

            reports.map(report => {
                ammountOct = ammountOct + parseFloat(report.visaCard, 10) + parseFloat(report.virman, 10) + parseFloat(report.cash, 10) + parseFloat(report.companyCard, 10);
            })
            res.json({
                month: 10,
                value: ammountOct.toString()
            })
        })
        .catch(err => console.log(err))

})

// @route   GET api/reports/pastyear/month/ammount/november
// @desc    get past year statistic monthly
// @access  private
router.get('/pastyear/month/ammount/november', passport.authenticate('jwt', { session: false }), (req, res) => {

    let firstDayNov = new Date();
    let lastDayNov = new Date();

    firstDayNov.setFullYear(lastDayNov.getFullYear() - 2);
    firstDayNov.setMonth(10);
    firstDayNov.setDate(1);
    firstDayNov.setHours(2, 0, 0, 0);

    lastDayNov.setFullYear(firstDayNov.getFullYear())
    lastDayNov.setMonth(11);
    lastDayNov.setDate(1);
    lastDayNov.setHours(2, 0, 0, 0);

    Report.find({ "date": { "$gte": firstDayNov, "$lt": lastDayNov } })
        .then(reports => {

            let ammountNov = 0;

            reports.map(report => {
                ammountNov = ammountNov + parseFloat(report.visaCard, 10) + parseFloat(report.virman, 10) + parseFloat(report.cash, 10) + parseFloat(report.companyCard, 10);
            })
            res.json({
                month: 11,
                value: ammountNov.toString()
            })
        })
        .catch(err => console.log(err))

})

// @route   GET api/reports/pastyear/month/ammount/december
// @desc    get past year statistic monthly
// @access  private
router.get('/pastyear/month/ammount/december', passport.authenticate('jwt', { session: false }), (req, res) => {

    let firstDayDec = new Date();
    let lastDayDec = new Date();

    firstDayDec.setFullYear(lastDayDec.getFullYear() - 2);
    firstDayDec.setMonth(11);
    firstDayDec.setDate(1);
    firstDayDec.setHours(2, 0, 0, 0);

    lastDayDec.setFullYear(firstDayDec.getFullYear())
    lastDayDec.setMonth(12);
    lastDayDec.setDate(1);
    lastDayDec.setHours(2, 0, 0, 0);

    Report.find({ "date": { "$gte": firstDayDec, "$lt": lastDayDec } })
        .then(reports => {

            let ammountDec = 0;

            reports.map(report => {
                ammountDec = ammountDec + parseFloat(report.visaCard, 10) + parseFloat(report.virman, 10) + parseFloat(report.cash, 10) + parseFloat(report.companyCard, 10);
            })
            res.json({
                month: 12,
                value: ammountDec.toString()
            })
        })
        .catch(err => console.log(err))

})

/*END OF PAST YEAR*/


// @route   GET api/reports/week/current
// @desc    get all reports from current week
// @access  private
router.get('/week/current', passport.authenticate('jwt', { session: false }), (req, res) => {

    let firstDay = new Date(); //first day of week. beggining

    let lastDay = new Date(); //last day of the week ending

    if (firstDay.getDay() === 1) {

        firstDay.setHours(2, 0, 0, 0);
        lastDay.setHours(25, 59, 59, 999);

    } else if (firstDay.getDay() === 2) {

        firstDay.setDate(lastDay.getDate() - 1);
        firstDay.setHours(2, 0, 0, 0);
        lastDay.setHours(25, 59, 59, 999);

    } else if (firstDay.getDay() === 3) {

        firstDay.setDate(lastDay.getDate() - 2);
        firstDay.setHours(2, 0, 0, 0);
        lastDay.setHours(25, 59, 59, 999);

    } else if (firstDay.getDay() === 4) {

        firstDay.setDate(lastDay.getDate() - 3);
        firstDay.setHours(2, 0, 0, 0);
        lastDay.setHours(25, 59, 59, 999);

    } else if (firstDay.getDay() === 5) {

        firstDay.setDate(lastDay.getDate() - 4);
        firstDay.setHours(2, 0, 0, 0);
        lastDay.setHours(25, 59, 59, 999);

    } else if (firstDay.getDay() === 6) {

        firstDay.setDate(lastDay.getDate() - 5);
        firstDay.setHours(2, 0, 0, 0);
        lastDay.setHours(25, 59, 59, 999);

    } else if (firstDay.getDay() === 0) {

        firstDay.setDate(lastDay.getDate() - 6);
        firstDay.setHours(2, 0, 0, 0);
        lastDay.setHours(25, 59, 59, 999);

    }

    console.log(firstDay);
    console.log(lastDay);

    Report.find({ "date": { "$gte": firstDay, "$lt": lastDay } })
        .then(reports => {
            res.json(reports)
        })
        .catch(err => console.log(err))

});

// @route   GET api/reports/week/current/ammount
// @desc    get all reports from current week
// @access  private
router.get('/week/current/ammount', passport.authenticate('jwt', { session: false }), (req, res) => {

    let firstDay = new Date(); //first day of week. beggining

    let lastDay = new Date(); //last day of the week ending

    if (firstDay.getDay() === 1) {

        firstDay.setHours(2, 0, 0, 0);
        lastDay.setHours(25, 59, 59, 999);

    } else if (firstDay.getDay() === 2) {

        firstDay.setDate(lastDay.getDate() - 1);
        firstDay.setHours(2, 0, 0, 0);
        lastDay.setHours(25, 59, 59, 999);

    } else if (firstDay.getDay() === 3) {

        firstDay.setDate(lastDay.getDate() - 2);
        firstDay.setHours(2, 0, 0, 0);
        lastDay.setHours(25, 59, 59, 999);

    } else if (firstDay.getDay() === 4) {

        firstDay.setDate(lastDay.getDate() - 3);
        firstDay.setHours(2, 0, 0, 0);
        lastDay.setHours(25, 59, 59, 999);

    } else if (firstDay.getDay() === 5) {

        firstDay.setDate(lastDay.getDate() - 4);
        firstDay.setHours(2, 0, 0, 0);
        lastDay.setHours(25, 59, 59, 999);

    } else if (firstDay.getDay() === 6) {

        firstDay.setDate(lastDay.getDate() - 5);
        firstDay.setHours(2, 0, 0, 0);
        lastDay.setHours(25, 59, 59, 999);

    } else if (firstDay.getDay() === 0) {

        firstDay.setDate(lastDay.getDate() - 6);
        firstDay.setHours(2, 0, 0, 0);
        lastDay.setHours(25, 59, 59, 999);

    }

    Report.find({ "date": { "$gte": firstDay, "$lt": lastDay } })
        .then(reports => {
            let ammount = 0;

            reports.map(report => {
                ammount = ammount + parseFloat(report.visaCard, 10) + parseFloat(report.virman, 10) + parseFloat(report.cash, 10) + parseFloat(report.companyCard, 10);
            })

            res.json(ammount);
        })
        .catch(err => console.log(err))

});

// @route   GET api/reports/year/current
// @desc    get all reports from current year
// @access  private
router.get('/year/current', passport.authenticate('jwt', { session: false }), (req, res) => {

    let now = new Date(); //current year beggining
    now.setDate(1);
    now.setMonth(0);
    now.setHours(1, 0, 0, 0);

    let lastDay = new Date(); //current year ending
    lastDay.setDate(0);
    lastDay.setMonth(11)
    lastDay.setHours(24, 59, 59, 999);

    console.log(now);
    console.log(lastDay);

    Report.find({ "date": { "$gte": now, "$lt": lastDay } })
        .then(reports => {
            res.json(reports)
        })
        .catch(err => console.log(err))

});

// @route   GET api/reports/year/current/ammount
// @desc    get all reports from current year
// @access  private
router.get('/year/current/ammount', passport.authenticate('jwt', { session: false }), (req, res) => {

    let now = new Date(); //current year beggining
    now.setDate(1);
    now.setMonth(0);
    now.setHours(1, 0, 0, 0);

    let lastDay = new Date(); //current year ending
    lastDay.setDate(0);
    lastDay.setMonth(11)
    lastDay.setHours(24, 59, 59, 999);

    Report.find({ "date": { "$gte": now, "$lt": lastDay } })
        .then(reports => {
            let ammount = 0;

            reports.map(report => {
                ammount = ammount + parseFloat(report.visaCard, 10) + parseFloat(report.virman, 10) + parseFloat(report.cash, 10) + parseFloat(report.companyCard, 10);
            })

            res.json(ammount);
        })
        .catch(err => console.log(err))

});

// @route   GET api/reports/year/last
// @desc    get all reports from last year
// @access  private
router.get('/year/last', passport.authenticate('jwt', { session: false }), (req, res) => {

    let now = new Date(); //last year beggining
    let lastDay = new Date(); //last year ending

    now.setFullYear(lastDay.getFullYear() - 1);
    now.setDate(1);
    now.setMonth(0);
    now.setHours(1, 0, 0, 0);

    lastDay.setFullYear(now.getFullYear());
    lastDay.setDate(0);
    lastDay.setMonth(11)
    lastDay.setHours(24, 59, 59, 999);

    console.log(now);
    console.log(lastDay);

    Report.find({ "date": { "$gte": now, "$lt": lastDay } })
        .then(reports => {
            res.json(reports)
        })
        .catch(err => console.log(err))

});

// @route   GET api/reports/year/past
// @desc    get all reports from past year
// @access  private
router.get('/year/past', passport.authenticate('jwt', { session: false }), (req, res) => {

    let now = new Date(); //past year beggining
    let lastDay = new Date(); //past year ending

    now.setFullYear(lastDay.getFullYear() - 2);
    now.setDate(1);
    now.setMonth(0);
    now.setHours(1, 0, 0, 0);

    lastDay.setFullYear(now.getFullYear());
    lastDay.setDate(0);
    lastDay.setMonth(11)
    lastDay.setHours(24, 59, 59, 999);

    console.log(now);
    console.log(lastDay);

    Report.find({ "date": { "$gte": now, "$lt": lastDay } })
        .then(reports => {
            res.json(reports)
        })
        .catch(err => console.log(err))

});

// @route   POST api/reports
// @desc    Post report
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    const { errors, isValid } = validationReport(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newReport = {};

    newReport.user = req.user.id;
    newReport.workplace = req.user.workplace;

    if (req.body.person) {
        newReport.person = req.body.person;
    }

    if (req.body.shift) {
        newReport.shift = req.body.shift;
    }

    if (req.body.orderingItemSold) {
        newReport.orderingItemSold = req.body.orderingItemSold;
    }

    if (req.body.sendedReportCashRegister) {
        newReport.sendedReportCashRegister = req.body.sendedReportCashRegister;
    }

    if (req.body.resetCashRegister) {
        newReport.resetCashRegister = req.body.resetCashRegister;
    }

    if (req.body.other) {
        newReport.other = req.body.other;
    }

    if (req.body.visaCard) {
        newReport.visaCard = req.body.visaCard;
    } else {
        newReport.visaCard = '0';
    }

    if (req.body.virman) {
        newReport.virman = req.body.virman;
    } else {
        newReport.virman = '0';
    }

    if (req.body.cash) {
        newReport.cash = req.body.cash;
    } else {
        newReport.cash = '0';
    }

    if (req.body.companyCard) {
        newReport.companyCard = req.body.companyCard;
    } else {
        newReport.companyCard = '0';
    }

    if (req.body.customersIn) {
        newReport.customersIn = req.body.customersIn;
    } else {
        newReport.customersIn = '0';
    }

    if (req.body.customersWithBill) {
        newReport.customersWithBill = req.body.customersWithBill;
    } else {
        newReport.customersWithBill = '0';
    }

    if (req.body.goodsNotHave) {
        newReport.goodsNotHave = req.body.goodsNotHave;
    } else {
        newReport.goodsNotHave = 'Ne';
    }

    if (req.body.unhappyCustomers) {
        newReport.unhappyCustomers = req.body.unhappyCustomers;
    } else {
        newReport.unhappyCustomers = 'Ne';
    }

    if (req.body.praiseCustomer) {
        newReport.praiseCustomer = req.body.praiseCustomer;
    } else {
        newReport.praiseCustomer = 'Ne';
    }

    if (req.body.acceptanceGoods) {
        newReport.acceptanceGoods = req.body.acceptanceGoods;
    } else {
        newReport.acceptanceGoods = 'Ne';
    }

    if (req.body.generalProblems) {
        newReport.generalProblems = req.body.generalProblems;
    } else {
        newReport.generalProblems = 'Ne';
    }

    if (req.body.unsolvedProblems) {
        newReport.unsolvedProblems = req.body.unsolvedProblems;
    } else {
        newReport.unsolvedProblems = 'Ne';
    }

    if (req.body.reclamation) {
        newReport.reclamation = req.body.reclamation;
    } else {
        newReport.reclamation = 'Ne';
    }

    if (req.body.problemsCashRegister) {
        newReport.problemsCashRegister = req.body.problemsCashRegister;
    } else {
        newReport.problemsCashRegister = 'Ne';
    }

    if (req.body.suggestion) {
        newReport.suggestion = req.body.suggestion;
    } else {
        newReport.suggestion = 'Ne';
    }

    new Report(newReport).save().then(report => res.json(report))
});

// @route   PUT api/reports
// @desc    Update report
// @access  Private
router.put('/', passport.authenticate('jwt', { session: false }), (req, res) => {


    const { errors, isValid } = validationReport(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ user: req.user.id })
        .then(user => {
            const newReport = {};

            newReport.user = req.user.id;

            newReport.workplace = req.user.workplace;

            if (req.body.person) {
                newReport.person = req.body.person;
            }

            if (req.body.shift) {
                newReport.shift = req.body.shift;
            }

            if (req.body.orderingItemSold) {
                newReport.orderingItemSold = req.body.orderingItemSold;
            }

            if (req.body.sendedReportCashRegister) {
                newReport.sendedReportCashRegister = req.body.sendedReportCashRegister;
            }

            if (req.body.resetCashRegister) {
                newReport.resetCashRegister = req.body.resetCashRegister;
            }

            if (req.body.other) {
                newReport.other = req.body.other;
            }

            if (req.body.visaCard) {
                newReport.visaCard = req.body.visaCard;
            } else {
                newReport.visaCard = '0';
            }

            if (req.body.virman) {
                newReport.virman = req.body.virman;
            } else {
                newReport.virman = '0';
            }

            if (req.body.cash) {
                newReport.cash = req.body.cash;
            } else {
                newReport.cash = '0';
            }

            if (req.body.companyCard) {
                newReport.companyCard = req.body.companyCard;
            } else {
                newReport.companyCard = '0';
            }

            if (req.body.customersIn) {
                newReport.customersIn = req.body.customersIn;
            } else {
                newReport.customersIn = '0';
            }

            if (req.body.customersWithBill) {
                newReport.customersWithBill = req.body.customersWithBill;
            } else {
                newReport.customersWithBill = '0';
            }

            if (req.body.goodsNotHave) {
                newReport.goodsNotHave = req.body.goodsNotHave;
            } else {
                newReport.goodsNotHave = 'Ne';
            }

            if (req.body.unhappyCustomers) {
                newReport.unhappyCustomers = req.body.unhappyCustomers;
            } else {
                newReport.unhappyCustomers = 'Ne';
            }

            if (req.body.praiseCustomer) {
                newReport.praiseCustomer = req.body.praiseCustomer;
            } else {
                newReport.praiseCustomer = 'Ne';
            }

            if (req.body.acceptanceGoods) {
                newReport.acceptanceGoods = req.body.acceptanceGoods;
            } else {
                newReport.acceptanceGoods = 'Ne';
            }

            if (req.body.generalProblems) {
                newReport.generalProblems = req.body.generalProblems;
            } else {
                newReport.generalProblems = 'Ne';
            }

            if (req.body.unsolvedProblems) {
                newReport.unsolvedProblems = req.body.unsolvedProblems;
            } else {
                newReport.unsolvedProblems = 'Ne';
            }

            if (req.body.reclamation) {
                newReport.reclamation = req.body.reclamation;
            } else {
                newReport.reclamation = 'Ne';
            }

            if (req.body.problemsCashRegister) {
                newReport.problemsCashRegister = req.body.problemsCashRegister;
            } else {
                newReport.problemsCashRegister = 'Ne';
            }

            if (req.body.suggestion) {
                newReport.suggestion = req.body.suggestion;
            } else {
                newReport.suggestion = 'Ne';
            }

            Report.findByIdAndUpdate({ _id: req.body._id }, { $set: newReport }, { new: true })
                .then(report => {
                    res.json(report);
                })
        })

})

// @route   DELETE api/reports/:id
// @desc    Delete report
// @access  Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    User.findOne({ _id: req.user.id })
        .then(user => {
            Report.findById(req.params.id)
                .then(report => {
                    if (report.user.toString() !== req.user.id) {
                        return res.status(401).json({ noAuth: 'User not authorized' })
                    }
                    report.remove().then(() => res.json({ success: true }));
                })
                .catch(err => res.status(404).json({ notFound: 'There is not report' }))
        })

})

module.exports = router;
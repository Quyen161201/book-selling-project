const axios = require('axios');
const moment = require('moment');
const { orderProductSevice } = require('../service/orderSevice')
// const crypto = require('crypto');
// import dateFormat from 'dateformat';
// const querystring = require('qs');
const dayjs = require('dayjs');

module.exports = {


    createOder: (req, res) => {

        res.render('order.ejs', { title: 'Tạo mới đơn hàng', amount: req.session.orderProduct.totalOrder })
    },
    returnUrlPayment: async (req, res) => {
        function sortObject(obj) {
            let sorted = {};
            let str = [];
            let key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    str.push(encodeURIComponent(key));
                }
            }
            str.sort();
            for (key = 0; key < str.length; key++) {
                sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
            }
            return sorted;
        }
        let vnp_Params = req.query;

        let secureHash = vnp_Params['vnp_SecureHash'];

        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];

        vnp_Params = sortObject(vnp_Params);


        let tmnCode = 'EU2KXDL3';
        let secretKey = 'SECTWBHKWQTUUYQMGVRHPZCHHNVDKUGA';

        let querystring = require('qs');
        let signData = querystring.stringify(vnp_Params, { encode: false });
        let crypto = require("crypto");
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");

        if (secureHash === signed) {
            //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
            const email = req.session.email;
            const data = req.session.orderProduct;
            const payment_status = 1;
            const result = await orderProductSevice(data, payment_status, email);

            res.render('success.ejs', { code: vnp_Params['vnp_ResponseCode'] });
        } else {
            res.render('error.ejs', { code: '97' })
        }
    },


    createVnpay: (req, res) => {
        process.env.TZ = 'Asia/Ho_Chi_Minh';
        function sortObject(obj) {
            let sorted = {};
            let str = [];
            let key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    str.push(encodeURIComponent(key));
                }
            }
            str.sort();
            for (key = 0; key < str.length; key++) {
                sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
            }
            return sorted;
        }

        let ipAddr = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
        // var config = require('config');
        let tmnCode = 'EU2KXDL3';
        let secretKey = 'SECTWBHKWQTUUYQMGVRHPZCHHNVDKUGA';
        let vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
        let returnUrl = "http://localhost:8086/purchase";
        // var tmnCode = process.env.vnp_TmnCode;
        // var secretKey = process.env.vnp_HashSecret
        // var vnpUrl = process.env.vnp_Url
        // var returnUrl = process.env.vnp_ReturnUrl

        let date = new Date();
        let createDate = moment(date).format('YYYYMMDDHHmmss');
        let orderId = moment(date).format('DDHHmmss');
        let amount = req.session.orderProduct.totalOrder;
        let bankCode = req.body.bankCode;

        // let orderInfo = req.body.orderDescription;
        // let orderType = req.body.orderType;
        let locale = req.body.language;
        if (locale === null || locale === '') {
            locale = 'vn';
        }
        let currCode = 'VND';
        let vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = tmnCode;
        // vnp_Params['vnp_Merchant'] = ''
        vnp_Params['vnp_Locale'] = locale;
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
        vnp_Params['vnp_OrderType'] = 'other';
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_ReturnUrl'] = returnUrl;
        vnp_Params['vnp_IpAddr'] = ipAddr;
        vnp_Params['vnp_CreateDate'] = createDate;
        if (bankCode !== null && bankCode !== '') {
            vnp_Params['vnp_BankCode'] = bankCode;
        }

        vnp_Params = sortObject(vnp_Params);
        var querystring = require('qs');
        var crypto = require("crypto");
        let signData = querystring.stringify(vnp_Params, { encode: false });

        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");

        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
        console.log(vnpUrl, '>>>::vnurl')

        res.redirect(vnpUrl)

    },

}
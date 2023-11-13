const { cartItemsOrder } = require('../service/orderSevice')

module.exports = {
    orderProduct: async (req, res, next) => {
        const id = req.body.id;
        const carts_id = req.body.arrCart;
        let cartItem = await cartItemsOrder(carts_id);
        let totalSum = 0;
        for (const item of cartItem) {
            for (const subItem of item) {
                totalSum += subItem.total;
            }
        }
        const ship = 30000;
        //cộng thêm phí ship 30000
        req.session.totalOrder = totalSum + ship;

        // mã hóa đơn
        function generateInvoiceCode() {
            // Lấy ngày hiện tại
            let today = new Date();

            // Tạo mã đơn hàng từ thông tin ngày và giờ
            let invoiceCode =
                "INV" +
                today.getFullYear() +
                padNumber(today.getMonth() + 1, 2) +
                padNumber(today.getDate(), 2) +
                padNumber(today.getHours(), 2) +
                padNumber(today.getMinutes(), 2) +
                padNumber(today.getSeconds(), 2);

            return invoiceCode;
        }

        // Hàm để đảm bảo số có đủ số lượng chữ số
        function padNumber(number, length) {
            return ("000" + number).slice(-length);
        }

        // Sử dụng hàm để tạo mã đơn hàng mới
        let newInvoiceCode = generateInvoiceCode();



        // Lưu các giá trị id, carts_id, và totalOrder vào một mảng orderData
        const orderData = { idContact: id, cartItem: carts_id, shipperFee: ship, totalOrder: req.session.totalOrder, invoice: newInvoiceCode };

        // Lưu mảng orderData vào session với tên orderProduct
        req.session.orderProduct = orderData;

        next();



    },
    getOrder: async (req, res) => {

    }
}
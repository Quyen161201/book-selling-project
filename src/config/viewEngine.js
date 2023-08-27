const path = require('path')
const express = require('express')
const configViewEngine = (app) => {
    app.set('views', path.join('./src', 'views')) // khai báo cho express biết là thư mục để lấy ra template
    app.set('view engine', 'ejs') // cấu hình loại template mà mình sử dụng
    // config static
    app.use(express.static(path.join('./src', 'public')))

}
module.exports = configViewEngine
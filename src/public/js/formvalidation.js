// contructor funtion
function Validator(options) {
    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }

    }
    var selectorRules = {};
    var formElement = document.querySelector(options.form);

    function validate(inputElement, rule, message) {

        // lấy ra cá rules của selector
        var rules = selectorRules[rule.selector];
        //lặp qua các rule để kiểm tra
        //nếu có lỗi thì dừng việc kiểm tra
        for (var i = 0; i < rules.length; i++) {
            var errorMessage = rules[i](inputElement.value);
            if (errorMessage) break;
        }
        var errorelement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelect);
        if (errorMessage) {
            errorelement.innerText = errorMessage;
            getParent(inputElement, options.formGroupSelector).classList.add('invalid')
        }
        else {
            errorelement.innerText = '';
            getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
        }
        return !errorMessage;
    }
    // lấy form elment cần xử lý
    if (formElement) {
        //khi submit form loại bỏ mặc định
        formElement.onsubmit = function (e) {
            // e.preventDefault();
            var isFormValid = true;
            // thực hiện lặp qua từng rule và validate
            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);

                // console.log(inputElement);
                // console.log(rule)
                // console.log(selector)

                if (!isValid) {
                    isFormValid = false;
                }

            });
            if (isFormValid) {
                //trường hợp submi với js
                if (typeof options.onSubmit === 'function') {
                    var enableInputs = formElement.querySelectorAll('[name]:not([disabled])');
                    var formValues = Array.from(enableInputs).reduce(function (values, input) {
                        values[input.name] = input.value;
                        return values;

                    }, {});
                    options.onSubmit(formValues);
                }
                // trường hợp submit với hành vị mặc định
                else {
                    formElement.submit();

                }

            }

        }


        // lặp qua mỗi rule và xử lý( lắng nghe sự kiện)
        options.rules.forEach(function (rule) {
            // lưu lại các rule cho mỗi input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            }
            else {
                selectorRules[rule.selector] = [rule.test]
            }
            var inputElement = formElement.querySelector(rule.selector);
            var errorelement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelect);
            if (inputElement) {
                // xử lý khi được blur ra khỏi input
                inputElement.onblur = function () {
                    validate(inputElement, rule);
                }
                // xử lý khi được nhập lại vao input
                inputElement.oninput = function () {
                    errorelement.innerText = '';
                    getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
                }
                inputElement.onclick = function () {

                }
            }
        })
    }
}

// định nghĩa các rules
// 1.nguyên tắc của các rule => trả ra messae lỗi
// 2.khi hợp lệ=> underfined
Validator.isRequired = function (selector, message) {

    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : message || 'vui lòng nhập trường này';
        }
    }
}
Validator.isPhone = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
            return regex.test(value) ? undefined : message || 'Vui lòng nhập đúng định dạng số điện thoại';

        }
    }
}
Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || 'Vui lòng nhập trường này';

        }
    }
}
Validator.minLength = function (selector, min, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : message || `Mật khẩu phải từ ${min} ký tự`;
        }
    }
}
Validator.passback = function (selector, passBack, message) {
    return {
        selector: selector,
        test: function (value) {
            return value === passBack() ? undefined : message || 'Vui lòng nhập giá trị bằng nhau';
        }
    }
}

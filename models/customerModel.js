const { SServiceBase } = require("../base/SServiceBase");

class Customer extends SServiceBase {
    constructor() {
        super('KhachHang')
    }
}

 const customerService = new Customer();

 module.exports = {
    customerService
 }


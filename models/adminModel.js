const { SServiceBase } = require("../base/SServiceBase");

class Admin extends SServiceBase {
    constructor() {
        super('Admin')
    }
}

 const adminService = new Admin();

 module.exports = {
    adminService
 }


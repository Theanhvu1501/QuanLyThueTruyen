const { SServiceBase } = require("../base/SServiceBase");

class Staff extends SServiceBase {
    constructor() {
        super('NhanVien')
    }
}

 const staffService = new Staff();

 module.exports = {
    staffService
 }


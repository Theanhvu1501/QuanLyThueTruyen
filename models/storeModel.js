const { SServiceBase } = require("../base/SServiceBase");

class Store extends SServiceBase {
    constructor() {
        super('CuaHang')
    }
}

 const storeService = new Store();

 module.exports = {
    storeService: storeService
 }


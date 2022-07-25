const { SServiceBase } = require("../base/SServiceBase");

class Rent extends SServiceBase {
    constructor() {
        super('Thue')
    }
}

 const rentService = new Rent();

 module.exports = {
    rentService
 }


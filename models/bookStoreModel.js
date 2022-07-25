const { SServiceBase } = require("../base/SServiceBase");

class BookStore extends SServiceBase {
    constructor() {
        super('SachTaiCuaHang')
    }
}

 const bookStoreService = new BookStore();

 module.exports = {
    bookStoreService
 }


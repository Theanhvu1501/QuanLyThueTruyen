const { SServiceBase } = require("../base/SServiceBase");

class Book extends SServiceBase {
    constructor() {
        super('Sach')
    }
}

 const bookService = new Book();

 module.exports = {
    bookService
 }


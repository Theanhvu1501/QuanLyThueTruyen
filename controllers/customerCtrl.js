const { customerService } = require("../models/customerModel");

const customerCtrl = {
    getCustomers: async(req, res) =>{
        try {
            const customers = await customerService.getAll();
            res.json(customers)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createCustomer: async (req, res) =>{
        try {
            const customer = await customerService.create(req.body)
            res.json(customer)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteCustomer: async(req, res) =>{
        try {
            await customerService.delete(req.params.id)
            res.json({msg: "Deleted a customer"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateCustomer: async(req, res) =>{
        try {
            await customerService.update(req.body)
            res.json({msg: "Updated a customer"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = customerCtrl
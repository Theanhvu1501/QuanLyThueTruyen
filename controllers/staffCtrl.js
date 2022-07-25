const { staffService } = require("../models/staffModel");

const staffCtrl = {
    getStaffs: async(req, res) =>{
        try {
            const staffs = await staffService.getAll();
            res.json(staffs)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createStaff: async (req, res) =>{
        try {
            const staff = await staffService.create(req.body)
            res.json(staff)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteStaff: async(req, res) =>{
        try {
            await staffService.delete(req.params.id)
            res.json({msg: "Deleted a staff"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateStaff: async(req, res) =>{
        try {
            await staffService.update(req.body)
            res.json({msg: "Updated a staff"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = staffCtrl
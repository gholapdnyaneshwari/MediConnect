import doctorModel from "../models/doctorModel.js";


// Get All Doctors
const doctorList = async (req, res) => {

    try {

        const doctors = await doctorModel
            .find({})
            .select("-password");

        res.json({
            success: true,
            doctors
        });

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: error.message
        });

    }
};


// Change Doctor Availability
const changeAvailability = async (req, res) => {

    try {

        const { docId } = req.body;

        const docData = await doctorModel.findById(docId);

        if (!docData) {
            return res.json({
                success: false,
                message: "Doctor not found"
            });
        }

        await doctorModel.findByIdAndUpdate(
            docId,
            {
                available: !docData.available
            }
        );

        res.json({
            success: true,
            message: "Availability Changed"
        });

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: error.message
        });

    }
};


export {
    doctorList,
    changeAvailability
};
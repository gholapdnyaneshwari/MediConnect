const addDoctor = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            speciality,
            degree,
            experience,
            about,
            fees,
            address
        } = req.body;

        const imageFile = req.file;

        console.log({
            name,
            email,
            password,
            speciality,
            degree,
            experience,
            about,
            fees,
            address
        }, imageFile);

        res.json({
            success: true,
            message: "Doctor added successfully"
        });

    } catch (error) {
        console.log(error);

        res.json({
            success: false,
            message: error.message
        });
    }
};

export { addDoctor };
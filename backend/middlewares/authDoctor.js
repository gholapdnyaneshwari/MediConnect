import jwt from "jsonwebtoken";

const authDoctor = async (req, res, next) => {
    try {

        // Header names are converted to lowercase
        const { dtoken } = req.headers;

        if (!dtoken) {
            return res.json({
                success: false,
                message: "Not Authorized Login Again"
            });
        }

        const token_decode = jwt.verify(
            dtoken,
            process.env.JWT_SECRET
        );

        req.body = req.body || {};
        req.body.docId = token_decode.id;

        next();

    } catch (error) {

        console.log("Doctor Auth Error:", error);

        return res.json({
            success: false,
            message: "Not Authorized Login Again"
        });

    }
};

export default authDoctor;
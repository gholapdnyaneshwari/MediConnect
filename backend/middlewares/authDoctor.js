import jwt from "jsonwebtoken";

const authDoctor = async (req, res, next) => {
    try {

        const { dToken } = req.headers;

        if (!dToken) {
            return res.json({
                success: false,
                message: "Not Authorized Login Again"
            });
        }

        const token_decode = jwt.verify(
            dToken,
            process.env.JWT_SECRET
        );

        req.body = req.body || {};
        req.body.docId = token_decode.id;

        next();

    } catch (error) {

        console.log(error);

        return res.json({
            success: false,
            message: "Not Authorized Login Again"
        });

    }
};

export default authDoctor;
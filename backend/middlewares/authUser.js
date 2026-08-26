import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    try {

        const { token } = req.headers;

        // Check token
        if (!token) {
            return res.json({
                success: false,
                message: "Not Authorized Login Again"
            });
        }

        // Verify token
        const token_decode = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Get user ID from token
        req.body.userId = token_decode.id;

        // Continue to next middleware/controller
        next();

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: "Not Authorized Login Again"
        });
    }
};

export default authUser;
import jwt from "jsonwebtoken";
import User from "../models/usermodel.js";

const protectRoute = async (req, res, next) => {
	try {
        // token from cookie 
		const token = req.cookies.jwt;

		if (!token) {
			return res.status(401).json({ error: "Unauthorized - No Token Provided" });
		}
// verify the token (jwt_Secret is used to sign jwt token)
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

// if decoded value is false 
		if (!decoded) {
			return res.status(401).json({ error: "Unauthorized - Invalid Token" });
		}
// we use userId because in utils generatetoken we use userid 
// find the password and remove the password 
		const user = await User.findById(decoded.userId).select("-password");

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		req.user = user;
// the next fn is called which is basically a sendmessage fn(see messageroutes.js)
		next();
	} catch (error) {
		console.log("Error in protectRoute middleware: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export default protectRoute;
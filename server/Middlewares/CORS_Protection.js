export const CORSProtection  = async (req, res, next) => {
    // Check if the request has an 'Origin' header
    const url = req.get('Origin');
    console.log('Domain:', url);

    if (process.env.NODE_ENV === "production" && url !== process.env.CLIENT_URL) {
        return res.status(403).json({ message: `${process.env.ACCESS_FORBIDDEN_MSG}` });
    }

    next();
};
  
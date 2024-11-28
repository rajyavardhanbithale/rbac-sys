import jwt from "jsonwebtoken";

export const cookiesOption = {
    httpOnly: false,
    secure: false,
    sameSite: "lax",
    algorithm: "HS256",
    maxAge: 1 * 24 * 60 * 60 * 1000,
};

export const refreshTokenOption = {
    ...cookiesOption,
    expiresIn: "7d",
    maxAge: 7 * 24 * 60 * 60 * 1000,
};


export const generateJWT = (id, role, expiresIn = "1h") => {
    if (!id || !role) {
        console.log('id or role is missing');
        return null;
    }

    const accessToken = jwt.sign(
        { id: id, role: role },
        process.env.JWT_SECRET,
        { expiresIn: expiresIn }
    );
    return accessToken;
}

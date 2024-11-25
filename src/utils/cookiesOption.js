export const cookiesOption = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 3600000,
    algorithm: "HS256",
    expiresIn: "3h"
};
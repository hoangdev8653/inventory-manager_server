import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
  const refreshToken = jwt.sign({ userId }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
};

export default generateToken;

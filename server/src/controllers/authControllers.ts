import { Request, Response } from "express";
import user from "../models/user";
import isEmailValid from "../utils/checkEmail";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  if (await user.findOne({ username: username })) {
    return res.status(400).json({ message: "Username already exists" });
  }
  if (await user.findOne({ email: email })) {
    return res.status(400).json({ message: "Email already exists" });
  }
  if (!isEmailValid(email)) {
    return res.status(400).json({ message: "Invalid Email" });
  }
  const newUser = {
    username: username,
    email: email,
    password: bcrypt.hashSync(password, 10),
  };
  const createUser = await user.create(newUser);
  if (!createUser) {
    return res.status(400).json({ message: "Cannot register." });
  }
  return res.status(201).json({ message: "User registered successfully" });
};
const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const foundUser = await user.findOne({ username: username });
  if (!foundUser) {
    return res.status(401).json({ message: "Tên đăng nhập không tồn tại." });
  }
  const isPasswordValid = bcrypt.compareSync(password, foundUser.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Mật khẩu không chính xác." });
  }
  const accessToken = jwt.sign(
    {
      UserInfo: {
        _id: foundUser._id,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
  const refreshToken = jwt.sign(
    { _id: foundUser._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
  // Create secure cookie with refresh token
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true, //accessible only by web server
    secure: true, //https
    sameSite: 'none', //cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
  });
    // Create secure cookie with id User
  res.cookie("_id", foundUser._id, {
    httpOnly: true, //accessible only by web server
    secure: true, //https
    sameSite: 'none', //cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
  });
  return res
    .status(200)
    .json({ message: "Đăng nhập thành công.", accessToken });
};
const refresh = async (req: Request, res: Response)=>{
  const cookies = req.cookies;
  if(!cookies?.refreshToken) return res.status(401).json({message:"Unauthorized"})
  const refreshToken = cookies.refreshToken
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async(err,decode)=>{{
      if(err) return res.status(403).json({message:"Forbidden"})
      const foundUser = await user.findOne({_id:decode._id})  ;
      if(!foundUser) return res.status(401).json({ message: 'Unauthorized' });

      const accessToken = jwt.sign( 
        {
          "UserInfo":{
            _id:foundUser._id,
          }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '15m'}
      )
      return res.json({accessToken})
    }}
  )
}
const logout = (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(204) //No content
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
  res.json({ message: 'Cookie cleared' })
}
export { register, login, refresh, logout };

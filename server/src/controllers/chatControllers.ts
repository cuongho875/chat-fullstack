import { Request, Response } from "express"
import chat from "../models/chat"
import user from "../models/user";
const accessChats = async (req:Request,res:Response)=>{
    const authId = req.cookies?._id;
    const {userId} = req.body;
    if(!userId) return res.json({message:"cung cap user id"})
    let findChat = await chat.find({isGroup:false,
    $and:[
        {users:{$elemMatch:{$eq:authId}}},
        {users:{$elemMatch:{$eq:userId}}}
    ]})
    .populate('users', '-password')
    .populate('latestMessage');
    let chatExists = await user.populate(findChat, {
        path: 'latestMessage.sender',
        select: 'username email avatar',
      });
      if (chatExists.length > 0) {
        res.status(200).send(chatExists[0]);
      } else {
        let data = {
          chatName: 'sender',
          users: [authId, userId],
          isGroup: false,
        };
        try {
          const newChat = await chat.create(data);
          const _chat = await chat.find({ _id: newChat._id }).populate(
            'users',
            '-password'
          );
          res.status(200).json(_chat);
        } catch (error) {
          res.status(500).send(error);
        }
      }
}
const fetchAllChats = async (req:Request,res:Response)=>{
    const userId = req.cookies?._id;
    const chats = await chat.find({users:{$elemMatch:{$eq:userId}}})
    .populate('users')
    .populate('latestMessage')
    .populate('groupAdmin')
    .sort({ updatedAt: -1 });
    const finalChats = await user.populate(chats, {
        path: 'latestMessage.sender',
        select: 'username email avatar',    
      });
      res.status(200).json(finalChats);
}
    
    // const createGroup = async (req, res)=>{
    //     const userId = req.cookies?._id;
    //     const users = req.body.users;
        
// }
export {fetchAllChats, accessChats}
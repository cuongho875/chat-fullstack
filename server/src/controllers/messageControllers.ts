import Chat from "../models/chat"
import Message from "../models/message";
import user from "../models/user";

const sendMessage = async (req,res) =>{
    const {chatId} = req.params
    const {message} = req.body
    try {
        let msg = await Message.create({ sender: req.cookies?._id, message, chatId });
        msg = await (
          await msg.populate('sender', 'username avatar email')
        ).populate({
          path: 'chatId',   
          select: 'chatName isGroup users',
          model: 'Chat',    
          populate: {
            path: 'users',
            select: 'username email avatar',
            model: 'User',
          },
        });
        await Chat.findByIdAndUpdate(chatId,{
            latestMessage:msg
        })
        res.status(200).send(msg);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
      }
}
export {sendMessage}
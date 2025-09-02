// MODEL орж ирнэ.
import Message from "../../../../models/Message"

export const createMessage = async (_: any, args: any, { }: any) => {
    const newMessage = new Message(args);
    const savedMessage = await newMessage.save();
    return savedMessage;
}
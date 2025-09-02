import mongoose ,{Document,Schema} from "mongoose"

export interface IMessage extends Document{
    name:string;
    email:string;
    company:string;
    service:string;
    message:string
}
const MessageSchema:Schema = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    company:{type:String,required:true},
    service:{type:String,required:true},
    message:{type:String,required:true}
},{timestamps:true})
export default  mongoose.model<IMessage>("Message",MessageSchema)
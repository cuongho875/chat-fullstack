import { connect } from "mongoose";

const connectMongoDB = async ()=>{
    try {
        await connect(process.env.MONGO_DB_URL);
    } catch (error) {
        console.log(error)
        throw new Error("Cannot connect Mongo DB");
    }
}
export default connectMongoDB;
import mongoose, {Schema, Document} from "mongoose";

export interface ICategory extends Document {
  name: string,
  orderN: number,
  subCateg: {nameSub: string, orderNSub: number}[]
}

const CategorySchema: Schema = new Schema({
  name: {type: String, requird: true},
  order: {type: Number, required: true, default: 0},
  subCateg: {type: {nameSub: {type: String}, orderNSub: {type:Number, default: 0}}}
})

const Category = mongoose.model<ICategory>("Category", CategorySchema)
export default Category
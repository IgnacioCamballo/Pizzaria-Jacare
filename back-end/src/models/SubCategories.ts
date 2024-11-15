import mongoose, {Schema, Document, Types} from "mongoose";

export interface ISubCategory extends Document {
  nameSub: string, 
  orderNSub: number,
  category: Types.ObjectId
}

const SubCategorySchema: Schema = new Schema({
  nameSub: {
    type: String,
    require: true,
    trim: true
  }, 
  orderNsub: {
    type: Number,
    require: true,
    default: 0
  },
  category: {
    type: Types.ObjectId,
    ref: "Category"
  }
}, {timestamps: true})

const SubCategory = mongoose.model<ISubCategory>("SubCategory", SubCategorySchema)
export default SubCategory
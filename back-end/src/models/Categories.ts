import mongoose, {Schema, Document, PopulatedDoc, Types} from "mongoose";
import { ISubCategory } from "./SubCategories";

export interface ICategory extends Document {
  name: string,
  orderN: number,
  subCategories: PopulatedDoc<ISubCategory & Document>[]
}

const CategorySchema: Schema = new Schema({
  name: {
    type: String, 
    requird: true,
    trim: true
  },
  orderN: {
    type: Number, 
    required: true, 
    default: 0
  },
  subCategories: [
    {
      type: Types.ObjectId,
      ref: "SubCategory"
    }
  ]
  }, {timestamps: true})
  
const Category = mongoose.model<ICategory>("Category", CategorySchema)
export default Category
import mongoose, {Schema, Document, Types} from "mongoose";

export interface IProduct extends Document {
  idNumber: number,
  name: string,
  category: Types.ObjectId,
  categoryName: string,
  subcategory: Types.ObjectId,
  subcategoryName: string,
  ingredients: string,
  price: number,
  price2: number,
  img: string
}

const ProductSchema: Schema = new Schema({
  idNumber: { 
    type: Number,
    required: true,
    trim: true},
  name: { 
    type: String, 
    required: true, 
    trim: true
  },
  category: { 
    type: Types.ObjectId, 
    ref: "Category",
    required: true
  },
  categoryName: { 
    type: String, 
    trim: true
  },
  subcategory: { 
    type: Types.ObjectId, 
    ref: "SubCategory"
  },
  subcategoryName: { 
    type: String, 
    trim: true
  },
  ingredients: { 
    type: String, 
    trim: true
  },
  price: { 
    type: Number, 
    required: true, 
    trim: true
  },
  price2: { 
    type: Number, 
    trim: true
  },
  img: { 
    type: String, 
    trim: true
  }
}, {timestamps: true})

const Product = mongoose.model<IProduct>("Product", ProductSchema)
export default Product
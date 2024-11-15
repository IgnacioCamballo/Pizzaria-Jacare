import mongoose, {Schema, Document} from "mongoose";

export interface IProduct extends Document {
  idNumber: number,
  name: string,
  category: string,
  subcategory: string,
  ingredients: string,
  price: number,
  price2: number,
  img: string
}

const ProductSchema: Schema = new Schema({
  idNumber: { 
    type: Number, 
    trim: true},
  name: { 
    type: String, 
    required: true, 
    trim: true
  },
  category: { 
    type: String, 
    required: true, 
    trim: true
  },
  subcategory: { 
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
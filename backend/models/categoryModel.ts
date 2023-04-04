import { Schema, model } from 'mongoose';

export interface CategoryInterface {
  name: string;
  slug: string;
  color?: string;
}

const CategorySchema = new Schema<CategoryInterface>({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  color: {
    type: String,
    default: 'blue',
  },
});

export default model<CategoryInterface>('category', CategorySchema);

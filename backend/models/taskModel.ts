import { Schema, model } from 'mongoose';

interface TaskInterface {
  title: string;
  description?: string;
  isDone?: boolean;
  categories?: string[];
}

const TaskSchema = new Schema<TaskInterface>(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    isDone: {
      type: Boolean,
      default: false,
    },
    categories: [{ type: Schema.Types.ObjectId, ref: 'category' }],
  },
  { timestamps: true }
);

export default model<TaskInterface>('task', TaskSchema);

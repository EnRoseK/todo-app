import { TaskModel } from '@/models/task';
import { BsThreeDots } from 'react-icons/bs';

interface TaskItemProps {
  task: TaskModel;
}

const TaskItem = ({ task }: TaskItemProps): JSX.Element => {
  return (
    <div className="w-[calc((100%_-_20px)_/_2)] bg-yellow-100 rounded-md p-5">
      <div className="flex items-center justify-between mb-6">
        <h1 className={`text-xl font-bold text-slate-700 ${task.isDone ? 'line-through' : ''}`}>
          {task.title}
        </h1>
        <button className="text-xl text-slate-600 hover:opacity-70 duration-150">
          <BsThreeDots />
        </button>
      </div>
      <p className={`mb-6 text-slate-600 ${task.isDone ? 'line-through' : ''}`}>
        {task.description}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {task.categories?.map((category) => (
            <div
              key={category._id}
              className={`w-6 h-6 rounded-full mt-1`}
              style={{ backgroundColor: category.color, opacity: '40%' }}
            />
          ))}
        </div>
        <div className="flex items-center gap-1">
          <input checked={task.isDone} type="checkbox" className="w-4 h-4" id="done" />
          <label className="select-none text-base font-semibold text-slate-700" htmlFor="done">
            Done
          </label>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;

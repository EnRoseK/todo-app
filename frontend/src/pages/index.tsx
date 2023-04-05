import { GetServerSideProps } from 'next';
import Sidebar from './components/Sidebar';
import { CategoryModel } from '@/models/category';
import { TaskModel } from '@/models/task';
import TaskItem from './components/TaskItem';

interface HomePageProps {
  categories: CategoryModel[];
  tasks: TaskModel[];
}

const Home = ({ categories, tasks }: HomePageProps): JSX.Element => {
  console.log(tasks);
  return (
    <div className="flex items-start gap-16">
      <Sidebar categories={categories} />
      <div className="flex-1 flex flex-wrap gap-5">
        {tasks.map((task) => (
          <TaskItem key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<HomePageProps> = async () => {
  const categoryRes = await fetch('http://localhost:5050/api/categories');
  const taskRes = await fetch('http://localhost:5050/api/tasks');

  const categoryData = await categoryRes.json();
  const taskData = await taskRes.json();

  return {
    props: {
      categories: categoryData,
      tasks: taskData,
    },
  };
};

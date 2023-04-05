import { CategoryModel } from '@/models/category';

interface SidebarProps {
  categories: CategoryModel[];
}

const Sidebar = ({ categories }: SidebarProps): JSX.Element => (
  <div className="w-[250px]">
    <ul className="flex flex-col gap-5">
      {categories.map((category) => (
        <li key={category._id}>
          <button className="w-full p-2 pt-1 flex gap-3 items-center text-slate-800 text-xl font-semibold rounded-md leading-[28px] hover:bg-slate-200 duration-150">
            <div
              className={`w-7 h-7 rounded-full mt-1`}
              style={{ backgroundColor: category.color, opacity: '40%' }}
            />
            {category.name}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

export default Sidebar;

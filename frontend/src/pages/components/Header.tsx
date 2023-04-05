import { AiOutlinePlus } from 'react-icons/ai';

const Header = (): JSX.Element => {
  const title = 'todo';

  return (
    <div className="flex items-center justify-between mt-10 mb-16 text-[#5C594E]">
      <h1 className="select-none text-3xl font-bold">{title}</h1>
      <button className="text-3xl hover:opacity-60 duration-300">
        <AiOutlinePlus />
      </button>
    </div>
  );
};

export default Header;

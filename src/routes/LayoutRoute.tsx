import { Outlet } from "react-router";

const LayoutRoute: React.FC = () => {
  return (
    <div className='h-[100vh] p-10'>
      <Outlet />
    </div>
  );
};

export default LayoutRoute;

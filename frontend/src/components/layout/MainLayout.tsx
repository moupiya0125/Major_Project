import { Outlet } from 'react-router-dom';
import Navigation from '../Navigation';
import Chatbox from '../Chatbox';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow container mx-auto p-4 md:p-6">
        <Outlet />
      </main>
      <footer className="py-4 text-center text-sm text-muted-foreground border-t">
        © {new Date().getFullYear()} Krishi Mitra. All rights reserved.
      </footer>
      <Chatbox />
    </div>
  );
};

export default MainLayout;
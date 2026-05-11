import { ReactNode } from 'react';
import BottomNav from './BottomNav';
import AIStylistFAB from './AIStylistFAB';

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-background max-w-[430px] mx-auto relative">
      <main className="pb-16">
        {children}
      </main>
      <AIStylistFAB />
      <BottomNav />
    </div>
  );
};

export default AppLayout;

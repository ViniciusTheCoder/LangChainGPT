import Image from 'next/image';
interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="mx-auto flex flex-col space-y-4 bg-main-blue">
      <header className="static top-0 z-40 bg-main-blue border-b-2 border-red-500">
        <div className="h-16  border-b-slate-200 py-4 flex items-center">
          <nav className="pl-6">
          <Image src="/white-logo.svg"  alt='header-icon' width={150} height={500}/>
          </nav>
        </div>
      </header>
      <div>
        <main className="flex w-full flex-1 flex-col overflow-hidden bg-main-blue">
          {children}
        </main>
      </div>
    </div>
  );
}
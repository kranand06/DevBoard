import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout({ title, subtitle, children }) {
  return (
    <div
      className="flex min-h-screen"
      style={{ backgroundColor: '#0b1326' }}
    >
      <aside className="sticky top-0 h-screen shrink-0">
        <Sidebar />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <Header title={title} subtitle={subtitle} />

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
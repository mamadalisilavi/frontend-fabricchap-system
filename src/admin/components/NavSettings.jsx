export default function NavSettings({ title }) {
  return (
    <nav className="container mx-auto flex justify-center bg-blue-600 ">
      <div className="text-lg font-bold text-white text-center py-3">
        {title}
      </div>
    </nav>
  );
}

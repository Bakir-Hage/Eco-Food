export default function Header() {
  return (
    <div className="absolute inset-0 z-0">
      <nav className="absolute flex items-center gap-4 px-6 py-10">
        <img
          src="public/Logo.png"
          alt="Eco-Food Logo"
          className="w-25 h-25"
        />
        <span className="font-semibold text-[35px] text-white">Eco-Food</span>
      </nav>
    </div>
  );
}

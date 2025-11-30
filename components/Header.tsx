import { ThemeToggle } from "./ThemeToggle";

const Header = () => (
  <header className="w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
    <div className="w-full px-10 py-5 flex items-center justify-between">
      <h1 className="text-4xl font-bold">Basic Services Payment App</h1>
      <ThemeToggle />
    </div>
  </header>
);

export default Header;

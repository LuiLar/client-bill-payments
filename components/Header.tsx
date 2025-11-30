import { ThemeToggle } from "./ThemeToggle";

const Header = () => (
  <header className="w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
    <div className="w-full px-10 flex h-16 items-center justify-between">
      <h1 className="text-4xl font-bold mb-8">Basic Services Payment App</h1>
      <ThemeToggle />
    </div>
  </header>
);

export default Header;

export default function Footer(): JSX.Element {
  return (
    <footer className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-xs font-moderat text-muted/50 tracking-wide">
          © {new Date().getFullYear()} Mehdi Asadi
        </div>
      </div>
    </footer>
  );
}

"use client";
import Link from "next/link";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslations } from "@/hooks/useTranslations";

export default function Navbar(): JSX.Element {
	const t = useTranslations();
	const { direction } = useLanguage();
	return (
		<header className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-sm">
			<nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
				<Link href="/" className="text-lg font-moderat font-medium text-muted hover:text-foreground transition-colors">
					{t.mehdiAsadi}
				</Link>
				<div className="flex items-center gap-8">
					<Link
						href="/about"
						className="text-xs font-moderat font-medium tracking-wider uppercase text-muted/70 hover:text-artistic-red transition-colors"
					>
						{t.about}
					</Link>
					<Link
						href="/work"
						className="text-xs font-moderat font-medium tracking-wider uppercase text-muted/70 hover:text-artistic-red transition-colors"
					>
						{t.work}
					</Link>
					<Link
						href="/cv"
						className="text-xs font-moderat font-medium tracking-wider uppercase text-muted/70 hover:text-artistic-red transition-colors"
					>
						CV
					</Link>
					<Link
						href="/contact"
						className="text-xs font-moderat font-medium tracking-wider uppercase text-muted/70 hover:text-artistic-red transition-colors"
					>
						{t.contact}
					</Link>
					<ThemeToggle />
					<LanguageToggle />
				</div>
			</nav>
		</header>
	);
}

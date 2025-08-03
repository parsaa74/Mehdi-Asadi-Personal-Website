"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ConcretePoetry from "./ConcretePoetry";

export default function Hero() {
	const containerRef = useRef<HTMLElement>(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end start"]
	});

	// Minimal scroll transformations
	const yTransform = useTransform(scrollYProgress, [0, 1], [0, -50]);
	const opacityTransform = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

	return (
		<section
			ref={containerRef}
			className="relative min-h-screen flex flex-col justify-center px-6 py-32 overflow-hidden"
		>
			{/* Minimal geometric elements */}
			<div className="absolute inset-0 opacity-[0.01]">
				<div className="absolute top-1/3 right-1/4 w-px h-32 bg-artistic-red transform rotate-12" />
				<div className="absolute bottom-1/3 left-1/3 w-24 h-px bg-artistic-blue" />
			</div>
			<ConcretePoetry />
			<div className="max-w-6xl mx-auto w-full relative z-10">
				{/* Small name in top left */}
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="absolute top-0 left-0"
				>
				</motion.div>

				{/* Minimal central content */}
				<motion.div
					className="text-center space-y-12"
					style={{
						y: yTransform,
						opacity: opacityTransform
					}}
				>
					{/* Main statement - minimal and impactful */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.6 }}
						className="space-y-8"
					>
					</motion.div>

					{/* Minimal interaction hint */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.8, delay: 1.2 }}
						className="flex justify-center"
					>
						<div className="w-px h-16 bg-border opacity-30" />
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}

module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		backgroundColor: (theme) => ({
			...theme("colors"),
			black: "#232323",
			blue1: "#62B4FF",
			blue2: "#81C3FF",
			red1: "#E73953",
			red2: "#EC6175",
			green1: "#00D790",
			green2: "#33DFA6",
		}),
		screens: {
			sm: "640px",
			// => @media (min-width: 640px) { ... }

			md: "768px",
			// => @media (min-width: 768px) { ... }

			lg: "1024px",
			// => @media (min-width: 1024px) { ... }

			xl: "1280px",
			// => @media (min-width: 1280px) { ... }

			bigHome: "500px",
			// => @media (min-width: 480px) { ... }
		},
	},
	variants: {
		extend: {},
		flexDirection: ["responsive"],
	},
	plugins: [],
};

import React, { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	sizeClass?: string;
	fontClass?: string;
	rounded?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{
			className = "",
			sizeClass = "h-[54px] px-4 ",
			fontClass = "text-sm font-normal",
			rounded = "rounded-2xl",
			children,
			type = "text",
			...args
		},
		ref,
	) => {
		return (
			<input
				ref={ref}
				type={type}
				className={`block w-full border-neutral-200 bg-white focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 ${rounded} ${fontClass} ${sizeClass} ${className}`}
				{...args}
			/>
		);
	},
);

export default Input;

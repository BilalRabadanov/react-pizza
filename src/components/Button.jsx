import React from 'react';
import classNames from 'classnames';

const Button = ({ className, children, outline, ...props }) => {
	return (
		<button
			className={classNames("button",
				className,
				{ "button--outline": outline },
			)}
			{...props}
		>
			{children}
		</button>
	);
}

export default Button;

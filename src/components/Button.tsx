import React, {FC, ButtonHTMLAttributes} from "react";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    classname?: string,
    disabled?: boolean
}
const Button: FC<ButtonProps> = ({
    type = 'button',
    onClick,
    children,
    className = '',
    disabled = false,
    ...props
}) => {
    return (
        <button
        type={type}
        onClick={onClick}
        className={`px-4 py-2 rounded ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    )
}
export default Button
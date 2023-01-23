import React from 'react'
import cx from 'classnames'
const LoadingIndicator = () => (
    <div className="absolute right-1 w-3 h-3 border-0 animate-bordered" />
)
export const Button = ({
                           className,
                           disabled,
                           icon,
                           kind, // alternate, alternate-primary, icon, icon-outline ..?
                           loading,
                           onClick,
                           rounded,
                           size,
                           text,
                           type = 'button',
                           title,
                           href,
                       }) => {
    const common = `${className} mb-16 border-2 border-transparent hover:bg-transparent hover:text-black hover:border-black items-center flex ${
        className?.includes('disabled')
            ? ''
            : 'disabled:bg-primary disabled:text-white disabled:border-transparent disabled:opacity-50'
    } ${className?.includes('bg-') ? '' : 'bg-primary'} ${
        className?.includes('text-') ? '' : 'text-white'
    } leading-none`


    if (href && !onClick && !disabled)
        onClick = () => (window.location.href = href)

    return (
        <>


            {!kind && text && (
                <button
                    className={cx(common, {
                        'text-lg px-6 h-10 py-2': size == 'large',
                        'p-3': size == 'even',
                        'p-2': size == 'even-small',
                        'px-6 py-3 text-sm h-10': !size,
                    })}
                    disabled={disabled || loading}
                    onClick={onClick}
                    type={type}
                >
                    {icon && <span className="mr-1">{icon}</span>}
                    <span className="w-full">{text}</span>
                    {loading && <LoadingIndicator />}
                </button>
            )}



        </>
    )
}

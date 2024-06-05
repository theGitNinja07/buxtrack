import React from 'react'

type CustomInputProps = {
  label: string
  error: string
  connect: string
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className' | 'id'>

const CustomInput: React.FC<CustomInputProps> = (props) => {
  const { label, error, connect, ...rest } = props
  return (
    <>
      <div>
        <label htmlFor={connect}>
          <span className="block mb-1 max-w-max">{label}</span>
          <input id={connect} className="w-full input input-bordered" {...rest} />
        </label>
        {error && (
          <p className="flex gap-1 mt-2 text-sm text-red-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>

            <span className="leading-3">{error}</span>
          </p>
        )}
      </div>
    </>
  )
}
export default CustomInput

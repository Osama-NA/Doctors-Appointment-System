import React from 'react'

const Input = ({type, label, placeholder, value, onChange, required, className}) => {
  return (
    <>
        <label className="semiBold font15">{label}</label>
        <input 
         type={type}
         placeholder={placeholder}
         value={value}
         onChange={onChange}
         accept='image/png, image/jpeg'
         required={required}
         className={className}
        />
    </>
  )
}

export default Input
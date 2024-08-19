import React from 'react'
import Eye from './Eye'

const FloatingInput = ({ value, maxLength, disabled, startContent = null, onChange, placeholder, labelId, type, passwordIsShowed = false, setPasswordIsShowed, advancedType, className }) => {
    return (
        <div className={'h-[48px] w-[100%] relative ' + className}>

            {startContent ? <p className='absolute top-[50%] text-[#7D7C93] translate-y-[-50%]'>{startContent}</p> : ""}
            <input disabled={disabled} onChange={onChange} value={value} autoComplete='off' id={labelId} className={startContent ? "border-solid placeholder:hidden floating-input w-[100%] h-[100%] border-[#E5E5E5] border-b-[1.5px] pl-[15px]" : "border-solid placeholder:hidden floating-input w-[100%] h-[100%] border-[#E5E5E5] border-b-[1.5px] disabled:bg-[#fff]"} placeholder='' type={type} />
            <label className={startContent !== null ? "text-[#7D7C93] floating-label absolute left-0 top-[50%] translate-y-[-50%] ml-[15px]" : 'text-[#7D7C93] floating-label absolute left-0 top-[50%] translate-y-[-50%]'} htmlFor={labelId}>{placeholder}</label>
            {advancedType === 'password' ? <Eye passwordIsShowed={passwordIsShowed} setPasswordIsShowed={setPasswordIsShowed} /> : ""}
        </div>
    )
}

export default FloatingInput
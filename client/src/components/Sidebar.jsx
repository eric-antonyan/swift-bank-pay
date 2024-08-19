import React from 'react'

const Sidebar = () => {
  return (
    <ul style={{height: "calc(100vh - 93px)"}} className='xs:hidden w-[236px] px-[36px] py-[47px] text-[20px] flex flex-col gap-[17px] border-r-[1px] border-[#F3F3F3]'>
      <li className='cursor-pointer text-[#235697] flex gap-[12px] text-center items-center'><i className="fa fa-home"></i> Home</li>
      <li className='cursor-pointer text-[#A09FA4] flex gap-[12px] text-center items-center'><i className="far fa-paper-plane-top"></i> Send</li>
      <li className='cursor-pointer text-[#A09FA4] flex gap-[12px] text-center items-center'><i className="fa-solid fa-chart-mixed-up-circle-currency"></i> Invest</li>
      <li className='cursor-pointer text-[#A09FA4] flex gap-[12px] text-center items-center'><i className="fa-solid fa-credit-card"></i> Cards</li>
      <li className='cursor-pointer text-[#A09FA4] flex gap-[12px] text-center items-center'><i className="fa-light fa-circle-ellipsis-vertical"></i> More</li>
    </ul>
  )
}

export default Sidebar

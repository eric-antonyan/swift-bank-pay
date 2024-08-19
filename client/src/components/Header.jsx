import React from 'react'
import Logo from './Logo'
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem
} from "@nextui-org/dropdown";
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'

const Header = ({ user, page }) => {
    const navigate = useNavigate()
    const onLogOut = () => {
        Cookies.remove('jwt')
        navigate('/go')
    }
    return (
        <div className='px-[40px] sticky top-0 z-50 bg-[#fff] xs:py-[18px] py-[28px] flex justify-between xs:px-[20px] mx-auto border-b-[1px] border-solid border-[#F3F3F3]'>
            <div className='flex items-center'>
                <div className='xs:hidden'>
                    <Logo />
                </div>
                <div className='text-[#235697] cursor-pointer flex items-center'>
                    <i className="fas fa-home ml-[36px] xs:hidden xs:ml-[0]"></i>
                    <p className='ml-[16px] xs:font-[500]'>Send Money</p>
                </div>
            </div>
            <div className='flex gap-[16px] xs:hidden items-center'>
                <div className='h-[36px] w-[36px] cursor-pointer bg-[#F1F5F9] rounded-[50%] flex justify-center items-center'>
                    <i className="fa-regular fa-eye-slash text-[#235697]"></i>
                </div>
                <div className='h-[36px] w-[36px] cursor-pointer bg-[#F1F5F9] rounded-[50%] flex justify-center items-center'>
                    <i className="fa-regular fa-bell text-[#235697]"></i>
                </div>
                <div className='h-[36px] w-[36px] cursor-pointer bg-[#F1F5F9] rounded-[50%] flex justify-center items-center'>
                    <i className="fa-regular fa-circle-user text-[#235697]"></i>
                </div>
            </div>
            <Dropdown>
                <DropdownTrigger>
                    <div className='cursor-pointer ml-[36px] xs:ml-[0]'><p>Hi, {user.firstName + " " + user.lastName} <i className="fa fa-chevron-down text-[#7D7C93]"></i></p></div>
                </DropdownTrigger>
                <DropdownMenu variant="flat" aria-label="Dropdown menu with icons">
                    <DropdownItem
                        key="new"
                        startContent={<i className='fa fa-user' />}
                    >
                        <Link to={"/go/account/" + user.account}>
                            My acoount
                        </Link>
                    </DropdownItem>
                    <DropdownItem
                        onClick={onLogOut}
                        key="delete"
                        variant='flat'
                        className="text-danger"
                        color="danger"
                        startContent={<i className='fa fa-trash'></i>}
                    >
                        Log out
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}

export default Header

import React from 'react'
import FloatingInput from './FloatingInput';
import BankLogoNoText from './BankLogoNoText';

const ReceiptInformation = ({receipt, user, identificator, formattedDate}) => {
    return (
        <form className='px-[20px] h-[auto] flex flex-col justify-center' id='receipt'>
            <FloatingInput type={'text'} disabled className={`mt-[28px] ${receipt.from !== user.uuid ? 'text-success' : 'text-danger'}`} placeholder={"Amount"} labelId={'amount'} value={`${receipt.to === user.uuid ? '+' : '-'}${new Intl.NumberFormat('en-US', {
                style: "currency",
                currency: "USD"
            }).format(receipt.amount)}`} />
            <FloatingInput type={'text'} disabled className='mt-[28px]' placeholder={"From"} labelId={'fromFN'} value={receipt.incoming_user.firstName + ' ' + receipt.incoming_user.lastName} />
            <FloatingInput type={'text'} disabled className='mt-[28px]' placeholder={"To"} labelId={'toAccount'} value={receipt.outgoing_user.firstName + ' ' + receipt.outgoing_user.lastName} />
            <FloatingInput type={'text'} disabled className='mt-[28px]' placeholder={"From Account Number"} labelId={'fromAccount'} value={receipt.incoming_user.account} />
            <FloatingInput type={'text'} disabled className='mt-[28px]' placeholder={"To Account Number"} labelId={'toAccount'} value={receipt.outgoing_user.account} />
            <FloatingInput type={'text'} disabled className='mt-[28px]' placeholder={"To Account Number"} labelId={'date'} value={formattedDate(receipt.createdAt)} />
            <FloatingInput value={identificator.toUpperCase()}
                className='mt-[28px]' labelId={'amout'} disabled placeholder={"Transaction Reference"} />
            <p className='text-center mt-4 text-[#7D7C93]'>Receipt design by Antonyan Apps</p>
            <p className='text-center mt-2 text-[#7D7C93]'>Swift Bank Offical</p>
        </form>
    )
}

export default ReceiptInformation

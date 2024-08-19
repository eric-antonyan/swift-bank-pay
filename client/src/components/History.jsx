import React, { useEffect, useState } from 'react';
import { api } from '../models/config.model';
import LogoBlue from './LogoBlue';
import { Link } from 'react-router-dom';
import { Avatar } from '@nextui-org/react';
import axios from 'axios';

const History = ({ uuid }) => {
    const [messagesByDay, setMessagesByDay] = useState({});

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`${api}/api/history/${uuid}`);
                const data = response.data;

                // Group messages by date
                const groupedMessages = data.reduce((acc, message) => {
                    const date = new Date(message.createdAt).toDateString();
                    if (!acc[date]) {
                        acc[date] = [];
                    }
                    acc[date].push(message);
                    return acc;
                }, {});

                setMessagesByDay(groupedMessages);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        const intervalId = setInterval(fetchMessages, 3000);

        // Initial fetch
        fetchMessages();

        return () => clearInterval(intervalId);
    }, [api, uuid, setMessagesByDay])

    return (
        <div>
            {Object.keys(messagesByDay).reverse().map((date, index) => {
                const reversed = [...messagesByDay[date]].reverse();
                return <div key={index}>
                    <h1 className='text-[1.5rem] mt-5 font-[600]'>{date === new Date().toDateString() ? "Today" : date}</h1>
                    <ul className='mt-[2rem] flex flex-col gap-4 pb-[50px]'>
                        {reversed.map((message, idx) => {
                            const { createdAt } = message
                            const formdate = new Date(createdAt)
                            const hours = formdate.getHours() < 10 ? '0' + formdate.getHours() : formdate.getHours();
                            const minutes = formdate.getMinutes() < 10 ? '0' + formdate.getMinutes() : formdate.getMinutes();
                            const seconds = formdate.getSeconds() < 10 ? '0' + formdate.getSeconds() : formdate.getSeconds();

                            const formattedTime = `${hours}:${minutes}`;
                            return <Link to={"/go/receipt/" + message._id} className='text-inherit'>
                                <li key={message.date} className='flex justify-between items-center cursor-pointer'>
                                    <div className='flex gap-3'>
                                        <Avatar style={{fontWeight: "bold"}} isBordered color={message.from === uuid ? "danger" : "success"} className='font-bold' name={message.outgoing ? message.outgoing_user.firstName[0].concat(message.outgoing_user.lastName[0]) : message.incoming_user.firstName[0].concat(message.incoming_user.lastName[0])} />
                                        <div>
                                            <p className={message.outgoing ? 'text-danger font-[500]' : 'text-success font-[500]'}>{message.outgoing ? message.outgoing_user.firstName + " " + message.outgoing_user.lastName : message.incoming_user.firstName + " " + message.incoming_user.lastName}</p>
                                            <p className='text-[#7D7C93]'>{formattedTime}</p>
                                        </div>
                                    </div>
                                    <p className={message.outgoing ? 'text-danger font-[500]' : 'text-success font-[500]'}>{message.outgoing ? <i className='fa fa-arrow-down'></i> : <i className='fa fa-arrow-up'></i>} {new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD'
                                    }).format(message.amount)}</p>
                                </li>
                            </Link>
                        })}
                    </ul>
                </div>
            })}
        </div>
    );
}

export default History
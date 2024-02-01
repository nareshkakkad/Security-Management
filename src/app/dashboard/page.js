"use client"
import { message } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function charmin() {
    const [items, setItems] = useState([]);
    const router = useRouter()
    const [messageApi, contextHolder] = message.useMessage();

    const tost = (type, data) => {
        messageApi.open({
            type: type,
            content: data,
        });
    };

    useEffect(() => {
        console.log(12121212)
        if (typeof window !== 'undefined') {
            const data = localStorage.getItem('data');
            const items = data ? JSON.parse(data) : null
            if (items !== null) {
                setItems(items);
            } else {
                setItems([])
            }
        }
    }, []);

    useEffect(() => {
        console.log(1212121,items)
        if (items.length === 0) {
            if (window.location.pathname !== '/') {
                tost('error', 'Please Login To For Explore This Dashboard')
            }
            router.push('/')
        }
    }, [items]);
    return (
        <div>
            {contextHolder}
            <p className="text-5xl h-screen flex items-center justify-center"></p>
        </div>
    )
}
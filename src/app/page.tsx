"use client"
import { message } from 'antd';
import { useEffect, useState } from 'react';

export default function Home() {
  const [items, setItems] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const tost = (type : any,data: string) => {
    messageApi.open({
      type: type,
      content: data,
    });
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem('data');
      const items = data  ? JSON.parse(data) : null
      if (items !== null) {
        setItems(items);
      } else{
        setItems([])
      }
    }
  }, []);
  
  useEffect(() => {
    if(items.length == 0){
      if(window.location.pathname !== '/'){
        tost('error' , 'Please Login To For Explore This Dashboard')
      }
    }
  }, [items]);
  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div>
      {contextHolder}
      <h2 className="text-5xl flex items-center justify-center text-gray-800" style={{height : '91vh'}}>Welcome 👐 To Security Management Syastem</h2>
      </div>
  )
}

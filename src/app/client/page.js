"use client"
import { Divider, Table, message, Button, Checkbox, Form, Input, InputNumber, Select, Tabs, List, Typography, Spin } from 'antd';
import qs from 'qs';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Step1 from "./Steps/step1";
import Step2 from "./Steps/step2";
import Step3 from "./Steps/step3";
import Step4 from "./Steps/step4";
import Step5 from "./Steps/step5";
import Step6 from "./Steps/step6";
import Step7 from "./Steps/step7";

export default function Staff() {
    const router = useRouter();
    const [item, setItem] = useState();
    const [messageApi, contextHolder] = message.useMessage();
    const [siteId, setSiteId] = useState();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const data = async () => {
            if (typeof window !== 'undefined') {
                const data = localStorage.getItem('data');
                const items = data ? JSON.parse(data) : null
                if (items !== null) {
                    setItem(items)
                } else {
                    setItem()
                    router.push('/')
                    window.location.href = "/";
                }
            } else {
                setItem()
            }
        }
        data()
    }, [])

    const tost = (type, data) => {
        messageApi.open({
            type: type,
            content: data,
        });
    };

    let rawInstanceConfig = {
        baseURL: "https://51.20.20.105",
        timeout: 60000,
        headers: {
            "Authorization": `Bearer ${item?.access}`
            // 'WebpSupport': (webp_support() ? 'yes' : 'no'),
        }
    };
    const rawInstance = axios.create(rawInstanceConfig);

    const login = (body) => {
        return rawInstance.get('https://51.20.20.105/api/v1/client/', body, { withCredentials: true });

    }
    const fetchFact = (e) => {

        login().then(async (response) => {
            if (typeof window !== 'undefined') {
                setData(response.data.results)
                setSiteId(response.data.results[0].id)
                setLoading(false)
            }
        }).catch(error => {
            tost('error', 'Please Enter Correct Username And Password')
        }).finally(() => {
            console.log()
            setLoading(false)
        });
    };

    useEffect(() => {
        fetchFact()
    }, [item?.access , siteId])

    // useEffect(async () => {
    //     const data = async () => {
    //         if (item?.access) {
    //             fetchFact()
    //         }
    //     }
    //     data()
    // }, [item])

    const [data, setData] = useState([]);


    return (
        <>
            {!loading ? <>
                {/* {contextHolder} */}
                <Divider className="bg-slate-400 before:text-black"><h1><b className='text-4xl'>Client Details</b></h1></Divider>
                <div className='flex py-4 px-4'>
                    <div className='w-8/12 border-slate-700 border-2 rounded-xl p-1'>
                        <List
                            header={<div className='flex justify-between'><b>Client List</b><p className="text-center text-xl dark:bg-slate-700 bg-slate-200 text-gray-800 dark:text-white w-44 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg  hover:bg-gray-700 hover:text-gray-50 focus:outline-none dark:focus:ring-gray-800 cursor-pointer" onClick={() => router.push('/site/addSite')}>+ Add Client</p></div>}
                            bordered
                            dataSource={data}
                            renderItem={(item) => (
                                <List.Item onClick={() => {setSiteId(item.id), fetchFact()}} className='cursor-pointer'>
                                    {item.name}
                                </List.Item>
                            )}
                        />
                    </div>
                    <div className="mx-5 w-3/4 border-slate-700 border-2 rounded-xl p-1">
                        <Tabs defaultActiveKey="tab1" type="card">
                            <Tabs.TabPane tab="Customer" key="tab1">
                                <Step1 setSiteId={setSiteId} siteId={siteId} />
                            </Tabs.TabPane>

                            <Tabs.TabPane tab="Sites" key="tab2" >
                                <Step2 siteId={siteId} />
                            </Tabs.TabPane>

                            <Tabs.TabPane tab="Site Rates" key="tab3" >
                                <Step3 siteId={siteId} />
                            </Tabs.TabPane>

                            <Tabs.TabPane tab="Docs" key="tab4" >
                                <Step4 siteId={siteId} />
                            </Tabs.TabPane>

                            <Tabs.TabPane tab="Event Details" key="tab5" >
                                <Step5 siteId={siteId} />
                            </Tabs.TabPane>

                            <Tabs.TabPane tab="Customer Portal" key="tab6" >
                                <Step6 siteId={siteId} />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Customer Documents" key="tab7" >
                                <Step7 siteId={siteId} />
                            </Tabs.TabPane>
                        </Tabs>
                    </div>
                </div>
                {/* : <Spin size="large" className='w-full h-full flex justify-center items-center'/>} */}
            </> : <Spin tip="Loading" size="large" />}
        </>
    )

}

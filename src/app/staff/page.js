"use client"
import { Divider, Table, message } from 'antd';
import qs from 'qs';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Staff() {
    const router = useRouter()
    const [item, setItem] = useState()
    const [messageApi, contextHolder] = message.useMessage();
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const data = localStorage.getItem('data');
            const items = data ? JSON.parse(data) : null
            if (items !== null) {
                setItem(items)
            } else {
                setItem()
            }
        }
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
        return rawInstance.get('https://51.20.20.105/api/v1/users/', body, { withCredentials: true });

    }
    const fetchFact = (e) => {
        // e.preventDefault();
        // const requestData = {
        //     "email": input.email,
        //     "first_name": input.first_name,
        //     "last_name": input.last_name,
        //     "password": input.password,
        //     "phone_number": `+91${input.phone_no}`,
        //     "user_type": "admin"
        // }

        login().then(async (response) => {
            if (typeof window !== 'undefined') {
                setData(response.data.results)

            }
        }).catch(error => {
            tost('error', 'Please Enter Correct Username And Password')
        }).finally(() => {
            console.log()
        });
    };

    useEffect(() => {
        console.log(item)
        if (item?.access) {
            fetchFact()
        }
    }, [item])
    const columns = [
        {
            title: 'Name',
            dataIndex: 'first_name',
            width: '20%',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone_number',
            width: '20%',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Creation Date',
            dataIndex: 'created_at',
        },
    ];
    const getRandomuserParams = (params) => ({
        results: params.pagination?.pageSize,
        page: params.pagination?.current,
        ...params,
    });
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const fetchData = () => {
        setLoading(true);
        fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(tableParams))}`)
            .then((res) => res.json())
            .then(({ results }) => {
                // setData(results);
                setLoading(false);
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: 200,
                        // 200 is mock data, you should read it from server
                        // total: data.totalCount,
                    },
                });
            });
    };

    useEffect(() => {
        fetchData();
    }, [JSON.stringify(tableParams)]);
    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });

        // `dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };
    return (
        <>
            <p className="text-center text-2xl m-10 dark:bg-slate-700 bg-slate-200 text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-4 lg:px-5 py-2 lg:py-2.5 hover:bg-gray-700 hover:text-gray-50 focus:outline-none dark:focus:ring-gray-800 cursor-pointer" onClick={() => router.push('/staff/addstaff')}>+ Add Staff</p>
            <Divider><h1><b className='text-4xl'>Staff Details</b></h1></Divider>
            <Table
                columns={columns}
                // rowKey={(record) => record.login.uuid}
                dataSource={data}
                pagination={tableParams.pagination}
                loading={loading}
                onChange={handleTableChange}
                size='large'
            />
        </>
    )

}
"use client"
import { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, InputNumber, message } from 'antd';
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AddAdmin() {
    const [input, setInput] = useState()
    const [item, setItem] = useState()
    console.log(item)
    const router = useRouter()
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
    },[])
    const tost = (type, data) => {
        messageApi?.open({
            type: type,
            content: data,
        });
    };

    let rawInstanceConfig = {
        baseURL: "https://51.20.20.105",
        timeout: 60000,
        headers: {
            "Authorization" : `Bearer ${item?.access}`
            // 'WebpSupport': (webp_support() ? 'yes' : 'no'),
        }
    };
    const rawInstance = axios.create(rawInstanceConfig);

    const login = (body) => {
        return rawInstance.post('https://51.20.20.105/api/v1/register/', body, { withCredentials: true });

    }
    const fetchFact = (e) => {
        // e.preventDefault();
        const requestData = {
            "email": input.email,
            "first_name": input.first_name,
            "last_name": input.last_name,
            "password": input.password,
            "phone_number": `+91${input.phone_no}`,
            "user_type": "admin"
            
        }

        login(requestData).then(async (response) => {
            console.log(response)
                tost('success', response.data.message)
                setTimeout(() => {
                    router.push('/admin')
                }, 700);

        }).catch(error => {
            tost('error', error.response.data.error)
        }).finally((error) => {
        });
    };
    const onFinish = (values) => {
        setInput(values)
        fetchFact()
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const [form] = Form.useForm();
    return (
        <>
        {contextHolder}
        <Form name="basic" layout="vertical" autoComplete="off" onFinish={onFinish} onFinishFailed={onFinishFailed} className="!mx-80 !my-20">
            <Form.Item
                label="UserId"
                name="userid"
                rules={[
                    {
                        required: true,
                        message: 'Please input your user id!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="First Name"
                name="first_name"
                rules={[
                    {
                        required: true,
                        message: 'Please input your first nme!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Last Name"
                name="last_name"
                rules={[
                    {
                        required: true,
                        message: 'Please input your last name!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your email!',
                    },{
                        type: 'email',
                        message: 'Please a valid email!',
                    }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                label="Phone No"
                name="phone_no"
                rules={[
                    {
                        required: true,
                        message: 'Please input your phone Number!',
                    }
                ]}>
                <InputNumber max={10000000000} />
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
        </>
    )

}
import React, { useEffect, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Divider, Form, Input, Select, Space, Typography, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';

const Step2 = (props) => {
    const [data, setData] = useState([])
    const [form] = Form.useForm();
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
        messageApi?.open({
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

    const postSite = (body) => {
        return rawInstance.post('https://51.20.20.105/api/v1/contacts/', body, { withCredentials: true });

    }

    const PostData = (e) => {
        // e.preventDefault();
        const requestData = { data }

        postSite(data).then(async (response) => {
            props.setSiteId(response.data.id)
            tost('success', "Site Details SucessFully Added")

        }).catch(error => {
            tost('error', '')
        }).finally((error) => {
        });
    };

    useEffect(() => {
        if (data.length > 0) {
            PostData()
        }
    }, [data])
const getclient = (body) => {
    return rawInstance.get(`https://51.20.20.105/api/v1/contacts/${props.siteId}`, body, { withCredentials: true });

}
    const getClient = (e) => {
        // e.preventDefault();

        getclient().then(async (response) => {
            if (response?.data?.results) {
                const data = []
                response?.data?.results.map((i) => {
                    data.push({ value: i.id, label: i.name })
                })
                setClientList(data)
                getSite()
            }

        }).catch(error => {
            tost('error', error.response.data.error)
        }).finally((error) => {
        });
    };

    useEffect(() => {
        if (item?.access) {
            getClient()
        }
    }, [item])

    const onFinish = (values) => {
        const data = values?.items?.map(item => Object.assign({}, item, { step: '2', site_id: props.siteId }))
        setData(data);
    };
    return (
        <Form
            labelCol={{
                span: 10,
            }}
            wrapperCol={{
                span: 18,
            }}
            form={form}
            name="dynamic_form_complex"
            style={{
                maxWidth: 800,
            }}
            autoComplete="off"
            initialValues={{
                items: [{}],
            }}
            onFinish={onFinish}
        >
            {contextHolder}
            <Form.List name="items">
                {(fields, { add, remove }) => (
                    <div
                        style={{
                            display: 'flex',
                            rowGap: 16,
                            flexDirection: 'column',
                        }}
                    >
                        <Button type="dashed" onClick={() => add()} block>
                            + Add Item
                        </Button>
                        {fields.map((field) => (
                            <Card
                                size="small"
                                title={`Contact ${field.name + 1}`}
                                key={field.key}
                                extra={
                                    <CloseOutlined
                                        onClick={() => {
                                            remove(field.name);
                                        }}
                                    />
                                }
                            >
                                <div className="flex justify-end">
                                    <Form.Item label="First Name" name={[field.name, 'first_name']} className='w-2/5'>
                                        <Input placeholder='Enter Your First Name' />
                                    </Form.Item>
                                    <Form.Item label="Last Name" name={[field.name, 'last_name']} className='w-2/5'>
                                        <Input placeholder='Enter Your Last Name' />
                                    </Form.Item>
                                </div>
                                <div className="flex justify-end">
                                    <Form.Item label="Email Address" name={[field.name, 'email']} className='w-2/5'>
                                        <Input placeholder='Enter Your Email Address' />
                                    </Form.Item>
                                    <Form.Item label="Mobile Number" name={[field.name, 'mobile_number']} className='w-2/5'>
                                        <Input placeholder='Enter Your Mobile Number' />
                                    </Form.Item>
                                </div>
                                <div className="flex justify-end">
                                    <Form.Item label="Contact Type" name={[field.name, 'contact_type']} className='w-2/5'>
                                        <Select placeholder="select your Type">
                                            <Select.Option value="customer">Customer</Select.Option>
                                            <Select.Option value="emergency">Emergency</Select.Option>
                                            <Select.Option value="incident">Incident</Select.Option>
                                            <Select.Option value="advise_roster">Advise Roster</Select.Option>
                                            <Select.Option value="portfolio_manager">Portfolio Manager</Select.Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item label="Notes" name={[field.name, 'notes']} className='w-2/5'>
                                        <TextArea rows={4} />
                                    </Form.Item>
                                </div>
                            </Card>
                        ))}

                    </div>
                )}
            </Form.List>
            <Divider/>
            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
                className='float-right'
            >
                <Button type="primary" htmlType="submit">
                Save Changes
                </Button>
            </Form.Item>
        </Form>
    );
};
export default Step2;
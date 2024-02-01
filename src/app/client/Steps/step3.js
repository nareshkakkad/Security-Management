import React, { useEffect, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Divider, Form, Input, InputNumber, Select, Space, Typography, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';
const Step2 = (props) => {
    const [form] = Form.useForm();
    const [item, setItem] = useState();
    const [data, setData] = useState([])
    const [file, setFile] = useState();
    const fileUplaod = (event) => {
        console.log(event.target.files[0])
        setFile(event.target.files[0])
        console.log(file)
    }
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
    const onFinish = (values) => {
        values.step="2",
        values.site_id = props?.siteId
        console.log(values)
        setData(values);
        setTimeout(() => {
            
            PostData()
        }, 1500);
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
        return rawInstance.post('https://51.20.20.105/api/v1/client/', body, { withCredentials: true });

    }
    const patchSite = (body) => {
        return rawInstance.patch('https://51.20.20.105/api/v1/client/', body, { withCredentials: true });

    }
    const PostData = (e) => {
        // e.preventDefault();
        if (props?.siteId) {
            const item = {
                "client": [
                            {
                              "day": "Monday-Thursday",
                              "start_time": "00:00",
                              "end_time": "18:00",
                              "rate": data.mtotd
                            },
                            {
                              "day": "Friday",
                              "start_time": "08:00",
                              "end_time": "16:00",
                              "rate": data.mtotn
                            }
                          ],
          }
            patchSite(item).then(async (response) => {
                props.setSiteId(response.data.id)
                // tost('success', "Site Details SucessFully Added")

            }).catch(error => {
                tost('error', error.response.data.error)
            }).finally((error) => {
            });
        } else {
            const item = {
                  "client": [
                              {
                                "day": "Monday-Thursday",
                                "start_time": "00:00",
                                "end_time": "18:00",
                                "rate": data.mtotd
                              },
                              {
                                "day": "Friday",
                                "start_time": "08:00",
                                "end_time": "16:00",
                                "rate": data.mtotn
                              }
                            ],
            }
            postSite(item).then(async (response) => {
                // props.setSiteId(response.data.id)
                // tost('success', "Site Details SucessFully Added")

            }).catch(error => {
                tost('error', error.response.data.error)
            }).finally((error) => {
            });

        }

    };
    return (
        <Form
            labelCol={{
                span: 12,
            }}
            wrapperCol={{
                span: 6,
            }}
            form={form}
            name="dynamic_form_complex"
            style={{
                maxWidth: 600,
            }}
            autoComplete="off"
            initialValues={{
                items: [{}],
            }}
            onFinish={onFinish}
        >
            <Form.Item
                name="mtotd"
                label="Monday To Thursday (Day => 6:00 to 18:00)"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                name="mtotn"
                label="Monday To Thursday (Night => 18:00 to 6:00)"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                name="fri"
                label="Friday(12:00 to 18:00)"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                name="sat"
                label="Saturday"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                name="sun"
                label="Sunday"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                name="hol"
                label="Public Holiday"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <InputNumber />
            </Form.Item>
            <Divider/>
            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
                className='mt-2 float-right'
            >
                <Button type="primary" htmlType="submit">
                    Save Changes
                </Button>
            </Form.Item>
        </Form>
    );
};
export default Step2;

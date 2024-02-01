'use client'
import { useEffect, useState } from "react";
import { Button, Divider, Form, Input, Select, message } from 'antd';
import axios from "axios";
import { useRouter } from "next/navigation";
import TextArea from "antd/es/input/TextArea";

export default function Step1(props) {
    const [input, setInput] = useState({})
    const [item, setItem] = useState()
    const [clientList, setClientList] = useState([])
    const [messageApi, contextHolder] = message.useMessage();
    const [distance, setDistance] = useState(0)
    const [form] = Form.useForm();
    const router = useRouter()
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
        return rawInstance.post('https://51.20.20.105/api/v1/client/', body, { withCredentials: true });

    }

    const patchSite = (body) => {
        return rawInstance.put(`https://51.20.20.105/api/v1/client/${props.siteId}/`, body, { withCredentials: true });

    }

    const getClientApi = (body) => {
        return rawInstance.get('https://51.20.20.105/api/v1/client/', body, { withCredentials: true });

    }
    const getSiteApi = (body) => {
        return rawInstance.get(`https://51.20.20.105/api/v1/client/${props.siteId}/`, body, { withCredentials: true });

    }

    const getClient = (e) => {
        // e.preventDefault();

        getClientApi().then(async (response) => {
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

    const getSite = (e) => {
        // e.preventDefault();

        getSiteApi().then(async (response) => {
            console.log(response, 'resss ^^^^^^^^^^')
            if (response?.data) {
                setInput(response.data)
            }

        }).catch(error => {
            tost('error', error.response.data.error)
        }).finally((error) => {
        });
    };

    useEffect(() => {
        if (item?.access) {
            getSite()
        }
    }, [item, props?.siteId])

    useEffect(() => {
        if (item?.access) {
            getClient()
        }
    }, [item])

    const PostData = (e) => {
        // e.preventDefault();
        if (props?.siteId) {

            patchSite(input).then(async (response) => {
                props.setSiteId(response.data.id)
                tost('success', "Site Details SucessFully Added")

            }).catch(error => {
                tost('error', error.response.data.error)
            }).finally((error) => {
            });
        } else {
            console.log(input)
            postSite(input).then(async (response) => {
                props.setSiteId(response.data.id)
                tost('success', "Site Details SucessFully Added")

            }).catch(error => {
                tost('error', error.response.data.error)
            }).finally((error) => {
            });

        }

    };


    const onFinish = () => {
        PostData()
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onFill = () => {
        console.log(12121212)
        console.log(input)
        form.setFieldsValue(input);
    };
    useEffect(() => {
        onFill()
    }, [input])
    return (
        <>

            <Form form={form} labelCol={{ span: 18 }}
    wrapperCol={{ span: 20 }}
    style={{ maxWidth: 1200 }} name="basic" layout="vertical" autoComplete="off" onFinish={onFinish} onFinishFailed={onFinishFailed} initialValues={input} >
                        <Form.Item
                            label="Customer Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your site name!',
                                },
                            ]}
                            defaultValue={input?.name}
                            onChange={(e) => setInput({ ...input, name: e.target.value })}
                        >
                            <Input className="w-full" value={input?.name?.toString()} defaultValue={input?.name?.toString()} />
                        </Form.Item>
                        <Form.Item
                            label="Customer Reference Number"
                            name="reference_number"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your site name!',
                                },
                            ]}
                            defaultValue={input?.reference_number}
                            onChange={(e) => setInput({ ...input, reference_number: e.target.value })}
                        >
                            <Input className="w-full" value={input?.reference_number?.toString()} defaultValue={input?.reference_number?.toString()} />
                        </Form.Item>
                        <Divider/>
                        <Form.Item
                            label="Address"
                            name="address"
                            defaultValue={input?.address}
                            onChange={(e) => setInput({ ...input, address: e.target.value })}
                        >
                            <Input className="w-full" value={input?.address?.toString()} defaultValue={input?.address?.toString()} />
                        </Form.Item>
                        <Form.Item
                            label="City"
                            name="city"
                            onChange={(e) => setInput({ ...input, city: e.target.value })}
                        >
                            <Input value={input?.city} defaultValue={input?.city} />
                        </Form.Item>
                        <Form.Item
                            label="State / Province"
                            name="state"

                        >
                            <Select onChange={(e) => setInput({ ...input, state: e })} value={input?.state}>
                                <Select.Option value="aus">Australian Capital Territory</Select.Option>
                                <Select.Option value="south_wales">New South Wales</Select.Option>
                                <Select.Option value="n_territory">Northern Territory</Select.Option>
                                <Select.Option value="queensland">Queensland</Select.Option>
                                <Select.Option value="south_australia">South Australia</Select.Option>
                                <Select.Option value="tasmania">Tasmania</Select.Option>
                                <Select.Option value="victoria">Victoria</Select.Option>
                                <Select.Option value="western_australia">Western Australia</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Zip/Postal Code"
                            name="zip_code"
                            onChange={(e) => setInput({ ...input, zip_code: e.target.value })}
                        >
                            <Input value={input?.zip_code} defaultValue={input?.zip_code} />
                        </Form.Item>
                        <Form.Item
                            label="Country"
                            name="country"
                            className="w-2/4"
                        >
                            <Select className="w-3/4" onChange={(e) => setInput({ ...input, country: e })} value={input?.country}>
                                <Select.Option value="aus">AUSTRALIA</Select.Option>
                                <Select.Option value="canada">CANADA</Select.Option>
                                <Select.Option value="uk">UNITED KINGDOM</Select.Option>
                                <Select.Option value="ireland">IRELAND</Select.Option>
                                <Select.Option value="morocco">MOROCCO</Select.Option>
                                <Select.Option value="nz">NEW ZEALAND</Select.Option>
                                <Select.Option value="ph">PHILIPPINES</Select.Option>
                                <Select.Option value="sig">SINGAPORE</Select.Option>
                                <Select.Option value="usa">UNITED STATES</Select.Option>
                                <Select.Option value="sf">SOUTH AFRICA</Select.Option>
                            </Select>
                        </Form.Item>
                <Divider />
                <Form.Item
                    label="Invoice Reminder"
                    name="zip_code"
                    onChange={(e) => setInput({ ...input, zip_code: e.target.value })}
                >
                    <TextArea rows={10} />
                </Form.Item>
                <Divider />
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                    className="float-right"
                >
                    <Button type="primary" htmlType="submit">
                        Save Changes
                    </Button>
                </Form.Item>
            </Form>
        </>
    )

}

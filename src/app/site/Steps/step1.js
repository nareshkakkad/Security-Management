'use client'
import { useEffect, useState } from "react";
import { Button, Divider, Form, Input, Select, message } from 'antd';
import axios from "axios";
import Map from "./googlemap/map"
import { useRouter } from "next/navigation";

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
        return rawInstance.post('https://51.20.20.105/api/v1/sites/', body, { withCredentials: true });

    }

    const patchSite = (body) => {
        return rawInstance.put(`https://51.20.20.105/api/v1/sites/${props.siteId}/`, body, { withCredentials: true });

    }

    const getClientApi = (body) => {
        return rawInstance.get('https://51.20.20.105/api/v1/client/', body, { withCredentials: true });

    }
    const getSiteApi = (body) => {
        return rawInstance.get(`https://51.20.20.105/api/v1/sites/${props.siteId}/`, body, { withCredentials: true });

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

            <Form form={form} name="basic" layout="vertical" autoComplete="off" onFinish={onFinish} onFinishFailed={onFinishFailed} initialValues={input} >

                <div className="flex">
                    <div className="w-2/4">
                        <Map distance={parseInt(distance ? distance : 0)} leti={parseInt(input?.latitude ? input?.latitude : 0 )} lnti={parseInt(input?.longitude ? input?.longitude : 0)} setLnti={(data, value) => {setInput((pre) => ({...pre ,latitude: data, longitude: value })) }} address={input?.address} setAddress={(data) => setInput({ ...input, address: data })} setName={(data) => {setInput((pre) => ({...pre , name : data })) }}/>
                    </div>
                    <div className="w-2/4">
                        <Form.Item
                            label="Address"
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your site name!',
                                },
                            ]}
                            className="w-2/4"
                            defaultValue={input?.address}
                            onChange={(e) => setInput({ ...input, address: e.target.value })}
                        >
                            <Input className="w-full" value={input?.address?.toString()} defaultValue={input?.address?.toString()}/>
                        </Form.Item>
                        <Form.Item
                            label="City"
                            name="city"
                            className="w-2/4"
                            onChange={(e) => setInput({ ...input, city: e.target.value })}
                        >
                            <Input className="w-3/4" value={input?.city} defaultValue={input?.city} />
                        </Form.Item>
                        <Form.Item
                            label="State / Province"
                            name="state"
                            className="w-2/4"

                        >
                            <Select className="w-3/4" onChange={(e) => setInput({ ...input, state: e })} value={input?.state}>
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
                            className="w-2/4"
                            onChange={(e) => setInput({ ...input, zip_code: e.target.value })}
                        >
                            <Input className="w-3/4" value={input?.zip_code} defaultValue={input?.zip_code} />
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
                        <div className="flex">
                            <Form.Item
                                label="Latitude"
                                name="latitude"
                                className="w-2/4"
                                onChange={(e) => setInput({ ...input, latitude: e.target.value })}
                            >
                                {console.log(input?.latitude)}
                                <Input className="w-3/4" value={input?.latitude?.toString()} defaultValue={input?.latitude?.toString()} />
                            </Form.Item>
                            <Form.Item
                                label="Longitude"
                                name="longitude"
                                className="w-2/4"
                                onChange={(e) => setInput({ ...input, longitude: e.target.value })}
                            >
                                <Input className="w-3/4" value={input?.longitude?.toString()} defaultValue={input?.longitude?.toString()} />
                            </Form.Item>
                        </div>
                    </div>
                </div>
                <Divider />
                <Form.Item label="Customer" name='customer' rules={[
                    {
                        required: true,
                        message: 'Please select Customer!',
                    },
                ]}>
                    <Select
                        options={clientList}
                        onChange={(e) => setInput({ ...input, client_id: e })}
                        defaultValue={input?.client?.name}
                        value={input?.client}
                    />
                </Form.Item>
                <Form.Item
                    label="Site Reference Number"
                    name="reference_number"
                    onChange={(e) => setInput({ ...input, reference_number: e.target.value })}
                >
                    <Input className="w-96" defaultValue={input?.reference_number} />
                </Form.Item>
                <Divider />
                <Form.Item
                    label="Mobile TimeClock Maximum Distance (meters)"
                    name="distance"
                    className=""
                >
                    <Input className="w-2/4" onChange={(e) => setDistance(e?.target?.value)} value={input?.distance} />
                </Form.Item>
                <Divider/>
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

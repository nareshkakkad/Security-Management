import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Divider, Form, Input, Modal, Radio, Select, Table, Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const CollectionCreateForm = ({ open, onCreate, onCancel, Data, setFile }) => {
    const [data, setData] = useState({})
    const [form] = Form.useForm();
    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };
    const onChange = (e) => {
        if (e?.file) {
            console.log(e)
            setData({ ...data, attachment: e.file })
        } else if (e?.target?.checked) {

            setData({ ...data, [e.target.name]: e.target.checked })
        } else if (e?.target?.value) {
            setData({ ...data, [e.target.name]: e.target.value })
        } else {
            setData({ ...data, renewed_period: e })
        }
    };
    console.log(data)
    useEffect(() => {
        Data(data)
    }, [data])
    const fileUplaod = (event) => {
        setFile(event.target.files[0])
        console.log(data)
    }
    return (
        <Modal
            open={open}
            title="Create a new collection"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    modifier: 'public',
                }}
                className='!mt-0 !ml-0'
                onFinish={(e) => { console.log(e) }}
            >
                <Form.Item
                    name="doc_name"
                    label="Document Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the title of collection!',
                        },
                    ]}
                >
                    <Input name='name' onChange={onChange} />
                </Form.Item>
                <input
                    label="Attach File"
                    type="file"
                    onChange={fileUplaod}
                    style={{ marginLeft: "25%" }}
                />
                Allow all staff to view document? <Checkbox name="allow_all_staff" onChange={onChange}></Checkbox><br />
                Requires acknowledgement before next shift? <Checkbox name='acknowledgement' onChange={onChange}></Checkbox><br />
                {
                    data?.acknowledgement && <>Requires signature? <Checkbox name='signature' onChange={onChange}></Checkbox><br />
                        Needs to be renewed? <Checkbox name="renewed" onChange={onChange}></Checkbox><br /></>
                }
                {
                    data?.renewed && <>Renewal period in months from acknowledgement
                        <Form.Item label="" name='renewed_period' className='w-2/5'>
                            <Select placeholder="select your Type" name="renewed_period" onChange={onChange} >
                                <Select.Option value="1">1</Select.Option>
                                <Select.Option value="2">2</Select.Option>
                                <Select.Option value="3">3</Select.Option>
                                <Select.Option value="4">4</Select.Option>
                                <Select.Option value="5">5</Select.Option>
                                <Select.Option value="6">6</Select.Option>
                                <Select.Option value="7">7</Select.Option>
                                <Select.Option value="8">8</Select.Option>
                                <Select.Option value="9">8</Select.Option>
                                <Select.Option value="10">10</Select.Option>
                                <Select.Option value="11">11</Select.Option>
                                <Select.Option value="12">12</Select.Option>
                            </Select>
                        </Form.Item>
                    </>
                }
            </Form>
        </Modal>
    );
};
const App = (props) => {
    const [open, setOpen] = useState(false);
    const [item, setItem] = useState()
    const [data, setData] = useState({})
    const [file, setFile] = useState();
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

    const login = (body) => {
        return rawInstance.post('https://51.20.20.105/api/v1/documents/', body, { withCredentials: true });

    }
    const getSiteApi = (body) => {
        return rawInstance.get('https://51.20.20.105/api/v1/documents/', body, { withCredentials: true });

    }
    const PostData = async (e) => {
        let form = new FormData();
        form.append('name', data.name);
        form.append('filename', file.name);
        form.append('allow_staff', data.allow_all_staff);
        form.append('requires_signature', data.signature);
        form.append('requires_renewal', data.renewed);
        form.append('renewal_period', data.renewed_period);
        form.append('document', file);
        form.append("step", 6);
        form.append("site_id", props?.siteId);

        await login(form).then(async (response) => {
            props.setSiteId(response.data.id)
            tost('success', "Site Details SucessFully Added")

        }).catch(error => {
            tost('error', '')
        }).finally((error) => {
        });
    };
    const fetchFact = () => {
        let form = new FormData();
        const blob = new Blob([file]);
        var ext = file.name.substr(file.name.lastIndexOf('.') + 1);
        if (ext == 'amr' || ext == 'AMR') {
            form.append('Content-Type', 'audio/AMR');
        } else {
            form.append('Content-Type', file.type);
        }
        form.append('name', data.name);
        form.append('filename', file.name);
        form.append('allow_staff', data.allow_all_staff);
        form.append('requires_signature', data.signature);
        form.append('requires_renewal', data.renewed);
        form.append('renewal_period', data.renewed_period);
        form.append('document', blob);
        form.append('document', blob);
        console.log(form)
        // console.log(blob)
        // e.preventDefault();
        const requestData = {
            "name": data.name,
            "allow_staff": data.allow_all_staff,
            "requires_acknowledgement": data.acknowledgement,
            "requires_signature": data.signature,
            "requires_renewal": data.renewed,
            "renewal_period": data.renewed_period,
            "document": blob,
            "site_id": props.siteId
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
    console.log(data, 'data &&&&&&&')
    useEffect(() => {
        console.log(data)
        if (data.name !== null && data.renewal_period !== null && data.name !== undefined && data.renewal_period !== undefined) {
            PostData()
        }
    }, [data])
    const onCreate = (values) => {
        console.log('Received values of form: ', values);
        setData({ ...data, name: values.doc_name, renewed_period: values.renewed_period })
        setOpen(false);
        setTimeout(() => {
            PostData()
        }, 1500);
    };

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
    const [dataSource, setDataSource] = useState();
    const [loading, setLoading] = useState(false);

    const getSite = (e) => {
        // e.preventDefault();
        // const requestData = {
        //     "email": input.email,
        //     "first_name": input.first_name,
        //     "last_name": input.last_name,
        //     "password": input.password,
        //     "phone_number": `+91${input.phone_no}`,
        //     "user_type": "admin"
        // }

        getSiteApi().then(async (response) => {
            if (typeof window !== 'undefined') {
                setDataSource(response.data.results)

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
            getSite()
        }
    }, [item])

    return (
        <div>
            <Button
                type="primary"
                onClick={() => {
                    setOpen(true);
                }}
                className='bg-slate-600 float-right'
            >
                Add New
            </Button>
            <CollectionCreateForm
                open={open}
                onCreate={onCreate}
                onCancel={() => {
                    setOpen(false);
                }}
                Data={setData}
                setFile={setFile}

            />

            <p className='text-center'><h1><b className='text-4xl ml-52'>Site Details</b></h1></p>
            <Table
                columns={columns}
                // rowKey={(record) => record.login.uuid}
                dataSource={dataSource}
                loading={loading}
                size='large'
            />
        </div>
    );
};
export default App;
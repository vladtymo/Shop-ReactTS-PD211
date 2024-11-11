import { Button, Form, FormProps, Input, InputNumber, message, Select, Space } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { CategoryModel, CategoryOption, ProductFormField } from '../models/products';
import { LeftOutlined } from '@ant-design/icons';

const api = import.meta.env.VITE_PRODUCTS_URL;

export default function EditProduct() {

    const navigate = useNavigate();
    const { id } = useParams();
    const [form] = Form.useForm<ProductFormField>();

    const [categories, setCategories] = useState<CategoryOption[]>([]);

    useEffect(() => {
        fetch(api + "categories").then(res => res.json()).then(data => {
            const items = data as CategoryModel[];
            setCategories(items.map(x => { return { label: x.name, value: x.id }; }));
        });

        fetch(api + id).then(res => res.json()).then(data => {
            form.setFieldsValue(data);
        });
    }, []);

    const onSubmit: FormProps<ProductFormField>['onFinish'] = (item) => {

        console.log(item);

        fetch(api, {
            method: "PUT",
            body: JSON.stringify(item),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(res => {
            if (res.status === 200) {
                message.success("Product editted successfully!");
                navigate("/products");
            }
            else
                message.error("Something went wrong!");
        });
    }

    return (
        <div>
            <Button onClick={() => navigate(-1)} color="default" variant="text" icon={<LeftOutlined />}></Button>

            <h2>Edit Product</h2>

            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 19,
                }}
                layout="horizontal"
                form={form}
                onFinish={onSubmit}
            >
                <Form.Item<ProductFormField> name="id" noStyle></Form.Item>
                <Form.Item<ProductFormField> label="Title" name="title"
                    rules={[
                        {
                            required: true,
                            message: 'Please input!',
                        },
                    ]}>
                    <Input />
                </Form.Item>
                <Form.Item<ProductFormField> label="Price" name="price">
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item<ProductFormField> label="Discount" name="discount">
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item<ProductFormField> label="Quantity" name="quantity">
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item<ProductFormField> label="Category" name="categoryId">
                    <Select options={categories}></Select>
                </Form.Item>
                <Form.Item<ProductFormField> label="Description" name="description">
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item<ProductFormField> label="Image" name="imageUrl">
                    <Input />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 4,
                        span: 16,
                    }}
                >
                    <Space>
                        <Button type="default" htmlType="reset">
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Edit
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    )
}

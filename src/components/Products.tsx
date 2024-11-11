import { useEffect, useState } from 'react';
import { Button, message, Popconfirm, Space, Table, TableProps, Tag } from 'antd';
import { DeleteOutlined, EditFilled, InfoCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { ProductModel } from '../models/products';

const api = import.meta.env.VITE_PRODUCTS_URL;

const Products = () => {

    const [products, setProducts] = useState<ProductModel[]>([]);

    useEffect(() => {
        // code...
        fetch(api + "all").then(res => res.json()).then(data => {
            const items = data as ProductModel[];
            setProducts(items.sort((x, y) => y.id - x.id));
        });
    }, []);

    const columns: TableProps<ProductModel>['columns'] = [
        {
            title: 'Image',
            dataIndex: 'imageUrl',
            key: 'image',
            render: (text, i) => <img height={40} src={text} alt={i.title}></img>,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
            key: 'discount',
        },
        {
            title: 'Stock',
            key: 'stock',
            dataIndex: 'stock',
            render: (_, record) => (
                record.quantity > 0 ?
                    <Tag color="green">Available {record.quantity}</Tag>
                    :
                    <Tag color="volcano">Out of Stock</Tag>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/details/${record.id}`}>
                        <Button color="primary" icon={<InfoCircleOutlined />} />
                    </Link>
                    <Link to={`/edit/${record.id}`}>
                        <Button color="primary" icon={<EditFilled />} />
                    </Link>

                    <Popconfirm
                        title="Delete the product"
                        description={`Are you sure to delete ${record.title}?`}
                        onConfirm={() => onDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const onDelete = (id: number) => {

        const index = products.findIndex(x => x.id === id);
        if (index !== -1) {
            // delete from server
            fetch(api + id, {
                method: "DELETE"
            }).then(res => {
                if (res.status === 200) {
                    setProducts(products.filter((_, i) => i !== index));
                    message.success('Product deleted successfully!');
                }
                else
                    message.error("Something went wrong!");
            })

        }
        else
            message.error('Product does not found!');
    }

    return (<Table columns={columns} dataSource={products} rowKey="id" />)
}

export default Products;
import React, { useEffect, useState } from "react";
import { Button, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";
import Swal from "sweetalert2";

const TableItem = () => {
  const [data, setData] = useState();

  const getInventory = () => {
    axios({
      method: "get",
      url: "http://localhost:3000",
    })
      .then((result) => {
        // console.log(result);
        setData(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteInventory = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios({
          method: "delete",
          url: `http://localhost:3000/delete/${id}`,
        })
          .then((result) => {
            Swal.fire("Deleted!", "Your item has been deleted.", "success");
            getInventory();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  const openModal = async (value) => {
    const { value: formValues } = await Swal.fire({
      title: "Update Item",
      html:
        `<label>Name : </label>` +
        `<input id="name" class="swal2-input" value="${value.name}"><br>` +
        `<label>Price : </label>` +
        `<input id="price" class="swal2-input" value="${value.price}"><br>` +
        `<label>Stock : </label>` +
        `<input id="stock" class="swal2-input" value="${value.stock}">`,
      focusConfirm: false,
      preConfirm: () => {
        return {
          name: document.getElementById("name").value,
          price: document.getElementById("price").value,
          stock: document.getElementById("stock").value,
        };
      },
    });

    if (formValues) {
      axios({
        method: "put",
        url: `http://localhost:3000/update/${value.id}`,
        data: formValues,
      })
        .then((result) => {
          Swal.fire("Good job!", "You have succes update item!", "success");
          getInventory();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size='middle'>
          <Button
            type='primary'
            icon={<EditOutlined />}
            onClick={() => openModal(record)}>
            Update
          </Button>
          <Button
            type='primary'
            icon={<DeleteOutlined />}
            onClick={() => deleteInventory(record.id)}
            danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getInventory();
  }, []);
  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default TableItem;

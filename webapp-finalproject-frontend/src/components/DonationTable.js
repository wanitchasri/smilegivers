import { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";

import style from "../mystyle.module.css";
import { FaTrashAlt } from "react-icons/fa";

function DonationTable({ data, clearDataItems, updateDataItems }) {
  // const [dataDonations, setDataDonations] = useState(data);
  const [dataRows, setDataRows] = useState();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // let sum = 0;
    const z = data.map((v, i) => {
      // let amount = v.qty * v.price;
      // sum += amount;
      return (
        <tr key={i}>
          <td className={style.textCenter}>
            <FaTrashAlt onClick={() => deleteItem(v.code)} />
          </td>
          {/* <td className={style.textCenter}>{v.code}</td> */}
          <td className={style.textLeft}>{v.itemName}</td>
          <td className={style.textLeft}>{v.quantity}</td>
          <td className={style.textLeft}>{v.donatorName}</td>
          <td className={style.textLeft}>{v.contactNo}</td>
        </tr>
      );
    });

    setDataRows(z);
    //setTotal(sum);
  }, [data]);

  const deleteItem = (code) => {
    if (window.confirm(`Are you sure to delete your recent donation "${code}"? from your local storage`)) {

    }
    var z = data.filter((value, index, arr) => value.code !== code);
    updateDataItems(z);
  };

  const clearTable = () => {
    clearDataItems();
    setDataRows([]);
  };

  const formatNumber = (x) => {
    x = Number.parseFloat(x)
    return x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div>
      <h1>Your Recent Donation</h1>
      {/* <Button onClick={clearTable} variant="outline-dark">
        Clear
      </Button> */}
      <Table striped bordered hover variant="warning">
        <thead>
          <tr>
            <th style={{ width: "20px" }}>&nbsp;</th>
            {/* <th className={style.textLeft}>Code</th> */}
            <th className={style.textLeft}>Name</th>
            <th className={style.textLeft}>Quantity</th>
            <th className={style.textLeft}>Donator</th>
            <th className={style.textLeft}>ContactNo</th>
          </tr>
        </thead>
        <tbody>{dataRows}</tbody>
        {/* <tfoot>
          <tr>
            <td colSpan={4} className={style.textRight}>
              Total
            </td>
            <td className={style.textRight}>
              {formatNumber(total)}
            </td>
          </tr>
        </tfoot> */}
      </Table>
    </div>
  );
}

export default DonationTable;

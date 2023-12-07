import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function App() {
  const [item, setItem] = useState("");
  const [itemAmount, setItemAmount] = useState(null);
  const [hargaSewa, sethargaSewa] = useState(null);
  const [returns, setReturns] = useState(null);
  const [daily, setDaily] = useState(null);
  const [newItem, setNewItems] = useState({});
  const [total, newTotal] = useState(null);
  function formatCurrency(amount) {
    // Use Intl.NumberFormat to format the number as currency
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  }

  function handleChange(e) {
    e.preventDefault();
    if (returns > itemAmount || !returns || !daily) return;
    const baru = newItem.itemPerPc * (daily / 30);
    const hargaBaru = returns * baru;
    setNewItems((items) => {
      return { ...items, baru, hargaBaru };
    });
  }

  function calculate() {
    const jumlah = itemAmount - returns;
    const hitung = jumlah * newItem.itemPerPc;
    const totals = hitung + newItem.hargaBaru;
    newTotal(totals);
    setNewItems((item) => {
      return { ...item, jumlah, hitung };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!itemAmount) return;
    const itemPerPc = hargaSewa / itemAmount;
    const news = { item, hargaSewa, itemAmount, itemPerPc };
    setNewItems(news);
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& > :not(style)": { mb: 2 }, // Adds margin bottom to direct children excluding style element
      }}
    >
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nama barang"
          variant="outlined"
          onChange={(e) => setItem(e.target.value)}
          sx={{ mb: 2 }} // Adds margin bottom to TextField
        />
        <TextField
          label="Jumlah barang"
          variant="outlined"
          onChange={(e) => setItemAmount(+e.target.value)}
          sx={{ mb: 2, ml: 2 }} // Adds margin bottom to TextField
        />
        <TextField
          label="Harga Sewa /bulan"
          variant="outlined"
          onChange={(e) => sethargaSewa(+e.target.value)}
          sx={{ mb: 2, ml: 2 }} // Adds margin bottom to TextField
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ mb: 3, ml: 2, mt: 1 }}
        >
          Hitung
        </Button>
      </form>

      <form onSubmit={handleChange}>
        <TextField
          label="barang kembali"
          variant="outlined"
          onChange={(e) => setReturns(+e.target.value)}
          sx={{ mb: 2 }} // Adds margin bottom to TextField
        />
        <TextField
          label="hari pemakaian"
          variant="outlined"
          onChange={(e) => setDaily(+e.target.value)}
          sx={{ mb: 2, ml: 2 }} // Adds margin bottom to TextField
        />
        <Button
          variant="contained"
          onClick={handleChange}
          sx={{ mb: 3, ml: 2, mt: 1 }}
        >
          Hitung
        </Button>
      </form>

      <Button variant="contained" onClick={calculate} sx={{ mb: 2 }}>
        Hitung total
      </Button>

      {Object.keys(newItem).length > 0 && (
        <div>
          <Typography variant="body1">Nama barang: {newItem.item}</Typography>
          <Typography variant="body1">
            Jumlah barang: {newItem.itemAmount}
          </Typography>
          <Typography variant="body1">
            Harga Sewa {newItem.itemAmount} barang /bulan:
            {formatCurrency(newItem.hargaSewa)}
          </Typography>
          <Typography variant="body1">
            harga per Pc {formatCurrency(newItem.itemPerPc)}/bulan
          </Typography>
        </div>
      )}
      {newItem.hargaBaru && (
        <div>
          <Typography variant="body1">
            Harga Sewa {returns} barang/{daily} hari:{" "}
            {formatCurrency(newItem.hargaBaru)}
          </Typography>
          <Typography variant="body1">
            harga per Pc {formatCurrency(newItem.baru)}/{daily} hari
          </Typography>
        </div>
      )}
      {total && (
        <div>
          <Typography variant="body1">
            Harga Sewa {returns} barang/{daily} hari:{" "}
            {formatCurrency(newItem.hargaBaru)}
          </Typography>
          <Typography variant="body1">
            Harga Sewa {newItem.jumlah} barang/bulan:{" "}
            {formatCurrency(newItem.hitung)}
          </Typography>
          <Typography variant="body1">
            Total biaya sewa : {formatCurrency(total)}
          </Typography>
        </div>
      )}
    </Box>
  );
}

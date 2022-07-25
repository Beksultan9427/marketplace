import React, { useContext, useState } from "react";
import {
  Container,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";

import { AdminContext } from "../contexts/AdminProvider";

function AdminAddPage() {
  const { sendNewWatch } = useContext(AdminContext);

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [year, setYear] = useState("");
  const [photo, setPhoto] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = () => {
    const newWatch = {
      name: name.trim(),
      brand: brand.trim(),
      price,
      year: year.trim(),
      photo: photo.trim(),
      country: country.trim(),
    };
    for (let i in newWatch) {
      if (!newWatch[i]) {
        alert("Заполните!");
        return;
      }
    }
    sendNewWatch(newWatch);
    setName("");
    setBrand("");
    setPrice("");
    setYear("");
    setPhoto("");
    setCountry("");
  };
  return (
    <div className="admin-add-page">
      <Container>
        <h2>Добавить товары</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Название"
            variant="standard"
          />
          <TextField
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            label="Бренд"
            variant="standard"
          />
          <TextField
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
            label="Цена"
            variant="standard"
            type="number"
          />
          <TextField
            value={year}
            onChange={(e) => setYear(e.target.value)}
            label="Год Произодства"
            variant="standard"
            type="date"
          />
          <TextField
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            label="Картинка"
            variant="standard"
          />
          <FormControl
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            variant="standard"
          >
            <InputLabel>Страна</InputLabel>
            <Select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              label="Страна"
            >
              <MenuItem value="China">Китай</MenuItem>
              <MenuItem value="Japan">Япония</MenuItem>
              <MenuItem value="Germany">Германия</MenuItem>
              <MenuItem value="Italy">Италия</MenuItem>
              <MenuItem value="Switzerland">Швейцария</MenuItem>
              <MenuItem value="Czech">Чехия</MenuItem>
            </Select>
          </FormControl>
          <Button variant="outlined" type="submit">
            Добавить
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default AdminAddPage;

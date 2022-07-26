import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AdminContext } from "../contexts/AdminProvider";
import {
  Container,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
} from "@mui/material";

function AdminEditPage() {
  const { getWatchToEdit, watchToEdit, saveEditedWatch } =
    useContext(AdminContext);

  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [year, setYear] = useState("");
  const [photo, setPhoto] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = () => {
    const editedWatch = {
      name,
      brand,
      price,
      year,
      photo,
      country,
      id,
    };
    for (let i in editedWatch) {
      if (typeof editedWatch[i] === "string") {
        if (!editedWatch[i].trim) {
          alert("Заполните поле");
          return;
        }
      }
    }
    saveEditedWatch(editedWatch);
    navigate("/admin");
  };

  useEffect(() => {
    getWatchToEdit(id);
  }, []);

  useEffect(() => {
    if (watchToEdit) {
      setName(watchToEdit.name);
      setBrand(watchToEdit.brand);
      setPrice(watchToEdit.price);
      setYear(watchToEdit.year);
      setPhoto(watchToEdit.photo);
      setCountry(watchToEdit.country);
    }
  }, [watchToEdit]);
  return (
    <div className="admin-edit-page">
      <Container>
        <h2>Редактировать</h2>
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
            type="number"
            label="Цена"
            variant="standard"
          />
          <TextField
            value={year}
            onChange={(e) => setYear(e.target.value)}
            type="date"
            label="Дата производтсва"
            variant="standard"
          />
          <TextField
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            label="Картинка"
            variant="standard"
          />
          <FormControl variant="standard">
            <InputLabel>Страна</InputLabel>
            <Select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <MenuItem value="China">Китай</MenuItem>
              <MenuItem value="Japan">Япония</MenuItem>
              <MenuItem value="USA">США</MenuItem>
              <MenuItem value="Germany">Германия</MenuItem>
              <MenuItem value="Italy">Италия</MenuItem>
              <MenuItem value="Switzerland">Швейцария</MenuItem>
              <MenuItem value="Czech">Чехия</MenuItem>
            </Select>
          </FormControl>
          <Button variant="outlined" type="submit">
            Сохранить
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default AdminEditPage;

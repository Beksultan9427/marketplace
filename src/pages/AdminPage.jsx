import React, { useContext, useEffect } from "react";
import { AdminContext } from "../contexts/AdminProvider";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { HighlightOff, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";

function AdminPage() {
  const { getWatches, watches, deleteWatch } = useContext(AdminContext);
  useEffect(() => {
    getWatches();
  }, []);

  return (
    <div className="admin-page">
      <Container>
        <h2>Админ панель</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Название</TableCell>
              <TableCell>Бренд</TableCell>
              <TableCell>Цена</TableCell>
              <TableCell>Год</TableCell>
              <TableCell>Страна</TableCell>
              <TableCell>Фото</TableCell>
              <TableCell>Редакт.</TableCell>
              <TableCell>Удалить</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {watches.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.brand}</TableCell>
                <TableCell>{item.price} $</TableCell>
                <TableCell>{item.year}</TableCell>
                <TableCell>{item.country}</TableCell>
                <TableCell>
                  <img width={100} src={item.photo} alt="" />
                </TableCell>
                <TableCell>
                  <Link to={`/admin/edit/${item.id}`}>
                    <Edit />
                  </Link>
                </TableCell>
                <TableCell>
                  <HighlightOff onClick={() => deleteWatch(item.id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </div>
  );
}

export default AdminPage;

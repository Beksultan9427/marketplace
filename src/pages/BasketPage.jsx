import React, { useContext, useEffect } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import { ClientContext } from "../contexts/ClientProvider";

function BasketPage() {
  const { basketWatches, getWatchesFromBasket } = useContext(ClientContext);

  useEffect(() => {
    getWatchesFromBasket();
  }, []);

  if (!basketWatches) {
    return (
      <div className="basket-page">
        <Container>
          <h2>В вашей корзине пока ничего нет</h2>
        </Container>
      </div>
    );
  }

  return (
    <div className="basket-page">
      <Container>
        <h2>Корзина</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Название:</TableCell>
              <TableCell>Фото</TableCell>
              <TableCell>Цена:</TableCell>
              <TableCell>Кол-во:</TableCell>
              <TableCell>Сумма:</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basketWatches.products.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <img width={60} src={item.photo} alt="" />
                </TableCell>
                <TableCell>{item.price} $</TableCell>
                <TableCell>{item.count}</TableCell>
                <TableCell>{item.subPrice} $</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Итоговая сумма:</TableCell>
              <TableCell colSpan={1}>{basketWatches.totalPrice} $</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Container>
    </div>
  );
}

export default BasketPage;

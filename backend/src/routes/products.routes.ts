import { Router } from "express";
import { getProducts } from "../controller/products.controller";

const productsRoutes = Router();

productsRoutes.route("/").get(getProducts);

export default productsRoutes;

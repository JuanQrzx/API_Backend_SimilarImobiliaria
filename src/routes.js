import { Router } from "express";
import SessionController from "./controllers/SessionController";
import HouseController from "./controllers/HouseController";
import multer from "multer";
import upload from "./config/upload";
import House from "./models/House";
import Dashboard from "./controllers/Dashboard";
import ReserveController from "./controllers/ReserveController";

let routes = new Router();
let uploadConfig = multer(upload);

routes.post("/sessions", SessionController.store);

routes.post("/houses", uploadConfig.single("thumbnail"), HouseController.store);
routes.get("/houses", HouseController.index);
routes.put(
  "/houses/:house_id",
  uploadConfig.single("thumbnail"),
  HouseController.update
);
routes.delete("/houses", HouseController.destroy);

routes.get("/dashboard", Dashboard.show);

routes.post("/houses/:house_id/reserve", ReserveController.store);
routes.get("/reserves", ReserveController.index);
routes.delete("/reserves/cancel", ReserveController.destroy);

export default routes;

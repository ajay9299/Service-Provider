import { Router } from "express";

// <-----------------------------------Import The Routes Files Present In This App-------------------------------->
import UserRoute from "./User.route";
import UserProfileRoute from "./UserProfile.route";
import RolesAndServiceRoute from "./RolesAndService.route";
import providerRoute from "./provider/Provider.route";
import servicesRoute from "./Service/Service.route"

const appRouter = Router();
appRouter.use(
  "/v1",
  UserRoute,
  UserProfileRoute,
  RolesAndServiceRoute,
  providerRoute,
  servicesRoute
);

export default appRouter;

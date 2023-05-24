import { GetVilabData } from "./application/getVilabData.app";
import { GetVilabDataService } from "./infrastructure/services/getVilabData.service";

const service = new GetVilabDataService();
const app = new GetVilabData(service);

export default app;

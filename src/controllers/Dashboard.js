import House from "../models/House";
import User from "../models/User";

class DashboardController {
  async show(req, res) {
    const { user_id } = req.headers;

    const house = await House.find({ user: user_id }); //procurando casas que possuam o user_id dentro da propriedade user

    return res.json(house); // apresentando as casas que o user_id possui
  }
}

export default new DashboardController();

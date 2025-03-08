import Reserve from "../models/Reserve";
import User from "../models/User";
import House from "../models/House";

class ReserveController {
  async index(req, res) {
    const { user_id } = req.headers;

    const reserves = await Reserve.find({ user: user_id }).populate(["house"]);
    return res.json(reserves);
  }

  async store(req, res) {
    const { user_id } = req.headers;
    const { house_id } = req.params;
    const { date } = req.body;

    //verifica se a casa existe
    const house = await House.findById(house_id);

    if (!house) {
      return res.status(400).json("Essa casa não existe");
    }

    //verifica se a casa está com status true, acessando house.status
    if (house.status != true) {
      return res.status(400).json("Indisponível");
    }

    //verifica se o ID do usuário é igual o ID do proprietário
    const user = await User.findById(user_id);
    if (user._id == user_id) {
      return res.status(404).json("Não pode agendar a própria casa");
    }

    const reserve = await Reserve.create({
      user: user_id,
      house: house_id,
      date: date,
    });

    await reserve.populate(["house", "user"]);
    return res.json(reserve);
  }

  async destroy(req, res) {
    const { reserve_id } = req.body;

    await Reserve.findByIdAndDelete({ _id: reserve_id });

    return res.json("cancelado");
  }
}

export default new ReserveController();

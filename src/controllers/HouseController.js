import House from "../models/House";
import User from "../models/User";
import * as Yup from "yup";

class HouseController {
  async index(req, res) {
    const { status } = req.query;

    const houses = await House.find({ status });

    return res.json(houses);
  }

  async store(req, res) {
    //validação de que existem todas essas informações no momento da criação do cadastro da casa via biblioteca Yup
    const schema = Yup.object().shape({
      description: Yup.string().required(),
      price: Yup.number().required(),
      location: Yup.string().required(),
      status: Yup.boolean().required(),
    });
    const { filename } = req.file;
    const { description, price, location, status } = req.body;
    const { user_id } = req.headers;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json("Falha na validação");
    }

    const house = await House.create({
      user: user_id,
      thumbnail: filename,
      description: description,
      price: price,
      location: location,
      status: status,
    });

    return res.json(house);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
      price: Yup.number().required(),
      location: Yup.string().required(),
      status: Yup.boolean().required(),
    });

    const { filename } = req.file;
    const { house_id } = req.params;
    const { description, price, location, status } = req.body;
    const { user_id } = req.headers;

    const user = await User.findById(user_id);
    const house = await House.findById(house_id);

    if (String(user._id) !== String(house.user)) {
      return res.status(401);
    }

    await House.updateOne(
      { _id: house_id },
      {
        user: user_id,
        thumbnail: filename,
        description: description,
        price: price,
        location: location,
        status: status,
      }
    );

    return res.send();
  }

  async destroy(req, res) {
    const { house_id } = req.body;
    const { user_id } = req.headers;

    await House.findByIdAndDelete({ _id: house_id });

    return res.json("Deletado");
  }
}

export default new HouseController();

//métodos: index, show, update, store, destroy

//index: listagem de sessões
//store: criar um novo login (store)
//show: queremos listar uma única sessão
//update: quando queremos alterar alguma sessão
//destroy: quando queremos deletar alguma sessão

import User from "../models/User";
import * as Yup from "yup";

class SessionController {
  async store(req, res, next) {
    //verifica máscara do email
    const schema = Yup.object().shape({
      email: Yup.string().email(),
    });

    //atribui o email inserido na const email
    const email = req.body.email;

    if (!(await schema.isValid(req.body))) {
      return res.json("Email inválido");
    }

    //verificando se o usuário já existe
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email: email }); // cria um novo usuário
      return res.json(`${user} criado com sucesso`);
    } else {
      return res.json(`${user} já existe`);
    }
  }
}

export default new SessionController();

import express from "express"
import mongoose from "mongoose"
import path from "path"
import routes from "./routes"
import cors from "cors"

class App{
  constructor(){
      this.server = express()

      mongoose.connect("mongodb+srv://Queiroz:juantop10@clusterhouse.uwkx0.mongodb.net/?retryWrites=true&w=majority&appName=ClusterHouse", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })

      this.middlewares()
      this.routes()
    }

  middlewares(){
    this.server.use(cors())

    this.server.use( 
      "/files",
      express.static(path.resolve(__dirname, "..","config", "images"))
    );

    this.server.use(express.json())
}

  routes(){
    this.server.use(routes)


}

}

export default new App().server
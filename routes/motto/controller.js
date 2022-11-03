const { motto} = require("../../models")

module.exports={
    //Tampilkan semua
    getAllmotto:(req,res)=>{
        motto.find().then((result)=>{
            res.status(200).json({
                message: "Data Motto diterima",
                result,
            })
        }).catch((error)=>{
            res.status(404).json("Data Tidak DiTemukan",error)
        })
    },
    //Tampilkan berdasarkan Idnya
    getmottobyId : async(req,res)=>{
        const mottoRooms = await motto.findById(req.params.id)
        try {
            res.json({
                message:"Sukses mendapatkan data berdasarkan ID",mottoRooms,
            })
            
        } catch (error) {
            console.log(err)
            res.status(500).send(err)
            
        }
    },
    // Create
  postMotto: async (req, res) => {
    const mottoRooms = await motto.create(req.body);
    try {
      res.json({
        message: "Sukses menambahkan data Motto",
        mottoRooms,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  // Update by id
  updateMottoById: async (req, res) => {
    const mottoRooms = await motto.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    try {
      res.json({
        message: "Sukses update data Motto",
        mottoRooms,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  // Delete by id
  deleteMottoById: async (req, res) => {
    const motto = await motto.findByIdAndDelete(req.params.id, req.body);
    try {
      res.json({
        message: "Sukses hapus data Motto",
        motto,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
}
require('dotenv').config({path:'../../config.env'})

const jwt  =require('jsonwebtoken')

const bcrypt = require('bcryptjs')

const { register } = require('../../models/index')

module.exports={
    //Tampilkan Semua data
    getAllRegis:(req,res)=>{
        register.find()
        //hilangkan _v di populate
        .populate("class", "-__v")
        .then((result)=>{
            res.status(200).json({
                message:"Sukes Registerasi",result
            })
        }).catch((error)=>{
            res.status(404).json("data tidak ditemukan",error)
        })
    },

    //tampilkan berdasrkan ID

    getRegisterById: async (req, res) => { 
        const peopleRegister = await register.findById(req.params.id);
    
        try {
          res.json({
            message: "Sukses mendapatkan data member register berdasarkan ID",
            peopleRegister,
          });
        } catch (err) {
          console.log(err);
          res.status(500).send(err);
        }
      },
      // Create
      postRegister: async (req, res) => {
        // Masukkan bcrypt salt dan hash di post 
    
        // melakukan enksripsi pada passsworndya Sebanyak 10 karakter
        const salt = bcrypt.genSaltSync(10);
    
        // Setelah itu passwordnya akan di hash
        const hash = bcrypt.hashSync(req.body.password, salt);
    
        // Ambil objek register di  request body
        let peopleRegister = {
          ...req.body,
          // passwornya di ubah dengan hash lalu Tampilkan 
          password: hash
        }
        console.log(peopleRegister);
        // Setelah itu akan membuat si registernya 
        peopleRegister = await register.create(peopleRegister);
        try {
          res.json({
            message: "Sukses menambahkan data Register",
            peopleRegister
          });
        } catch (error) {
          console.log(error);
          res.status(500).send(error);
        }
      },
      // Update by id
      updateRegisterById: async (req, res) => {
        const peopleRegister = await register.findByIdAndUpdate(req.params.id, req.body);
        try {
          res.json({
            message: "Sukses update data member register",
            peopleRegister,
          });
        } catch (error) {
          console.log(error);
          res.status(500).send(error);
        }
      },
    
      // Delete by id
      deleteRegisterById: async (req, res) => {
        const peopleRegister = await register.findByIdAndDelete(req.params.id, req.body);
        try {
          res.json({
            message: "Sukses hapus data member register",
            peopleRegister,
          });
        } catch (error) {
          console.log(error);
          res.status(500).send(error);
        }
      },



      // Buat login integrasi dengan bcrypt dan jwt
  loginRegister: async (req, res) => {
    try{
      // Cari spesifik data email
      const peopleRegister = await register.findOne({email: req.body.email})
      console.log(peopleRegister);

      // Jika member register ada maka harus dibuatkan jwtnya
      if(peopleRegister){
        // Apakah password yang di hash dengan password yang diinput sesuai dengan compare untuk membandingkan password yang sudah di hash dengan passowrdnya diinput 
        const password = bcrypt.compareSync(req.body.password, peopleRegister.password)

        // Jika passwordnya benar
        if(password){
          const token = jwt.sign(peopleRegister.toObject(), process.env.SECRET_KEY)
          // Jika berhasil dibuatkan token maka munculkan
          res.json({
            message: "login sukses",
            // Menampilkan token
            token
          })
          // Jika password tidak sesuai
        } else {
          res.json("password salah")
        }
        // Jika password tidak sesuai
      } else {
        res.json("user tidak ditemukan")
      }
    } catch(error){
      console.log(error);
    }
  },

  //  buat get member register di class
  getRegisterInClass: async (req, res) => {
    const peopleRegister = await register.find({class: req.params.id})
    try{
      res.json({
        message: "Sukses mendapatkan data register di class",
        peopleRegister,
      });
    } catch(error){
      console.log(error);
      res.status(500).send(error);
    }
  }

}
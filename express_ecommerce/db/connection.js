const mongoose= require('mongoose')

mongoose.connect(process.env.DATABASE)
.then(()=>{
    console.log('Database connected Successfully')
})
.catch(err=>console.log(err))
import mongoose from 'mongoose'
import app from "./app";
const port = 5000;


async function main() {
    try {
        await mongoose.connect('mongodb+srv://phUniversity:fgUclelzryPQkPUm@cluster0.vcouptk.mongodb.net/phUniversity?retryWrites=true&w=majority&appName=Cluster0');

        

    } catch (error) {

    }

}

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    console.log(process.env.DB_USER);
})

main()
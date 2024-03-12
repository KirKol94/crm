import { app } from './app'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
      console.log(`server is ready on : http://localhost:${PORT}`)
})

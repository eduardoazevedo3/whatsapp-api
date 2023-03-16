import app from './app'

const port = process.env.PORT || '8000'
const node_env = process.env.NODE_ENV || 'development'

app.listen(port, () => {
  console.log(`Server started in ${node_env} on port ${port}`)
})

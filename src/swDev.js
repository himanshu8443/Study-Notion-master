export default function swDev() {
  let swUrl = `${process.env.PUBLIC_URL}/service-worker.js`
  navigator.serviceWorker.register(swUrl).then((response) => {
    console.warn('response', response)
  })
}
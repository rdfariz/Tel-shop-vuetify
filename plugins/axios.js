export default function ({ $axios, redirect }, inject) {
    // Set baseURL to something different
    $axios.setBaseURL('http://localhost:3000/')
    
    // $axios.onRequest(config => {
    //     console.log('Making request to ' + config.url)
    // })
    // $axios.onError(error => {
    //     const code = parseInt(error.response && error.response.status)
    //     if (code === 400) {
    //         // redirect('/400')
    //     }
    // })
}
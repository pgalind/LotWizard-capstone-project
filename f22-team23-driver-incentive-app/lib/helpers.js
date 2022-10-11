import axios from 'axios'

export function logNavigation(event){
    let data={page: event.target.innerText + ' page',
            userID: 0}
      axios.post('/api/axios/lognavigation', data)
      .then((response) => {
        console.log(response)
      })
}
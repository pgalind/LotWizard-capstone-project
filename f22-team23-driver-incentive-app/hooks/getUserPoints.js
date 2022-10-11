import axios from "axios"
import user from '../services/user'

export default function getPoints() {
    let points = 0
    axios.post('/api/queryUserPoints', {
        userName : user.name
    }).then((response) => {
        points = response.data
        console.log("first HOOK points: " + points)
        return points;
    }).catch((error) => {
        console.log("Does exist error : " + error)
    })
    //console.log("second HOOK points: " + points)
    return points;
}
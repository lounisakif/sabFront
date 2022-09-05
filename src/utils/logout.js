import axios from 'axios'
function logout() {
    localStorage.setItem('csrfToken','')
    localStorage.setItem('role','')
    axios.get('http://localhost:9000/logout')
    window.location.href='/'

}
export default logout;
// import config from 'config';
/* eslint-disable */
import Vue from 'vue'
import store from '../store/index'
import axios from 'axios'
import router from '../router/router'



export const userService = {
    login,
    logout,
    register,
    getAll,
    // getById,
    // update,
    // delete: _delete
};

async function login(payload) {


    
    await axios.post("http://localhost:5000/api/clients/auth/login",
        payload, { withCredentials: true }).then((res) => {

            if (res.data[0].access_token) {
                console.log(res.data)
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(res.data[0]));

            }
            if (res.status == 200) {
                
                return res.data[0];
            }
        })
}

 function logout() {
    console.log('asd')
    router.push('/login')
    
     axios.post("http://localhost:5000/api/clients/auth/logout",'',{ withCredentials: true })
      .then(()=>{
        
        localStorage.removeItem('user')
        router.go()
        
        
      })
    // remove user from local storage to log user out

    
}

async function register(user) {
    console.log(user)
    await axios.post('http://localhost:5000/api/clients/auth/verification-email', user).then(res => console.log(res));
}

async function refreshToken(res,query){
    const token = JSON.parse(localStorage.getItem('user'));
    
    if (res.response.status == 403) {
                
        axios.post("http://localhost:5000/api/clients/auth/refresh-token",token, { withCredentials: true })
            .then(res => {

                localStorage.removeItem('user')
                
                const newToken = {
                    email:token.email,
                    id:token.id,
                    isEmailConfirmed:token.isEmailConfirmed,
                    name:token.name,
                    access_token:res.data.accessToken,
                    refresh_token:res.data.refreshToken
                }
                localStorage.setItem('user', JSON.stringify(newToken))
                const user = JSON.parse(localStorage.getItem('user'))
                
                axios.get(query, {
                    headers: {
                        'Authorization': "Bearer " + user.access_token
                    }
                })
                    .then((res) => {
                        store.dispatch('auth/setUsers',res.data) 
                    })
            }).catch((err)=>{
                if(err.response.data == 'jwt expired'){
                    router.push('/login')
                    alert('Session expired, login again...');
                    localStorage.removeItem('user')
                }
            })
    }else{
        console.log('errref')
    }
}

async function getAll() {
    
    
    const token = JSON.parse(localStorage.getItem('user'));
    const loggedState = await store.getters['auth/getStatus'].loggedIn
    if(loggedState){
       axios.get("http://localhost:5000/api/clients/", {
        headers: {
            'Authorization': "Bearer " + token.access_token
        }
    }).then((response) => {
        console.log(response.data)
        store.dispatch('auth/setUsers',response.data) 
            
        }).catch((res) => {
            refreshToken(res,"http://localhost:5000/api/clients/")
            return res.data
        })
        
    }else{
        
        console.log('sss')
    }
    
    
    
}


// function getById(id) {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeader()
//     };

//     return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
// }

// function update(user) {
//     const requestOptions = {
//         method: 'PUT',
//         headers: { ...authHeader(), 'Content-Type': 'application/json' },
//         body: JSON.stringify(user)
//     };

//     return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);
// }

// // prefixed function name with underscore because delete is a reserved word in javascript
// function _delete(id) {
//     const requestOptions = {
//         method: 'DELETE',
//         headers: authHeader()
//     };

//     return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
// }

// function handleResponse(response) {
//     return response.text().then(text => {
//         const data = text && JSON.parse(text);
//         if (!response.ok) {
//             if (response.status === 401) {
//                 // auto logout if 401 response returned from api
//                 logout();
//                 location.reload(true);
//             }

//             const error = (data && data.message) || response.statusText;
//             return Promise.reject(error);
//         }

//         return data;
//     });
// }
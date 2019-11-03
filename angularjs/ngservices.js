const url = 'http://localhost:5000'
app.service('mainser', function($http) {
    this.login = function (data) {
        return $http.post(`${url}/loggin`, data)
    }
    this.addservice =(data)=>{
        return $http.post(`${url}/addservice`, data)
    }
    this.generate_token = (length) => {
        //edit the token allowed characters
        var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
        var b = [];  
        for (var i=0; i<length; i++) {
            var j = (Math.random() * (a.length-1)).toFixed(0);
            b[i] = a[j];
        }
        return b.join("");
    }
    this.getservices=()=>{
        return $http.get(`${url}/getservice`)
    }
    this.uploadImage=(id, image)=>{
        const data = {
            id: id,
            image: image,
        }
        return $http.post(`${url}/uploadImage`, data)
    }
});
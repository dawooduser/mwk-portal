app.service('loginService', function($localStorage,  $location, OnstartUp, $http, url) {
    OnstartUp.OnstartUp();
    this.loginSaveStatus = function (email, password) {
        var data = {
            'email': email,
            'password': password
        }
       return $http.post(`${url}/loggin`, data)
    }
});
app.service('portalService', function($localStorage,  $location, OnstartUp, $http, url) {
    OnstartUp.OnstartUp();
    this.logout = function () {
        $localStorage.userIsloggin = null
        OnstartUp.OnstartUp();
    }
    this.addService = function (title, content, id, image) {
        debugger
        var data = {
            'title': title,
            'content': content,
            'id': id,
            'image': image
        }
        return $http.post(`${url}/addService`, data)
    }
    this.addPortfolio = function (title, content, id, image) {
        var data = {
            'title': title,
            'content': content,
            'id': id,
            'image': image
        }
        return $http.post(`${url}/addPortfolio`, data)
    }
    this.getAllservice=()=>{
        return $http.get(`${url}/GetAllServices?id=0G4HDqIgnghPY3Yk0fbu`)
    }
    this.getimage=(imageName,whichOne)=>{
        return $http.get(`${url}/imageFetch?imageName=${imageName}&whichOne=${whichOne}`)
    }
    this.EditByApi=(title, content, id, which)=>{
        var data ={
            title: title,
            content: content,
            id: id,
            which:which
        }
        return $http.post(`${url}/EditApi`, data)

    }
});

app.factory('OnstartUp', function($localStorage, $location) {
    return {
        OnstartUp: function() {
            var check = $localStorage.userIsloggin;
            if (check === undefined || check === null) {
               return $location.path('/')
            }
            $location.path('/portal')
        }
    };
});
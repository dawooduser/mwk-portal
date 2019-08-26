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
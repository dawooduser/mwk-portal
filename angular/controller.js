app.controller('Loginctrl', function($scope, $rootScope,$localStorage,  $location, loginService) {
  $rootScope.show = false
  $scope.login= () =>{
    debugger
      $scope.err = null;
      if ($scope.email === null || $scope.email === undefined) {
        $scope.err = "Please Provide Email Address"
        return alert($scope.err)
      } 
      if ($scope.password === null || $scope.password === undefined) {
        $scope.err = "Please Provide Password"
        return alert($scope.err)
    }
    if ($scope.err === null) {
              loginService.loginSaveStatus($scope.email, $scope.password).then(response =>{
              var data = response.data;
              var approve = data.userExist
              if (data === 'password Error') {
                $scope.email = ''
                $scope.password = ''
                return alert('Wrong Password')
              }
              debugger
                if (approve) {
                var data = {
                      userIsloggin: true,
                      email: $scope.email,
                      id: response.data.id,
                      password: $scope.password
                  }
                  $localStorage.userIsloggin = data;
                      $location.path('/portal')
                      $scope.email = ''
                      $scope.password = ''
                      return
                    }
                    alert('Email is unvalid unable to access')
                    $scope.email = ''
                    $scope.password = ''
              })
    }
  }
});
app.controller('portal', function($scope, $location, $rootScope, portalService, $localStorage) {
  $rootScope.show = false
  // class="tab-pane fade show active" 
    $scope.Active = 'nav-item nav-link active'
    $scope.ActiveContent = 'tab-pane fade show active'
    $scope.ActivePortfolio = 'nav-item nav-link'
    $scope.ActiveContentPortfolio = 'tab-pane fade '
    // $scope.Services = true;
    // $scope.Active = 'nav-item nav-link'
    //     $scope.ActiveContent = 'tab-pane fade'
    $scope.Services = () => {
        debugger
        $scope.Active = null
        $scope.ActiveContent = null
        $scope.ActivePortfolio = null
        $scope.ActiveContentPortfolio = null

        $scope.Active = 'nav-item nav-link active'
        $scope.ActiveContent = 'tab-pane fade show active'
        $scope.ActivePortfolio = 'nav-item nav-link'
        $scope.ActiveContentPortfolio = 'tab-pane fade '
    }
    $scope.Portfolio = () => { 
      $scope.Active = null
      $scope.ActiveContent = null
      $scope.ActivePortfolio = null
      $scope.ActiveContentPortfolio = null

      $scope.Active = 'nav-item nav-link'
        $scope.ActiveContent = 'tab-pane fade'
        $scope.ActivePortfolio = 'nav-item nav-link active'
        $scope.ActiveContentPortfolio = 'tab-pane fade show active'
    }
    $scope.logout = () => {
      portalService.portalService()
    }
    $scope.addservice = () => {
      $scope.Modal_header = 'Create An Service';
      $scope.Bottom_header = 'Saved Services';
      
      $scope.Service = true;
      $scope.Portfolio = false;
      $('#openthis').modal('show');
    }
    $scope.addportfolio = () => {
      $scope.Modal_header = 'Create An Portfolio';
      $scope.Bottom_header = 'Saved Portfolio';
      $scope.Service = false;
      $scope.Portfolio = true;
      $('#openthis').modal('show');
    }

    $scope.myImage='';
    $scope.myCroppedImage='';

    var handleFileSelect=function(evt) {
      var file=evt.currentTarget.files[0];
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function($scope){
          $scope.myImage=evt.target.result;
        });
      };
      reader.readAsDataURL(file);
    };
    angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);


    $scope.postDAta = (choose) => {
      debugger
      if ($scope.title === null || $scope.title === undefined) {
        $scope.err = "Please Provide title"
        return alert($scope.err)
      } 
      if ($scope.content === null || $scope.content === undefined) {
        $scope.err = "Please Provide content"
        return alert($scope.err)
    }
    $('#openthis').modal('hide');
    $('#imageUploader').modal('show');
    switch(choose){
      case 'services':
        $scope.addimageBtnTitle = "add Services Image"
      break;
      case 'portfolio':
          $scope.addimageBtnTitle = "add Portfolio Image"
      break;
    }
  }
    $scope.addImage = (choose)=>{
      var data = $localStorage.userIsloggin
      console.log($scope.myCroppedImage)
      switch(choose){
        case 'services':
            portalService.addService($scope.title, $scope.content, data.id, $scope.myCroppedImage)
            .then(response =>{
              debugger
              $scope.title = ''
              $scope.content = ''
              $scope.addimageBtnTitle = ''
              $scope.myCroppedImage = ''
              $scope.Modal_header = '';
              $scope.Bottom_header = '';
              console.log(response)
            })
            
        break;
        case 'portfolio':
          portalService.addPortfolio($scope.title, $scope.content, data.id, $scope.myCroppedImage)
            .then(response =>{
              debugger
              $scope.title = ''
              $scope.Modal_header = '';
              $scope.Bottom_header = '';
              $scope.addimageBtnTitle = ''
              $scope.content = ''
              $scope.myCroppedImage = ''
              console.log(response)
            })
           
        break;
      }
      $('#imageUploader').modal('hide');
    }
    $scope.ServiceAddArray =()=>{
      // $localStorage.services 
    }
     
  });
  app.controller('Nav_controller', function($scope, $location, $rootScope, portalService) {
    $rootScope.show = false
      $scope.logout = () => {
        portalService.logout()
      }
    });
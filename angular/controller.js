app.controller('Loginctrl', function($scope, $rootScope,$localStorage,  $location, loginService) {
  $rootScope.show = false
  $scope.login= () =>{
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
    GetAllServices();
    // $scope.Services = true;
    // $scope.Active = 'nav-item nav-link'
    //     $scope.ActiveContent = 'tab-pane fade'
    $scope.Services = () => {
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
    function GetAllServices() {
      portalService.getAllservice().then(response =>{
        const abc = response.data
        $scope.Services = abc.Services;
        $localStorage.Services = $scope.Services
        console.log(response)
      })
    }
    $scope.header = null
    $scope.EditServices = (id)=> {
      debugger
      $scope.imageName = null
      $('#betaModal').modal();
      console.log(id)
      $localStorage.currentSelectID = id
      $scope.header = 'Service'
      const response = $localStorage.Services
      angular.forEach(response, function(value, key) {                    
        if(value.id == id) {
          debugger
          console.log(value)
            $scope.title =  response[key].title;
            $localStorage.currentTitle = $scope.title
            $scope.content = response[key].content;
            $localStorage.currentContent = $scope.content
            $scope.id = response[key].id;
            $scope.imageName = response[key].imageName;
        }
        if ($scope.imageName === null) { return }
        portalService.getimage($scope.imageName,$scope.header).then(function(response){
          $scope.image = response.data.base64String
        })
    });
    }
    $scope.cleanId =()=> {
      $localStorage.currentSelectID = null
    }
    $scope.dataAfterEdit =(which)=> {
      debugger
      switch(which){
        case 'Service':
         const id = $localStorage.currentSelectID
         if ($scope.title === $localStorage.currentTitle) {
           return alert('change First')
         }
         if ($scope.content === $localStorage.currentContent) {
          return alert('change First')
        }
        if ($scope.title !== null && $scope.content !== null) {
          portalService.EditByApi($scope.title, $scope.content, id, $scope.header).then(function(response){
            $scope.title = ''
            $scope.header = ''
            $localStorage.currentSelectID = null
            $localStorage.currentTitle = null
            $('#betaModal').modal('hide');
            $localStorage.currentContent = null
            $scope.content = ''
            GetAllServices()
          })
        }
         $scope.
          break;
          case 'Portfolio':
          break;
          case 'ServiceImage':
          
          break;
          case 'PortfolioImage':
          break;
      }
    }
     
  });
  app.controller('Nav_controller', function($scope, $location, $rootScope, portalService) {
    $rootScope.show = false
      $scope.logout = () => {
        portalService.logout()
      }
    });
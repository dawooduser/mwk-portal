app.controller('project', function($compile, $scope, mainser, $localStorage) {
    $scope.createProject=()=>{
        $('#modal-image').modal('toggle');
    }
    let arr = []
    let projectThumbNail = {}
    let err = []
    
    function previewImages() {
        
          var $preview = $('#preview').empty();
          if (this.files) $.each(this.files, readAndPreview);
        
          function readAndPreview(i, file) {
            if (!/\.(jpe?g|png|gif)$/i.test(file.name)){
              return alert(file.name +" is not an image");
            } // else...
            var reader = new FileReader();
            $(reader).on("load", function() {
              var img = document.createElement('img');
              img.src = this.result;
              img.height = "100";
              img.id = i
              img.class = 'taha'
              img.onclick = (function (url) {
                return function () {
                    doSomething(url);
                };
            })(i);
            $preview.append(img)
        });
            reader.onloadend = function () {
                var b64 = reader.result.replace(/^data:image\/png;base64,/, '')
                console.log(b64);
                arr.push(b64)
            }
            reader.readAsDataURL(file);
          }
          function doSomething(url){
            console.log(url);
            debugger
            $('img').css('border-radius', '0%');
            var id = `#${url}`
            debugger
            $(id).css('border-radius', '50%');
            arr.forEach((v, k) => {
              console.log(v)
              if (k === url) {
                let data = arr[k]
                // data = LZString.compressToBase64(data)
                projectThumbNail.headerImage= data
              } else {
                // const w = LZString.compressToBase64(v)
                err.push(v)
                projectThumbNail.image = err
              }
            })
            $scope.imagesData = projectThumbNail
        }
        }
        $('#multi-images-selector').on("change", previewImages);

        $scope.addTitleAndDescription=()=>{
          $('#modal-image').modal('toggle');
          $('#modal-TitleDescription').modal('toggle');
        }
        $scope.addProject=()=>{
          const { ptitle, pdescription, imagesData } = $scope
      if (ptitle === null || ptitle === undefined &&
        pdescription === null || pdescription === undefined){
         $scope.ptitle = ''
         $scope.pdescription = ''
        return alert('Please Input Some Data')
      }
      var data = {
        ptitle,
        pdescription,
        imagesData
      }
      mainser.addProject(data).then(response => {
        debugger
        getAllProject()
        $scope.ptitle = null
        $scope.pdescription = null
        // $scope.imageName = null
        $('#modal-TitleDescription').modal('hide');
      })
   }
   function getAllProject() {
    mainser.getProject().then(response => {
      $scope.Project = response.data;
  })
}
})
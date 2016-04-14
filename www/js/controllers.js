angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

$scope.chats = Chats.all();
$scope.remove = function(chat) {
  Chats.remove(chat);
};
})

.controller('ProponentesCtrl', function($scope, $state, UFs, Municipios, Proponentes) {
  init();

  function init(){
    $scope.model = {};
    $scope.model.ufs = UFs.all();
  }

  $scope.pesquisar = function(){
    $state.go('tab.resultado-proponentes');
    
    //Proponentes.all($scope.model.ufSelecionada.id,
      //$scope.model.municipioSelecionado.id, 
      //$scope.model.nome, 
    //  success,
    //  error);

   //function success(data){
   //   $state.go('tab.resultado-proponentes');
   // }

   // function error(data){

   // }

  }

  $scope.obterMunicipios = function() {
    var json = Municipios.all($scope.model.ufSelecionada.id, 
      function(data){
        $scope.model.municipios = data.municipios;
      },
      function(error){
        alert('Erro!');
        console.log(error);

      });
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('ResultadoProponentesCtrl', function($scope, $state) {
$scope.irParaConvenios = function() {
      $state.go('tab.convenios');
};
})

.controller('ConveniosCtrl', function($scope, $ionicModal) {
 $ionicModal.fromTemplateUrl('my-modal.html', {
  scope: $scope,
  animation: 'slide-in-up'
}).then(function(modal) {
  $scope.modal = modal;
});
$scope.openModal = function() {
  $scope.modal.show();
};
$scope.closeModal = function() {
  $scope.modal.hide();
};

$scope.enviar = function() {
  $scope.modal.hide();
};
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
});

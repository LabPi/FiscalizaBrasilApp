angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory('UFs', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var ufs = [{
    id: 'RJ',
    nome: 'Rio de Janeiro',
  }, {
    id: 'MG',
    nome: 'Minas Gerais'
  }];

  return {
    all: function() {
      return ufs;
    },
    get: function(id) {
      for (var i = 0; i < ufs.length; i++) {
        if (ufs[i].id === parseInt(id)) {
          return ufs[i];
        }
      }
      return null;
    }
  };
})

.factory('Municipios', ['$http', function($http) {
  return {
    all: function(uf, success, error) {
      $http({
        method: 'GET',
        url: 'http://api.convenios.gov.br/siconv/v1/consulta/municipios.json?uf=' + uf
      }).then(function successCallback(response) {
        success(response.data);
      }, function errorCallback(response) {
        error(response);
      });

    },
    get: function(id) {
      for (var i = 0; i < ufs.length; i++) {
        if (ufs[i].id === parseInt(id)) {
          return ufs[i];
        }
      }
      return null;
    }
  };
}])

.factory('Proponentes', ['$http', function($http) {
  return {
    all: function(uf, idMunicipio, nome, success, error) {

      var parametros = 0;
      var urlParametro = '';
      if (uf) {
        parametros++;
        urlParametro = '?uf=' + uf;
      }

      if (idMunicipio){
        if(parametros > 0){
          urlParametro += '&id_municipio=' + idMunicipio;
        }else{
          urlParametro += '?id_municipio='+ idMunicipio;
        }
      }

      if (nome) {
        if(parametros > 0){
          urlParametro += '&nome=' + nome;
        }else{
          urlParametro += '?nome=' + nome;
        }
      }

      $http({
        method: 'GET',
        url: 'http://api.convenios.gov.br/siconv/v1/consulta/proponentes.json' + urlParametro
      }).then(function successCallback(response) {
        success(response.data);
      }, function errorCallback(response) {
        error(response);
      });
      
    },
    get: function(id) {
      for (var i = 0; i < ufs.length; i++) {
        if (ufs[i].id === parseInt(id)) {
          return ufs[i];
        }
      }
      return null;
    }
  };
}])
;

var MonCarnetAdresse = angular.module('MonCarnetAdresse', ['ngAnimate', 'angular-loading-bar', 'angular-input-stars', 'ngRoute']);

/**
 * Configuration du module principal : routeApp
 */
MonCarnetAdresse.config(['$routeProvider',
    function($routeProvider) {

        // Système de routage
        $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'homeCtrl'
         })
        .when('/userDetail', {
            templateUrl: 'partials/userDetail.html',
            controller: 'userDetailCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
    }
]);




// javascript: (function() {var a = document.createElement("script");a.src = "https://rawgit.com/kentcdodds/ng-stats/master/dist/ng-stats.js";a.onload=function(){window.showAngularStats()};document.head.appendChild(a)})();


MonCarnetAdresse.filter('verifNaissance',function(){

   return function(tab, date){
         if(date == undefined){
            return tab;
         }
         return  _.filter(tab, function(use){
            return moment(use.birthday,'DD/MM/YYYY') > moment(date);
         });

   };
});

MonCarnetAdresse.filter('verifTrancheAge',function(){

   return function(tab, age){
         return  _.filter(tab, function(use){
            return use.age ;
         });

   };
});

MonCarnetAdresse.filter('triNoteBac',function(){
   return function(tab, noteBac){
         return  _.filter(tab, function(use){
            return use.noteBac >= noteBac;
         });

   };
});
MonCarnetAdresse.filter('afficheDrapeau',function(){
   return function(langue){
         switch (langue) {
            case 'fr': return 'http://www.valhalla.fr/public/posts/2004-08-31-icone-drapeau/france.png';
            case 'en': return 'http://www.esc-larochelle.fr/var/esclarochelle/storage/images/media/images/drapeau-anglais-rond/63860-1-fre-FR/drapeau-anglais-rond_large.jpg';
            case 'it': return 'http://www.topbadges.fr/2038/badge-drapeau-italie.jpg';
            case 'es': return 'http://us.123rf.com/450wm/aldorado10/aldorado101209/aldorado10120900033/15161219-bouton-drapeau-espagnol-isol-sur-blanc.jpg?ver=6';
         };

   };
});
MonCarnetAdresse.filter('triMajeurMineur',function(){
   return function(tab, etat){
      if (!etat) {
         return  _.filter(tab, function(use){
            return use.age >=18;
         });
      }else{
         return  _.filter(tab, function(use){
            return use.age < 18;
      });
      }
   }
});
// ajouter le filtre a tout les autres
MonCarnetAdresse.filter('searchNomPrenom',function(){
   return function(tab, inputSearch){
      if (!inputSearch) {
         return tab;
      }else{
         return  _.reject(tab, function(use){

            var tabSearch = inputSearch.trim().replace(/\s+/g,"/").split("/");
            var nomPrenomUser = use.nom+use.prenom;
            for (word of tabSearch) {
               if (nomPrenomUser.search(word)==-1) {
                  return (nomPrenomUser.search(word)==-1);
               }
            }
         });
      }
   };
});

MonCarnetAdresse.filter('codePostalTri',function(){
   return function(tab, codePostal){
      if (codePostal) {
         return  _.filter(tab, function(use){
            return use.codePostal.substring(0,2) == codePostal.substring(0,2);
         });
      }else{
         return tab;
      }
   };
});
MonCarnetAdresse.filter('filterLike',function(){
   return function(tab){
         return  _.filter(tab, function(use){
            storageLikePlusUn = verifSession(use.id);
            return storageLikePlusUn.like;
         });
      }
});


// Fonction qui vérifie si la session pour l'id existe
function verifSession(id) {
   //si la session pour la clef correspondant a l'id n'est pas nulle on la récupère
   if (JSON.parse(sessionStorage.getItem(id))!=null) {
      // Récupération de la valeur dans web storage
      return JSON.parse(sessionStorage.getItem(id));
   }else{
      // Sinon on la créee
      return {like:false, plusUn:0};
   };
}


MonCarnetAdresse.controller('userDetailCtrl', ['$scope', '$routeParams','$http',
    function($scope, $routeParams, $http){
      $http.get('https://jsonblob.com/api/jsonBlob/57ab427de4b0dc55a4ebdd32').success(function(response){

         $scope.users = response ;
         for (user of $scope.users) {
            if (user.id == $routeParams.id) {
               $scope.currentUser = user;
            }
         }
      });
/* fonction ajout com a finir */
      $scope.ajoutCom = function(id, com) {
         for (user of $scope.users) {
            if (user.id == id) {
               var today = new Date();
               var dd = today.getDate();
               var mm = today.getMonth()+1; //January is 0!

               var yyyy = today.getFullYear();
               if(dd<10){
                   dd='0'+dd
               }
               if(mm<10){
                   mm='0'+mm
               }
               var dateCom = dd + '/' + mm + '/' + yyyy;
               var newCom = {com:com, date:dateCom};
               user.commentaire.push(newCom);
               console.log($scope.users);
               sessionStorage.users = JSON.stringify($scope.users);
            }
         }
      }

    }
]);

MonCarnetAdresse.controller('homeCtrl', ['$scope','$filter','$http', function($scope, $filter, $http){

   //
   // on initialise qq input
   $scope.codePostal = "";
   $scope.triBac = 0;
   $scope.afficheMineurMajeur = false;
   var users;

   //on test si il y a une session et on la charge si oui
   if (sessionStorage.users != undefined) {
      $scope.users = JSON.parse(sessionStorage.users);
      $scope.tabId = JSON.parse(sessionStorage.tabId);
   }else{
      // requête HTTP en GET via UsersCtrl
      // pour récupérer mon tableau en JSON
      $http.get('https://jsonblob.com/api/jsonBlob/57ab427de4b0dc55a4ebdd32').success(function(response){// response est le contenu récupéré depuis l'url
         $scope.users = users = response ;
         $scope.tousMineur();
      });
      $scope.tabId =  [1,2,3,4,5,6,7,8];
   }


   // fonction qui va récupérer l'index de l'element en html puis vérifie la valeur de sexe dans le tableau pour retourner soit homme ou femme
   $scope.afficheSexe = function(user){
      if (users[users.indexOf(user)].sexe) {
         return 'Homme';
      }else {
         return 'Femme';
      }
   }

   $scope.departement = function(cp) {
      switch (cp) {
         case '69000': return "Rhône";
         case '75000': return "Paris";
         case '13000': return "Bouches-du-Rhône";
      }
   };


   //calcul la moyenne d'age (a revoir)
   $scope.moyenneAge = function() {

      if (!$scope.date) {
         resFilter = $scope.users;
      }else{
            var triDateNaissanceFilter = $filter('verifNaissance');
            var resFilter = triDateNaissanceFilter($scope.users,$scope.date);
         }
         if (!$scope.searchRadio) {
            resFilterbis = resFilter;
         }else{
            var resFilterbis = _.filter(resFilter, function(use){
               return use.ville == $scope.searchRadio;});
         }
         var triMajeurMineurFilter = $filter('triMajeurMineur');
         var resFilterter = triMajeurMineurFilter(resFilterbis,$scope.afficheMineurMajeur);

         var triNoteBacFilter = $filter('triNoteBac');
         var resFilterfor = triNoteBacFilter(resFilterter,$scope.triBac);

         return _.reduce(resFilterfor, function(memo, num){
               return memo + num.age;
            },0) / (resFilterfor.length === 0 ? 1 : resFilterfor.length);

      if (!$scope.searchRadio && !$scope.date) {
         return _.reduce($scope.users, function(memo, num){
           return memo + num.age;
        },0) / ($scope.users.length === 0 ? 1 : $scope.users.length);
      }

   };


   // $scope.$watch pour garder un oeil sur la moyenne si on change une valeur du tableau ( suppression ajout d'utilisateurs.)
   //$scope.$watch("users", moyenneAge, true);

   //Vérifie si tout les users sont mineurs avec every qui regarde si tous les élément ont une certaine propriété
   $scope.tousMineur = function (){
      var tabAge = [];
      for (user of users) {
         tabAge.push(user.age)
      }
      return _.every(tabAge,function(age) {return age < 18;})
   };

   // Supprime un utilisateur en récupérant son index
   $scope.removeUser = function(user){
         var index = $scope.users.indexOf(user);
         $scope.users.splice(index, 1);
         sessionStorage.users = JSON.stringify($scope.users);
         sessionStorage.tabId = JSON.stringify($scope.tabId);
   }


   //créer un user
   $scope.creationUser = function() {

      var newId = $scope.tabId.length + 1;
      $scope.tabId.push(newId);
      $scope.sexeRadio=='true' ? sexe=true : sexe=false;
      var birthday = moment($scope.newDoB).format('DD/MM/YYYY');
      var age = Math.floor(moment(new Date()).diff(moment($scope.newDoB),'years',true));
      var newUser = {id:newId, nom:$scope.newNom, prenom:$scope.newPrenom, age:age, photo:$scope.newPhoto, birthday:birthday, noteBac:parseInt($scope.newNoteBac), sexe:sexe, ville:$scope.newVille, biographie:$scope.newBio, langue:$scope.newLangue, codePostal:$scope.newCodePostal};
      $scope.users.push(newUser);
      $scope.sexeRadio=='true' ? Materialize.toast('Nouvel utilisateur!', 5000, 'rounded') : Materialize.toast('Nouvelle utilisatrice!', 5000, 'rounded');
      sessionStorage.users = JSON.stringify($scope.users);
      sessionStorage.tabId = JSON.stringify($scope.tabId);
     };

     $scope.birthMonth = function(birthday) {
      return moment(new Date(), 'DD/MM/YYYY', 'fr').get('month') == moment(birthday, 'DD/MM/YYYY', 'fr').get('month');
     };


     // ajoute un like si il en a pas
     $scope.like = function(id){
        // On récupère les données avec notre fonction
        storageLikePlusUn = verifSession(id);
        // On change l'état du like
        if (storageLikePlusUn.like == false) {
           storageLikePlusUn.like = true;
           Materialize.toast('Nouveau favori! :)', 5000, 'rounded');
        }else{
           storageLikePlusUn.like = false;
           Materialize.toast("N'est plus favori :(", 5000, 'rounded');
        }
        // Stockage à nouveau en attendant la prochaine visite...
        sessionStorage.setItem(id, JSON.stringify(storageLikePlusUn));
     };

      //fonction a faire pour changer le coeur entre favorite et favorite_border
      $scope.likeIcon = function(id){
        // On récupère les données avec notre fonction
        storageLikePlusUn = verifSession(id);
        // On change l'état du like
        return storageLikePlusUn.like;
     };

     // affiche les +1
     $scope.affichePlusUn = function(id){
        // On récupère les données avec notre fonction
        storageLikePlusUn = verifSession(id);
        return storageLikePlusUn.plusUn;
     };

      //fonction pour le compteur de +1
      $scope.plusUn = function(id){
         // On récupère les données avec notre fonction
         storageLikePlusUn = verifSession(id);
         // On incrémente le compteur like
         storageLikePlusUn.plusUn++;
         // Stockage à nouveau en attendant la prochaine visite...
         sessionStorage.setItem(id, JSON.stringify(storageLikePlusUn));
      };

      // Fonction qui supprime l'ensemble du panier
      $scope.removeCart = function () {
         for (user of $scope.users) {
            storageLikePlusUn = verifSession(user.id);
            storageLikePlusUn.like = false;
            sessionStorage.setItem(user.id, JSON.stringify(storageLikePlusUn));
         }
      };

      // Fonction qui supprime un élément du panier
      $scope.removeArt = function (id) {
            storageLikePlusUn = verifSession(id);
            storageLikePlusUn.like = false;
            sessionStorage.setItem(id, JSON.stringify(storageLikePlusUn));
      };

      $scope.noteMoyenne = function(id) {
         for (user of $scope.users) {
            if (user.id == id) {
               if (user.notePerso.length != 0) {
                  console.log(user.notePerso,user.notePerso.length);
                  return (_.reduce(user.notePerso, function(memo, num){
                    return memo + num;
                 },0) / (user.notePerso.length === 0 ? 1 : user.notePerso.length)).toFixed(1);
               }else{
                  return '0';
               }
            }
         }
      }

      $scope.ajoutNote = function(id, note) {
         for (user of $scope.users) {
            if (user.id == id) {
               user.notePerso.push(parseInt(note));
               sessionStorage.users = JSON.stringify($scope.users);
               sessionStorage.tabId = JSON.stringify($scope.tabId);
            }
         }
      }

      $scope.nbreCom = function(id) {
         for (user of $scope.users) {
            if (user.id == id) {
               return user.commentaire.length
            }
         }
      }

      $scope.modalTrigger = function (nom) { $('#'+nom).openModal() }




}]);

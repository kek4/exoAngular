var MyPhoneApp = angular.module('MyPhoneApp', []);

// Controller Mainctrl fera ppel au premier module Agular qui est la scope
// La scope est une objet entre le html et le js pour controller la dom
// Un controller requiere a 99% la scope
MyPhoneApp.controller('MainCtrl', ['$scope', function($scope){

   // Je créer une variable title dans la scope
   $scope.title = "Liste des plus beau Smartphones";

   /*
   * Créer un tableua d'objets dans la scope permettant d'embarquer le titre image description liens
   * Charger les données pour les afficher dans la vue
   */

   $scope.smartphones = [
      {titre : "Samsung Galaxy s7",
      image : "http://www.journaldugeek.com/files/2016/04/galaxy-s7.jpg",
      description : "Prenez une base proche de la perfection ( le Galaxy S6 ), ajoutez-y un port microSD, un autofocus ultra rapide, un châssis plus agréable en main et un peu plus de puissance, n'oubliez pas de saupoudrer d'endurance et de passer le tout à la moulinette d'Android 6.0 Marshmallow, et voilà ! Vous avez là le meilleur smartphone du moment.",
      lien : "http://www.lesnumeriques.com/telephone-portable/samsung-galaxy-s7-p30227/test.html"},
      {titre : "Samsung Galaxy s6",
      image : "https://cdn2.vox-cdn.com/thumbor/mPWCe0qOA1GRjJpFe8RojqCBPp4=/cdn0.vox-cdn.com/uploads/chorus_asset/file/3456662/galaxys6-9.0.png",
      description : "La décision de Samsung de se caler sur la stratégie tarifaire et technique d'Apple (non-extension de mémoire et déclinaison des modèles en grandes capacités) et la perte de l'étanchéité par rapport au GS5 pourraient faire grincer moult dents, cela ne peut pourtant occulter les innombrables points forts de ce nouveau départ sur le segment haut de gamme venu d'une marque qui semble vouloir prouver qu'elle peut réagir. Le Galaxy S6 se place instantanément comme le roi des mobiles Android, avec un écran et un appareil photo qui feront date, une utilisation simple et des performances techniques au diapason de l'attente générée.",
      lien : "http://www.lesnumeriques.com/telephone-portable/samsung-galaxy-s6-p22211/test.html"},
      {titre : "Samsung Galaxy s4",
      image : "http://img1.lesnumeriques.com/produits/36/14727/samsung-galaxy-s4_1363325523_450x400.jpg",
      description : "Attendu au tournant, le Galaxy S4 négocie un petit virage sans se soucier de sa plastique, peu recherchée, mais tout en proposant une expérience à la hauteur de ce que l'on est en droit d'attendre d'un terminal haut de gamme en 2013. Puissant, rapide, fluide, plutôt intelligent dans son interaction avec l'utilisateur, le GS4, sorte de GS3 sous testostérone, fait parfois le beau avec des fonctions novatrices trop gadgets, sans pour autant oublier de proposer une expérience assez unique dans le secteur. Une réussite.",
      lien : "http://www.lesnumeriques.com/telephone-portable/samsung-galaxy-s4-p14727/test.html"}
   ]
}]);


MyPhoneApp.controller('IpadCtrl', ['$scope', function($scope){

   var Ipads = $scope.Ipads = [
      {titre : "Apple iPad Air",
      image : "http://media.ldlc.com/ld/products/00/01/48/34/LD0001483487_2.jpg",
      description : "Invraisemblablement fin et léger mais aussi incroyablement puissant grâce à sa nouvelle puce A7 et une connectivité sans fil avancée, le iPad Air d'Apple vous permet de faire un nombre de choses inimaginable, dans un nombre d'endroits inconcevable.",
      prix : 369.95,
      couleur : "Gris Sidéral",
      quantite : "50",
      reduction : 0},
      {titre : "Apple iPad mini 2",
      image : "http://media.ldlc.com/ld/products/00/01/46/66/LD0001466695_2_0001468943.jpg",
      description : "L'iPad mini voit grand, très grand ! Ce petit prodige à l'apparence résolument mini a été pensé comme un concentré et non une réduction de son grand frère, l'iPad, pour vous offrir ce qu'il y a de meilleur au quotidien.",
      prix : 297.95,
      couleur : "Argent",
      quantite : "10",
      reduction : 0},
      {titre : "Apple iPad mini 4",
      image : "http://media.ldlc.com/ld/products/00/03/25/69/LD0003256909_2_0003256955_0003257150.jpg",
      description : "Le nouvel iPad mini 4 en a sous le capot et n'a pas peur de le montrer. Plus fin et plus léger qu'avant, il vous offre néanmoins toute la puissance dont vous avez besoin pour aller au bout de vos idées. L'iPad mini 4 intègre toutes les qualités de l'iPad dans un gabarit encore plus réduit !",
      prix : 619.95,
      couleur : "Gris Sidéral",
      quantite : "50",
      reduction : 0},
      {titre : "Apple iPad mini 3",
      image : "http://media.ldlc.com/ld/products/00/01/72/71/LD0001727169_2_0001727183_0001727204.jpg",
      description : "L'iPad mini 3 4G-LTE a été pensé pour être petit. Rapide. Ultra-performant. Il est doté d'un spectaculaire écran Retina de 7,9 pouces, d'une puce A7 extraordinairement puissante, de technologies sans fil avancées et du capteur Touch ID. Il reste pourtant fin et léger.",
      prix : 659.95,
      couleur : "Argent",
      quantite : "50",
      reduction : 0},
      {titre : "Apple iPad Pro",
      image : "http://media.ldlc.com/ld/products/00/03/59/78/LD0003597855_2.jpg",
      description : "Performant et mobile, le nouvel Apple iPad Pro 12.9 pouces est parfaitement adapté au monde d'aujourd'hui. Avec lui, même les tâches les plus complexes deviennent simples et naturelles. Avec ses technologies avancées et son superbe écran Retina, l'iPad Pro offre un confort d'utilisation maximal !",
      prix : 1399.96,
      couleur : "Gris Sidéral",
      quantite : "50",
      reduction : 0},
      {titre : "Apple iPad Pro 9.7",
      image : "http://media.ldlc.com/ld/products/00/03/59/67/LD0003596753_2.jpg",
      description : "A la fois mobile et performant, le nouvel Apple iPad Pro 9.7 pouces est parfaitement adapté au monde d'aujourd'hui. Avec lui, même les tâches les plus complexes deviennent simples et naturelles. Avec ses technologies avancées et son superbe écran Retina, il offre un confort d'utilisation maximal !",
      prix : 689.95,
      couleur : "Rose",
      quantite : "50",
      reduction : 0},
   ]

   // Prix moyen
   var prixMoyen = 0;
   for (var i = 0; i < Ipads.length; i++) {
      prixMoyen += parseInt(Ipads[i].prix);
   }
   prixMoyen = prixMoyen/Ipads.length;
   $scope.moyenne = prixMoyen.toFixed(2);

/*
   $scope.moyenne = function () {

       var sum = 0;
       var moyenne;

     	 parcour le tableaux d'objets

       for(ipod of $scope.ipods){
         sum +=  ipod.prix;
       }

     	for (var i = 0; i < ipods.length; i++) {
         sum += ipods[i].prix;
       }

       moyenne = sum / ipods.length;
       return moyenne.toFixed(2); // toFixed() précision 2 chiffres après la virgule
   }(); //execution ()
*/


   // Prix min
   // var objPrixMin = _.min(Ipads, _.property('prix'));
   //
   // $scope.imageMin = objPrixMin.image;
   // $scope.prixMin = objPrixMin.prix;
   // $scope.titreMin = objPrixMin.titre;

   $scope.objPrixMin = _.min(Ipads, _.property('prix'));

   // Prix max
   // var objPrixMax = _.max(Ipads, _.property('prix'));
   //
   // $scope.imageMax = objPrixMax.image;
   // $scope.prixMax = objPrixMax.prix;
   // $scope.titreMax = objPrixMax.titre;

   $scope.objPrixMax = _.max(Ipads, _.property('prix'));


   // On crée 2 réduction et on les affiche
   for (var i = 0; i < _.first(Ipads, [2]).length; i++) {
      Ipads[i].reduction = 10;
      Ipads[i].prix = (Ipads[i].prix - Ipads[i].prix*Ipads[i].reduction/100).toFixed(2);
   }

   // Nombre de réduction
   $scope.nbreReduc = _.reject(Ipads, function(obj){
      return !obj.reduction;
   }).length;


   $scope.removeIpad = function(Ipad){
      var index = Ipads.indexOf(Ipad);
      Ipads.splice(index, 1);
   }



   // on créer un tableau pour stocker les index des elements checker
   $scope.chckedIndexs=[];

   $scope.checkedIndex = function (Ipad) {
      // retourne ma 1er index de l'element dans le tableau ou -1 s'il n'existe pas
    if ($scope.chckedIndexs.indexOf(Ipad) === -1) {
      // Dans le cas ou il n'existe pas  on ajoute l'index dans le tableau des element checker
        $scope.chckedIndexs.push(Ipad);
    }
    else {
      // s'il est deja présent ou de checker ??? on l'enleve
        $scope.chckedIndexs.splice($scope.chckedIndexs.indexOf(Ipad), 1);
    }
   }
   // fonction qui va supprimer du tableau Ipads tout les index du tableau des éléments checker
   $scope.remove=function(){
      // pour chacun des index du tableau on appel une fonctions
          angular.forEach($scope.chckedIndexs, function (value) {
             // ????
              Ipads.splice(Ipads.indexOf(value), 1);
          });
          // on remet les tableau des index a vide
            $scope.chckedIndexs = [];
     };


/*
$scope.selected = function(elt){
     if($scope.checks.indexOf(elt.item) == -1){
      $scope.checks.push(elt.item);
     }else{
      $scope.checks.splice($scope.checks.indexOf(elt), 1)
     }
 };


 $scope.removeAll = function(){

   _.each($scope.checks, function(elte){
      panierBoissons =  _.reject(panierBoissons, function(elt){
          return elt.item == elte;
        });
      });
     // $scope.panierBoissons = panierBoissons
      $scope.checks= [];

 };

     <button ng-click="removeAll()" type="button" class="waves-effect waves-light btn">
     <i class="material-icons">delete</i>Supprimer
     <span ng-if='checks.length >= 1'>{{ checks.length }}</span>
      <span ng-if='checks.length == 0'>les</span>
      activés</button>

*/



}]);

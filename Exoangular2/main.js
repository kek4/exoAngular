var MyPanierApp = angular.module('MyPanierApp', []);

MyPanierApp.controller('MainCtrl', ['$scope', function($scope){



   var panierBoissons = $scope.panierBoissons = [
   {item: 'Produit 1', quantite : 2, comments: [{note: 5, content: "Super boisseau!"},{note: 3, content: "Bof , moyen..."}],  price: 50, photo: 'http://fanextrade.com/wp-content/uploads/2014/06/coca-cola-1500-ml.jpg', reduction: 0.4},
   {item: 'Produit 2', quantite : 1, price: 10, photo: 'https://media.simplymarket.fr/PHOTO2/3124480/183491.jpg'},
   {item: 'Produit 3', quantite : 4, price: 75, photo: 'http://www.sushigoo.fr/163-206-large/fanta.jpg'},
   {item: 'Produit 4', quantite : 4, price: 55, photo: 'http://www.les-calories.com/IMG/VaNsp.jpg', reduction: 0.6},
   {item: 'Produit 5', quantite : 3, comments: [{note: 3, content: "Pas mal, boisseau rafraichissante!"},{note: 1, content: "Naz!!"}], price: 45, photo: 'http://t3.gstatic.com/images?q=tbn:ANd9GcTxO1SSDkaAwUM4GNi86cZPLlGewIlg8CwcAeX-p5OVPdhEfv4KkjSCZ2k'},
   {item: 'Produit 6', quantite : 1, price: 85, photo: 'http://www.adam-boissons.fr/medias/produits/medium1_badoit_1275_vp.jpg'},
   {item: 'Produit 7', quantite : 2,  price: 65, photo: 'http://www.castlemalting.com/Publications/Recipes/Images/Leffe-glond-glass256x256.png', reduction: 0.4},
   {item: 'Produit 8', quantite : 5, price: 40, photo: 'https://www.vittel.com/fr/sites/default/files/styles/product_image_348x213/public/field/image/vittel-emporter.png?itok=fTxgpSkO'}
]

   // Article trié par prix total * quantite * reduction
   $scope.panierTri = _.sortBy(panierBoissons, function(num){
      if (_.isUndefined(num.reduction)) {
         return num.price*num.quantite;
      }
      return num.price*num.quantite*num.reduction; });

   // Nombre de produit avec une réduction
   $scope.nbreReduc = _.reject(panierBoissons, function(obj){
      return _.isUndefined(obj.reduction);
   }).length;

   // Prix moyen
   var prixTotalHt = 0;
   prixTotalHtUnitaire = 0;
   for (var i = 0; i < panierBoissons.length; i++) {
      prixTotalHtUnitaire += parseInt(panierBoissons[i].price);
      prixTotalHt += parseInt(panierBoissons[i].price*panierBoissons[i].quantite);
   }
   $scope.prixTotalHt = prixTotalHt.toFixed(2);
   $scope.prixTotalTtc = (prixTotalHt*1.196).toFixed(2);
   $scope.prixMoyen = (prixTotalHtUnitaire/panierBoissons.length).toFixed(2);

   //$scope.prixMoyen = _.reduce(panierBoissons, function(memo, num){ return memo + num.price }, 0)/ panierBoissons.length;

   // Nombre de produits avec des commentaires
   $scope.nbreCom = _.reject(panierBoissons, function(obj){
      return _.isUndefined(obj.comments);
   }).length;


   // Moyenne de la quantité des produits qui ont entre 3 et 5 produits
   nbreArticleTroisCinq = 0;
   tabArticleTroisCinq = _.reject(panierBoissons, function(obj){
      return (obj.quantite < 3 || obj.quantite > 5);
   });
   for (var i = 0; i < tabArticleTroisCinq.length; i++) {
      nbreArticleTroisCinq += parseInt(tabArticleTroisCinq[i].quantite);
   }
   $scope.moyenneArticleTroisCinq = (nbreArticleTroisCinq/tabArticleTroisCinq.length).toFixed(2);


   // on prend un tableau avec les articles qui ont des commentaires
   articleAvecCom = _.reject(panierBoissons, function(obj){
      return _.isUndefined(obj.comments);});
   // on créer un tableau pour accueillir les noms des article + la somme des notes et le nombre de note
   affichArtMoyCom = [];
      // pour chaque articles avec com
      for (var i = 0; i < articleAvecCom.length; i++) {
         // on recupere l'objet avec le tableau des commentaires et on initialise la somme des com a 0
         var comFocus = articleAvecCom[i].comments;
         var somNote = 0;
         // pour chaque com d'un article on récupere la note qu'on ajoute a la somme, le nombre de note et le nom de l'article associé
         for (var j = 0; j < comFocus.length; j++) {
            somNote += comFocus[j].note;
            affichArtMoyCom[i] = {item: articleAvecCom[i].item, sommeNote: somNote, nbreNote :j+1};
         }
      }
      $scope.affichArtMoyCom = affichArtMoyCom;


   $scope.removeBoisson = function(boisson){

      var index = panierBoissons.indexOf(boisson);
      panierBoissons.splice(index, 1);
   }




}]);

<?php

require_once 'connect_db.php'

$json = file_get_contents('php://input');
$data = json_decode($json);

try{
  // ci-dessous la requête SQL
  $sql = "SELECT m.nom 
  FROM mots m, themes t
  WHERE m.id_theme = t.id_theme
  AND t.nom = 'animaux'";

  // préparation de la requête -> prepare() Prépare une requête à l'exécution et retourne un objet.
  $statement = $this->_connexion->prepare($sql);

  // injection des paramètres, le :name qu'il va chercher ce sera le $uname
  $statement->bindParam("nom", $uname);

 // execute la requête, retourne TRUE sinon l'exception sera catch plus loin
  $statement->execute();
 
  // on récupère l'utilisateur en base de données
  // fetch() récupère une ligne depuis un jeu de résultats associé à l'objet PDOStatement.
  $this->_user = $statement->fetch();
  return $this->_user;
}

catch(Exception $e){
  return $e->getMessage();
}
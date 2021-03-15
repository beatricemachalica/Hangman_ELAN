<?php

require_once 'connect_db.php';

// echo "echo test";
// echo $_POST["theme"];

// on récupère les valeurs passées en JSON
$json = file_get_contents('php://input');

// on les décode pour PHP et on récupère un objet
$data = json_decode($json);

// var_dump($data->theme);
// il faut utiliser l'écriture objet

$theme = htmlentities($data->theme);

$sql = "SELECT m.nom FROM mots m, themes t WHERE m.id_theme = t.id_theme AND t.nom = :theme";

// préparation de la requête -> prepare() Prépare une requête à l'exécution et retourne un objet.
$req = $connexion->prepare($sql);

// bindParam - injection des paramètres
$req->bindParam('theme',$theme);

// execute
$req->execute();

// fetch() récupère une ligne depuis un jeu de résultats associé à l'objet PDOStatement.
$result = $req->fetch(PDO::FETCH_ASSOC);

$data = $result['nom'];
echo json_encode($data);

// catch(Exception $e){
//   return $e->getMessage();
// }
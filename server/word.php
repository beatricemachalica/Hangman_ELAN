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
// pour un seul mot :
// $result = $req->fetch(PDO::FETCH_ASSOC);
// $data = $result['nom'];
// echo json_encode($data);

// pour un tableau associatif :
$result = $req->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($result);

// catch(Exception $e){
//   return $e->getMessage();
// }

// ce qu'on va avoir :
// [
//   ['nom' => 'Evoli'],
//   ['nom'] => 'Pikachu'],
// ]

// data = [
//   {nom: 'Evoli'},
//   {nom: 'pikachu'}
// ]

// data[0].nom
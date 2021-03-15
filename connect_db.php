<?php

// ici on va se connecter à notre bdd :
// PDO est une classe native (POO)
// Le constructeur accepte des paramètres pour spécifier :
// la source de la base de données (connue en tant que DSN) ici mysql:host=localhost:3306 + dbname=pendu,
// et optionnellement, le nom d'utilisateur ici 'root',
// et le mot de passe (s'il y en a un).

try{
    $connexion = new PDO(
        'mysql:host=localhost:3306;dbname=pendu',
        'root',
        ''
    );

    // PDO::setAttribute — Configure un attribut PDO :
    // Configure un attribut du gestionnaire de base de données.
    // PDO::ATTR_DEFAULT_FETCH_MODE : Définit le mode de récupération par défaut.
    // Le paramètre fetch_style détermine la façon dont PDO retourne la ligne.
    // PDO::FETCH_ASSOC: retourne un tableau indexé par le nom de la colonne comme retourné dans le jeu de résultats
    $connexion->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

}

// S'il y a des erreurs de connexion, un objet PDOException est lancé ici 'Exception' dans la variable $e.
// Vous pouvez attraper cette exception si vous voulez gérer cette erreur (catch),
// ou laisser le gestionnaire global d'exception défini via la fonction set_exception_handler() la traiter. 

catch(Exception $e){
    echo $e->getMessage();
}
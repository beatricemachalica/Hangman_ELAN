<?php

// ici on va se connecter à notre bdd :

// *1
try{
    $connexion = new PDO(
        'mysql:host=localhost:3306;dbname=pendu',
        'root',
        ''
    );
}
// *2
catch(Exception $e){
    echo $e->getMessage();
}

// *1 :
// Le constructeur accepte des paramètres pour spécifier :
// la source de la base de données (connue en tant que DSN) ici mysql:host=localhost:3306 + dbname=pendu,
// et optionnellement, le nom d'utilisateur ici 'root',
// et le mot de passe (s'il y en a un).
// *2 :
// S'il y a des erreurs de connexion, un objet PDOException est lancé ici 'Exception' dans la variable $e.
// Vous pouvez attraper cette exception si vous voulez gérer cette erreur (catch),
// ou laisser le gestionnaire global d'exception défini via la fonction set_exception_handler() la traiter. 
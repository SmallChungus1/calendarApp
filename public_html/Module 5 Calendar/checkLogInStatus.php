<?php
include 'includes/config.php';
ini_set("session.cookie_httponly", 1);
session_start();
?>

<?php
$json_str = file_get_contents('php://input');
header("Content-Type: application/json");

if(isset($_SESSION['currUser'])){

    $returnedData = array();
    array_push($returnedData, $_SESSION['currUser']);
    array_push($returnedData, $_SESSION['token']);
    echo json_encode(array(
        "success" => true,
        "message" => $returnedData
    ));
    exit;
    
}else{
    echo json_encode(array(
        "success" => false,
        "message" => "User no longer exists in php session varible. You've been successfully loggedout ".$_SESSION['currUser']
    ));
    exit;

}
?>


<?php
include 'includes/config.php';
ini_set("session.cookie_httponly", 1);
session_start();
?>

<?php
$json_str = file_get_contents('php://input');
header("Content-Type: application/json");

if(isset($_SESSION['currUser'])){
    echo json_encode(array(
        "success" => true,
        "message" => "User still exists: ".$_SESSION['currUser']
    ));
    exit;
    
}else{
    echo json_encode(array(
        "success" => false,
        "message" => "User no longer exists: ".$_SESSION['currUser']
    ));
    exit;

}
?>


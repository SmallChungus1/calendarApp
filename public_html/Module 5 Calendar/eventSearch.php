<?php
include 'includes/config.php';

?>

<?php

header("Content-Type: application/json");
session_start();
$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str, true);

$searchData = htmlentities($json_obj['searchData']);


if(!isset($_SESSION["LoggedIn"])){
    echo json_encode(array(
        "success" => false,
        "message" => "Not Logged In, Log In To View events"
    ));
    exit;
}else{
    $userName = $_SESSION['currUser'];
}

//$stmt = $mysqli->prepare("select * from events where eventDate='$date' and owner = '$userName' or eventDate='$date' and sharedWith='$userName'");
$stmt = $mysqli->prepare("SELECT * FROM events WHERE (owner = '$userName' or sharedWith = '$userName') and `title` LIKE '$searchData%'");

if(!$stmt){
    echo json_encode(array(
        "success" => false,
        "message" => "Query Prep Failed".$userName
    ));
	exit;
}else{
   
    
}

$stmt->execute();
$result = $stmt->get_result();
$responseData = array();



//need to check for xss attack
while($row = $result->fetch_assoc()){
    array_push($responseData, $row);
}

if(!$responseData){
    echo json_encode(array(
        "success" => false,
        "message" => "Event not found!" 
    ));
    $stmt->close();
    exit;
}else{
    echo json_encode(array(
        "success" => true,
        "message" => $responseData
    ));
    $stmt->close();
    exit;
}

?>
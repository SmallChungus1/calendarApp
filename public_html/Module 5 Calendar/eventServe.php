<?php
include 'includes/config.php';

?>

<?php

header("Content-Type: application/json");
session_start();
$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str, true);

$date = $json_obj['date'];
if($_SESSION["LoggedIn"]){
    echo json_encode(array(
        "success" => false,
        "message" => "Not Logged In, Log In To View events"
    ));
    exit;
}else{
    $userName = $_SESSION['currUser'];
}


$stmt = $mysqli->prepare("select title, eventDate, timeStart, timeEnd, description, owner from events where eventDate='$userName'");
if(!$stmt){
    


    echo json_encode(array(
        "success" => false,
        "message" => "Query Prep Failed"
    ));
	exit;
}else{
   
    
}



$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();

if(!$row){
    echo json_encode(array(
        "success" => false,
        "message" => "Event not found" 
    ));
}else{
    echo json_encode(array(
        "success" => true,
        "message" => "Events Found" 
    ));

}

?>
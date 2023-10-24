<?php
include 'includes/config.php';
ini_set("session.cookie_httponly", 1);

?>

<?php
header("Content-Type: application/json");
//check for xss attack
$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str, true);

$username = $json_obj['username'];
$password = $json_obj['password'];


$stmt = $mysqli->prepare("select userName, userPassword from users where userName='$username'");
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
        "message" => "User Name Not Found"
    ));
}else{
    $databasePWD = $row['userPassword'];
    
    if(password_verify($password, $databasePWD)){
        session_start();
        $_SESSION["currUser"] = $username;
        $_SESSION["LoggedIn"] = true;
        $_SESSION["token"] = bin2hex(openssl_random_pseudo_bytes(32)); //uses rando_int to generate a token for CSRF Token auth
        $dataReturn = array();
        array_push($dataReturn, $_SESSION["currUser"]);
        array_push($dataReturn, $_SESSION["token"]);
        echo json_encode(array(
            "success" => true,
            "message" => $dataReturn
        ));
        exit;
    }else{
        
        echo json_encode(array(
            "success" => false,
            "message" => "Incorrect Password"
        ));
        exit;
    }
   
}


$stmt->close();







?>
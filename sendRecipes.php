<?php

include("connect.php");
$tbl_name = "inbox"; // Table name
$sendTo = $_POST['sendTo'];
$sendData = $_POST['sendData'];

function saveRecipes($strTo, $jsonData)
{
    global $con;
    if (strstr($strTo, ',') != false) {
        $arrTo = explode(',', $strTo);
    } else {
        $arrTo = array();
        $arrTo[0] = $strTo;
    }
    $nLen = count($arrTo);

    for ($i = 0; $i < $nLen; $i++) {
        $sql = "INSERT INTO $GLOBALS[tbl_name](userName, data) VALUES";
        $sql .= "('" . $arrTo[$i] . "', ";
        $sql .= "'" . $jsonData . "')";
        $result = mysqli_query($con, $sql);
        if (!$result) {
            return "false";
        }
    }

    return "true";
}

function init()
{
    if (isset($GLOBALS["sendTo"]) && isset($GLOBALS["sendData"])) {
        makeConnection();
        $saveResult = saveRecipes($GLOBALS["sendTo"], $GLOBALS["sendData"]);
        print "success=$saveResult";
    } else {
        print "msg=Required parameters missing.";
    }
}

init();

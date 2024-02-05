<?php

include("connect.php");
$newName = $_POST['newName'];
$oldName = $_POST['oldName'];

function saveName($strName)
{
    global $con;
    $sql = "INSERT INTO $GLOBALS[tbl_name] (userName) VALUES";
    $sql .= "('" . $strName . "')";
    $result = mysqli_query($con, $sql);
    if (!$result) return "false";
    return "true";
}

function deleteName($strName)
{
    global $con;
    $sql = "DELETE FROM $GLOBALS[tbl_name] WHERE userName = '$strName'";
    $result = mysqli_query($con, $sql);
    if (!$result) return "false";
    return "true";
}

function init()
{
    if (isset($GLOBALS["newName"])) {
        makeConnection();

        if (isset($GLOBALS["oldName"])) {
            deleteName($GLOBALS["oldName"]);
        }

        $saveResult = saveName($GLOBALS["newName"]);
        print "success=$saveResult";
    } else {
        print "success='Required parameters missing.'";
    }
}

init();

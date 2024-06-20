<?php
session_start();
$carrito = json_decode(file_get_contents('php://input'), true);
$_SESSION['carrito'] = $carrito;
?>

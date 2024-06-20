<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Iniciar la sesión para acceder al carrito
    session_start();

    // Recoger los datos del formulario
    $nombre = htmlspecialchars($_POST['nombre']);
    $email = htmlspecialchars($_POST['email']);
    $telefono = htmlspecialchars($_POST['telefono']);
    $direccion = htmlspecialchars($_POST['direccion']);
    $mensaje = htmlspecialchars($_POST['mensaje']);
    
    // Recoger los detalles del carrito desde la sesión
    $carrito = isset($_SESSION['carrito']) ? $_SESSION['carrito'] : [];
    
    // Crear el contenido del correo
    $contenido = "Nombre: $nombre\n";
    $contenido .= "Email: $email\n";
    $contenido .= "Teléfono: $telefono\n";
    $contenido .= "Dirección: $direccion\n";
    $contenido .= "Mensaje: $mensaje\n\n";
    $contenido .= "Detalles del carrito:\n";
    
    foreach ($carrito as $item) {
        $contenido .= "Producto: " . $item['nombre'] . " - Cantidad: " . $item['cantidad'] . " - Precio: " . $item['precio'] . "\n";
    }
    
    // Configurar el correo
    $to = "tuemail@ejemplo.com"; // Reemplaza con tu dirección de correo
    $subject = "Nueva cotización de " . $nombre;
    $headers = "From: " . $email;

    // Enviar el correo
    if (mail($to, $subject, $contenido, $headers)) {
        echo "Correo enviado con éxito.";
    } else {
        echo "Error al enviar el correo.";
    }
}
?>

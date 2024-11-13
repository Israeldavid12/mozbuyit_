<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
   <header>
   <h1>TESTE DE FORMULARIO</h1>
   </header>
    <section>
        <form action="cad.php" method="post">
            <label for="name"></label>
            <input type="text" name="name" id="idname" required>
            <label for="sname"></label>
            <input type="text" name="sname" id="idsname" required>
            <input type="submit" value="Enviar">
        </form>
    </section>
</body>
</html>
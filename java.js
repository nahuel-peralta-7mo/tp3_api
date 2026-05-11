// EJERCICIO 1
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(respuesta => respuesta.json())
            .then(datos => {
                console.log("Ejercicio 1");
                datos.forEach(usuario => {
                    console.log("Nombre:", usuario.name);
                    console.log("Email:", usuario.email);
                });
                mostrarUsuarios(datos);
                buscarUsuarios(datos);
            });
        // EJERCICIO 2
        function mostrarUsuarios(usuarios) {
            const lista = document.getElementById("listaUsuarios");
            usuarios.forEach(usuario => {
                const item = document.createElement("li");
                item.innerHTML = `
                    <strong>${usuario.name}</strong><br>
                    ${usuario.email}
                `;
                lista.appendChild(item);
            });
        }
        // EJERCICIO 3
        function buscarUsuarios(usuarios) {
            const buscador = document.getElementById("buscador");
            const resultado = document.getElementById("resultadoBusqueda");
            buscador.addEventListener("input", () => {
                const texto = buscador.value.toLowerCase();
                const filtrados = usuarios.filter(usuario =>
                    usuario.name.toLowerCase().includes(texto)
                );
                resultado.innerHTML = "";
                filtrados.forEach(usuario => {
                    const item = document.createElement("li");
                    item.textContent = usuario.name;
                    resultado.appendChild(item);
                });
            });
        }
        // EJERCICIO 4
        fetch('https://jsonplaceholder.typicode.com/users/1')
            .then(respuesta => respuesta.json())
            .then(usuario => {
                const contenedor = document.getElementById("usuarioUno");
                contenedor.innerHTML = `
                    <div class="tarjeta">
                        <h3>${usuario.name}</h3>
                        <p><strong>Teléfono:</strong> ${usuario.phone}</p>
                        <p><strong>Email:</strong> ${usuario.email}</p>
                        <p><strong>Ciudad:</strong> ${usuario.address.city}</p>
                    </div>
                `;
            });
        // EJERCICIO 5
        function crearUsuario() {
            const nombre = document.getElementById("nombre").value;
            const email = document.getElementById("email").value;
            const mensaje = document.getElementById("mensaje");
            if(nombre === "" || email === "") {
                mensaje.textContent = "Completa todos los campos";
                mensaje.style.color = "red";
                return;
            }
            fetch('https://jsonplaceholder.typicode.com/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: nombre,
                    email: email
                })
            })
            .then(respuesta => respuesta.json())
            .then(data => {
                mensaje.textContent = "Usuario creado correctamente";
                mensaje.style.color = "green";
                console.log(data);
            })
            .catch(error => {
                mensaje.textContent = "Error al crear usuario";
                mensaje.style.color = "red";
                console.log(error);
            });
        }
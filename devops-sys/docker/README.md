# Entorno de desarrollo

En este directorio se pueden encontrar los artefactos para montar en el entorno de desarrollo, es decir en la máquina local del desarrollador un entorno que le permita hacer pruebas de forma local sin necesidad de tener que desplegar en ningún entorno.

Para ello se utilizan máquinas virtuales de Virtual Box.

- [Entorno de desarrollo](#entorno-de-desarrollo)
    - [Prerrequisitos](#prerrequisitos)
    - [Levantando cluster de Kubernetes](#levantando-cluster-de-kubernetes)
    - [Simulando los servicios ya disponibles en la infraestructura (Jenkins, Nexus, ...)](#simulando-los-servicios-ya-disponibles-en-la-infraestructura-jenkins-nexus)
        - [Primera ejecución](#primera-ejecucion)
            - [Terminando la configuración de Jenkins](#terminando-la-configuracion-de-jenkins)
            - [Terminando la configuración de Nexus](#terminando-la-configuracion-de-nexus)

## Prerrequisitos

Es necesario tener instalado:

- Docker
  - Mac
    - <https://store.docker.com/editions/community/docker-ce-desktop-mac>
    - Luego recomendable instalar el autocompletado para la línea de comandos
        ```bash
        brew install docker-completion
        ```

        Añadir en el `~/.bash_profile`:

        ```bash
        source /usr/local/etc/bash_completion.d/docker
        ```

- Ansible
  - Mac
    ```bash
    brew install ansible
    ```

- VirtualBox

    <https://www.virtualbox.org/wiki/Downloads>

- Vagrant
  - Mac
    ```bash
    brew cask install vagrant
    ```
    (para añadir _cask_ a _brew_ basta con hacer: `brew tap caskroom/cask`)

    - Luego recomendable instalar el autocompletado para la línea de comandos
        ```bash
        brew install vagrant-completion
        ```

        Añadir en el ~/.bash_profile:

        ```bash
        source /usr/local/etc/bash_completion.d/vagrant
        ```

## Levantando cluster de Kubernetes

Situado en el directorio `development/`, basta con ejecutar:

```bash
vagrant up
```

Este comando se descargará las imágenes de CentOS de Internet, creará las máquinas virtuales usando Virtual Box, y usando Vagrant las provisionará para montar el cluster de k8s.

La primera vez tardará más porque tiene que hacer todo el proceso, pero las siguientes veces que hagamos `vagrant up` el proceso será mucho más rápido porque ya lo tendremos todo en nuestro disco duro y las máquinas ya estarán provisionadas. Es decir sólo tardará lo que tarden las máquinas en arrancar.

Para parar las máquinas virtuales basta con ejecutar en el mismo directorio:

```bash
vagrant halt
```

## Simulando los servicios ya disponibles en la infraestructura (Jenkins, Nexus, ...)

Para esta prueba se usan servicios que ya existen instalados en la infraestructura general, así que para poder hacer las pruebas en local estos servicios se van a simular con Docker dentro de la máquina local. **No se instalan dentro de las máquina virtuales de Virtual Box porque éstas sólo representan los nodos del cluster de Kubernetes**, y todos estos servicios (Jenkins, Nexus, ...) son ajenos al cluster.

Para que las pruebas en local funcionen tendremos que cambiar el fichero `/etc/hosts` para que cuando se haga referencia a todos esos servicios la petición sea atendida por los contenedores de Docker.

```
127.0.0.1		sonar.autentia.com
127.0.0.1		nexus.autentia.com
127.0.0.1		jenkins.autentia.com
127.0.0.1		ddbb.openidserver.autentia.com
```

Para levantar todos estos servicios adicionales basta con colocarse en el directorio `development/` y ejecutar:

```bash
docker-compose up -d
```

Hay que destacar que todos estos servicios se montan sobre una red de Docker llamada `ci-network` esto es muy conveniente por si luego queremos levantar otros contenedores Docker (por ejemplo para probar un microservicio concreto) y queremos que este pueda acceder a alguno de estos servicios (por ejemplo a la base de datos).

A continuación se enumeran los servicios que se están simulando, con su distintos alias en la red `ci-network` para poder acceder al servicio desde dentro de la red interna de Docker (los alias representan los nombres DNS dentro de la red de Docker), así como los usuarios de administración:

- Sonar,
  - Puerto: 9000
  - Alias: `sonar`
  - Usuario: `admin` / `admin`
- Nexus,
  - Puerto: 8081
  - Alias: `nexus`
  - Usuario: `admin` / `admin123`
- Jenkins
  - Puerto: 8082
  - Alias: `jenkins`
  - Usuario: `admin` / `admin123`
- Nginx
  - Puerto: 80
  - Alias: `nginx`, `sonar.autentia.com`, `nexus.autentia.com`, `jenkins.autentia.com`
- PostgreSQL
  - Puerto: 5432
  - Alias: `postgre`, `ddbb.openidserver.autentia.com`
  - Usuario: `postgres` / `postgres`

Se puede ver como hay un Nginx que expone el puerto 80. Este Nginx nos va a permitir acceder al resto de servicios directamente por el puerto 80. También podemos observar como el este servicio Nginx tiene alias con los hostnames completos del resto de servicios (sonar, nexus, jenkins), esto es para que dentro de la red de Docker cuando se haga referencia a estos hostnames se localicen entrando por el puerto 80 del Nginx, y así poder simular las mismas URLs que producción.

Para parar todos los contenedores sólo hay que ejecutar:

```bash
docker-compose stop
```

Un ejemplo de cómo podemos levantar otro contenedor Docker y meterlo dentro de esta red sería:

```bash
docker run --network=development_ci-network autentia/openid-server:1.0.0-SNAPSHOT
```

Aquí lo importante es la opción `--network` para enganchar el nuevo contenedor que estamos ejecutando a una red ya existent. También cabe destacar como al nombre de la red le hemos puesto el prefijo `development_` esto se debe a que `docker-compose` añade como prefijo a todos los objetos (contenedores, redes, ...) el nombre del directorio desde donde se ejecuta el propio comando `docker-compose` (esto lo hace para evitar posibles conflictos si levantamos distintos `docker-compose`).

### Primera ejecución

**Ojo estos pasos sólo hay que hacerlos la primera vez que se crean los contenedores o cada vez que borremos los volúmenes asociados.**

Durante el primer arranque tenemos que tener en cuenta que todos los servicios están recién instalados y por lo tanto sin configurar, así que hay que hacer algunos pasos extra. Estos pasos sólo hay que hacerlos la primera vez ya que luego todo quedará en guardado en varios volúmenes de Docker en nuestro disco duro local.

Podemos comprobar que está todo levantado haciendo:

```bash
$ docker-compose ps
        Name                       Command               State                        Ports
-----------------------------------------------------------------------------------------------------------------
development_jenkins_1   /bin/tini -- /usr/local/bi ...   Up      0.0.0.0:50000->50000/tcp, 0.0.0.0:8082->8080/tcp
development_nexus_1     bin/nexus run                    Up      0.0.0.0:8081->8081/tcp
development_postgre_1   docker-entrypoint.sh postgres    Up      0.0.0.0:5432->5432/tcp
development_sonar_1     ./bin/run.sh                     Up      0.0.0.0:9000->9000/tcp, 0.0.0.0:9092->9092/tcp
```

y vemos como el `State` de todos los contenedores es `Up`.

#### Terminando la configuración de Jenkins

Ahora con el navegador entramos en <http://localhost:8082/> y nos logamos con el usuario administrador de Jenkins (ya hemos visto en un punto anterior la lista de usuarios y claves).

Ahora vamos a configurar las credenciales para que Jenkins pueda acceder al repositorio de código y descargarse los fuentes de los proyectos. Para ello hacemos:

1. En el menú vertical de la izquierda pinchamos sobre `Credentials`
1. Pinchamos sobre `(global)`
1. Ahora de nuevo en el menú vertical de la izquierda `Add Credentials`
1. Rellenamos los datos de las credenciales, por ejemplo usuario y clave, ...
    - Aquí lo importante es el campo `ID` ya que será como luego haremos referencia a estas credenciales. Le ponemos el valor `git`
1. Pulsamos el botón `OK`

#### Terminando la configuración de Nexus

Ahora con el navegador entramos en <http://localhost:8081/> y nos logamos con el usuario administrador de Nexus (ya hemos visto en un punto anterior la lista de usuarios y claves).

Ahora vamos a configurar un repositorio de Docker para poder guardar las imágenes que generemos usando Nexus como repositorio privado. Para ello hacemos:

1. En el menú superior pinchamos sobre la rueda dentada para ir a la configuración de Nexus
1. Pinchamos sobre `Repositories`
1. Ahora en el botón `Create repository`
1. De la lista elegimos `docker(hosted)`
1. Le damos un nombre el repositorio, por ejemplo `docker-internal`
1. Ahora hay que elegir un puerto para poder subir las imágenes:
    - En nuestro caso y para hacerlo un poco más sencillo lo haremos bajo **HTTP**, así que marcamos sobre la casilla correspondiente.
    - Y como valor ponemos `5000` (se puede poner el puerto que queramos, aquí os digo 5000 porque suele ser el puerto por defecto)
1. Como _Blob store_ vamos a dejar `default`, aunque sería buena practica crear un almacén diferente.
1. Para terminar pulsamos sobre el botón `Create repository`

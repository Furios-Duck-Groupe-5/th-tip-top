# Utiliser l'image Jenkins comme base
FROM jenkins/jenkins:lts



# Passer à l'utilisateur root pour installer des paquets
USER root


# Créer le groupe Docker s'il n'existe pas
RUN groupadd docker && usermod -aG docker jenkins && newgrp docker

# Mettre à jour les paquets et installer des prérequis
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    software-properties-common \
    apt-transport-https \
    unzip \
    sudo

# Installer Node.js et npm
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Vérifier l'installation de Node.js et npm
RUN node -v && npm -v

# Installer Docker CLI pour que Jenkins puisse gérer des conteneurs Docker
RUN curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg && \
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null && \
    apt-get update && \
    apt-get install -y docker-ce-cli

# Installer Selenium (en supposant que vous utilisez Selenium Server pour le testing)
RUN mkdir -p /opt/selenium && \
    curl -o /opt/selenium/selenium-server.jar https://selenium-release.storage.googleapis.com/4.0/selenium-server-4.0.0.jar

# Installer Grafana CLI
RUN curl -fsSL https://packages.grafana.com/gpg.key | sudo apt-key add - && \
    add-apt-repository "deb https://packages.grafana.com/oss/deb stable main" && \
    apt-get update && \
    apt-get install -y grafana


# Installer les prérequis et les outils nécessaires
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    software-properties-common \
    apt-transport-https \
    bzip2 # Ajout de bzip2 pour inclure bunzip2


# Installer Restic
RUN curl -L https://github.com/restic/restic/releases/download/v0.14.0/restic_0.14.0_linux_amd64.bz2 | bunzip2 -c > /usr/local/bin/restic && \
    chmod +x /usr/local/bin/restic

# Configurer les permissions pour Docker
RUN usermod -aG docker jenkins && newgrp docker

# Nettoyer les fichiers inutiles pour réduire la taille de l'image
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Revenir à l'utilisateur Jenkins
USER jenkins




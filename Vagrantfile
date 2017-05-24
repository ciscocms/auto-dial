# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "ARTACK/debian-jessie"
  config.vm.network "public_network"

  config.vm.provider "virtualbox" do |vb|
    vb.memory = "1024"
  end

  config.vm.provision "shell", inline: <<-SHELL
    apt-get update
    apt-get install -y curl python-software-properties
    apt-get install -y build-essential
    apt-get install -y git-core

    # Mongodb
    apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
    echo "deb http://repo.mongodb.org/apt/debian jessie/mongodb-org/3.4 main" | tee /etc/apt/sources.list.d/mongodb-org-3.4.list
    apt-get update
    apt-get install -y mongodb-org
    service mongod start

    # Node.js
    curl -sL https://deb.nodesource.com/setup_7.x | bash -
    apt-get install -y nodejs
    node -v
    npm -v
  SHELL
end

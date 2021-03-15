require 'yaml'

required_extensions = [
  'vagrant-docker-compose',
  #'vagrant-disksize',
];
for item in required_extensions
  if !Vagrant.has_plugin?(item)
    puts "The #{item} plugin is required."
    puts "It can be installed by running: vagrant plugin install #{item}"
    puts
    exit
  end
end

# Get stored config.
if File.file?('../config/config.local.yml')
  conf = YAML.load_file('tools/vm/config/config.local.yml')
else
  conf = YAML.load_file('tools/config/config.yml')
end

hostname = conf["hostname"]

aliases = YAML.load_file('tools/config/hosts.yml')

# Detect host OS.
module OS
  def OS.windows?
    (/cygwin|mswin|mingw|bccwin|wince|emx/ =~ RUBY_PLATFORM) != nil
  end
  def OS.mac?
    (/darwin/ =~ RUBY_PLATFORM) != nil
  end
end

Vagrant.configure("2") do |config|
  config.vm.box = "hashicorp/bionic64"
  #config.vm.box_check_update = false
  #config.disksize.size = "50GB"
  config.vm.network "private_network", ip: conf["ip_address"]

  config.vm.synced_folder ".", "/vagrant", disabled: true
  config.vm.synced_folder "./", "/app-nfs", type: "nfs", mount_options: ['rw', 'vers=3', 'tcp', 'fsc']

  #config.bindfs.bind_folder "/app-nfs", "/app", owner: "www-data", group: "www-data", o: "nonempty", perms: "0775"

  config.vm.provision "shell", path: "tools/vm/vagrant/provision/provision.sh", keep_color: true, args: "#{conf["docroot"]}"
  config.vm.provision "shell", path: "tools/vm/vagrant/provision/provision_permissions.sh", keep_color: true, run: "always"

  config.vm.provision :docker
  config.vm.provision :docker_compose, yml: "/app/tools/config/docker-compose.yml", run: "always"

  config.vm.provision "shell", path: "tools/vm/vagrant/provision/provision_nonroot.sh", keep_color: true, privileged: false, args: "#{conf["docroot"]}"
  config.vm.provision "shell", path: "tools/vm/vagrant/provision/provision_init_site.sh", keep_color: true, args: "'#{conf["brandname"]}#{conf["projectname"]}' '#{conf["drupal_profile"]}' #{conf["has_solr"]}"
  config.vm.provision "shell", path: "tools/vm/vagrant/provision/provision_welcome.sh", keep_color: true, args: "#{conf["hostname"]} #{conf["ip_address"]} #{conf["has_solr"]}"

  # Add Host Aliasses
  config.trigger.after [:up, :resume] do |trigger|
    trigger.ruby do |env,machine|
      aliases.each_pair do |name, aliasx|
        if OS.windows?
          system('which sed')
          system("powershell -Command \"Start-Process tools/vm/vagrant/host-add.bat #{conf["ip_address"]}, #{aliasx} -verb RunAs\"")
        else
          system("bash tools/vm/vagrant/host-add.sh #{conf["ip_address"]} #{aliasx}")
        end
      end
    end
  end

  # Remove Host Aliasses
  config.trigger.after [:suspend, :halt, :destroy] do |trigger|
    trigger.ruby do |env,machine|
      if OS.windows?
        system("which sed")
        system("powershell -Command \"Start-Process tools/vm/vagrant/host-remove.bat #{conf["ip_address"]} -verb RunAs\"")
      else
        system("bash tools/vm/vagrant/host-remove.sh #{conf["ip_address"]}")
      end
    end
  end

  # Default provider virtualbox.
  config.vm.provider "virtualbox" do |vb|
    vb.customize [ "modifyvm", :id, "--uartmode1", "disconnected" ]
    vb.name = "#{conf["hostname"]}"
    vb.cpus =  "#{conf["cpus"]}"
    vb.memory =  "#{conf["memory"]}"
  end

end

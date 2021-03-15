#!/usr/bin/env bash
printf "\033[0;32m\n- provision.sh:\n"
apt-get update
apt-get install zip nodejs ntp mysql-client htop tig net-tools vim bindfs cachefilesd -y

# Enable cachefilesd.
echo "RUN=yes" > /etc/default/cachefilesd

# For elasticsearch.
sysctl -w vm.max_map_count=262144

if ! grep -Fxq 'VAGRANT_MACHINE=1' ~/.profile ; then
  # Add path variables for vagrant user.
  echo 'PATH="$PATH:/app/tools/vm/vagrant/scripts"' >> ~/.profile
  echo export VAGRANT_MACHINE=1 >> ~/.profile
  source ~/.profile
fi

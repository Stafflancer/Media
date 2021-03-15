#!/usr/bin/env bash
printf "\033[0;32m\n- provision_permissions.sh:\n"

# Sync u+g ID's between vagrantbox and containers.
#groupmod -g 82 www-data
#usermod -u 82 www-data
#usermod -a -G www-data vagrant
mkdir -p /app && bindfs -u1000 -g1000 -ononempty --create-as-mounter  --chmod-allow-x --perms=775 /app-nfs /app
# Fix permissions
chmod a+x /app/tools/vm/vagrant/scripts/*

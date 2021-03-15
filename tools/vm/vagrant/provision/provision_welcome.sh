#!/usr/bin/env bash
printf "\033[0;32m\n- provision_welcome.sh:\n"

rm /etc/motd
# symlink dynamic MOTD file
ln -s /var/run/motd /etc/motd

mkdir -p /etc/update-motd.d
welcom_file="/etc/update-motd.d/10-help-text"

# Alter welcome message.
rm -f /etc/update-motd.d/*
echo '#!/bin/bash' > $welcom_file
echo "printf \"\033[1;36m\nMediamonks Drupal box info\033[0m\n\n\"" >> $welcom_file
echo "printf \"drupal host: $1\n\"" >> $welcom_file
echo "printf \"host IP: $2\n\"" >> $welcom_file
echo "printf \"traefik dashboard: $1:8080\n\"" >> $welcom_file
echo "printf \"mailhog UI: mailhog.$1\n\"" >> $welcom_file
echo "printf \"portainer UI (Manage docker container): portainer.$1\n\"" >> $welcom_file
echo "printf \"adminer: adminer.$1\n\"" >> $welcom_file
echo "printf \"dbs credentials: host=mariadb user=drupal pass=drupal\n\"" >> $welcom_file
if [[ $3 ]]; then
    echo "printf \"solr UI: solr.$1\n\"" >> $welcom_file
    echo "printf \"solr credentials: host=solr user= pass=\n\"" >> $welcom_file
fi
echo "printf \"\n\"" >> $welcom_file

chmod +x /etc/update-motd.d/*

run-parts /etc/update-motd.d

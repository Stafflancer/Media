#!/usr/bin/env bash
printf "\033[0;32m\n- provision_init_site.sh:\n"

if [[ $3 ]]; then
    # Wait for solr server.
    docker exec solr /opt/docker-solr/scripts/wait-solr localhost 3 12 >/dev/null
    # Make solr core "drupal".
    docker exec solr curl -sIN "http://localhost:8983/solr/admin/cores?action=CREATE&name=drupal&configSet=search_api_solr_8.x-1.1" >/dev/null
    echo "Created solr core \"drupal\" if it did not exist."
fi

docker exec -i php composer install -d /app/tools/vm

# Composer install Drupal;
robo build:drupal

# Drush install Drupal;
sleep 10 # To be sure docker runs.
robo install:drupal $1 $2

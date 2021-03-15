.PHONY: cleanup

JOB_NAME?=default
PROJECT=${JOB_NAME}

include config/${PROJECT}.ini

CONFIGFILE=${S_SCRIPTS_DIR}/../config/${PROJECT}.ini

all:
	make prepare
	make pull-source
	make pull-target
	make build
	make commit-target
	make push-tag-repos
	#make cleanup

prepare:
	docker-compose pull
	docker-compose up --force-recreate -d
	docker exec ${S_PHPCONTAINER} bash ${S_SCRIPTS_DIR}/prepare.sh ${CONFIGFILE}

pull-source:
	docker exec ${S_PHPCONTAINER} bash ${S_SCRIPTS_DIR}/pull-source.sh ${CONFIGFILE}

pull-target:
	docker exec ${S_PHPCONTAINER} bash ${S_SCRIPTS_DIR}/pull-target.sh ${CONFIGFILE}

build:
	docker exec ${S_PHPCONTAINER} bash ${S_SCRIPTS_DIR}/build.sh ${CONFIGFILE}

commit-target:
	docker exec ${S_PHPCONTAINER} bash ${S_SCRIPTS_DIR}/commit-target.sh ${CONFIGFILE}

push-tag-repos:
	docker exec ${S_PHPCONTAINER} bash ${S_SCRIPTS_DIR}/push-tag-repos.sh ${CONFIGFILE}

post-build:
	docker exec ${S_PHPCONTAINER} bash ${S_SCRIPTS_DIR}/post-build.sh ${CONFIGFILE} ${PROJECT}

cleanup:
	# Free up network resources.
	# docker network prune -f
	docker-compose down -v --rmi local

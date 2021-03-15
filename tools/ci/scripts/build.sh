#!/usr/bin/env bash

CONFIGFILE=${1}
source ${CONFIGFILE}

composer install -n --no-dev --ignore-platform-reqs --working-dir ${S_SOURCEDIR}/${S_SOURCE_SUBDIR}

echo "sync ${S_SOURCEDIR}/${S_SOURCE_SUBDIR}/ to ${S_TARGETDIR}"

rsync \
	--links \
	--quiet \
	--delete \
	--force \
	--recursive \
	--times \
	--verbose \
	--exclude=".git" \
	--exclude=".DS_Store" \
	--exclude=docroot/sites/default/files \
	--exclude=.gitignore ${S_SOURCEDIR}/${S_SOURCE_SUBDIR}/ ${S_TARGETDIR}

echo "sync done"

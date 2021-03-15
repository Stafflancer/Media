#!/usr/bin/env bash

CONFIGFILE=${1}
source ${CONFIGFILE}

# LAST_BUILD_TAG=(git -C ${S_SOURCEDIR} describe --always --tags --match "build/${S_ENVIRONMENT}/*")
git -C ${S_TARGETDIR} fetch --prune
IFS='/' read -r -a LAST_BUILD_TAG_PARTS <<< "$(git -C ${S_TARGETDIR} describe --always --abbrev=0 --tags --match "build/${S_ENVIRONMENT}/*")"

if [ "${LAST_BUILD_TAG_PARTS[2]+1}" ]; then
  LAST_BUILD_NUMBER=${LAST_BUILD_TAG_PARTS[2]}
else
  LAST_BUILD_NUMBER=0
fi
echo "LAST_BUILD_NUMBER: ${LAST_BUILD_NUMBER}"

BUILD_NUMBER=$((LAST_BUILD_NUMBER+1))
BUILD_TAG=build/${S_ENVIRONMENT}/${BUILD_NUMBER}
echo "New build tag: ${BUILD_TAG}"

echo "Tag source repo"
git -C ${S_SOURCEDIR} tag -m "Build ${BUILD_NUMBER}" -a ${BUILD_TAG}
git -C ${S_SOURCEDIR} push --follow-tags
echo "Tag target repo"
git -C ${S_TARGETDIR} tag -m "Build ${BUILD_NUMBER}" -a ${BUILD_TAG}
git -C ${S_TARGETDIR} push --follow-tags

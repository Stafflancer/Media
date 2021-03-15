#!/usr/bin/env bash

CONFIGFILE=${1}
source ${CONFIGFILE}

#Although this ci code is derived from same repo we have to re-checkout bcs of possible multi-node setup on Jenkins.
rm -rf ${S_SOURCEDIR}
mkdir ${S_SOURCEDIR}
git clone --depth 1 --single-branch --branch ${S_SOURCE_BRANCH} ${S_SOURCE_REPO} ${S_SOURCEDIR}

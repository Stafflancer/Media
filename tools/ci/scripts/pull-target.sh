#!/usr/bin/env bash

CONFIGFILE=${1}
source ${CONFIGFILE}

rm -rf ${S_TARGETDIR}
mkdir ${S_TARGETDIR}
git clone --depth 1  --single-branch --branch ${S_TARGET_BRANCH} ${S_TARGET_REPO} ${S_TARGETDIR}

#!/usr/bin/env bash

CONFIGFILE=${1}
source ${CONFIGFILE}
git -C ${S_TARGETDIR} push origin ${S_TARGET_BRANCH}
git -C ${S_TARGETDIR} add -A
git -C ${S_TARGETDIR} commit -m "Build ${S_PLATFORM} ${S_ENVIRONMENT}" || echo 'Commit failed. There is probably nothing to commit.'
#git -C ${S_TARGETDIR} push

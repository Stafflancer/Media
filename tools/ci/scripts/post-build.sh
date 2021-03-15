#!/usr/bin/env bash

CONFIGFILE=${1}
source ${CONFIGFILE}
PROJECT=${2}

SCRIPT=${S_SCRIPTS_DIR}/post-build_${S_PLATFORM}-${S_ENVIRONMENT}.sh

if [ -f $SCRIPT ]; then
  source ${SCRIPT}
else
  echo ${SCRIPT} not found, skipping post-build step.
fi

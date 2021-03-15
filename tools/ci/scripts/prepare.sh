#!/usr/bin/env bash

CONFIGFILE=${1}
source ${CONFIGFILE}

echo ${S_GIT_EMAIL}

git config --global user.email ${S_GIT_EMAIL}
git config --global user.name ${S_GIT_USERNAME}
git config --global push.followTags true
rm -rf /root/.ssh && mkdir /root/.ssh
cp -R /make-root/ssh/* /root/.ssh
chown -R root:root /root/.ssh
chmod -R 600 /root/.ssh/*
chmod 700 /root/.ssh/

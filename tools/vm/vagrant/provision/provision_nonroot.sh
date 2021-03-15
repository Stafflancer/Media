#!/usr/bin/env bash
printf "\033[0;32m\n- provision_nonroot.sh:\n"

if ! grep -Fxq 'VAGRANT_MACHINE=1' ~/.profile ; then
  # change default working dir to docroot.
  echo "cd $1" >> ~/.profile

  # Add path variables for vagrant user.
  echo 'PATH="$PATH:/app/tools/vm/vagrant/scripts"' >> ~/.profile
  echo export VAGRANT_MACHINE=1 >> ~/.profile
  source ~/.profile
fi

# Adding commit msg hook.
if ! [ -d "/app-nfs/.git" ]; then
  cd /app-nfs && git init
fi
if [ -d "/app-nfs/.git" ]; then
  cp /app-nfs/tools/vm/githooks/commit-msg.sh /app-nfs/.git/hooks/commit-msg
  cp /app-nfs/tools/vm/githooks/pre-commit.sh /app-nfs/.git/hooks/pre-commit
fi

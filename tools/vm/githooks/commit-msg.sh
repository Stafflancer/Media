#!/bin/bash
if [ "$VAGRANT_MACHINE" ]; then
    docker exec -i php /bin/bash -c "cd /app && /app/tools/vm/githooks/commit-msg $1"
else

    # This is a work-around to get GitHub for Mac to be able to run `node` commands
    # https://stackoverflow.com/questions/12881975/git-pre-commit-hook-failing-in-github-for-mac-works-on-command-line
    PATH=$PATH:/usr/local/bin:/usr/local/sbin

    vagrant ssh -c "docker exec -i php /bin/bash -c 'cd /app && /app/tools/vm/githooks/commit-msg $1'"
fi

# Continuous Integration Pipeline

Based on source+target Git repositories with make.
Should be able to use straight from command line of with Jenkins CI.

## Local usage
make all JOB_NAME={jobname}

"jobname" reflects the projectname/id on Jenkins and should have a ./config/{jobname}.ini file.

## Setup
Instructions based on Drupal codebase, but should be the same for other PHP projects except directory structure and post-deploy commands.
- CI stuff should live in /tools/ci (see Basic assumptions)
- Jenkinsfile in /tools/jenkins
- Copy hooks-example/post-update.sh to /source/drupal/hooks/{platformname}/post-update.sh and alter commands to project needs.
- Add all SSH keys for source & target repo access to /tools/ci/ssh for local usage.
- Gitignore all local SSH keys but allow the config file.
    - like "/tools/ci/ssh/id_rsa*"
- Modify /tools/ci/ssh/config to match all repo URLs whith the correct SSH private key.
- Modify "get keys" step in /tools/jenkins/Jenkinsfile to extract all SSH keys to files
    - Make sure target filenames match
- Edit docker-compose.yml "container_name" to be unique, other projects on same Jenkins worker could claim "php".
- Create {jobname}.ini files in /tools/ci/config from the example file for every Jenkins job that you create.
    - Alter settings to reflect project.
    - S_PHPCONTAINER name should match docker-compose.yml.
- Add all SSH keys to jenkins as credentials for CI (see SSH key exchange)
- Create Jenkins Pipeline jobs for every deployment (so per platform & per environment).
    - For jobnames, only use characters you want to use in filenames too.
    - e.g. "projectname-platformname-envname" like "adidasapp-aws-staging"

## Setup Monkapps2
- create project
      - drupal/docroot as public (should reflect codebase structure)
- ssh to server
      - git init --bare ~/source-repo.git
      - cd ~/source-repo.git
      - git config --bool core.bare true
      - vi hooks/post-update:
          - copy contents of /hooks/ci/hooks-example/post-update
          - chmod a+x hooks/post-update
          - some Git servers dont support post-update, try post-recieve instead.
      - vi ~/.bashrc:
        - copy following line from .bash_profile to bottom (else env vars are not available):
          for line in $(cat ~/.config/environment | sed '/^\s*#/d' | sed '/^$/d'); do export $line; done
      - Clone the new repo to your local and push something to the branch thats in the ini file (prob. master).
        - Your GIT target URL will be like: user-name@eu.dev.monkapps.com:/var/projects/user-name/source-repo.git
          - This URL can also be put in the ini file.

## SSH key exchange
### assembla as source
- generate separate keypair (ssh-keygen -t rsa)
    - add public to assembla account
    - add private to jenkins as credential (enter id! e.g. "projectname-source-assembla-dev")

### github as target
- generate separate keypair https://help.github.com/en/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent
      - add public to github project as "deploykey", allow write access
      - add private to jenkins as credential (enter id! e.g. projectname-target-github)

### monkapps as target
- generate separate keypair
    - add public to monkapps in ~/.ssh/authorized_keys
        - chmod 600 ~/.ssh/authorized_keys
    - add private to jenkins as credential (enter id! e.g. "projectname-target-monkappseu-dev")

## Random notes
- We follow https://wiki.mediamonks.net/Jenkins conventions
- All authentication is done by SSH keys. User/pass credentials is possible but needs code changes.
- CI stuff lives in same codebase as project although you could perfectly opt to have it in a separate repo.
- If needed you can have multiple Jenkinsfiles. e.g. 1 for monkapps 1 for hosting platform. Ideally you have 1 and reuse it.
- Jenkins workers have floating IP's, so if there are IP restrictions this can be an issue, esp. for the target side.
  IP's dont change every day though. Current IPs are whitelisted on MonkappsEU. Hosting Monks are looking for a solution.

## Debug
- When Git post-update/recieve hook doesnt execute: check execution permissions, toggle between update/recieve.
- If tagging fails with "tag already exists": manually sync last build tag between source/target branches. like "build/prod/56"

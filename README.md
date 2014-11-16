# Project Repository

## Folders

### deploy

All code that should be deployed must be placed in this folder.

### backend

Back-end related documents and tools that should not be deployed must be placed in this folder.

### frontend

Front-end related documents and assets that should not be deployed must be placed in this folder.

### flash

When a project contains flash assets, the source files should be placed in this folder. They should be published to the /deploy/htdocs/inc/flash/ folder.

### hosting

All hosting information (ftp/database info, ssh keys, etc, etc) must be placed in this folder.

### tools

When you have project specific tools, place them in this folder.

Front-end build tools are placed in the /tools/build/ folder.

### proto

When you need to do some prototyping, do it in this folder.

## Branches

### master

You can start development in this branch. Once you deployed something to the live server, this branch should always mimic the live server, so you can do easy hotfixes.

### develop

This is the general development branch. Once you deployed something to the live server all development should continue here.

### feature-foobar

Larger (or even any) separate features should be developed in feature branches, merged back to the develop branch once completed.

### hotfix-foobar

Hotfixes should be branched from the master branch or the latest tags, and once completed should be merged back in the master and develop branches.
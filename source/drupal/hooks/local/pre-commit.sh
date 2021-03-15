#!/bin/sh

# Run php check errors and codesniffer
if [ -x "$(command -v php)" ]; then
    PROJECT=`php -r "echo dirname(dirname(dirname(realpath('$0'))));"`
    STAGED_FILES_CMD=`git diff --cached --name-only --diff-filter=ACMR HEAD | grep "\/custom\/" | grep "\\.install\|\\.module\|\\.inc\|\\.php"`

    # Determine if a file list is passed
    if [ "$#" -eq 1 ]
    then
        oIFS=$IFS
        IFS='
        '
        SFILES="$1"
        IFS=$oIFS
    fi
    SFILES=${SFILES:-$STAGED_FILES_CMD}

    echo " "
    echo "==================================="
    echo "Checking PHP Lint..."
    echo "==================================="
    echo " "
    for FILE in $SFILES
    do
        php -l -d display_errors=0 ${PROJECT}/${FILE}
        if [ $? != 0 ]
        then
            echo "Fix the error before commit."
            exit 1
        fi
        FILES="$FILES ${PROJECT}/${FILE}"
    done

    if [ "$FILES" != "" ]
    then
        if [ -e $PROJECT/tools/vagrant/bin/phpcs ]; then
            echo " "
            echo "==================================="
            echo "Running Code Sniffer..."
            echo "==================================="
            echo " "

            $PROJECT/tools/vagrant/bin/phpcs --standard=Drupal --encoding=utf-8 -n -p $FILES
            if [ $? != 0 ]
            then
                echo "Fix the error before commit."
                exit 1
            fi
        fi
    fi
fi

# Running phpunit tests.
echo " "
echo "==================================="
echo "Running phpunit tests"
echo "==================================="
echo " "

if [ -e $PROJECT/tools/bin/phpunit ]; then
    $PROJECT/tools/bin/phpunit docroot/modules/custom
    OUT=$?

    if [ $OUT -eq 0 ];then
        echo " "
        echo "Phpunit tests succeeded"
    else
        echo " "
        echo "Phpunit tests failed"
        exit 1
    fi
fi

# Running Behat tests.
vagrant status --machine-readable | grep state,running
OUT=$?

if [ $OUT -eq 0 ];then
    echo " "
    echo "==================================="
    echo "Running behat tests"
    echo "==================================="

    vagrant ssh -c behat

    OUT=$?
    if [ $OUT -eq 0 ];then
        echo " "
        echo "Behat tests succeeded"
    else
        echo " "
        echo "Behat tests failed"
        exit 1
    fi

    echo " "
    echo "==================================="
    echo "Tests completed"
    echo " "
fi

exit 0

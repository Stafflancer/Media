FROM php:7.2-stretch

RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
RUN php composer-setup.php --install-dir=/usr/bin --filename=composer
RUN apt-get update
RUN apt-get install zip git ssh -y

#! /bin/bash

user="legw3018"
home="/home/$user"
interpreter="nodejs"
version="16.17"
app_name="$2"
domain="flagle.gwenael-leger.fr"
app_root="$home/$app_name"

check_result() {
    if [ $? -ne 0 ]; then
        echo "Error: $1"
        exit 1
    fi
}

cleanup() {
    echo "Cleaning up..."

    cloudlinux-selector destroy --json \
        --interpreter "$interpreter" \
        --app-root "$app_root" \
        --user "$user"

    check_result "Failed to delete app"

    rm -rf "$app_root"
}

create_app() {
    echo "Creating app..."

    cloudlinux-selector create --json \
        --interpreter "$interpreter" \
        --app-root "$app_root" \
        --domain "$domain" \
        --app-uri "" \
        --version "$version" \
        --passenger-log-file "$home/logs/$app_name/passenger.log" \
        --startup-file "src/server.js"

    check_result "Failed to create app"
}

move_files() {
    echo "Moving files..."

    cp -r "$home/repositories/$app_name.git"/* "$app_root"
    cp "$home/repositories/$app_name.git/.env" "$app_root"

    check_result "Failed to copy files"
}

stop_app() {
    echo "Stoping app..."

    cloudlinux-selector stop --json \
        --interpreter "$interpreter" \
        --app-root "$app_root" \
        --user "$user"

    check_result "Failed to stop app"
}

start_app() {
    echo "Starting app..."

    cloudlinux-selector start --json \
        --interpreter "$interpreter" \
        --app-root "$app_root" \
        --user "$user"

    check_result "Failed to start app"
}

install_package() {
    echo "Installing package..."

    cloudlinux-selector install-modules --json \
        --interpreter "$interpreter" \
        --user "$user" \
        --app-root "$app_root"

    check_result "Failed to install package"
}

build_app() {
    echo "Building app..."

    cloudlinux-selector run-script --json \
        --interpreter "$interpreter" \
        --user "$user" \
        --app-root "$app_root" \
        --script-name build

    check_result "Failed to build app"
}

if [ -z $1 ] || [ -z $2 ] ; then
    echo "Usage: $0 <command> <app_name>"
    exit 1
fi

first_steps () {
    cleanup
    create_app
    move_files
    stop_app
    install_package
    build_app
    start_app
}

"$@"
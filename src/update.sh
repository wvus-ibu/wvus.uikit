#! /bin/bash
# Update Bootstrap, Font Awesome and jQuery
# 
echo "Updating WorldVision Uikit libraries"
echo 
echo "Updating Bootstrap..."
rm -Rf lib/bootstrap >/dev/null
volo add -nostamp bootstrap lib/bootstrap
rm -f lib/bootstrap/* >/dev/null
echo "Bootstrap successfully updated"
echo 
echo "Updating Font Awesome..."
#font-awesome
rm -Rf lib/font-awesome >/dev/null
volo add -nostamp font-awesome lib/font-awesome
rm -f lib/font-awesome/* >/dev/null
echo "Font Awesome successfully updated"
echo 
echo "Updating jQuery..."
rm -Rf lib/jquery/*.* >/dev/null
volo add -nostamp jquery lib/jquery/jquery.js
echo "jQuery successfully updated"
echo
echo "All libraries successfully updated"
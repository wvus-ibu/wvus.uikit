#! /bin/bash
# Update Bootstrap, Font Awesome and jQuery
# 
echo "Updating WorldVision Uikit libraries"

echo "Updating Bootstrap..."
rm -Rf lib/bootstrap >/dev/null
volo add -nostamp bootstrap lib/bootstrap
rm -f lib/bootstrap/* &>/dev/null
echo "Bootstrap  update successful"

echo "Updating Font Awesome..."
rm -Rf lib/font-awesome >/dev/null
volo add -nostamp font-awesome lib/font-awesome
rm -f lib/font-awesome/* &>/dev/null
echo "Font Awesome updated successful"

echo "Updating jQuery..."
rm -Rf lib/jquery/*.* &>/dev/null
volo add -nostamp jquery lib/jquery/jquery.js
echo "jQuery successfully updated"

echo "All libraries updated successful"
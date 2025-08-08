## PERMISSION CREATION AND ASSIGNMENT TO DEFAULT ROLES
- In `console/migrations/m250321_100402_add_manage_consortium_permission.php` you will see the patterns for standard new permission creation and assign the permission to the default roles

## PERMISSION CREATION AND ASSIGNMENT TO ROLE WITH DESIRED PERMISSION
- In `console/migrations/m250320_135946_create_share_dashboard_permission.php` you can find a good example of the creation of new permission, as well as assign in it to  roles that already have certain permission. It's very important the role cache invalidation.
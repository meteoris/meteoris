/**
 * This Code was created on April 2014
 * If you find any bug, unreadable code, messy code, potential bug code, etc
 * Please contact me at:
 * Ega Radiegtya / radiegtya@yahoo.co.id / 085641278479
 */

## How to use

1. You can do general setting of this theme by targetting this url /meteoris/theme-admin/setting

2. You can easily hook sidebar in html file:

a. In your app client folder, create hook folder and inside it, add this template code. 
b. You can change everything such as loggedin user, global search, and menus inside the template as you wish 

```
<!-- In your app client folder, create hook folder and inside it, add this template code. -->
<!-- You can change everything such as loggedin user, global search, and menus inside the template as you wish -->

<template name="meteoris_themeAdmin_hookSidebar">
    <!-- Left side column. contains the logo and sidebar -->
    <aside class="main-sidebar">
        <!-- sidebar: style can be found in sidebar.less -->
        <section class="sidebar">
            <!-- Sidebar user panel -->
            <div class="user-panel">
                <div class="pull-left image">
                    <img src="/images/user.png" class="img-circle" alt="User Image">
                </div>
                <div class="pull-left info">
                    <p>{{currentUser.profile.name}}</p>
                    <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
                </div>
            </div>
            <!--search form--> 
            <form action="#" method="get" class="sidebar-form">
                <div class="input-group">
                    <input type="text" name="q" class="form-control" placeholder="Search...">
                    <span class="input-group-btn">
                        <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i></button>
                    </span>
                </div>
            </form>
            <!--/.search form--> 
            <!-- sidebar menu: : style can be found in sidebar.less -->
            <ul class="sidebar-menu">
                <li class="header">MAIN NAVIGATION</li>
                <!-- Uncomment this if you want to user meteoris:role functionality -->
                <!--{{#if meteoris_roleUserIsInGroup "admin"}}-->
                <li class="treeview">
                    <a href="#">
                        <i class="fa fa-gears"></i>
                        <i class="fa fa-angle-left pull-right"></i>
                        <span>Setting</span>                                
                    </a>
                    <ul class="treeview-menu">                        
                        <li><a href="/meteoris/theme-admin/setting"><i class="fa fa-laptop"></i> Theme Admin Setting</a></li>                        
                        <li><a href="/meteoris/user"><i class="fa fa-users"></i> Users Management</a></li>                        
                        <li><a href="/meteoris/user/settings"><i class="fa fa-user"></i> User Settings</a></li>                                         
                        <li><a href="/meteoris/role"><i class="fa fa-flag-o"></i> Role Management</a></li>                                                
                    </ul>
                </li>
                <!--{{/if}}-->
            </ul>
        </section>
        <!-- /.sidebar -->
    </aside>        
</template>
```

3. You can hook navbar too in html file:
a. In your app client folder, create hook folder and inside it, add this template code. 
b. You can change everything such as notification, current logged in user, user profile menu etc inside the template as you wish 

```
<template name="meteoris_themeAdmin_hookNavbar">
    <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
            <!-- User Account: style can be found in dropdown.less -->
            <li class="dropdown user user-menu">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                    <img src="/images/user.png" class="user-image" alt="User Image">
                    <span class="hidden-xs">{{currentUser.profile.name}}</span>
                </a>
                <ul class="dropdown-menu">
                    <!-- User image -->
                    <li class="user-header">
                        <img src="/images/user.png" class="img-circle" alt="User Image">
                        <p>
                            {{currentUser.profile.name}}
                        </p>
                    </li>
                    <!-- Menu Footer-->
                    <li class="user-footer">
                        <div class="pull-left">
                            <a href="#" class="btn btn-default btn-flat">Profile</a>
                        </div>
                        <div class="pull-right">
                            <a href="#" id="btnLogout" class="btn btn-default btn-flat">Sign out</a>
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

```
$('.wrapper').append('<header></header>');
$('.wrapper').append('<div class="main-content-container"></div>');
$('header').append('<div class="container"></div>');
$('.main-content-container').append('<div class="cols"')
$('.main-content-container').append('<div class="sidebar"></div>');
$('.sidebar').append('<section><img class="large-avatar" src="https://avatars.githubusercontent.com/u/10899017?v=3"></section>');
$('.sidebar').append('<section><span class="nameInfo"><h1 class="profile-name">' + profile.name + '</h1><h2 class="username">' + profile.login + '</h2></span></section>');
$('.sidebar').append('<section><p class="createdat"></p></section>');
$('.createdat').append('<span class="octicon octicon-clock"></span>' + ' Joined on ' + moment(profile.created_at).format('MMM Do YYYY'));
$('.sidebar').append('<section class="follow"></section>');
$('.follow').append('<p class="number">'+ profile.followers + ' <span class="number-name">Followers</span>' + '</p>');
$('.follow').append('<p class="number">' + starred.length + ' <span class="number-name">Starred</span>' + '</p>');
$('.follow').append('<p class="number">'+ profile.following + ' <span class="number-name">Following</span>' + '</p>');
$('.sidebar').append('<section class="organize"><h2 class="organizations">Organizations</h2></section>');
$('.organize').append('<p><img src="https://avatars2.githubusercontent.com/u/14251473?v=3&s=200"></p>');
$('.container').append('<a href="#"><span class="octicon octicon-mark-github"></span></a>');
$('.container').append('<form><input type="text" name="search" value="" placeholder="Search GitHub"></form>');
$('.input').val("Search...").addClass("empty");
// Thanks Jamy Golden for saving me time! http://css-plus.com/2010/06/create-a-search-form-with-css3-and-jquery/
	// When you click on #search
	$("#search").focus(function(){

		// If the value is equal to "Search..."
		if($(this).val() == "Search...") {
			// remove all the text and the class of .empty
			$(this).val("").removeClass("empty");;
		}

	});

	// When the focus on #search is lost
	$("#search").blur(function(){

		// If the input field is empty
		if($(this).val() == "") {
			// Add the text "Search..." and a class of .empty
			$(this).val("Search...").addClass("empty");
		}

	});
$('.container').append('<nav class="first-nav"></nav>');
$('nav').append('<ul class="header-nav"></ul>');
$('.header-nav').append('<li>' + '<a class="header-link" href="#">Pull requests</a>' + '</li>');
$('.header-nav').append('<li>' + '<a class="header-link" href="#">Issues</a>' + '</li>');
$('.header-nav').append('<li>' + '<a class="header-link" href="#">Git</a>' + '</li>');
$('.first-nav').append('<ul class="header-nav2"></ul>');
$('.header-nav2').append('<li>' + '<a class="header-link" href="#"><span class="octicon octicon-bell"></span></a>' + '</li>');
$('.header-nav2').append('<li class="plus">' + '<a class="header-link" href="#"><span class="octicon octicon-plus"></span><span class="octicon octicon-triangle-down"></span></a>' + '</li>');
$('.header-nav2').append('<li class="small-profile-icon">' + '<a class="header-link" href="#"><img style="width: 30px; height:30px;" src="https://avatars.githubusercontent.com/u/10899017?v=3"><span class="octicon octicon-triangle-down"></span></a>' + '</li>');
$('.plus').append('<div class="dropdown"><ul><li><a class="header-link" href="#">New repository</a></li><li><a class="header-link" href="#">New organization</a></li></ul></div>');
$('.small-profile-icon').append('<div class="dropdown"><ul><li><span>Signed in as ' + '<span>kmwitherspoon</span></span></li><span><li><a class="header-link" href="#">Your profile</a></li><li><a class="header-link" href="#">Your stars</a></li><li><a class="header-link" href="#">Explore</a></li><li><a class="header-link" href="#">Integrations</a></li><li><a class="header-link" href="#">Help</a></li></span><span><li><a class="header-link" href="#">Settings</a></li><li><a class="header-link" href="#">Sign out</a></li></span></ul></div>');
$('.main-content-container').append('<div class="col-maincontent"></div>');
$('.col-maincontent').append('<div class="tab"><div class="edit edit-btn"><a href="#"><span class="octicon octicon-pencil"></span>Edit Profile</a></div><nav class="tabnav"><a  href="#"><span class="octicon octicon-diff-added"></span>Contributions</a><a class="repo-click" href="#"><span class="octicon octicon-diff"></span>Repositories</a><a class ="public-click" href="#"><span class="octicon octicon-rss"></span>Public Activity</a></nav></div>');
$('.col-maincontent').append('<div class="repo-wrapper"></div>');
var repoFun = _.map(repo, function(item){
  return '<div class="repo-data"><span class="item-name">' + item.name + '</span>' + '<div class="bold-info"><span class="item-language repo-item">' + item.language + '</span>' + '<span class="octicon octicon-star"></span>' + '<span class="star-g repo-item">' + item.stargazers_count + '</span>' + '<span class="octicon octicon-git-branch"></span>' + '<span class=" repo-item forks">' + item.forks_count + '</span></div>' + '<br>' + '<span class="update">Updated at ' + moment(item.updated_at).startOf('day').from(item.created_at) + '</span>' + '<br>' + '</div>';
});
$('.repo-wrapper').append(repoFun);
$('.col-maincontent').append('<div class="public-act"></div>');

var pubFun = _.map(events, function(item){
  if(item.payload.ref === "master") {
    return '<div class="events-data"><span class="events-login">' + item.actor.login + ' created at branch ' + item.payload.master_branch + ' at ' + item.repo.name + ' ' + moment(item.created_at).startOf('day').fromNow() +'</span></div>';
  } else if (item.payload.ref === "refs/heads/master"){
    return '<div class="events-data"><span class="events-login">'+ moment(item.created_at).startOf('day').fromNow() + '<br>' + item.actor.login + ' pushed to <span class="master">master</span> at ' + item.repo.name +'</span>' + '<br>' + item.payload.head + ' ' /*+ _.object(item.payload.commits, function(items){
      return items.message;
    })*/ + '</div>';
  } else {
    return '<div class="events-data"><span class="events-login">' + item.actor.login + ' created repository ' + item.repo.name + ' ' + moment(item.created_at).startOf('day').fromNow() +'</span></div>';
  }
});
$('.public-act').append(pubFun);
$('')
$('.repo-click').click(function () {
   $('.repo-wrapper').css('display', 'block');
   $('.public-act').css('display', 'none');
 });
 $('.public-click').click(function () {
    $('.public-act').css('display', 'block');
   $('.repo-wrapper').css('display', 'none');
 });
$('.wrapper').append('<footer></footer>');
$('footer').append('<nav class="footer-one"></nav>')
$('.footer-one').append('<ul><li><p>© 2015 GitHub, Inc. </p></li><li>Terms</li><li>Privacy</li><li>Security</li><li>Contact</li><li>Help</li></ul><span class="octicon octicon-mark-github"></span>');
$('footer').append('<nav class="footer-two"></nav>');
$('.footer-two').append('<ul><li>Status</li><li>API</li><li>Training</li><li>Shop</li><li>Blog</li><li>About</li><li>Pricing</li></ul>');

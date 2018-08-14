Contents
	WSPV-core
		-WebServer in node;
		-WebSite in JS;
		*Users, Groups and Permissions;
		*Login with auth and encript P2P using 4 Levels
		*User:
			-Create
			-Delete
			-List
			-Add to group
			-Add permition
			-Hierarchy on permition from groups
			-Hierarchy on list other users/groups (only same and below)
			-Multiple groups
		*Group:
			-Create
			-Delete
			-List
			-Add to group
			-Add permition
			-Hierarchy on permition from groups
			-Set if can push permitions from above
		*Permitions:
			-Used to Add tabs/sub-tabs/sub-sub-tabs;
			-(SV) used only in the WebServer to execute actions in the Database;
			-(VIEW) used to grant visualization on tabs/sub.../buttons (some depends on (SV) to work well)
			-(ADM) Only Admins can have this permitions, used to use Global Lists and Executions;
WorkFlow

	>hotfix_WSPV-core/feature_WSPV-core //Automatic update to server
	>	Develop_WSPV (WSP1 entire server)
		-Approves
	>		Release_WSPV (Main entire server)

	>hotfix_OSti-core/feature_OSti-core //Automatic update to server
	>	Develop_OSti (OSt1 entire server)
		-Approves
	>		Release_OSti (Main entire server)

	>hotfix_OSti-EDU-core/feature_OSti-EDU-core //Automatic update to server
	>	Develop_OSti-EDU (OSt1-EDU entire server)
		-Approves
	>		Release_OSti-EDU (Main entire server)

	>hotfix_OSti-DAEV-core/feature_OSti-DAEV-core //Automatic update to server
	>	Develop_OSti-DAEV (OSt1-DAEV entire server)
		-Approves
	>		Release_OSti-DAEV (Main entire server)

	>hotfix_WSPV-addon-###/feature_WSPV-addon-### //Automatic update to server
	>	Develop_WSPV (WSP1 entire server)
		-Approves
	>		Release_WSPV (Main entire server)

	>hotfix_LTPV/feature_LTPV //Automatic update to server
	>	Develop_LTPV (LTP1 entire server)
		-Approves
	>		Release_LTPV (Main entire server)

	>hotfix_WServices/feature_WServices //Automatic update to server
	>	Release_WServices (Main entire server)

	>hotfix_SMARrh-mod/feature_SMARrh-mod //manual update to server
	>	Develop_SMARrh-mod (SMARrh entire server)
	>		Release_SMARrh-mod (Main entire server)

Contents
	
	>WSPV-core
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

	>WSPV-addon-###
		-Part of WSPV-core (Like the name is a addon/mod);
		*Detailed description in each module;

	>LPTV
		-WebSite in JS
		-Lists all telephones/Ramals in PMV;

	>WServices
		-WSPV.sh
			*service to initialize the WSPV Server
		-WSP1.sh
			*service to initialize the WSP1 Server
		-Org.sh
			*service to initialize the Organization of "Espelho Ponto" files
		-Bckp.sh
			*service to initialize the Backup of The Database on Mysql
		-Updater.sh
			*service to initialize the Update of The project

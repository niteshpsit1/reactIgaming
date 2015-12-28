var baseUrl = 'http://45.33.86.141/wickedride'
var config = {
	url: {
		adminLogin:baseUrl+'/rest/connect',
		getAllClub:baseUrl+'/rest/service/getClubListForSuperAdmin',
		getClubMembers:baseUrl+'/rest/service/getClubMembersListForSuperAdmin',
		getClubRides:baseUrl+'/rest/service/rideList',
		getAllUser:baseUrl+'/rest/service/userList'
	},
	pagination:{
		pageSize:5
	}
}
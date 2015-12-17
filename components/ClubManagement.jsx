var allUrl = {
	getALlClub:'http://45.33.86.141/wickedride/rest/service/getAllClubForGuest'
}
var ClubManagement = React.createClass({
	getInitialState: function(){
		return {
			clubs:[],
			showClubMenberList:true,
			ClubMembers:[]
		}
	},
	componentWillMount: function () {
		var currentThis = this;
		postCall(allUrl.getALlClub )
		.then(function(clubs){
			currentThis.setState({
				clubs:clubs
			});
		})
		.catch(function(error){
			console.log("====catch",error);	
		});	
	},
	render: function (){
		var currentThis = this;
		return (
			<div>
			<div><span>name</span><span>Description</span></div>
			{this.state.clubs.map(function(club){
				return <div><span>{club.name}:</span>
					<span>{club.description}</span>
					<span>&nbsp;<a href="#"><b>see total Rides</b></a></span>
					<span>&nbsp;<a href="#"><b>delete Ride</b></a></span>
					<span>&nbsp;<a href="#"><b>see membses</b></a></span>
					<ClubMembers ></ClubMembers>
					</div>
					currentThis.state.showClubMenberList ? <ClubMembers /> :""
			})}
			</div>
		);
	}
});
var postCall = function (url, data){
	
	return new RSVP.Promise(function(fulfill, reject) {
		$.ajax({
	        url: url,
	        method: 'POST',
	        data: $.param({"options":data}),
	        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	        success: function (data, textStatus, jqXHR) {
	        	
	            if( textStatus == "success") {
	            	console.log("service in");
	            	console.log(JSON.parse(jqXHR.responseText).response.result);
	            	fulfill(JSON.parse(jqXHR.responseText).response.result);    
	            }
	      		else {
	      			reject('error');
	    		}
	        }
		});
	});
};
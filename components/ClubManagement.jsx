var allUrlData = {
	pageSize: 2,
	getALlClub:'http://45.33.86.141/wickedride/rest/service/getAllClubForGuest'
}
var ClubManagement = React.createClass({
	getInitialState: function(){
		return {
			clubs:[],
			showClubMenberList:false,
			ClubMembers:[],
			pageNumber: 1
		}
	},
	componentWillMount: function () {
		var currentThis = this;
		var requestData = {
			pageSize:allUrlData.pageSize,
			createdOn: this.state.clubs.length ? this.state.clubs[allUrlData.pageSize-1].createdOn : null
		};
		postCall(allUrlData.getALlClub, requestData)
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
				return <ClubList club={club}/>
			})}
			<div>&nbsp;<a href="#" onClick={this._onClick}><span name="prev">prev</span></a>&nbsp;&nbsp;<a href="#" onClick={this._onClick}><span name="next">next</span></a></div>
			</div>
		);
	},
	_onClick: function(event){
		var currentThis = this;
		if($(event.target).attr("name") == "prev"){
			alert("can't see pvevious records");
		}
		else if($(event.target).attr("name") == "next"){
			var requestData = {
			pageSize:allUrlData.pageSize,
			createdOn: this.state.clubs.length ? this.state.clubs[allUrlData.pageSize-1].createdOn : null
			};
			postCall(allUrlData.getALlClub, requestData)
			.then(function(clubs){
				currentThis.setState({
					clubs:clubs
				});
			})
			.catch(function(error){
				console.log("====catch",error);	
			});	
		}
	}
});
var postCall = function (url, data){
	
	return new RSVP.Promise(function(fulfill, reject) {
		$.ajax({
	        url: url,
	        method: 'POST',
	        data: data,
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
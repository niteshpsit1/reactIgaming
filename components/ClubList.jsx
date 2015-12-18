var AllUrl = {
	pageSize: 5
}

var ClubList = React.createClass({
	getInitialState: function(){
		return ({
			club: {},
			clubMembers: false,
			clubDelete: true,
			totalRides: false
		});
	},
	componentWillMount: function(){
		this.setState({
			club: this.props.club
		});
	},
	render: function () {
		var currentThis = this;
		return (
			<div>
				{ 	this.state.clubDelete &&
					<div><span>{this.props.club.name}:</span>
					<span>{this.props.club.description}</span>
					<span>&nbsp;<b><a onClick={this._onClick} href="#"><div name="totalRides">see total Rides</div></a></b></span>
					{ 	this.state.totalRides &&
						<ClubRidesList />}
					<span>&nbsp;<b><a onClick={this._onClick} href="#"><div name="clubDelete">delete Ride</div></a></b></span>
					<span>&nbsp;<b><a onClick={this._onClick} href="#"><div name="clubMembers">see membses</div></a></b></span>
					
					{	this.state.clubMembers &&
						<ClubMembers />}

					</div>
				}
			</div>
		);
	},
	_onClick: function(event){
		var data = {}
		data.id = $(event.target).attr("name")
		if($(event.target).attr("name") == "clubDelete"){
			this.setState({
				clubDelete: false
			});
		}
		else if($(event.target).attr("name") == "clubMembers"){
			this.setState({
				clubMembers: !this.state.clubMembers
			});
		}
		else if($(event.target).attr("name") == "totalRides"){
			this.setState({
				totalRides: !this.state.totalRides
			});
		}
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
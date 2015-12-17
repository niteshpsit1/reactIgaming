var AllUrl = {
	
}

var ClubList = React.createClass({

	render: function () {
		
		return (
			<div><span>{this.props.club.name}:</span>
				<span>{this.props.club.description}</span>
				<span>&nbsp;<a onClick={this._onClick} href="#"><div ><b>see total Rides</b></div></a></span>
				<span>&nbsp;<a onClick={this._onClick} href="#"><div id="ram"><b name="Nitesh">delete Ride</b></div></a></span>
				<span>&nbsp;<a onClick={this._onClick} href="#"><div><b>see membses</b></div></a></span>
				<ClubMembers ></ClubMembers>
			</div>
		);
	},
	_onClick: function(event){
			console.log("++++++++++=========",$(event.target).attr("name"));
			var data = {}
			data.id = $(event.target).attr("name")
			//postCall()
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
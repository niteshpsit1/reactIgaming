var ClubManagement = React.createClass({
	getInitialState: function(){
		return {
			cluns:[]
		}
	},
	componentWillUpdate: function () {
			
	},
	render: function (){

		return (
			<div>
			<div>name<span>ClubManagement</span></div>
			<div>name<span>ClubManagement</span></div>
			</div>
		);
	}
});
var postCall = function (url, data){
	return new RSVP.Promise(function(fulfill, reject) {
		var responseData = {};
		$.ajax({
	        url: url,
	        method: 'POST',
	        data: $.param({"options":data}),
	        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	        success: function (data, textStatus, jqXHR) {
	            if( textStatus == "success") {
	                responseData.token = JSON.parse(jqXHR.responseText).response.token;
	            }
	            if (Object.keys(responseData).length){
	      			fulfill(responseData);
	    		} else {
	      			reject('error');
	    		}
	        }
		});
	});
};
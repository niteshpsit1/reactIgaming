var userCredentials = {
	username: "guest",
	password: "guest"
};
var url = 'http://45.33.86.141/wickedride/rest/connect';
var serviceCall = function (url, data){
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
var Layout =  React.createClass({
	getInitialState: function (){
		return {
			token: "ok",
			homeState:true,
			userManagementState:false,
			clubManagementState:false,
			settingState:false
		}
	},
    render: function() {
        return (
        	<div>
        		<a onClick={this._onClickHome} href="#"><div>Home</div></a>
        		<a onClick={this._onClickHome} href="#"><div>User Management</div></a>
        		<a onClick={this._onClickHome} href="#"><div>Club Management</div></a>
        		<a onClick={this._onClickHome} href="#"><div>setting</div></a>
                <h2>Demo {this.state.token}</h2>
                <AllClubsInfo token={this.state.token}/>
            </div>
        );
    },
    componentDidMount: function(){
    	currentthis = this;
		serviceCall(url, userCredentials)
		.then(function(data){
			currentthis.setState({
				token: data.token
			});
		})
		.catch(function(){
			currentthis.setState({
				token:"welcame"
			});
		});    	
    },
    _onClickHome: function(){
    	console.log("=====HomeHo");
    }
});
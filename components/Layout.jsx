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
        		<a onClick={this._onClickHome} href="#"><div name="homeState">Home</div></a>
        		<a onClick={this._onClickHome} href="#"><div name="userManagementState">User Management</div></a>
        		<a onClick={this._onClickHome} href="#"><div name="clubManagementState">Club Management</div></a>
        		<a onClick={this._onClickHome} href="#"><div name="settingState">setting</div></a>
                <h2>Demo {this.state.token}</h2>
                <AllClubsInfo token={this.state.token}/>
                {this.state.homeState && <h2>Demo1 {this.state.token}</h2>}

                {this.state.userManagementState && <h2>Demo2 {this.state.token}</h2>}

                {this.state.clubManagementState && <h2>Demo3 {this.state.token}</h2>}

                {this.state.settingState && <h2>Demo4 {this.state.token}</h2>}
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
    _onClickHome: function(event){
    	console.log($(event.target).attr("name"));
		this.setState({
			homeState: $(event.target).attr("name") == 'homeState' ? true : false,
			userManagementState: $(event.target).attr("name") == 'userManagementState' ? true : false,
			clubManagementState: $(event.target).attr("name") == 'clubManagementState' ? true : false,
			settingState: $(event.target).attr("name") == 'settingState' ? true : false
		})
    }
});
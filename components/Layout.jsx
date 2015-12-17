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
	                fulfill(JSON.parse(jqXHR.responseText).response.token);
	            }
	            else {
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
			settingState:false,
			termAndConditions:false,
			aboutUs:false
		}
	},
    render: function() {
        return (
        	<div>
        		<h2>Super Admin {this.state.token}</h2>
        		<a onClick={this._onClick} href="#"><div name="homeState">Home</div></a>
        		<a onClick={this._onClick} href="#"><div name="userManagementState">User Management</div></a>
        		<a onClick={this._onClick} href="#"><div name="clubManagementState">Club Management</div></a>
        		<a onClick={this._onClick} href="#"><div name="termAndConditions">TermAndConditions</div></a>
        		<a onClick={this._onClick} href="#"><div name="aboutUs">AboutUs</div></a>
        		<a onClick={this._onClick} href="#"><div name="settingState">setting</div></a>
                
                {this.state.homeState && 
                <div>
                <h2>Messages</h2> 
                <MessagesFromGroupAdmin token={this.state.token} />
            	</div>}

                {this.state.userManagementState && 
                <div>
                <h2>User Management</h2>
                <UserManagement token={this.state.token} />
            	</div>}

                {this.state.clubManagementState &&
                <div> 
                <h2>Club Management</h2>
                <ClubManagement token={this.state.token}  />
            	</div>}

                {this.state.settingState &&
                <div> 
                <h2>Setting</h2>
                <SettingComponent token={this.state.token} />
            	</div>}

            	{this.state.termAndConditions &&
                <div> 
                <h2>Setting</h2>
                <TermAndConditions token={this.state.token} />
            	</div>}

            	{this.state.aboutUs &&
                <div> 
                <h2>AboutUs</h2>
                <AboutUs token={this.state.token} />
            	</div>}
            </div>
        );
    },
    componentDidMount: function(){
    	currentthis = this;
		serviceCall(url, userCredentials)
		.then(function(data){
			currentthis.setState({
				token: data
			});
		})
		.catch(function(error){
			console.log(error);
		});    	
    },
    _onClick: function(event){
    	
		this.setState({
			homeState: $(event.target).attr("name") == 'homeState' ? true : false,
			userManagementState: $(event.target).attr("name") == 'userManagementState' ? true : false,
			clubManagementState: $(event.target).attr("name") == 'clubManagementState' ? true : false,
			settingState: $(event.target).attr("name") == 'settingState' ? true : false,
			termAndConditions: $(event.target).attr("name") == 'termAndConditions' ? true : false,
			aboutUs: $(event.target).attr("name") == 'aboutUs' ? true : false
		})
    }
});
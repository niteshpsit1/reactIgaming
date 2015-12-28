/*var userCredentials = {
	username: "smith.gaur.100@gmail.com",
	password: "hrhk@super"
};*/
var Layout =  React.createClass({
	getInitialState: function (){
		return {
			token: localStorage.getItem("wikedrideSuperAdminIsLogin") ? JSON.parse(localStorage.getItem("wikedrideSuperAdminIsLogin")).token : "",
            userCredentials:localStorage.getItem("wikedrideSuperAdminIsLogin") ? JSON.parse(localStorage.getItem("wikedrideSuperAdminIsLogin")).userCredentials : {},
            isLogin:localStorage.getItem("wikedrideSuperAdminIsLogin") ? true : false,
            username:"",
            password:"",
            loginError:"",
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
                {   !this.state.isLogin &&
                    <div>
                        <form >
                          <div className="form-group">
                            <label >Email address:</label>
                            <input name="username" type="email" className="form-control" onChange={this._onChange} />
                          </div>
                          <div class="form-group">
                            <label>Password:</label>
                            <input name="password" type="password" className="form-control" onChange={this._onChange}/>
                          </div>
                          <button type="button" className="btn btn-default" name="login" onClick={this._onClick}>Submit</button>
                          { this.state.loginError &&
                            <div><p className="text-primary">Messages: {this.state.loginError}</p></div>}
                        </form>
                    </div>}
            	{  this.state.isLogin &&
                    <div>
                        <h2>Super Admin {this.state.token}</h2>
                        <div className="row">
                        <a onClick={this._onClick} href="#"><div className="well col-md-2" name="homeState">Home</div></a>
                        <a onClick={this._onClick} href="#"><div className="well col-md-2" name="userManagementState">User Management</div></a>
                        <a onClick={this._onClick} href="#"><div className="well col-md-2" name="clubManagementState">Club Management</div></a>
                        <a onClick={this._onClick} href="#"><div className="well col-md-2" name="termAndConditions">TermAndConditions</div></a>
                        <a onClick={this._onClick} href="#"><div className="well col-md-2" name="aboutUs">AboutUs</div></a>
                        <a onClick={this._onClick} href="#"><div className="well col-md-1" name="settingState">setting</div></a>
                        <a onClick={this._onClick} href="#"><div className="well col-md-1" name="logout">logout</div></a>
                        </div>
                        {this.state.homeState && 
                        <div className='bg-info'>
                        <h2>Messages</h2> 
                        <MessagesFromGroupAdmin token={this.state.token} />
                        </div>}
    
                        {this.state.userManagementState && 
                        <div className='bg-info'>
                        <h2>User Management</h2>
                        <UserManagement token={this.state.token} />
                        </div>}
    
                        {this.state.clubManagementState &&
                        <div className='bg-info'> 
                        <h2>Club Management</h2>
                        <ClubManagement token={this.state.token}  />
                        </div>}
    
                        {this.state.settingState &&
                        <div className='bg-info'> 
                        <h2>General Setting</h2>
                        <SettingComponent token={this.state.token} userCredentials={this.state.userCredentials}/>
                        </div>}
    
                        {this.state.termAndConditions &&
                        <div className='bg-info'> 
                        <h2>Term and Condition</h2>
                        <TermAndConditions token={this.state.token} />
                        </div>}
    
                        {this.state.aboutUs &&
                        <div className='bg-info'> 
                        <h2>About Us</h2>
                        <AboutUs token={this.state.token} />
                        </div>}
                    </div>}
            </div>    
        );
    },
    componentDidMount: function(){
    	 	
    },
    _onChange: function(event){
        var currentThis = this
        if(event.target.name == "username"){
            currentThis.setState({
                username: (event.target.value).trim()
            });
        }
        else if(event.target.name == "password"){
            currentThis.setState({
                password: (event.target.value).trim()
            });
        }
    },
    _onClick: function(event){
        var currentThis = this;
    	if(event.target.name == "login"){
            var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            var requestData = {};
            requestData.username = this.state.username;
            requestData.password = this.state.password;
            if( this.state.username != "" && this.state.password != "" && filter.test(this.state.username)){
                services.superAdminLogin(config.url.adminLogin, requestData)
                .then(function(data){
                    localStorage.setItem('wikedrideSuperAdminIsLogin', JSON.stringify({
                        token:data.response.token,
                        userCredentials:{username:data.response.user.fullname,emailId:data.response.user.emailid}
                    }));
                    setTimeout(function() {
                        currentThis.setState({
                            token: data.response.token,
                            userCredentials:{username:data.response.user.fullname,emailId:data.response.user.emailid}
                        });
                    }, 0);
                    setTimeout(function() {
                        currentThis.setState({
                            isLogin: true
                        });
                    }, 0);
                })
                .catch(function(error){
                    console.log("======error",error);
                    currentThis.setState({
                        loginError: error.response.message
                    });
                });  
            }
            else if(this.state.username == "" || this.state.password == ""){
                currentThis.setState({
                    loginError: "username and password can not be blank"
                });
            }
            else if(!filter.test(this.state.username)){
                currentThis.setState({
                    loginError: "insert valid username"
                });
            } 
            else{
                currentThis.setState({
                    loginError: "something goes wrong"
                });
            }
        }
        else if($(event.target).attr("name") == "logout"){

            localStorage.removeItem("wikedrideSuperAdminIsLogin");
            currentThis.setState({
                loginError: "",
                isLogin:false,
                userCredentials:{}
            });
        }
        else {
    		this.setState({
    			homeState: $(event.target).attr("name") == 'homeState' ? true : false,
    			userManagementState: $(event.target).attr("name") == 'userManagementState' ? true : false,
    			clubManagementState: $(event.target).attr("name") == 'clubManagementState' ? true : false,
    			settingState: $(event.target).attr("name") == 'settingState' ? true : false,
    			termAndConditions: $(event.target).attr("name") == 'termAndConditions' ? true : false,
    			aboutUs: $(event.target).attr("name") == 'aboutUs' ? true : false
    		})
        }
    }
});
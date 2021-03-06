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
                <h1>{this.state.token}</h1>
                {   !this.state.isLogin &&
                    <div className="wrapper login-page">
                        <div className="login-form">
                            <div className="filter-form">
                                <form>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td style={{width:"80px"}}><label>Email-ID</label></td>
                                                <td><input name="username" type="email" onChange={this._onChange}/></td>
                                            </tr>
                                            <tr>
                                                <td style={{width:"80px"}}><label>Password</label></td>
                                                <td> <input name="password" type="password" onChange={this._onChange} /></td>
                                            </tr>
                                            <tr>
                                                <td colspan="2">
                                                    <div className="button-block">
                                                        <button type="button" name="login" onClick={this._onClick}>Login</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </form>
                            </div>
                        </div>
                    </div>}
            	{  this.state.isLogin &&
                    <div>
                        <header>
                            <div className="logo-wrapper">
                                <a href="#">
                                    <img src="images/wicked-ride-logo.png"/>
                                </a>
                            </div>
                            <div className="admin-details">
                                <p>Admin Name <span>{this.state.userCredentials.username}</span></p>
                                <p className="account-img"><img src="images/bg_imgs/user-icon1.jpg"/></p>
                                <a onClick={this._onClick} name="logout" href="#" className="log-out"></a>         
                            </div>
                        </header>
                        <div className="wrapper">
                            <aside>
                                <ul className="navigation clearfix">
                                    <li className="active"><a onClick={this._onClick} href="#"><div name="homeState">Home</div></a></li>
                                    <li><a onClick={this._onClick} href="#"><div name="userManagementState">User Management</div></a></li>
                                    <li><a onClick={this._onClick} href="#"><div name="clubManagementState">Club Management</div></a></li>
                                    <li><a onClick={this._onClick} href="#"><div name="aboutUs">About Us</div></a></li>
                                    <li><a onClick={this._onClick} href="#"><div name="termAndConditions">Term & Conditions</div></a></li>
                                    <li><a onClick={this._onClick} href="#"><div name="settingState">Settings</div></a></li>
                                </ul>
                            </aside>
                            {this.state.homeState && 
                            <div className='bg-info'>
                            <h2>Messages</h2> 
                            <MessagesFromGroupAdmin token={this.state.token} />
                            </div>}
        
                            {this.state.userManagementState && 
                            <div className="main user-mgt-page common-table">
                                <div className="main-content">
                                    <UserManagement token={this.state.token} />
                                </div>
                            </div>}
        
                            {this.state.clubManagementState &&
                            <div className='bg-info'> 
                            <h2>Club Management</h2>
                            <ClubManagement token={this.state.token}  />
                            </div>}
        
                            {this.state.settingState &&
                            <div className="main settings-page">
                                <div className="main-content"> 
                                    <div className="page-title">
                                        <h1>General Settings</h1>
                                    </div>
                                    <SettingComponent token={this.state.token} userCredentials={this.state.userCredentials}/>
                                </div>
                            </div>}
        
                            {this.state.termAndConditions &&
                            <div className="main tc-page">
                                <TermAndConditions token={this.state.token} />
                            </div>}
        
                            {this.state.aboutUs &&
                            <div className="main about-us-page common-table"> 
                                <AboutUs token={this.state.token} />
                            </div>}
                        </div>
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
        console.log("userCredentials",this.state.userCredentials);
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
                        console.log("userCredentials=====",currentThis.state.userCredentials);
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
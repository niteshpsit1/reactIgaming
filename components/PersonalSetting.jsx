var PersonalSetting = React.createClass({
	getInitialState: function(){
		return {
			email:"",
			userName:"",
			editProfile:false
		}
	},
	render: function(){
		return (
			<div className="PI-block">
				<div className="page-title">
					<h1>Personal Information</h1>
					<div className="filter-block edit">
						<a href="#" onClick={this._onEdit}>Edit</a>
					</div>
				</div>
			
				{   !this.state.editProfile &&
					<form>
						<div className="f1"><label>Name</label><p>{this.props.userCredentials.username}</p></div>
						<div className="f2"><label>Email</label><p>{this.props.userCredentials.emailId}</p></div>
					</form>
				}
				{	this.state.editProfile &&
					<form>
						<div className="f1"><label>Name</label><input type="text" name="userName" className="form-control" onChange={this._onChange}/></div>
						<div className="f2"><label>Email</label><p>{this.props.userCredentials.emailId}</p></div>
						<div className="button-block">
							<button type="button" onClick={this._onClick}>Submit</button>
						</div>
					</form>
				}
				
			</div>
		);
	},
	_onEdit: function(){
		this.setState({
			userName:"",
			email:"",
			editProfile: !this.state.editProfile
		});
	},
	_onClick: function(){
		
		if( this.state.userName != "" ){
			var requestData = {};
			requestData.username = this.state.userName;
			console.log("===========requestData",requestData);
			/*services.POST(config.url.updateProfile,requestData)
			.then(function(data){
				currentThis.setState({
					userList:data.response.result
				});
			})*/
		}
		else{
			alert("fields can not be  blank");
		}	
	},
	_onChange: function(){
		if(event.target.name == "userName"){
			this.setState({
				userName:event.target.value
			})
		}
	}
}); 
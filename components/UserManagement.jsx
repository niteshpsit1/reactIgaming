var UserManagement = React.createClass({
	getInitialState: function (){
		return {
			userList:[],
			clubList:[{name:"ram",_id:341},
					{name:"ram",_id:341}],
			designations:[{name:"ram1"},{name:"ram2"}]
		}
	},
	componentDidMount: function(){
		var currentThis = this;
		var requestData = {};
		requestData.token = this.props.token;
		services.POST(config.url.getAllUser, requestData)
		.then(function(data){
			currentThis.setState({
				userList:data.response.result
			});
		}) 		
		.catch(function(error){
			console.log(error)
		})
	},
	render: function() {
		return (
			<div>
				<div>
					<form className="form-inline">
					  <div className="form-group">
					    <label>Name</label>
					    <input className="form-control"/>
					  </div>
					  <div className="form-group">
					    <label>Email</label>
					    <input className="form-control"/>
					  </div>
					</form>
					<form className="form-inline">
					  <div className="form-group">
					    <label>joined Club</label>
					    <select  className="form-control">
						    {this.state.clubList.map(function(club){
						    	return <SelectOption name={club.name} _id={club._id}/>
						    })}
					    </select>
					  </div>
					  <div className="form-group">
					    <label>Designation</label>
					    <select  className="form-control">
						    {this.state.designations.map(function(designation){
						    	return <SelectOption name={designation} />
						    })}
					    </select>
					  </div>
					</form>
					<button className="btn btn-default">FILTER</button>
				</div>
				<div className="row">
					<div className="well col-md-2">User Name</div>
					<div className="well col-md-2">Email</div>
					<div className="well col-md-2">Number</div>
					<div className="well col-md-2">Number of clubs joined</div>
					<div className="well col-md-2"></div>
					<div className="well col-md-2"></div>
				</div>

		  		{this.state.userList.map(function(user){
		  			return <UserList user={user}/> 
		  		})}
			</div>
		);
	},
	
});
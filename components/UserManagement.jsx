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
				<div className="content">
					<table cellspacing="0" cellpadding="25">
						<th><p>User Name</p></th>
						<th>Email</th>
						<th>Number</th>
						<th>Number of Clubs Joined</th>
						<th></th>
						<tbody>
							{this.state.userList.map(function(user){
		  						return <UserList user={user}/> 
		  					})}
		  				</tbody>
					</table>
				</div>
			</div>
		);
	},
	
});
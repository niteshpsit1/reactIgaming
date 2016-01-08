var UserManagement = React.createClass({
	getInitialState: function (){
		return {
			userList:[],
			clubList:[{name:"ram",_id:341},
					{name:"ram",_id:341}],
			designations:[{name:"ram1"},{name:"ram2"}],
			userFilter:false,
			filterByName:"",
			filterByEmail:"",
			filterByDesignation:"",
			value:"select"
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
				<div className="page-title">
                    <h1>All Users Details</h1>
                    <div className="filter-block">
                        <a href="#" onClick={this._onFilter}></a>
                    </div>
                </div>
				<div className="content">
						{	this.state.userFilter &&
							<div className="filter-form">
							<table>
								<tbody>
									<tr>
										<td style={{width:'100px'}}><label>Name</label></td>
										<td><input type="text" name="filterByName" onChange={this._onchange}/></td>
										<td style={{width:'100px'}}><label>Email</label></td>
										<td> <input type="email" name="filterByEmail" onChange={this._onchange}/></td>
									</tr>
									<tr>
										<td style={{width:'100px'}}><label>Designation</label> </td>
										<td className="select-parent">
											<select name="filterByDesignation" onChange={this._onchange}>
												<option value="">Select</option>
												{	this.state.designations.map(function(designation){
														return <option value={designation.name}>{designation.name}</option>
													})
												}
											</select>
										</td>
									</tr>
									<tr>
										<td colspan="4">
											<div className="button-block">
												<button onClick={this._onClick}>Filter</button>
											</div>
										</td>
									</tr>
								</tbody>
							</table>
					</div>}
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
	_onFilter: function(){
		this.setState({
			userFilter: !this.state.userFilter
		});
	},
	_onchange: function(event){
		
		if(event.target.name == "filterByDesignation"){
			this.setState({
				filterByDesignation: event.target.value
			});
		}
		else if(event.target.name == "filterByEmail"){
			this.setState({
				filterByEmail: event.target.value
			});
		}
		else if( event.target.name == "filterByName"){
			this.setState({
				filterByName: event.target.value
			});
		}
	},
	_onClick: function(){
		var currentThis = this;
		var requestData = {};
		requestData.token = this.props.token;
		requestData.name = this.state.filterByName;
		requestData.email = this.state.filterByEmail;
		requestData.designation = this.state.filterByDesignation;
		services.POST(config.url.userListFilter, requestData)
		.then(function(data){
			currentThis.setState({
				userList:data.response.result
			});
		}) 		
		.catch(function(error){
			console.log(error)
		})
	}
	
});
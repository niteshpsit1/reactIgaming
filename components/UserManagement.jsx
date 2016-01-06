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
			filterByClub:"",
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
                        <a href="#" onClick={this._onClick}></a>
                    </div>
                </div>
				<div className="content">
						{	this.state.userFilter &&
							<div className="filter-form">
							<table>
								<tbody>
									<tr>
										<td style={{width:'100px'}}><label>Name</label></td>
										<td><input type="text" name="filterByName" onBlur={this._onBlur}/></td>
										<td style={{width:'100px'}}><label>Email</label></td>
										<td> <input type="email" name="filterByEmail" onBlur={this._onBlur}/>
											<ul>
											   <li>..1</li>
											   <li>..2</li>
											   <li>..3</li>
											   <li>..4</li>
											</ul>
										</td>
									</tr>
									<tr>
										<td style={{width:'100px'}}><label>Clubs Joined</label> </td>
										<td className="select-parent">
											<select name="filterByClub"  onChange={this._onchange}>
												<option value="select">Select</option>
												{	this.state.clubList.map(function(club){
														return <option value={club._id}>{club.name}</option>
													})
												}
											</select>
										</td>
										<td style={{width:'100px'}}><label>Designation</label> </td>
										<td className="select-parent">
											<select name="filterByDesignation" onChange={this._onchange}>
												<option value="select">Select</option>
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
												<button>Filter</button>
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
	_onClick: function(){
		this.setState({
			userFilter: !this.state.userFilter
		});
	},
	_onBlur: function(event){

		if( event.target.name == "filterByName"){
			
		}
		else if(event.target.name == "filterByEmail"){
			
		}
	},
	_onchange: function(event){
		
		if (event.target.name == "filterByClub") {

		}
		else if(event.target.name == "filterByDesignation"){

		}
	}
	
});
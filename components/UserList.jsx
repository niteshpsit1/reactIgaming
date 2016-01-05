var UserList =	React.createClass({
	render: function() {
		return (
			<div className="row">
				<div className="well col-md-2">{this.props.user.userName}</div>
				<div className="well col-md-2">{this.props.user.email}</div>
				<div className="well col-md-2">{this.props.user.number}</div>
				<div className="well col-md-2">{this.props.user.noOfClubJoined}</div>
				<div className="well col-md-2">Delete User</div>
				<div className="well col-md-2">Awards</div>
			</div>
		)
	}
});
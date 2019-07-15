import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';

import { getSession } from 'app/shared/reducers/authentication';
import { getEntity as getBlogEntity } from 'app/entities/blog/blog.reducer';

export interface IHomeProp extends StateProps, DispatchProps {}

export class Home extends React.Component<IHomeProp> {
  componentDidMount() {
    this.props.getSession();
    this.props.getBlogEntity(1051);
  }

  render() {
    const { account, blogEntity } = this.props;
    return (
      <Row>
        <Col md="9">
          <h2>BlogZone</h2>
          <p className="lead">The best place to blog, forever.</p>
          {account && account.login ? (
            <div>
              <Alert color="success">You are logged in as user {account.login}.</Alert>
            </div>
          ) : (
            <div>
              <Alert color="warning">
                If you want to
                <Link to="/login" className="alert-link">
                  {' '}
                  sign in
                </Link>
                , you can try the default accounts:
                <br />- Administrator (login=&quot;admin&quot; and password=&quot;admin&quot;)
                <br />- User (login=&quot;user&quot; and password=&quot;user&quot;).
              </Alert>

              <Alert color="warning">
                You do not have an account yet?&nbsp;
                <Link to="/register" className="alert-link">
                  Register a new account
                </Link>
              </Alert>
            </div>
          )}
          <p>Here's a blog:</p>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">Name</span>
            </dt>
            <dd>{blogEntity.name}</dd>
            <dt>
              <span id="handle">Handle</span>
            </dt>
            <dd>{blogEntity.handle}</dd>
          </dl>
          <p>And a product:</p>
        </Col>
        <Col md="3" className="pad">
          <span className="hipster rounded" />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
  blogEntity: storeState.blog.entity
});

const mapDispatchToProps = { getSession, getBlogEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './membership.reducer';
import { IMembership } from 'app/shared/model/membership.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMembershipProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Membership extends React.Component<IMembershipProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { membershipList, match } = this.props;
    return (
      <div>
        <h2 id="membership-heading">
          <Translate contentKey="recCenterManagementApp.membership.home.title">Memberships</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="recCenterManagementApp.membership.home.createLabel">Create a new Membership</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {membershipList && membershipList.length > 0 ? (
            <Table responsive aria-describedby="membership-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="recCenterManagementApp.membership.membershipType">Membership Type</Translate>
                  </th>
                  <th>
                    <Translate contentKey="recCenterManagementApp.membership.expirationDate">Expiration Date</Translate>
                  </th>
                  <th>
                    <Translate contentKey="recCenterManagementApp.membership.user">User</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {membershipList.map((membership, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${membership.id}`} color="link" size="sm">
                        {membership.id}
                      </Button>
                    </td>
                    <td>
                      <Translate contentKey={`recCenterManagementApp.MembershipType.${membership.membershipType}`} />
                    </td>
                    <td>
                      <TextFormat type="date" value={membership.expirationDate} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>{membership.user ? membership.user.login : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${membership.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${membership.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${membership.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">
              <Translate contentKey="recCenterManagementApp.membership.home.notFound">No Memberships found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ membership }: IRootState) => ({
  membershipList: membership.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Membership);

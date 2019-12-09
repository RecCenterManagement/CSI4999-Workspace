import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './membership.reducer';
import { IMembership } from 'app/shared/model/membership.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMembershipDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class MembershipDetail extends React.Component<IMembershipDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { membershipEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="recCenterManagementApp.membership.detail.title">Membership</Translate> [<b>{membershipEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="membershipType">
                <Translate contentKey="recCenterManagementApp.membership.membershipType">Membership Type</Translate>
              </span>
            </dt>
            <dd>{membershipEntity.membershipType}</dd>
            <dt>
              <span id="expirationDate">
                <Translate contentKey="recCenterManagementApp.membership.expirationDate">Expiration Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={membershipEntity.expirationDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="recCenterManagementApp.membership.user">User</Translate>
            </dt>
            <dd>{membershipEntity.user ? membershipEntity.user.login : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/membership" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/membership/${membershipEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ membership }: IRootState) => ({
  membershipEntity: membership.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MembershipDetail);

import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, reset } from './membership.reducer';
import { IMembership } from 'app/shared/model/membership.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IMembershipUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IMembershipUpdateState {
  isNew: boolean;
  userId: string;
}

export class MembershipUpdate extends React.Component<IMembershipUpdateProps, IMembershipUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      userId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getUsers();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { membershipEntity } = this.props;
      const entity = {
        ...membershipEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/membership');
  };

  render() {
    const { membershipEntity, users, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="recCenterManagementApp.membership.home.createOrEditLabel">
              <Translate contentKey="recCenterManagementApp.membership.home.createOrEditLabel">Create or edit a Membership</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : membershipEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="membership-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="membership-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="membershipTypeLabel" for="membership-membershipType">
                    <Translate contentKey="recCenterManagementApp.membership.membershipType">Membership Type</Translate>
                  </Label>
                  <AvInput
                    id="membership-membershipType"
                    type="select"
                    className="form-control"
                    name="membershipType"
                    value={(!isNew && membershipEntity.membershipType) || 'STUDENT'}
                  >
                    <option value="STUDENT">{translate('recCenterManagementApp.MembershipType.STUDENT')}</option>
                    <option value="EMPLOYEE">{translate('recCenterManagementApp.MembershipType.EMPLOYEE')}</option>
                    <option value="COMMUNITY">{translate('recCenterManagementApp.MembershipType.COMMUNITY')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="expirationDateLabel" for="membership-expirationDate">
                    <Translate contentKey="recCenterManagementApp.membership.expirationDate">Expiration Date</Translate>
                  </Label>
                  <AvField
                    id="membership-expirationDate"
                    type="date"
                    className="form-control"
                    name="expirationDate"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="membership-user">
                    <Translate contentKey="recCenterManagementApp.membership.user">User</Translate>
                  </Label>
                  <AvInput
                    id="membership-user"
                    type="select"
                    className="form-control"
                    name="user.id"
                    value={isNew ? users[0] && users[0].id : membershipEntity.user.id}
                    required
                  >
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.login}
                          </option>
                        ))
                      : null}
                  </AvInput>
                  <AvFeedback>
                    <Translate contentKey="entity.validation.required">This field is required.</Translate>
                  </AvFeedback>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/membership" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  users: storeState.userManagement.users,
  membershipEntity: storeState.membership.entity,
  loading: storeState.membership.loading,
  updating: storeState.membership.updating,
  updateSuccess: storeState.membership.updateSuccess
});

const mapDispatchToProps = {
  getUsers,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MembershipUpdate);

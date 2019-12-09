import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './profile-picture.reducer';
import { IProfilePicture } from 'app/shared/model/profile-picture.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProfilePictureDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ProfilePictureDetail extends React.Component<IProfilePictureDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { profilePictureEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="recCenterManagementApp.profilePicture.detail.title">ProfilePicture</Translate> [
            <b>{profilePictureEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="imageData">
                <Translate contentKey="recCenterManagementApp.profilePicture.imageData">Image Data</Translate>
              </span>
            </dt>
            <dd>
              {profilePictureEntity.imageData ? (
                <div>
                  <a onClick={openFile(profilePictureEntity.imageDataContentType, profilePictureEntity.imageData)}>
                    <img
                      src={`data:${profilePictureEntity.imageDataContentType};base64,${profilePictureEntity.imageData}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                  <span>
                    {profilePictureEntity.imageDataContentType}, {byteSize(profilePictureEntity.imageData)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <Translate contentKey="recCenterManagementApp.profilePicture.user">User</Translate>
            </dt>
            <dd>{profilePictureEntity.user ? profilePictureEntity.user.login : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/profile-picture" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/profile-picture/${profilePictureEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ profilePicture }: IRootState) => ({
  profilePictureEntity: profilePicture.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePictureDetail);

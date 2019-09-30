import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { Translate, translate, setFileData } from 'react-jhipster';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { locales, languages } from 'app/config/translation';
import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import { getEntity, updateEntity, createEntity, setBlob } from '../../../entities/profile-picture/profile-picture.reducer';
import { saveAccountSettings, reset } from './settings.reducer';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  CardSubtitle,
  Col,
  Button,
  Row
} from 'reactstrap';

export interface IUserSettingsProps extends StateProps, DispatchProps {}

export const SettingsPage = (props: IUserSettingsProps) => {
  useEffect(() => {
    props.getSession();
    let pictureId = props.account.imageUrl ? props.account.imageUrl.split('/') : null;
    pictureId = pictureId ? pictureId[pictureId.length - 1] : null;
    if (pictureId) {
      props.getEntity(pictureId);
    }
    return () => {
      props.reset();
    };
  }, []);

  const handleValidSubmit = (event, values) => {
    const account = {
      ...props.account,
      ...values
    };

    props.saveAccountSettings(account);
    event.persist();
  };

  const onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => props.setBlob(name, data, contentType), isAnImage);
  };

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { profilePictureEntity } = props;
      const entity = {
        ...profilePictureEntity,
        ...values
      };
      props.updateEntity(entity);
    }
  };

  const { imageData, imageDataContentType } = props.profilePictureEntity;

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="7">
          <h2 id="settings-title">
            <Translate contentKey="settings.title" interpolate={{ username: props.account.login }}>
              User settings for {props.account.login}
            </Translate>
          </h2>
          <AvForm id="settings-form" onValidSubmit={handleValidSubmit}>
            {/* First name */}
            <AvField
              className="form-control"
              name="firstName"
              label={translate('settings.form.firstname')}
              id="firstName"
              placeholder={translate('settings.form.firstname.placeholder')}
              validate={{
                required: { value: true, errorMessage: translate('settings.messages.validate.firstname.required') },
                minLength: { value: 1, errorMessage: translate('settings.messages.validate.firstname.minlength') },
                maxLength: { value: 50, errorMessage: translate('settings.messages.validate.firstname.maxlength') }
              }}
              value={props.account.firstName}
            />
            {/* Last name */}
            <AvField
              className="form-control"
              name="lastName"
              label={translate('settings.form.lastname')}
              id="lastName"
              placeholder={translate('settings.form.lastname.placeholder')}
              validate={{
                required: { value: true, errorMessage: translate('settings.messages.validate.lastname.required') },
                minLength: { value: 1, errorMessage: translate('settings.messages.validate.lastname.minlength') },
                maxLength: { value: 50, errorMessage: translate('settings.messages.validate.lastname.maxlength') }
              }}
              value={props.account.lastName}
            />
            {/* Email */}
            <AvField
              name="email"
              label={translate('global.form.email.label')}
              placeholder={translate('global.form.email.placeholder')}
              type="email"
              validate={{
                required: { value: true, errorMessage: translate('global.messages.validate.email.required') },
                minLength: { value: 5, errorMessage: translate('global.messages.validate.email.minlength') },
                maxLength: { value: 254, errorMessage: translate('global.messages.validate.email.maxlength') }
              }}
              value={props.account.email}
            />
            {/* Language key */}
            <AvField
              type="select"
              id="langKey"
              name="langKey"
              className="form-control"
              label={translate('settings.form.language')}
              value={props.account.langKey}
            >
              {locales.map(locale => (
                <option value={locale} key={locale}>
                  {languages[locale].name}
                </option>
              ))}
            </AvField>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px', marginBottom: '-16px' }}>
              <Button color="primary" type="submit">
                <Translate contentKey="settings.form.button">Save</Translate>
              </Button>
            </div>
          </AvForm>
        </Col>
        <Col md="1" />
        <Col md="3">
          {/* Profile Picture */}
          <Card style={{ marginTop: '10%' }}>
            {imageData ? (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <CardImg
                  top
                  style={{ maxHeight: '250px', maxWidth: '250px' }}
                  width="100%"
                  src={`data:${imageDataContentType};base64,${imageData}`}
                  alt="Card image cap"
                />
              </div>
            ) : null}
            <CardBody>
              {imageData ? (
                <CardTitle>{props.account.login} profile picture</CardTitle>
              ) : (
                <CardTitle>No profile picture for {props.account.login}</CardTitle>
              )}
              <AvForm model={props.profilePictureEntity} onSubmit={saveEntity}>
                <CardText>Thinking of changing your look? Click the button below to switch to a fancy new profile picture</CardText>
                <input id="file_imageData" type="file" onChange={onBlobChange(true, 'imageData')} accept="image/*" />
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px', marginBottom: '-16px' }}>
                  <Button color="primary" id="save-entity" type="submit">
                    Save Photo
                  </Button>
                </div>
              </AvForm>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
  profilePictureEntity: storeState.profilePicture.entity,
  picutreLoading: storeState.profilePicture.loading,
  picutreUpdating: storeState.profilePicture.updating,
  picutreUpdateSuccess: storeState.profilePicture.updateSuccess
});

const mapDispatchToProps = {
  getSession,
  saveAccountSettings,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPage);

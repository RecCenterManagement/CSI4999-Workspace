import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IEquipmentBundleClaim } from 'app/shared/model/equipment-bundle-claim.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './equipment-bundle-claim.reducer';

export interface IEquipmentBundleClaimDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EquipmentBundleClaimDeleteDialog extends React.Component<IEquipmentBundleClaimDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.equipmentBundleClaimEntity.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { equipmentBundleClaimEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody id="recCenterManagementApp.equipmentBundleClaim.delete.question">
          <Translate
            contentKey="recCenterManagementApp.equipmentBundleClaim.delete.question"
            interpolate={{ id: equipmentBundleClaimEntity.id }}
          >
            Are you sure you want to delete this EquipmentBundleClaim?
          </Translate>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button id="jhi-confirm-delete-equipmentBundleClaim" color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />
            &nbsp;
            <Translate contentKey="entity.action.delete">Delete</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ equipmentBundleClaim }: IRootState) => ({
  equipmentBundleClaimEntity: equipmentBundleClaim.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EquipmentBundleClaimDeleteDialog);

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import * as R from 'ramda'
import {T} from '../../../../components/I18n'
import {i18nRegister} from '../../../../utils/Messages'
import * as Constants from '../../../../constants/ComponentTypes'
import {Popover} from '../../../../components/Popover'
import {Menu} from '../../../../components/Menu'
import {Dialog} from '../../../../components/Dialog'
import {IconButton, FlatButton} from '../../../../components/Button'
import {Icon} from '../../../../components/Icon'
import {MenuItemLink, MenuItemButton} from "../../../../components/menu/MenuItem"
import {fetchObjective} from '../../../../actions/Objective'
import {updateSubobjective, deleteSubobjective} from '../../../../actions/Subobjective'
import SubobjectiveForm from './SubobjectiveForm'

const style = {
  position: 'absolute',
  top: '10px',
  right: 0,
}

i18nRegister({
  fr: {
    'Update the subobjective': 'Modifier le sous-objectif',
    'Do you want to delete this subobjective?': 'Souhaitez-vous supprimer ce sous-objectif ?',
  }
})

class SubobjectivePopover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDelete: false,
      openEdit: false,
      openPopover: false
    }
  }

  handlePopoverOpen(event) {
    event.stopPropagation()
    this.setState({
      openPopover: true,
      anchorEl: event.currentTarget,
    })
  }

  handlePopoverClose() {
    this.setState({openPopover: false})
  }

  handleOpenEdit() {
    this.setState({
      openEdit: true
    })
    this.handlePopoverClose()
  }

  handleCloseEdit() {
    this.setState({
      openEdit: false
    })
  }

  onSubmitEdit(data) {
    return this.props.updateSubobjective(this.props.exerciseId, this.props.objectiveId, this.props.subobjective.subobjective_id, data)
  }

  submitFormEdit() {
    this.refs.subobjectiveForm.submit()
  }

  handleOpenDelete() {
    this.setState({
      openDelete: true
    })
    this.handlePopoverClose()
  }

  handleCloseDelete() {
    this.setState({
      openDelete: false
    })
  }

  submitDelete() {
    this.props.deleteSubobjective(this.props.exerciseId, this.props.objectiveId, this.props.subobjective.subobjective_id).then(() => {
        this.props.fetchObjective(this.props.exerciseId, this.props.objectiveId)
      }
    )
    this.handleCloseDelete()
  }

  render() {
    let subobjective_is_updatable = R.propOr(true, 'user_can_update', this.props.subobjective)
    let subobjective_is_deletable = R.propOr(true, 'user_can_delete', this.props.subobjective)
        
    const editActions = [
      <FlatButton key="cancel" label="Cancel" primary={true} onClick={this.handleCloseEdit.bind(this)} />,
      subobjective_is_updatable ? <FlatButton key="update" label="Update" primary={true} onClick={this.submitFormEdit.bind(this)} />: ""
    ];
    const deleteActions = [
      <FlatButton key="cancel" label="Cancel" primary={true} onClick={this.handleCloseDelete.bind(this)} />,
      subobjective_is_deletable ? <FlatButton key="delete" label="Delete" primary={true} onClick={this.submitDelete.bind(this)} />: ""
    ];

    let initialValues = R.pick(['subobjective_title', 'subobjective_description', 'subobjective_priority'], this.props.subobjective)
    return (
      <div style={style}>
        <IconButton onClick={this.handlePopoverOpen.bind(this)}>
          <Icon name={Constants.ICON_NAME_NAVIGATION_MORE_VERT}/>
        </IconButton>
        
        {(subobjective_is_updatable || subobjective_is_deletable)
        ?
          <Popover open={this.state.openPopover} anchorEl={this.state.anchorEl} onRequestClose={this.handlePopoverClose.bind(this)}>
            <Menu multiple={false}>
              {subobjective_is_updatable ? <MenuItemLink label="Edit" onClick={this.handleOpenEdit.bind(this)}/>: ""}
              {subobjective_is_deletable ? <MenuItemButton label="Delete" onClick={this.handleOpenDelete.bind(this)}/>: ""}
            </Menu>
          </Popover>
        : ""}       
          
        <Dialog
          title="Confirmation"
          modal={false}
          open={this.state.openDelete}
          onRequestClose={this.handleCloseDelete.bind(this)}
          actions={deleteActions}
        >
          <T>Do you want to delete this subobjective?</T>
        </Dialog>
        <Dialog
          title="Update the subobjective"
          modal={false}
          open={this.state.openEdit}
          onRequestClose={this.handleCloseEdit.bind(this)}
          actions={editActions}
        >
          <SubobjectiveForm ref="subobjectiveForm" initialValues={initialValues} onSubmit={this.onSubmitEdit.bind(this)} onSubmitSuccess={this.handleCloseEdit.bind(this)}/>
        </Dialog>
      </div>
    )
  }
}

SubobjectivePopover.propTypes = {
  exerciseId: PropTypes.string,
  objectiveId: PropTypes.string,
  fetchObjective: PropTypes.func,
  deleteSubobjective: PropTypes.func,
  updateSubobjective: PropTypes.func,
  subobjective: PropTypes.object,
  children: PropTypes.node
}

export default connect(null, {fetchObjective, updateSubobjective, deleteSubobjective})(SubobjectivePopover)
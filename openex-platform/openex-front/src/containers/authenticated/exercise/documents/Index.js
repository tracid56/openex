import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {T} from '../../../../components/I18n'
import {i18nRegister} from '../../../../utils/Messages'
import {timeDiff} from '../../../../utils/Time'
import * as Constants from '../../../../constants/ComponentTypes'
import * as R from 'ramda'
import {SearchField} from '../../../../components/SimpleTextField'
import {Dialog} from '../../../../components/Dialog'
import {fetchGroups} from '../../../../actions/Group'
import {fetchTags, deleteTag} from '../../../../actions/Tag'
import {addDocument, searchDocument, saveDocument, getDocument, getDocumentTags, getDocumentTagsExercise, editDocumentTags, editDocumentTagsExercise, deleteDocument, downloadDocument} from '../../../../actions/Document'
import {fetchExercises} from '../../../../actions/Exercise'
import {FlatButton} from '../../../../components/Button'
import CreateTag from './tag/CreateTag'
import DocumentForm from './document/DocumentForm'
import DocumentActionPopover from './tag/DocumentActionPopover'
import DocumentTags from './document/DocumentTags'
import {TagListe, TagExerciseListe, TagAddToFilter, TagSmallListe, TagSmallExerciseListe} from './component/Tag'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'


const styles = {
    'container': {
        textAlign: 'center'
    },
    'title': {
        float: 'left',
        fontSize: '13px',
        textTransform: 'uppercase'
    },
    'titlePopover': {
        float: 'left',
        fontSize: '11px',
        height: '35px',
        textTransform: 'uppercase'
    },
    'columnLeft': {
        float: 'left',
        width: '49%',
        margin: 0,
        padding: 0,
        textAlign: 'left'
    },
    'columnRight': {
        float: 'right',
        width: '49%',
        margin: 0,
        padding: 0,
        textAlign: 'left'
    },
    'searchDiv': {
        float: 'left',
        marginTop: '10px',
        width: '100%',
        border: '1px silver solid',
        borderRadius: '4px',
        paddingBottom: '10px'
    },
    'searchDivTag': {
        float: 'left',
        width: '10%',
        height: '100%',
        marginTop: '10px',
        minWidth: '120px'
    },
    'searchDivTagDetail': {
        float: 'left',
        marginTop: '10px',
        width: '89%',
        textAlign: 'left'
    },
    'searchDivTagLibelle': {
        float: 'left',
        border: '0px',
        width: '100%',
        textAlign: 'left'
    },
    'searchDivTitle': {
        marginTop: '20px',
        fontSize: '13px',
        textAlign: 'left'
    },
    'divDocumentsListe': {
        float: 'left',
        width: '79%',
        minHeight: '600px',
        height: '100%'
    },
    'divDocumentsListeDetail': {
        width: '100%',
        height: '100%',
        minHeight: '540px',
        maxHeight: '540px',
        minWidth: '400px',
        overflowY: 'auto',
        border: '1px silver solid',
        borderRadius: '4px'
    },
    'divTagsListe': {
        float: 'right',
        width: '20%',
        minHeight: '600px',
        minWidth: '200px',
        height: '100%'
    },
    'divdivTagsListeDetail': {
        width: '100%',
        height: '100%',
        minHeight: '540px',
        border: '1px silver solid',
        borderRadius: '4px'
    },
    'divDocuments': {
        float: 'left',
        marginTop: '20px',
        width: '100%',
        minHeight: '600px'
    },
    'divDocumentsTitle': {
        fontSize: '15px',
        textTransform: 'uppercase',
        fontWeight: '800'
    },
    'search': {
        float: 'right'
    },
    'empty': {
        marginTop: 40,
        fontSize: '18px',
        fontWeight: 500,
        textAlign: 'center'
    }
}

i18nRegister({
  fr: {
      'List Of Tags': 'Liste des tags',
      'Document Gallery': 'Galerie de documents',
      'Search by :': 'Rechercher par :',
      'No added tags, select a tag from the list on the right to add it as a filter.': 'Aucun tag ajouté, sélectionner un tag sur la liste de droite pour l\'ajouter comme filtre.',
      'No Document available': 'Aucun document de disponible',
      'Add new document': 'Ajouter un document',
      'No Tag Available': 'Aucun TAG de disponible',
      'Edit document': 'Modification d\'un document',
      'List of Documents': 'Liste des documents',
      'Editing Tags in a document': 'Modification des Tags d\'un document',
      'List of documents including the following tags : ': 'Liste des documents incluant les Tags suivants : ',
      'Delete Tag' : 'Suppression d\'un tag',
      'Are you sure you want to delete this tag ?' : 'Êtes-vous sûr de vouloir supprimer ce Tag ?'
  }
})

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
        searchTerm: '',
        openEditDocument: false,
        openEditDocumentTag: false,
        openConfirmDeleteTag: false,
        listeTagAddToFilter: [],
        listeTagExerciseAddToFilter: [],
        documentsTags: [],
        documentsTagsExercise: [],
        selectedDocument: {},
        selectedTag: {}
        }
  }

  componentDidMount() {
    this.props.fetchGroups()
    this.props.fetchTags();
    this.props.fetchExercises();
    this.props.searchDocument(null);
  }

  handleSearchDocument(event, value) {
    this.setState({
        searchTerm: value
    })
  }

  handleOpenConfirmDeleteTag(selectedTag) {
      this.setState({
          selectedTag: selectedTag,
          openConfirmDeleteTag: true
      })
  }

  handleSubmitConfirmDeleteTag()
  {
    let selectedTag = this.state.selectedTag
    this.props.deleteTag(selectedTag.tag_id).then(() => {
      this.removeTagToFilter(selectedTag)
      this.setState({
          openConfirmDeleteTag: false
      })
    })
  }

  handleCloseConfirmDeleteTag() {
    this.setState({
        openConfirmDeleteTag: false
    })
  }

  deleteTag(tag) {
      this.handleOpenConfirmDeleteTag()

  }

  addAvailableTagToFilter(tag) {
    let listeTagAddToFilter = [...this.state.listeTagAddToFilter]
    let allreadyExist = false
    listeTagAddToFilter.forEach(function(element) {
        if (element.tag_id === tag.tag_id) {
            allreadyExist = true
        }
    });
    if (allreadyExist === false) {
        listeTagAddToFilter.push({tag_id: tag.tag_id, tag_name: tag.tag_name})
        this.setState({
            listeTagAddToFilter: listeTagAddToFilter
        })
    } else {
        this.removeTagToFilter(tag)
    }
  }

  addAvailableTagExerciseToFilter(exercise) {
    let listeTagExerciseAddToFilter = [...this.state.listeTagExerciseAddToFilter]
    let allreadyExist = false
    listeTagExerciseAddToFilter.forEach(function(element) {
        if (element.exercise_id === exercise.exercise_id) {
            allreadyExist = true
        }
    });
    if (allreadyExist === false) {
        listeTagExerciseAddToFilter.push({exercise_id: exercise.exercise_id, exercise_name: exercise.exercise_name})
        this.setState({
            listeTagExerciseAddToFilter: listeTagExerciseAddToFilter
        })
    } else {
        this.removeTagExerciseToFilter(exercise)
    }
  }

  removeTagToFilter(tag) {
    let listeTagAddToFilter = [...this.state.listeTagAddToFilter]
    let newListeTagAddToFilter = []
    listeTagAddToFilter.forEach(function(element) {
        if (element.tag_id !== tag.tag_id) {
            newListeTagAddToFilter.push(element)
        }
    });
    this.setState({
        listeTagAddToFilter: newListeTagAddToFilter
    })
  }

    removeTagExerciseToFilter(exercise) {
        let listeTagExerciseAddToFilter = [...this.state.listeTagExerciseAddToFilter]
        let newListeTagExerciseAddToFilter = []
        listeTagExerciseAddToFilter.forEach(function(element) {
            if (element.exercise_id !== exercise.exercise_id) {
                newListeTagExerciseAddToFilter.push(element)
            }
        });
        this.setState({
            listeTagExerciseAddToFilter: newListeTagExerciseAddToFilter
        })
    }

    openFileDialog() {
        this.refs.fileUpload.click()
    }

    handleFileChange() {
        let data = new FormData();
        data.append('file', this.refs.fileUpload.files[0])
        this.props.addDocument(data).then(document_id => {
            this.props.getDocument(document_id.result).then(document => {
                this.handleEditDocument(R.prop(document.result, document.entities.document))
            })
        })
      }

    handleEditDocument(document) {
        this.setState({
            selectedDocument: document,
            openEditDocument: true
        })
    }

    handleViewDocument(document) {
        this.setState({
            selectedDocument: document
        })
        return this.props.downloadDocument(document.document_id, document.document_name)
    }

    handleEditDocumentEditTag() {
        this.refs.documentForm.submit()
        this.handleCloseEditDocument()
        this.handleEditDocumentTag(this.state.selectedDocument.document_id);
    }

    handleEditDocumentTag(document_id) {
        this.setState({
            selectedDocument: document_id}
        );
        //recherche des tags du document
        this.props.getDocumentTags(document_id).then(tags => {
            this.setState({
                documentsTags: tags.result
            });
            //recherche des tags 'exercices' du document
            this.props.getDocumentTagsExercise(document_id).then(tagsExercise => {
                this.setState({
                    documentsTagsExercise: tagsExercise.result,
                    openEditDocumentTag: true
                })
            })
        })
    }

    handleCloseEditDocument() {
        this.setState({
            openEditDocument: false
        })
    }

    handleCloseEditDocumentTag() {
        this.setState({
            openEditDocumentTag: false
        })
    }

    handleDeleteDocument(document) {
        this.props.deleteDocument(document.document_id).then(() => {
            window.location.reload();
        })
    }

    submitEditDocument() {
        this.refs.documentForm.submit()
    }

    submitEditDocumentTag() {
        this.handleCloseEditDocumentTag();
        this.props.editDocumentTags(this.state.selectedDocument, {'tags': this.state.documentsTags}).then(() => {
            this.props.editDocumentTagsExercise(this.state.selectedDocument, {'tags':this.state.documentsTagsExercise}).then(() => {
                window.location.reload();
            })
        })
    }

    onSubmitDocument(data) {
        this.props.saveDocument(data.document_id, data).then(document => {
            window.location.reload();
        })
    }

    handleAddDocumentTag(tag) {
        let documentsTags = [...this.state.documentsTags];
        documentsTags.push(tag.tag_id);
        this.setState({
            documentsTags: documentsTags
        })
    }

    handleAddDocumentTagExercise(exercise) {
        let documentsTagsExercise = [...this.state.documentsTagsExercise]
        documentsTagsExercise.push(exercise.exercise_id)
        this.setState({
            documentsTagsExercise: documentsTagsExercise
        })
    }

    handleRemoveDocumentTag(tag) {
        let documentsTags = [...this.state.documentsTags];
        let index = documentsTags.indexOf(tag.tag_id);
        documentsTags.splice(index, 1);
        this.setState({
            documentsTags: documentsTags
        })
    }

    handleRemoveDocumentTagExercise(exercise) {
        let documentsTagsExercise = [...this.state.documentsTagsExercise]
        let index = documentsTagsExercise.indexOf(exercise.exercise_id);
        documentsTagsExercise.splice(index, 1);
        this.setState({
            documentsTagsExercise: documentsTagsExercise
        })
    }

    checkIfDocumentIsDisplay(document, listeTagAddToFilter, listeTagExerciseAddToFilter, keyWords) {
        let toDisplay = true
        let listeTagCritere = []
        let listeTagExerciseCritere = []

        if (keyWords !== '') {
            if (document.document_name.toLowerCase().indexOf(keyWords.toLowerCase()) === -1) {
                toDisplay = false
            }
        }
        if (toDisplay === true) {
            //pour chaque tag de la recherche
            listeTagAddToFilter.forEach(function (tagCritere) {
                let exist = false
                //pour chaque tag document
                document.document_liste_tags.forEach(function(tagDocument) {
                    if (tagDocument.tag_id === tagCritere.tag_id) {
                        exist = true
                    }
                })
                listeTagCritere.push({'tag_id': tagCritere.tag_id, 'exist': exist})
            })

            //pour chaque tag exercice
            listeTagExerciseAddToFilter.forEach(function (tagExerciseCritere) {
                let exist = false
                document.document_liste_tags_exercise.forEach(function(tagDocument) {
                    if (tagDocument.exercise_id === tagExerciseCritere.exercise_id) {
                        exist = true
                    }
                })
                listeTagExerciseCritere.push({'exercise_id': tagExerciseCritere.exercise_id, 'exist': exist})
            })

            for (let i = 0; i < listeTagCritere.length; i++) {
                if (listeTagCritere[i].exist === false) {
                    toDisplay = false;
                }
            }
            for (let i = 0; i < listeTagExerciseCritere.length; i++) {
                if (listeTagExerciseCritere[i].exist === false) {
                    toDisplay = false;
                }
            }
        }
        return toDisplay
    }


  render() {

    const actionsEditDocument = [
      <FlatButton key="cancel" label="Cancel" primary={true} onClick={this.handleCloseEditDocument.bind(this)}/>,
      <FlatButton key="tags" label="List Of Tags" primary={true} onClick={this.handleEditDocumentEditTag.bind(this)}/>,
      <FlatButton key="submit" label="Submit" primary={true} onClick={this.submitEditDocument.bind(this)}/>,
    ]

    const actionsOpenConfirmDeleteTag = [
      <FlatButton key="cancel" label="Cancel" primary={true} onClick={this.handleCloseConfirmDeleteTag.bind(this)}/>,
      <FlatButton key="submit" label="Submit" primary={true} onClick={this.handleSubmitConfirmDeleteTag.bind(this)}/>,
    ]

    const actionsEditDocumentTag = [
      <FlatButton key="cancel" label="Cancel" primary={true} onClick={this.handleCloseEditDocumentTag.bind(this)}/>,
      <FlatButton key="submit" label="Submit" primary={true} onClick={this.submitEditDocumentTag.bind(this)}/>,
    ]

    return (
            <div style={styles.container}>
                <div style={styles.columnLeft}>
                    <div style={styles.title}><T>Document Gallery</T></div>
                    <div className="clearfix"></div>
                </div>

                <div style={styles.columnRight}>
                    <div style={styles.search}>
                        <SearchField
                          name="keyword"
                          fullWidth={true}
                          type="text"
                          hintText="Search"
                          onChange={this.handleSearchDocument.bind(this)}
                          styletype={Constants.FIELD_TYPE_RIGHT}
                        />
                    </div>
                    <div className="clearfix"></div>
                </div>

                <div className="clearfix"></div>

                <div style={styles.searchDivTitle}>
                    <T>Search by :</T>
                </div>
                <div style={styles.searchDiv}>
                    <div style={styles.searchDivTag}>
                        <T>Tag :</T>
                    </div>
                    <div style={styles.searchDivTagDetail}>
                    {(this.state.listeTagAddToFilter.length === 0 && this.state.listeTagExerciseAddToFilter.length === 0) ? <T>No added tags, select a tag from the list on the right to add it as a filter.</T>: ""}
                        {R.values(this.state.listeTagExerciseAddToFilter).map(exercise => {
                            return (
                                <TagAddToFilter
                                    key={exercise.exercise_id}
                                    value={exercise.exercise_name}
                                    onRequestDelete={this.removeTagExerciseToFilter.bind(this, exercise)}
                                />
                            )
                        })}
                        {R.values(this.state.listeTagAddToFilter).map(tag => {
                            return (
                                <TagAddToFilter
                                    key={tag.tag_id}
                                    value={tag.tag_name}
                                    onRequestDelete={this.removeTagToFilter.bind(this, tag)}
                                />
                            )
                        })}

                        <div className="clearfix"></div>
                        {(this.state.listeTagAddToFilter.length !== 0 || this.state.listeTagExerciseAddToFilter.length !== 0) ?
                        <div style={styles.searchDivTagLibelle}>
                            <T>List of documents including the following tags : </T>
                            {R.values(this.state.listeTagExerciseAddToFilter).map(exercise => {
                                return (exercise.exercise_name+', ')
                            })}
                            {R.values(this.state.listeTagAddToFilter).map(tag => {
                                return (tag.tag_name+', ')
                            })}
                        </div>
                        : ""}
                    </div>
                </div>

                <div style={styles.divDocuments}>
                    <div style={styles.divDocumentsListe}>
                        <div style={styles.divDocumentsTitle}><T>List of Documents</T></div>
                        <div style={styles.divDocumentsListeDetail}>
                            {this.props.documents.length === 0 ? <div style={styles.empty}><T>No Document available</T></div>:""}
                            <Table selectable={true} style={{marginTop: '5px'}}>
                                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                                    <TableRow>
                                        <TableHeaderColumn><T>Name</T></TableHeaderColumn>
                                        <TableHeaderColumn><T>Description</T></TableHeaderColumn>
                                        <TableHeaderColumn><T>Type</T></TableHeaderColumn>
                                        <TableHeaderColumn><T>Tags</T></TableHeaderColumn>
                                        <TableHeaderColumn width='20'>&nbsp;</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody displayRowCheckbox={false}>
                                {this.props.documents.map(document => {
                                        let listeTagAddToFilter = [...this.state.listeTagAddToFilter]
                                        let listeTagExerciseAddToFilter = [...this.state.listeTagExerciseAddToFilter]
                                        let toDisplay = this.checkIfDocumentIsDisplay(document, listeTagAddToFilter, listeTagExerciseAddToFilter, this.state.searchTerm)
                                   return (
                                            (toDisplay === true) ?
                                           <TableRow key={document.document_id}>
                                                <TableRowColumn>{document.document_name}</TableRowColumn>
                                                <TableRowColumn style={{wordWrap: 'break-word', whiteSpace: 'normal'}}>{document.document_description}</TableRowColumn>
                                                <TableRowColumn>{document.document_type}</TableRowColumn>
                                                <TableRowColumn>
                                                {document.document_liste_tags.map(tag => {
                                                    return (<TagSmallListe key={tag.tag_id} value={tag.tag_name}/>)
                                                })}
                                                {document.document_liste_tags_exercise.map(exercise => {
                                                    return (<TagSmallExerciseListe key={exercise.exercise_id} value={exercise.exercise_name}/>)
                                                })}
                                                </TableRowColumn>
                                                <TableRowColumn width='20'>
                                                    <div>
                                                      {this.props.userCanUpdate ?
                                                        <DocumentActionPopover
                                                            document_id={document.document_id}
                                                            document={document}
                                                            handleEditDocument={this.handleEditDocument.bind(this)}
                                                            handleViewDocument={this.handleViewDocument.bind(this)}
                                                            handleEditDocumentTag={this.handleEditDocumentTag.bind(this)}
                                                            handleDeleteDocument={this.handleDeleteDocument.bind(this)}
                                                        />
                                                        : ""
                                                      }
                                                    </div>
                                                </TableRowColumn>
                                           </TableRow>: ""
                                        )
                                })}
                                </TableBody>
                            </Table>
                        </div>
                        {this.props.userCanUpdate ?
                          <FlatButton
                            label="Add new document"
                            primary={true}
                            onClick={this.openFileDialog.bind(this)}
                          />
                          : ""
                        }
                    </div>
                    <div style={styles.divTagsListe}>
                        <div style={styles.divDocumentsTitle}><T>Liste des tags</T></div>
                        <div style={styles.divdivTagsListeDetail}>
                            {(this.props.tags.length === 0 && this.props.exercises === 0) ? <div style={styles.empty}><T>No Tag Available</T></div>:""}
                            {this.props.tags.map(tag => {
                                return (
                                        <TagListe
                                            key={tag.tag_id}
                                            value={tag.tag_name}
                                            onClick={this.addAvailableTagToFilter.bind(this, tag)}
                                            onRequestDelete={this.handleOpenConfirmDeleteTag.bind(this, tag)}
                                        />
                                    )
                            })}
                            {this.props.exercises.map(exercise => {
                                return (
                                    <TagExerciseListe
                                        key={exercise.exercise_id}
                                        value={exercise.exercise_name}
                                        onClick={this.addAvailableTagExerciseToFilter.bind(this, exercise)}
                                    />
                                )
                            })}
                        </div>
                        {this.props.userCanUpdate ?
                          <CreateTag/>
                          : ""
                        }
                    </div>
                </div>
                <input
                    type="file"
                    ref="fileUpload"
                    style={{"display": "none"}}
                    onChange={this.handleFileChange.bind(this)}
                />

                {this.props.userCanUpdate ?
                  <Dialog
                      title="Edit document"
                      modal={false}
                      open={this.state.openEditDocument}
                      onRequestClose={this.handleCloseEditDocument.bind(this)} actions={actionsEditDocument}
                  >
                      <DocumentForm
                          ref="documentForm"
                          initialValues={this.state.selectedDocument}
                          onSubmit={this.onSubmitDocument.bind(this)}
                          onSubmitSuccess={this.handleCloseEditDocument.bind(this)}
                      />
                  </Dialog>
                  : ""
                }

                {this.props.userCanUpdate ?
                  <Dialog
                      title="Delete Tag"
                      modal={false}
                      open={this.state.openConfirmDeleteTag}
                      onRequestClose={this.handleCloseConfirmDeleteTag.bind(this)}
                      actions={actionsOpenConfirmDeleteTag}
                  >
                      <T>Are you sure you want to delete this tag ?</T>
                  </Dialog>
                  : ""
                }

                {this.props.userCanUpdate ?
                  <Dialog
                      title="Editing Tags in a document"
                      modal={false}
                      open={this.state.openEditDocumentTag}
                      onRequestClose={this.handleCloseEditDocumentTag.bind(this)}
                      actions={actionsEditDocumentTag}
                  >
                      <DocumentTags
                          document_id={this.state.selectedDocument}
                          handleAddDocumentTag={this.handleAddDocumentTag.bind(this)}
                          handleRemoveDocumentTag={this.handleRemoveDocumentTag.bind(this)}
                          document_tags={this.state.documentsTags}
                          handleAddDocumentTagExercise={this.handleAddDocumentTagExercise.bind(this)}
                          handleRemoveDocumentTagExercise={this.handleRemoveDocumentTagExercise.bind(this)}
                          document_tags_exercise={this.state.documentsTagsExercise}
                          availables_tags={this.props.tags}
                          availables_exercises_tags={this.props.exercises}
                      />
                  </Dialog>
                  : ""
                }
            </div>
            )
    }
}

const sortTags = (tags) => {
  let tagsSorting = R.pipe(
    R.sort((a, b) => a.tag_name > b.tag_name)
  )
  return tagsSorting(tags)
}

const sortExercises = (exercises) => {
  let exercisesSorting = R.pipe(
    R.sort((a, b) => timeDiff(a.exercise_start_date, b.exercise_start_date))
  )
  return exercisesSorting(exercises)
}

const sortDocuments = (documents) => {
  let documentsSorting = R.pipe(
    R.sort((a, b) => a.document_name > b.document_name)
  )
  return documentsSorting(documents)
}

Index.propTypes = {
    tags: PropTypes.array,
    exercises: PropTypes.array,
    documents: PropTypes.array,
    exerciseId: PropTypes.string,
    fetchGroups: PropTypes.func,
    fetchTags: PropTypes.func,
    addDocument: PropTypes.func,
    saveDocument: PropTypes.func,
    searchDocument: PropTypes.func,
    getDocument: PropTypes.func,
    getDocumentTags: PropTypes.func,
    getDocumentTagsExercise: PropTypes.func,
    editDocumentTags: PropTypes.func,
    editDocumentTagsExercise: PropTypes.func,
    fetchExercises: PropTypes.func,
    deleteDocument: PropTypes.func,
    deleteTag: PropTypes.func
}

const checkUserCanUpdate = (state, ownProps) => {
  let exerciseId = ownProps.params.exerciseId
  let userId = R.path(['logged', 'user'], state.app)
  let isAdmin = R.path([userId, 'user_admin'], state.referential.entities.users)

  let userCanUpdate = isAdmin
  if (!userCanUpdate) {
    let groupValues = R.values(state.referential.entities.groups)
    groupValues.forEach((group) => {
      group.group_grants.forEach((grant) => {
        if (
          grant
          && grant.grant_exercise
          && (grant.grant_exercise.exercise_id === exerciseId)
          && (grant.grant_name === 'PLANNER')
        ) {
          group.group_users.forEach((user) => {
            if (user && (user.user_id === userId)) {
              userCanUpdate = true
            }
          })
        }
      })
    })
  }

  return userCanUpdate
}

const select = (state, ownProps) => {
  let exerciseId = ownProps.params.exerciseId
  return {
      'exerciseId': exerciseId,
      'userCanUpdate': checkUserCanUpdate(state, ownProps),
      'exercises': sortExercises(R.values(state.referential.entities.exercises)),
      'documents': sortDocuments(R.values(state.referential.entities.document)),
      'tags': sortTags(R.values(state.referential.entities.tag))
  }
}

export default connect(select, {
    fetchGroups,
    fetchTags,
    fetchExercises,
    addDocument,
    searchDocument,
    saveDocument,
    getDocument,
    getDocumentTags,
    getDocumentTagsExercise,
    deleteTag,
    editDocumentTags,
    downloadDocument,
    editDocumentTagsExercise,
    deleteDocument
})(Index)

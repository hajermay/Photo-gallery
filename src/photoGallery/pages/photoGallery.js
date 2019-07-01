import React from 'react';
import {connect} from "react-redux";
import PhotoGalleryDialog from "../components/photoGalleryDialog";

//@material-ui/core
import {
    AppBar,
    Container,
    CssBaseline,
    GridList,
    GridListTile,
    GridListTileBar,
    Toolbar,
    Typography,
    withStyles,
} from '@material-ui/core';

//@material-ui/icons
import CameraIcon from '@material-ui/icons/PhotoCamera';

//styles
import photoGalleryStyle from '../styles/photoGalleryStyle';

//actions
import {addComment, getPhotoList} from "../redux/actions/photoGalleryActions";

export class PhotoGallery extends React.Component {

    constructor() {
        super();
        this.state = {
            openDialog: false,
            currentItem: null,
            comment: ''
        }
    }

    componentDidMount() {
        this.props.getPhotoList()
    }

    openDialog = (data) => {
        this.setState({
            openDialog: true,
            currentItem: data,
            requiredText:'',
        })
    }

    closeDialog = () => {
        this.setState({
            openDialog: false,
        })
    }

    getInputData = (event) => {
        this.setState({
            comment: event.target.value,
            requiredText:'',
        })
    }

    sendComment = (id) => {
        if (this.state.comment !== "") {
            this.props.addComment(id, this.state.comment, this.closeDialog)
        } else {
            this.setState({
                requiredText: 'Field is required'
            })
        }
    }

    render() {
        const {classes, photosList, loading} = this.props;
        return (
            <React.Fragment>
                <CssBaseline/>
                <AppBar position="relative">
                    <Toolbar>
                        <CameraIcon className={classes.icon}/>
                        <Typography variant="h6" color="inherit" noWrap>
                            My Tunisia
                        </Typography>
                    </Toolbar>
                </AppBar>
                <main>
                    <Container className={classes.cardGrid} maxWidth="lg">
                        <GridList cellHeight={250} className={classes.gridList} cols={3}>
                            {!loading && photosList.map(photo => (
                                <GridListTile key={photo.id} cols={photo.cols || 1}
                                              onClick={() => this.openDialog(photo)}>
                                    <img src={`${process.env.PUBLIC_URL}/images/${photo.filename}`} alt={photo.id}/>
                                    <GridListTileBar
                                        title={photo.title}
                                        subtitle={<span>On: {photo.year}</span>}
                                    />
                                </GridListTile>
                            ))}
                        </GridList>
                    </Container>
                </main>
                <PhotoGalleryDialog openDialog={this.state.openDialog}
                                    closeDialog={this.closeDialog}
                                    dialogContentStyle={classes.dialogContent}
                                    img={this.state.currentItem && `${process.env.PUBLIC_URL}/images/${this.state.currentItem.filename}`}
                                    getInputData={(event) => this.getInputData(event)}
                                    sendComment={() => this.state.currentItem && this.sendComment(this.state.currentItem.id)}
                                    requiredText={this.state.requiredText}
                />
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => ({
    loading: state.photoGallery.loading,
    photosList: state.photoGallery.photosList
});

const mapDispatchToProps = dispatch => ({
    getPhotoList: () => dispatch(getPhotoList()),
    addComment: (id, comment, callback) => dispatch(addComment(id, comment, callback)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(photoGalleryStyle)(PhotoGallery));